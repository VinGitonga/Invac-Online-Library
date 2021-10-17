import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/user.js'
import { OAuth2Client } from 'google-auth-library'
import { nanoid } from 'nanoid'
import dotenv from "dotenv"

dotenv.config()
const clientId = process.env.GOOGLE_CLIENT_ID

const client = new OAuth2Client(clientId)

/**
 * @desc    Auth User & get token
 * @route   POST /api/users/login
 * @access  Public
 */

const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    console.log(user)

    if (user && (await user.matchPassword(password))) {
        console.log(user)
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        return res.status(401).json({
            message: "Invalid username or password"
        })
        // throw new Error("Invalid email or password")
    }
}



/**
 * @desc    Register new user
 * @route   POST /api/users/signup
 * @access  Public
 */
const signup = async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        return res.status(400).json({
            message: "User already exists"
        })
        // throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        username,
        password
    })

    if (user) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        return res.status(401).json({
            message: "An error was encountered. Please try again."
        })
        // throw new Error("Invalid email or password")
    }
}

/**
 * @desc    Get user by Id
 * @route   GET /api/users/:userId
 * @access  Private /admin
 */

const getUserById = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error("User not found")
    }

})

/**
 * @desc    Login or Register with google
 * @route   POST /api/users/google
 * @access  Public
 */

const authenticateGoogle = async (req, res) => {
    console.log(req.body)
    const { tokenId } = req.body

    client.verifyIdToken({ idToken: tokenId, audience: clientId }).then(async (resp) => {
        console.log(resp)
        const email = resp.payload.email;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(200).json({
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                token: generateToken(userExists._id)
            })
        } else {
            // now save the user info with into our database given the user is not yet saved in the database
            const userObj = {
                name: resp.payload.name,
                email: resp.payload.email,
                password: nanoid(10)
            }

            let newUser = await User.create(userObj)

            try {
                let result = await newUser.save();
                return res.status(200).json({
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    token: generateToken(result._id)
                })
            } catch (err) {
                console.log(err)
                return res.status(400).json({
                    message: `Unable to save the user due to ${err}`
                })
            }

        }
    }).catch(err => {
        console.log("Hi"+err)
        return res.status(400).json({
            message: `Could not perform google authentication due to ${err}`
        })
    })
}

export {
    login, signup, getUserById, authenticateGoogle
}