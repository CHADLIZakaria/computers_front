import { Box, Button, Collapse, Container, Flex, Image, SlideFade, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import MyProgress from '../../components/Progress/MyProgress'
import Title from '../../components/Title/Title'
import ProductService from '../../service/ProductService'
import './Home.scss'
import laptop from './laptop.jpg'

const Home = () => {
    const { isOpen, onOpen } = useDisclosure()
    const [products, setProducts] = useState([])
    const [paginate, setPaginate] = useState({page: 1})
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()
    
    useEffect(() => {
        ProductService.findAll(paginate.page).then(value => {
            setProducts(value.data.results)
            setPaginate({...paginate, totalElements: value.data.totalElements, totalPages: value.data.totalPages})
            setIsLoading(false)

        })
    }, [paginate.page, location.pathname])

    const onNavigate = (page) => {
        setPaginate({...paginate, page: page})
    }
    
    return (
        <>
            <Box>
                <Box className='home-overlay' pos='absolute' top='0' w='100%' h={`80vh`} zIndex='-1'>
                </Box>
                <Box  h={`calc(80vh - 66px)`} bg='grey.700' w='100%' pos="relative">
                    <Box 
                        pos='absolute' 
                        color='white' 
                        top='50%' 
                        left='50%' 
                        textAlign='center'
                        transform='translate(-50%, -50%);'>
                        <Flex 
                            direction='column'
                            alignItems='center'
                            gap='3'>
                            <Text 
                                fontSize='4xl'>
                                Bienvenu dans notre espace
                            </Text>
                            <Button 
                                w='fit-content'  
                                colorScheme='white' 
                                variant='outline'
                                onClick={onOpen} >
                                Voir pc
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            </Box>
            <Box>
                {isLoading ? 
                    <MyProgress />
                    :
                    <>
                        <Container maxW='content'>
                            <Flex> 
                                {products.map(product => 
                                    <Box 
                                        maxW='sm' 
                                        borderWidth='1px' 
                                        borderRadius='lg' 
                                        m='5'
                                        overflow='hidden'>
                                            <Image p='4' src={`http://localhost:8080/api/uploads/${product.image}`} />
                                            <Box p='4'>
                                                <Text 
                                                    mt='1'
                                                    fontWeight='semibold'
                                                    as='h4'
                                                    noOfLines='2'>
                                                    {product.brand+' '}  
                                                    - {product.ecran+' '}  
                                                    - {product.ram} Memory   
                                                    - {product.hdd+' HDD '}
                                                    - {product.ssd+' SSD '}  
                                                    - {product.processor+' '} 
                                                    - {product.color+' '}
                                                </Text>
                                                <Box>
                                                    <Text  
                                                        mt='1'
                                                        fontWeight='bold'
                                                        as='h3'>
                                                        {product.price} DH
                                                    </Text>
                                                </Box>
                                            </Box>
                                    </Box>
                                )}
                            </Flex>        
                            <Pagination paginate={paginate} onClick={onNavigate} />
                        </Container>
                    </>
                }
           </Box>  
        </>
    )
}

export default Home