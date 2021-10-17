/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Icon,
    useToast
} from '@chakra-ui/react'
import { RiLoginCircleFill, RiLockUnlockFill } from 'react-icons/ri'
import GoogleLogin from 'react-google-login'
import Loader from '../components/Loader'
import { loginUser, clearState, userSelector, authGoogle } from '../services/user/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { isFetching, isSuccess, isError, errorMessage, userInfo } = useSelector(userSelector);
    const { 
        isFetching: loadingGoogle, 
        isSuccess: successGoogle, 
        isError: errorGoogle, 
        errorMessage: errMsgGoogle, 
        userInfo: userGoogle
    } = useSelector(userSelector);
    

    const clickSubmit = () => {
        const userData = { username: username, password: password };
        dispatch(loginUser(userData));
    }

    const successMsg = () => {
        toast({
            title: 'Welcome Back',
            description: `${userInfo.username}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    const toastMessage = ({title, text, status})=> {
        toast({
            title: title,
            description: text,
            status: status,
            duration: 4000,
            isClosable: true
        })
    }

    const errMsg = () => {
        toast({
            title: 'An error has occured',
            description: `${errorMessage}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            setUsername('');
            setPassword('');
            successMsg()
            history.push('/');
        }

        if (isError) {
            errMsg();
            dispatch(clearState());
        }
    }, [isSuccess, isError, history]);

    useEffect(() => {
        if (successGoogle) {
            setUsername('');
            setPassword('');
            dispatch(clearState());
            history.push('/');
        }

        if (errorGoogle) {
            dispatch(clearState());
        }
    }, [successGoogle, errorGoogle, history, dispatch]);

    const googleSuccess = (response) => {
        dispatch(authGoogle({tokenId: response.tokenId}))
    }
    const googleFailure = (response) => {
        console.log(response)
    }

    const toast = useToast();

    return (
        <Flex
            minH={'80vh'}
            align="center"
            justify="center"
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} w="600px" maxW={'1200px'} py={12} px={6}>
                <Stack align="center" justify="center" direction="row" spacing={4}>
                    <Icon as={RiLoginCircleFill} w={8} h={8} />
                    <Heading fontSize={'4xl'}>
                        Sign in to your account
                    </Heading>
                </Stack>
                <Box
                    bg={useColorModeValue('white', 'gray.700')}
                    p={8}
                >
                    {loadingGoogle ? <Loader /> : null}
                    {successGoogle ? toastMessage({
                        title:"Welcome Back",
                        text: userGoogle?.name,
                        status:"success",
                    }): null}
                    {errorGoogle ? toastMessage({
                        title:"An error was encountered",
                        text: errMsgGoogle,
                        status:"error",
                    }): null}
                    <Stack spacing={4}>
                        <GoogleLogin
                            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                            buttonText={"Login With Google"}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                        <FormControl id="username">
                            <FormLabel fontWeight={"bold"} >Username</FormLabel>
                            <Input
                                variant={"flushed"}
                                placeholder={"Username"}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel fontWeight={"bold"}>Password</FormLabel>
                            <Input
                                variant={"flushed"}
                                type="password"
                                placeholder={"Password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            bg={'teal.400'}
                            color={'white'}
                            _hover={{
                                bg: 'teal.500'
                            }}
                            leftIcon={<RiLockUnlockFill size={24} />}
                            onClick={clickSubmit}
                            isLoading={isFetching}
                            loadingText={"Authenticating ..."}
                        >
                            Sign in
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login;