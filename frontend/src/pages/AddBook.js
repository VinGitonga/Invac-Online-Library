import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {
    Flex,
    Box,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Select,
    Textarea,
    useColorModeValue,
    Spinner,
    useToast
} from '@chakra-ui/react';
import { MdModeEditOutline } from 'react-icons/md';
import { clearState, createBook, bookSelector } from "../services/book/bookSlice";
import { clearState as clearListState, listCategories, categorySelector } from "../services/category/categorySlice";
import { userSelector } from '../services/user/userSlice';


const AddBook = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const toast = useToast()
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [year, setYear] = useState(0);
    const [pages, setPages] = useState(0);
    const [image, setImage] = useState("");
    const [description, setDescription] = useState('');
    const [addedBy, setAddedBy] = useState("");

    const {
        isFetching, isSuccess, isError, errorMessage
    } = useSelector(bookSelector);

    const successMsg = () => {
        toast({
            title:'Book Added.',
            description:"Book has been successfully created.",
            status:"success",
            duration:3000,
            isClosable:true
        })
    }

    const errorMsg = () => {
        toast({
            title:'An error has occurred',
            description:errorMessage,
            status:"error",
            duration:5000,
            isClosable: true
        })
    }



    useEffect(() => {
        if (isSuccess) {
            successMsg()
            dispatch(clearState());
            history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, history]);
    useEffect(() => {
        if (isError) {
            dispatch(clearState());
            errorMsg()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, history]);

    const userData = useSelector(userSelector);
    const { userInfo } = userData;

    const {
        isFetching: loadingCategories,
        isSuccess: successCategories,
        isError: errorCategories,
        errorMessage: errorMsgCats,
        categories
    } = useSelector(categorySelector);

    useEffect(() => {
        if (successCategories) {
            dispatch(clearListState());
        }

        if (errorCategories) {
            dispatch(clearListState());

        }
    }, [successCategories, errorCategories, dispatch]);

    const errMsgCats = () => {
        toast({
            title:'An error has occurred',
            description:errorMsgCats,
            status:"error",
            duration:5000,
            isClosable: true
        })
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(listCategories())
            setAddedBy(userInfo._id)
        }
    }, [dispatch, userInfo]);

    const clickSubmit = () => {
        let bookInfo = new FormData();
        title && bookInfo.append("title", title);
        author && bookInfo.append("author", author);
        category && bookInfo.append("category", category);
        year && bookInfo.append("year", year);
        pages && bookInfo.append("pages", pages);
        image && bookInfo.append("image", image);
        description && bookInfo.append("description", description);
        addedBy && bookInfo.append("addedBy", addedBy);

        dispatch(createBook(bookInfo));
    }

    return (
        <Flex
            minH={'80vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} w="600px" maxW={'1200px'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading as="h2" size={"xl"} mb={"13px"}>
                        Add Book
                    </Heading>
                </Stack>
                <Box p={8}>
                    <Stack spacing={4}>
                        <FormControl id="title">
                            <FormLabel fontWeight="bold">Title</FormLabel>
                            <Input variant={"flushed"} placeholder={"Book Title"} value={title} onChange={e => setTitle(e.target.value)} />
                        </FormControl>
                        <FormControl id="author">
                            <FormLabel fontWeight="bold">Author</FormLabel>
                            <Input variant={"flushed"} placeholder={"Book Author"} value={author} onChange={e => setAuthor(e.target.value)} />
                        </FormControl>
                        <FormControl id="category">
                            <FormLabel fontWeight="bold">Category</FormLabel>
                            <Select variant={"flushed"} placeholder={"Choose Category ..."} value={category} onChange={e => setCategory(e.target.value)}>
                                {loadingCategories ? (
                                    <Spinner
                                        thickness="4px"
                                        speed="0.65s"
                                        emptyColor="gray.200"
                                        color="blue.500"
                                        size="xl"
                                    />
                                ) : isError ? errMsgCats()
                                    : categories.map((cat) => (
                                        <option key={cat._id} value={cat.category}>{cat.category}</option>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl id="year">
                            <FormLabel fontWeight="bold">Year Published</FormLabel>
                            <Input variant={"flushed"} placeholder={"Year of Publication"} type="number" value={year} onChange={e => setYear(e.target.value)} />
                        </FormControl>
                        <FormControl id="pages">
                            <FormLabel fontWeight="bold">No. of pages</FormLabel>
                            <Input variant={"flushed"} placeholder={"Pages"} type="number" value={pages} onChange={e => setPages(e.target.value)} />
                        </FormControl>
                        <FormControl id="image">
                            <FormLabel fontWeight="bold">Upload Image</FormLabel>
                            <input accept="image/*" type="file" name="image" onChange={e => setImage(e.target.files[0])} />
                        </FormControl>
                        <FormControl id="description">
                            <FormLabel fontWeight="bold">Description</FormLabel>
                            <Textarea variant={"flushed"} placeholder={"What is it all about??"} value={description} onChange={e => setDescription(e.target.value)} />
                        </FormControl>
                        <Button type="submit" onClick={clickSubmit} leftIcon={<MdModeEditOutline />} colorScheme={"teal"} mb={"15px"} isLoading={isFetching} loadingText={"Saving ..."}>
                            SAVE
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default AddBook;