/* eslint-disable no-sparse-arrays */
import { 
    chakra, 
    Box, 
    useColorModeValue, 
    Flex,
    IconButton,
    Stack,
    Heading,
    Button
} from '@chakra-ui/react'
import {RiMenu2Fill} from 'react-icons/ri'


const Home = () => {
    const bg = useColorModeValue("white", "gray.800")

    return (
        <chakra.header>
            <chakra.nav bg={bg} shadow="base">
                <Box mx="auto" px={6} py={3} maxW="full">
                    <Box
                        display={{md: "flex"}}
                        alignItems={{md:"center"}}
                        justifyContent={{md: "space-between"}}
                    >
                        <Flex alignItems="center" justifyContent="space-between">
                            <Box fontSize="xl" fontWeight="semibold" color="gray.700">
                                <chakra.a
                                    fontSize={["xl", ,"2xl"]}
                                    fntWeight="bold"
                                    color={useColorModeValue("gray.800", "white")}
                                    _hover={{
                                        color: useColorModeValue("gray.700", "white")
                                    }}
                                >
                                    Invac
                                </chakra.a>
                            </Box>
                            <Flex display={{md: "none"}}>
                                <IconButton
                                    aria-label="toggle menu"
                                    icon={<RiMenu2Fill />}
                                    variant="ghost"
                                />
                            </Flex>
                        </Flex>
                        <Box
                            display={["none",,"flex"]} alignItems={{md:"center"}}
                        >
                            <chakra.a
                                display={"block"}
                                mx={4}
                                mt={[2,,0]}
                                fontSize="sm"
                                color={useColorModeValue("gray.700", "gray.200")}
                                textTransform="capitilize"
                                _hover={{
                                    color:useColorModeValue("brand.400", "blue.400")
                                }}
                            >
                                Categories
                            </chakra.a>
                            <chakra.a
                                display={"block"}
                                mx={4}
                                mt={[2,,0]}
                                fontSize="sm"
                                color={useColorModeValue("gray.700", "gray.200")}
                                textTransform="capitilize"
                                _hover={{
                                    color:useColorModeValue("brand.400", "blue.400")
                                }}
                            >
                                Books
                            </chakra.a>
                            <chakra.a
                                display={"block"}
                                mx={4}
                                mt={[2,,0]}
                                fontSize="sm"
                                color={useColorModeValue("gray.700", "gray.200")}
                                textTransform="capitilize"
                                _hover={{
                                    color:useColorModeValue("brand.400", "blue.400")
                                }}
                            >
                                Profile
                            </chakra.a>
                        </Box>
                    </Box>
                </Box>
            </chakra.nav>
            <Box
                w={"full"}
                h={"container.sm"}
                backgroundImage={"/images/bg1.jpg"}
                bgPos="center"
                bgSize="cover"
            >
                <Flex
                    align="center"
                    pos="relative"
                    justify="center"
                    bozSize="full"
                    bg="blackAlpha.700"
                >
                    <Stack textAlign="center" alignItems="center" spacing={6}>
                        <Heading
                            fontSize={["2xl", , "3xl"]}
                            fontWeight="semibold"
                            color="white"
                            textTransform="uppercase"
                        >
                            Build your academic skills
                        </Heading>
                        <Button
                            colorScheme="brand"
                            textTransform="uppercase"
                            w="fit-content"
                            class="px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                        >
                            Browse Books
                        </Button>
                    </Stack>
                </Flex>
            </Box>
        </chakra.header>
    )
}


export default Home;