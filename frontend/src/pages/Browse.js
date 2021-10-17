import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import Book from '../components/Book'
import books from '../books'

const Browse = () => {
    return (
        <Box p={4}>
            <Text fontSize="md" mb="20px" color={"gray.400"} >
                Books that you may like:
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={"40px"}>
                {books.map((book, index) => (
                    <Book bookInfo={book} key={index} />
                ))}
            </SimpleGrid>
        </Box>
    )
}

export default Browse;