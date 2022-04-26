import { Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, IconButton, Input, InputGroup, InputRightElement, List, ListItem, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useRef } from 'react'
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../ApplicationContext'
import './Navbar.scss'

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const {authUser, setAuthUser, isAdmin, setIsAdmin} = useContext(ShopContext)

   
    

    return (
        <Flex 
            boxShadow='xl' 
            p='3' 
            rounded='md' 
            bg='transparent' 
            opacity='.95' 
            color='white'
            borderRadius='0' >
            {isAdmin && 
                <>
                    <IconButton 
                    variant='outline'
                    ref={btnRef} 
                    boxShadow='none'
                    border='none'
                    onClick={onOpen} 
                    icon={<AiOutlineMenu />} /> 
                    <Drawer
                        isOpen={isOpen}
                        placement='left'
                        onClose={onClose}
                        finalFocusRef={btnRef}
                        >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Mehdi Computers</DrawerHeader>
                            <DrawerBody>
                                <List spacing={3}>
                                    <ListItem>
                                        <Link to='/products'>
                                            Products
                                        </Link>
                                    </ListItem>
                                    <ListItem>
                                        Operating system
                                    </ListItem>
                                    <ListItem>
                                        <Link to='/rams'>
                                            Ram
                                        </Link>
                                    </ListItem>
                                    <ListItem>
                                        Processor Model
                                    </ListItem>
                                    <ListItem>
                                        Brand
                                    </ListItem>
                                    <ListItem>
                                        Video card
                                    </ListItem>
                                    <ListItem>
                                        Color
                                    </ListItem>
                                </List>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </>
            }
            <Center>
                <Text mx='3'>
                    <Link to="/">Mehdi Computers</Link> 
                </Text>
                <InputGroup 
                    width='fit-content'  
                    border='1px' 
                    borderColor='gray.200' 
                    backgroundColor='gray.200'
                    borderRadius='6px' > 
                    <InputRightElement
                    borderColor='red'
                        pointerEvents='none'
                        children={<AiOutlineSearch />}
                        />
                    <Input type='text' />
                </InputGroup>    
            </Center>
            <Spacer />
            <Center>
                <Text 
                    mr='3'
                    p='2'>
                    <Link 
                        to="/" 
                        className='link link-active'>
                        Acceuil
                    </Link> 
                </Text>
                <Text 
                    mr='3'
                    p='2'>
                    <Link 
                        to="/"
                        className='link'>
                        A propos de nous
                    </Link> 
                </Text>
                <Text 
                    mr='3'
                    p='2'>
                    <Link 
                        to="/"
                        className='link'>
                        Contactez Nous
                    </Link> 
                </Text>
            </Center>
           
            
        </Flex>
    )
}

export default Navbar
