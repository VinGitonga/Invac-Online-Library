import {
    Box,
    Image,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
} from '@chakra-ui/react'

const baseURL = 'http://localhost:3005/api/books1/image'

const BookDetail = ({ book }) => {
    return (
        <>
            <Box
                h={'210px'}
                bg={'gray.100'}
                mx={-6}
                mb={6}
                pos={'relative'}
            >
                <Image
                    src={`${baseURL}/${book._id}`}
                    objectFit={'contain'}
                    w={"445px"}
                />
            </Box>
            <Stack mt={"180px"}>
                <Text
                    color={'green.500'}
                    textTransform={'uppercase'}
                    fontWeight={800}
                    fontSize={'sm'}
                    letterSpacing={1.1}
                >
                    {book.category}
                </Text>
                <Heading
                    color={useColorModeValue('gray.700', 'white')}
                    fontSize={'2xl'}
                >
                    {book.title}
                </Heading>
                <Text color={'gray.500'}>
                    {book.description}
                </Text>
            </Stack>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                <Avatar
                    src={'https://cwatch.comodo.com/images/web-bot-software.png'}
                    alt={'avatar'}
                />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>{book.addedBy.name}</Text>
                    <Text color={'gray.600'}>{book.year} · {"   "}   {book.pages} Pages</Text>
                </Stack>
            </Stack>
            <Heading
                color={useColorModeValue('gray.700', 'white')}
                fontSize={'xl'}
                mt={5}
            >
                {book.reviews.length} Comments
            </Heading>
        </>
    )
}



export default BookDetail;