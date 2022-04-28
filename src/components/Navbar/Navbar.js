import { Box, Center, Flex, Image, Input, InputGroup, InputRightElement, Spacer, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../ApplicationContext'
import ProductService from '../../service/ProductService'
import './Navbar.scss'

const Navbar = () => {
    const {isAdmin} = useContext(ShopContext)
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
       searchProducts()
    }, [search])
    const searchProducts=() => {
        if(search == '') {
            setProducts([])
            return;
        }
        ProductService.searchProducts(search).then(values => {
            setProducts(values.data.results)
        })
    }

    return (
        <Flex 
            boxShadow='xl' 
            p='3' 
            rounded='md' 
            bg='gray.600' 
            opacity='.9' 
            color='white'
            borderRadius='0' >
            <Center>
                <Flex gap='10' alignItems='center'>
                    <Text>
                    <Link to='/'>
                        Mehdi Computers
                    </Link>
                    </Text>
                    <Box position='relative'>
                        <InputGroup 
                            width='fit-content' 
                            border='1px' 
                            borderColor='gray.200' 
                            color='gray.600'
                            bg='gray.200'
                            borderRadius='6px'
                             > 
                            <InputRightElement
                                pointerEvents='none'
                                children={<AiOutlineSearch  color='gray'/>
                            }
                            />
                            <Input 
                                type='text' 
                                placeholder='Rechercher'
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                   
                                }}
                                />
                        </InputGroup>    
                        <Box 
                            bg='gray.200'
                            position='absolute' 
                            top='85%'
                            w='100%'>
                            {products.map(product => 
                                <Box 
                                border='1' 
                                borderColor='red' 
                                color='black'
                                py='3'>
                                    <Flex>
                                        <Image 
                                            boxSize='100px'
                                            p='4' 
                                            src={`http://localhost:8080/api/uploads/${product.image}`} />
                                        <Text 
                                            fontSize='xs'>
                                            {product.brand+' '}  
                                            - {product.ecran+' '}  
                                            - {product.ram} Memory   
                                            - {product.hdd+' HDD '}
                                            - {product.ssd+' SSD '}  
                                            - {product.processor+' '} 
                                            - {product.color+' '}
                                        </Text>
                                    </Flex>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Flex>
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
