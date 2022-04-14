import { Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, IconButton, List, ListItem, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../ApplicationContext'

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const {rolesUser} = useContext(ShopContext)
    useEffect(() => {
        console.log(rolesUser)
    }, [])
    

    return (
        <Flex bg='gray.100' p='4'>
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
                                <Link to='/admin/products'>
                                    Products
                                </Link>
                            </ListItem>
                            <ListItem>
                                Operating system
                            </ListItem>
                            <ListItem>
                                Ram
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
            <Center>
                <Text>
                    <Link to="/">Mehdi Computers</Link> 
                </Text>
            </Center>
            <Spacer />
        </Flex>
    )
}

export default Navbar
