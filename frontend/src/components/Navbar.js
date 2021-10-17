import { useState } from 'react'
import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    VisuallyHidden,
    HStack,
    Button,
    useDisclosure,
    VStack,
    IconButton,
    CloseButton,
    Avatar,
    Tabs,
    TabList,
    Tab,
    Spacer,
    Icon
} from "@chakra-ui/react";
// import { Logo } from "@choc-ui/logo";
import {
    AiOutlineMenu,
    AiFillHome,
    AiOutlineInbox,
} from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FaPooStorm } from "react-icons/fa";
import { MdLogin, MdSettingsSuggest, MdOutlineLogout } from "react-icons/md";
import { useHistory } from 'react-router-dom'
import { logoutUser, userSelector } from '../services/user/userSlice';
import { useSelector, useDispatch } from 'react-redux'
import SearchBox from './SearchBox'


export default function Navbar() {
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
    const history = useHistory();
    const dispatch = useDispatch()
    const userData = useSelector(userSelector);
    const { userInfo } = userData;

    const [tabIndex, setTabIndex] = useState(0)

    const handleTabsChange = index => {
        setTabIndex(index)
    }

    return (
        <Box shadow="md">
            <chakra.header
                bg={bg}
                borderColor="gray.600"
                borderBottomWidth={1}
                w="full"
                px={{ base: 2, sm: 4 }}
                py={4}
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack spacing={4} display="flex" alignItems="center">
                        <Box display={{ base: "inline-flex", md: "none" }}>
                            <IconButton
                                display={{ base: "flex", md: "none" }}
                                aria-label="Open menu"
                                fontSize="20px"
                                color={useColorModeValue("gray.800", "inherit")}
                                variant="ghost"
                                icon={<AiOutlineMenu />}
                                onClick={mobileNav.onOpen}
                            />
                            <VStack
                                pos="absolute"
                                top={0}
                                left={0}
                                right={0}
                                display={mobileNav.isOpen ? "flex" : "none"}
                                flexDirection="column"
                                p={2}
                                pb={4}
                                m={2}
                                bg={bg}
                                spacing={3}
                                rounded="sm"
                                shadow="sm"
                            >
                                <CloseButton
                                    aria-label="Close menu"
                                    justifySelf="self-start"
                                    onClick={mobileNav.onClose}
                                />
                                <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
                                    Dashboard
                                </Button>
                                <Button
                                    w="full"
                                    variant="solid"
                                    colorScheme="brand"
                                    leftIcon={<AiOutlineInbox />}
                                >
                                    Inbox
                                </Button>
                                <Button
                                    w="full"
                                    variant="ghost"
                                    leftIcon={<BsFillCameraVideoFill />}
                                >
                                    Videos
                                </Button>
                            </VStack>
                        </Box>
                        <chakra.a
                            href="/"
                            title="Choc Home Page"
                            display="flex"
                            alignItems="center"
                        >
                            <Icon as={FaPooStorm} w={8} h={8} />
                            <VisuallyHidden>Invac</VisuallyHidden>
                        </chakra.a>
                        <chakra.h1 fontSize="xl">Invac</chakra.h1>
                    </HStack>
                    <HStack spacing={3} display="flex" alignItems="center">
                        <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
                            <Button variant="ghost" leftIcon={<AiFillHome />} size="sm">
                                Home
                            </Button>
                            {userInfo ? (
                                <Button
                                    variant="ghost"
                                    colorScheme="brand"
                                    leftIcon={<MdOutlineLogout />}
                                    size="sm"
                                    onClick={() => dispatch(logoutUser)}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="ghost"
                                        colorScheme="brand"
                                        leftIcon={<MdLogin />}
                                        size="sm"
                                        onClick={()=> history.push('/login')}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        colorScheme="brand"
                                        leftIcon={<MdSettingsSuggest />}
                                        size="sm"
                                        onClick={()=> history.push('/register')}
                                    >
                                        Register
                                    </Button>
                                </>
                            )}
                        </HStack>
                        <Avatar
                            size="sm"
                            name="Dan Abrahmov"
                            src="https://bit.ly/dan-abramov"
                        />
                    </HStack>
                </Flex>
            </chakra.header>
            <Flex
                alignItems="center"
                justifyContent="space-between"
                mx={2}
                borderWidth={0}
                overflowX="auto"
                flexDirection={{ base: 'column', md: 'row' }}
            >
                <Tabs tabIndex={tabIndex} onChange={handleTabsChange} borderBottomColor="transparent">
                    <TabList>
                        <Tab py={4} m={0} _focus={{ boxShadow: "none" }} onClick={() => {
                            setTabIndex(0)
                            history.push('/browse');
                        }}>
                            Browse
                        </Tab>
                        <Tab py={4} m={0} _focus={{ boxShadow: "none" }} onClick={() => {
                            setTabIndex(1)
                            history.push('/categories');
                        }}>
                            Categories
                        </Tab>
                        {userInfo ? (
                            <>
                                <Tab py={4} m={0} _focus={{ boxShadow: "none" }} onClick={() => {
                                    setTabIndex(2)
                                    history.push('addbook');
                                }}>
                                    Add Book
                                </Tab>
                                <Tab py={4} m={0} _focus={{ boxShadow: "none" }} onClick={() => {
                                    setTabIndex(3)
                                    history.push('/add_category');
                                }}>
                                    Add Category
                                </Tab>
                            </>
                        ): null}
                    </TabList>
                </Tabs>
                <Spacer />
                <HStack spacing={3} alignItems="center" mt={{ base: 4 }}>
                    <SearchBox />
                </HStack>
            </Flex>
        </Box>
    );
}