import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Flex, Text, Box, Icon, Menu, MenuButton, MenuList, MenuItem as ActionItem, Button } from '@chakra-ui/react';
import { MdMenu, MdClose, MdOutlineLocalFireDepartment } from 'react-icons/md';
import { RiArrowDownSLine } from 'react-icons/ri';
import { logoutUser, userSelector } from '../services/user/userSlice';


const MenuItem = ({ children, isLast, to = "/" }) => {
    return (
        <Text
            mb={{ base: isLast ? 0 : 8, sm: 0 }}
            mr={{ base: 0, sm: isLast ? 0 : 8 }}
            display="block"
            _hover={{
                color: '#171923',
                fontWeight: "bold"
            }}
        >
            <Link to={to}>{children}</Link>
        </Text>
    );
}

const Header = () => {
    const [show, setShow] = useState(false);
    const toggleMenu = () => setShow(!show);
    const userData = useSelector(userSelector);
    const { userInfo } = userData;

    return (
        <Flex
            mb={8}
            p={4}
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
        >
            <Box w="200px">
                <Flex
                    align="center"
                    justify={['center', 'space-between', 'flex-end', 'flex-start']}
                    direction={['column', 'row', 'row', 'row']}
                    pt={[4, 4, 4, 4]}
                >
                    <Icon as={MdOutlineLocalFireDepartment} w={8} h={8} />
                    <Text
                        fontSize="lg"
                        fontWeight="bold"
                        display="block"
                        mb={{ base: 8, sm: 0 }}
                        ml={{ base: 0, sm: 3 }}
                    >
                        Invac
                    </Text>
                </Flex>
            </Box>
            <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
                {show ? <Icon as={MdClose} /> : <Icon as={MdMenu} />}
            </Box>

            <Box display={{ base: show ? 'block' : 'none', md: 'block' }}
                flexBasis={{ base: '100%', md: 'auto' }}
            >
                <Flex
                    align="center"
                    justify={['center', 'space-between', 'flex-end', 'flex-start']}
                    direction={['column', 'row', 'row', 'row']}
                    pt={[4, 4, 4, 4]}
                >
                    <MenuItem to="/">Home</MenuItem>
                    <MenuItem to="/browse">Browse Books</MenuItem>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<RiArrowDownSLine />}>
                            Categories
                        </MenuButton>
                        <CategoriesMenu userInfo={userInfo} />
                    </Menu>
                    {userInfo ? (
                        <>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<RiArrowDownSLine />}>
                                    Books
                                </MenuButton>
                                <BooksMenu />
                            </Menu>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<RiArrowDownSLine />}>
                                    {userInfo.username}
                                </MenuButton>
                                <ProfileMenu />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <MenuItem to="/login">Login</MenuItem>
                            <MenuItem to="/register" isLast>Register</MenuItem>
                        </>
                    )}
                </Flex>
            </Box>
        </Flex>
    )
}

const ProfileMenu = () => {
    const dispatch = useDispatch();
    return (
        <MenuList>
            <MenuItem to="/profile">My Profile</MenuItem>
            <ActionItem onClick={() => dispatch(logoutUser())}>Logout</ActionItem>
        </MenuList>
    )
}

const CategoriesMenu = ({ userInfo }) => {
    return (
        <MenuList>
            <MenuItem to="/categories">All Categories</MenuItem>
            {userInfo ?
                <MenuItem to="/add_category">Add Category</MenuItem> : null
            }
        </MenuList>
    )
}

const BooksMenu = () => {
    return (
        <MenuList>
            <MenuItem to="/mybooks">My Books</MenuItem>
            <MenuItem to="/addbook">Add Books</MenuItem>
            <MenuItem to="/markedbooks">Marked Books</MenuItem>
        </MenuList>
    )
}

export default Header;