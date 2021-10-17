import { 
    Flex, 
    Text, 
    Image, 
    Stack, 
    Icon, 
    HStack, 
    Button, 
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure
} from '@chakra-ui/react';
import { MdStarRate, MdStarOutline } from 'react-icons/md'
import BookScreen from './BookScreen'
const baseURL = 'http://localhost:3005/api/books1/image'

const Book1 = ({ bookInfo }) => {
    
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Box borderRadius={"40px"} bg={"yellow.50"} boxShadow="2xl" >
            <Stack minH={'300px'} direction={{ base: 'column', md: 'row' }} w={'370px'}>
                <Flex flex={1}>
                    <Image
                        alt={bookInfo.title}
                        objectFit={'cover'}
                        src={`${baseURL}/${bookInfo._id}`}
                        borderRadius="40px"
                        transition="opacity 0.3s ease-in-out"
                        _hover={{
                            opacity: 0.7,
                            transform: "scale(1.02)",
                        }}
                        cursor={'pointer'}
                        onClick={onOpen}
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
                            {bookInfo.addedBy.name}
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
                            <Button rounded={'full'} size={'sm'} onClick={onOpen}>See more</Button>
                            <ModalContainer bookInfo={bookInfo} isOpen={isOpen} onClose={onClose} />
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

const ModalContainer = ({ isOpen, onClose, bookInfo}) => {
    return (
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPresent={"slideInBottom"}
            scrollBehavior={"inside"}
            size={'xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <BookScreen bookInfo={bookInfo} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Book1;