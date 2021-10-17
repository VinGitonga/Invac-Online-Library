import { Box, Center, useColorModeValue } from '@chakra-ui/react'
import Comments from './Comments'
import AddComment from './AddComment'
import BookDetail from './BookDetail';

const BookScreen = ({bookInfo}) => {
    return (
        <Center py={6}>
            <Box
                maxW={"445px"}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}
            >
                <BookDetail book={bookInfo} />
                <AddComment bookId={bookInfo._id} />
                <Comments reviews={bookInfo.reviews} />
            </Box>
        </Center>
    )
}

export default BookScreen;