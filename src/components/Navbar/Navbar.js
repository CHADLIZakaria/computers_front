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
            setProducts(values.data)
        })
    }

    return (
        <Flex 
            boxShadow='xl' 
            p='3' 
            rounded='md' 
            bg='gray.600' 
            w='100%'
            color='white'
            maxH='65px'
            borderRadius='0' >
            <Center>
                <Flex gap='10' alignItems='center'>
                    <Text>
                    <Link to='/'>
                        Mehdi Computers
                    </Link>
                    </Text>
                    <Box 
                        zIndex='5'
                        position='relative'>
                        <InputGroup 
                            width='fit-content'
                            h='80%' 
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
                                focusBorderColor='transparent'
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                                />
                        </InputGroup>                          
                        {products.length !== 0 && 
                            <Box 
                                position='absolute'
                                top='85%'
                                pt='2'
                                h='50vh'
                                bg='gray.200'
                                overflowY='scroll'
                                zIndex='999'
                                w='150%'>
                                {products.map((product, index) => 
                                    <Box 
                                    key={index}
                                    borderBottom='1px' 
                                    borderColor='gray' 
                                    color='black'
                                    px='3'>
                                        <Flex
                                            alignItems='center'>
                                            <Image 
                                                boxSize='80px'
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
                        }
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
