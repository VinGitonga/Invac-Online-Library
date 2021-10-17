import { Flex, Text, Image, Stack, Icon, HStack, Button, Box } from '@chakra-ui/react';
import { MdStarRate, MdStarOutline } from 'react-icons/md'

const Book = ({ bookInfo }) => {
    return (
        <Box borderRadius={"40px"} bg={"yellow.50"} boxShadow="2xl" >
            <Stack minH={'300px'} direction={{ base: 'column', md: 'row' }} w={'370px'}>
                <Flex flex={1}>
                    <Image
                        alt={bookInfo.title}
                        objectFit={'cover'}
                        src={bookInfo.image}
                        borderRadius="40px"
                        transition="opacity 0.3s ease-in-out"
                        _hover={{
                            opacity:0.7,
                            transform: "scale(1.02)",
                        }}
                    />
                </Flex>
                <Flex flex={1} align={'center'} justify={'center'} p={'15px'}>
                    <Stack spacing={6} w={'full'} maxW={'lg'}>
                        <Text color={"gray.800"} fontWeight={'thin'} >
                            {bookInfo.category.toUpperCase()}
                        </Text>
                        <Text fontWeight={"semibold"}>
                            {bookInfo.title}
                        </Text >
                        <Text fontWeight={'thin'} color={"gray.600"} fontSize={"sm"} >
                            {bookInfo.year}
                        </Text>
                        <Text fontSize={"sm"}>
                            {'written by: '}
                            {bookInfo.author}
                        </Text>
                        <Text fontSize={"sm"}>
                            {bookInfo.pages}
                            {' pages'}
                        </Text>
                        <Icons />
                        <Text fontStyle={'italic'} color={"gray.600"} fontSize={"sm"} >
                            {'added by: '}
                            {bookInfo.addedBy}
                        </Text>
                        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                            <Button
                                rounded={'full'}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500'
                                }}
                                size={'sm'}
                            >
                                Mark
                            </Button>
                            <Button rounded={'full'} size={'sm'}>See more</Button>
                        </Stack>
                    </Stack>
                </Flex>
            </Stack>
        </Box>
    )
}

const Icons = () => (
    <HStack>
        <Icon as={MdStarRate} color={"tomato"} />
        <Icon as={MdStarRate} color={"tomato"} />
        <Icon as={MdStarRate} color={"tomato"} />
        <Icon as={MdStarRate} color={"tomato"} />
        <Icon as={MdStarOutline} />
    </HStack>
)

export default Book;