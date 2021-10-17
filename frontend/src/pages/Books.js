import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Box, SimpleGrid, Text, Spinner, useToast } from '@chakra-ui/react'
import Book1 from '../components/Book1'
import { clearState, listBooks, bookSelector } from '../services/book/bookSlice';

const Books = () => {
    const { keyword } = useParams();

    const dispatch = useDispatch();
    const toast = useToast();
    const {
        isFetching, isSuccess, isError, errorMessage, books
    } = useSelector(bookSelector);

    const errorMsg = () => {
        toast({
            title: "An error occured",
            description: errorMessage,
            status: "error",
            duration: 5000,
            isClosable: true
        })
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState())
        }

        if (isError) {
            dispatch(clearState())
        }
    }, [isError, isSuccess, dispatch]);


    useEffect(() => {
        dispatch(listBooks(keyword))
    }, [dispatch, keyword]);



    return (
        <Box p={4}>
            <Text fontSize="30px" mb="20px" color={"gray.400"} >
                {keyword ? `Results for "${keyword}"` : "Books that you may like:"}
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={"40px"}>
                {isFetching ? (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                ) : isError ? errorMsg()
                    : (books && books !== undefined) ?
                        books.map((book) => (
                            <Book1 bookInfo={book} key={book._id} />
                        )) : <Text>No data</Text>}
            </SimpleGrid>
        </Box>
    )
}

export default Books;