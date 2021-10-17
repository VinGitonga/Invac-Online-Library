/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Tag, Heading, TagLabel, TagCloseButton, SimpleGrid, useToast, Spinner } from '@chakra-ui/react'
import { categorySelector, listCategories, clearState, removeCategory } from '../services/category/categorySlice';

const CategoriesList = () => {
    const dispatch = useDispatch();
    const toast = useToast()
    const categoryList = useSelector(categorySelector);
    // destructure the states 
    const {
        isFetching, isSuccess, isError, errorMessage, categories
    } = categoryList;

    // reducer for removing category
    const categoryRemove = useSelector(categorySelector);

    const {
        isFetching: loadingRemove,
        isSuccess: successRemove,
        isError: errorRemove,
        errorMessage: errMsgRemove
    } = categoryRemove;


    useEffect(() => {
        dispatch(listCategories());
    }, [dispatch]);

    const errorMsg = () => {
        const id = "error"
        if (!toast.isActive(id)) {
            toast({
                id,
                title: "An error has occured",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
    }

    const successRemoveMsg = () => {
        const id = "sucRem"
        if (!toast.isActive(id)) {
            toast({
                id,
                title: "Category Remove",
                description: "Successfully exterminated category",
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }

    }

    const errorRemoveMsg = () => {
        const id = "errRem"
        if (!toast.isActive(id)) {
            toast({
                id,
                title: "An error has occured",
                description: errMsgRemove,
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            // setCategories(categories)
        }

        if (isError) {
            dispatch(clearState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError, dispatch]);

    useEffect(() => {
        if (successRemove) {
            dispatch(clearState());
            successRemoveMsg();
        }

        if (errorRemove) {
            dispatch(clearState());
            errorRemoveMsg();
        }
    }, [successRemove, errorRemove, dispatch])


    return (
        <Box>
            <Heading as="h2" size={"xl"} mb={"40px"} >
                Categories
            </Heading>
            <SimpleGrid columns={{ base: 3, md: 6 }} spacing={"25px"}>
                {loadingRemove && <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />}
                {isFetching ? <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
                    : isError ? errorMsg()
                        : categories.map((cat, index) => (
                            <Tag
                                size="lg"
                                key={index}
                                borderRadius={"full"}
                                variant="solid"
                            >
                                <TagLabel>{cat.category}</TagLabel>
                                <TagCloseButton onClick={() => dispatch(removeCategory(cat._id))} />
                            </Tag>
                        ))}
            </SimpleGrid>
        </Box>
    )
}

export default CategoriesList;