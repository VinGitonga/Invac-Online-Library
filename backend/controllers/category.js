import Category from '../models/category.js'
import asyncHandler from 'express-async-handler'

/**
 * @desc    Create a new category
 * @path    POST /api/categories/create_cat
 * @access  Private /Admin or /User
 */

const createCategory = asyncHandler(async(req, res)=>{
    const { category } = req.body;
    const catExists = await Category.findOne({category})

    if(catExists){
        res.status(400).json({
            error: "Category already exists"
        })
    }

    let cat = new Category({category:category})

    try{
        let result = await cat.save()
        return res.status(200).json(result)
    }catch(err){
        return res.status(400).json({
            message:`Could not save Category due to ${err}`
        })
        // throw new Error(`Could not save Category due to ${err}`)
    }
})

/**
 * @desc    Remove Category from the database
 * @path    DELETE /api/categories/:catId
 * @access  Private /User
 */

const removeCategory = asyncHandler(async(req, res)=>{
    try{
        let cat = req.category;
        let deletedCat = await cat.remove();
        return res.status(200).json(deletedCat)
    }catch(err){
        return res.status(400).json({message:`Could not remove Category due to ${err}`});
        // throw new Error(`Could not remove Category due to ${err}`)
    }
})

/**
 * @desc    Fetch the category by id and append the category to req for easy retrival
 */

const categoryByID = asyncHandler(async(req, res, next, id)=>{
    try{
        let cat = await Category.findById(id)

        if (!cat){
            return res.status(404).json({
                message:`Category not found`
            });
            // throw new Error("Category not found")
        }

        req.category = cat;
        next()
    }catch (err){
        return res.status(400).json({
            message:`Could not save Category due to ${err}`
        });
        // throw new Error(`Category could not be retrieved due to ${err}`)
    }
})

/**
 * @desc    List all the categories in the database
 * @path    GET /api/categories/list
 * @access  Public
 */

const listCategories = asyncHandler(async(req, res)=>{
    try{
        let categories = await Category.find();
        console.log(categories)
        res.json(categories);
    }catch(err){
        return res.status(400).json({message:`Categories could not be retrieved due to ${err}`});
        // throw new Error(`Categories could not be retrieved due to ${err}`)
    }
})

export {
    createCategory,
    removeCategory,
    categoryByID,
    listCategories,
}