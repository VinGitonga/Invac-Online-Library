/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { RiUserSettingsFill } from 'react-icons/ri';
import { registerUser, userSelector, clearState } from '../services/user/userSlice';

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const toast = useToast();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {
        isFetching, isSuccess, isError, errorMessage
    } = useSelector(userSelector);

    const clickSubmit = () => {
        const userData = {
            name: name,
            username: username,
            password: password,
        }

        dispatch(registerUser(userData));
    }

    const successMsg = () => {
        toast({
            title: 'Account created',
            description: "We've successfully created your account",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    const errMsg = () =>{
        toast({
            title: 'An error has occured',
            description: `${errorMessage}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
    }

    const resetForm = () => {
        setName('');
        setUsername('');
        setPassword('');
    }

    useEffect(() => {
        if (isSuccess) {
            clearState();
            resetForm();
            successMsg();
            history.push('/login');
        }

        if (isError) {
            clearState();
            errMsg();
        }
    }, [isSuccess, history, isError]);

   
    return (
        <Flex
            minH={'80vh'}
            align="center"
            justify="center"
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} w="600px" maxW={'1200px'} py={12} px={6}>
                <Stack align="center" justify="center" direction="row" spacing={4}>
                    <Icon as={RiUserSettingsFill} w={8} h={8} />
                    <Heading fontSize={'4xl'}>
                        Create an Account
                    </Heading>
                </Stack>
                <Box
                    bg={useColorModeValue('white', 'gray.700')}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="name">
                            <FormLabel fontWeight="bold" >Name</FormLabel>
                            <Input 
                                variant="flushed" 
                                placeholder={"Yourname"} 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                            />
                        </FormControl>
                        <FormControl id="username">
                            <FormLabel fontWeight="bold" >Username</FormLabel>
                            <Input 
                                variant="flushed" 
                                placeholder={"Username"} 
                                value={username} 
                                onChange={e => setUsername(e.target.value)} 
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel fontWeight="bold" >Password</FormLabel>
                            <Input 
                                letterSpacing="0.3em" 
                                variant="flushed" 
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
                            onClick={clickSubmit}
                            isLoading={isFetching}
                            loadingText={"Registering ..."}
                        >
                            Register
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Register;