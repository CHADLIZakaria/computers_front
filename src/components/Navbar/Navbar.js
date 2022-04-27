import { Center, Flex, Input, InputGroup, InputRightElement, Spacer, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../ApplicationContext'
import './Navbar.scss'

const Navbar = () => {
    const {isAdmin} = useContext(ShopContext)

    return (
        <Flex 
            boxShadow='xl' 
            p='3' 
            rounded='md' 
            bg='blue.600' 
            opacity='.95' 
            color='white'
            borderRadius='0' >
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
                {isAdmin && 
                    <Text 
                        mr='3'
                        p='2'>
                        <Link 
                            to="/products"
                            className='link'>
                            Gérer les produits
                        </Link> 
                    </Text>
                } 
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
