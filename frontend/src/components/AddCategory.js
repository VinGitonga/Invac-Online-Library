/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Box, Heading, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import { MdModeEditOutline } from 'react-icons/md';
import { createCategory, clearState, categorySelector } from '../services/category/categorySlice';
import { userSelector } from '../services/user/userSlice';

const AddCategory = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [category, setCategory] = useState('');
    const {
        isFetching, isSuccess, isError, errorMessage
    } = useSelector(categorySelector);

    const userData = useSelector(userSelector);
    const { userInfo } = userData;


    const clickSubmit = () => {
        const catData = {
            category: category,
        }

        dispatch(createCategory(catData));
    }

    const successMsg = () => {
        toast({
            title: 'Category Added.',
            description: "Category has been successfully created.",
            status: "success",
            duration: 3000,
            isClosable: true
        })
    }

    const errorMsg = () => {
        toast({
            title: 'An error has occurred',
            description: errorMessage,
            status: "error",
            duration: 5000,
            isClosable: true
        })
    }

    const resetForm = () => {
        setCategory("");
    }

    useEffect(() => {
        if (isSuccess) {
            resetForm();
            dispatch(clearState());
        }

        if (isError) {
            dispatch(clearState());
        }
    }, [isSuccess, isError, dispatch]);


    return (
        <Box mt={"40px"} >
            <Heading as="h2" size={"xl"} mb={"35px"}>
                Add Category
            </Heading>
            {isSuccess ? successMsg() : null}
            {isError ? errorMsg() : null}
            <FormControl id="category" mb={"15px"}>
                <FormLabel color={"teal.500"} >Category Name</FormLabel>
                <Input
                    variant={"flushed"}
                    placeholder="Category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    w={"450px"}
                    isDisabled={userInfo ? false : true}
                />
            </FormControl>
            <Button
                leftIcon={<MdModeEditOutline />}
                colorScheme="teal"
                variant="solid"
                mb={"15px"}
                onClick={clickSubmit}
                isLoading={isFetching}
                loadingText={"Saving ..."}
                isDisabled={userInfo ? false : true}
            >
                SAVE
            </Button>
        </Box>
    )
}

export default AddCategory;