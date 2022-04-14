import { Badge, Box, Container, Flex, Image, Spacer, Text, typography } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import MyProgress from '../../components/Progress/MyProgress'
import Title from '../../components/Title/Title'
import ProductService from '../../service/ProductService'
import laptop from './laptop.jpg'

const Home = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [paginate, setPaginate] = useState({page: 1})
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()
    
    useEffect(() => {
        ProductService.findAll(paginate.page).then(value => {
            setProducts(value.data.results)
            setPaginate({...paginate, totalElements: value.data.totalElements, totalPages: value.data.totalPages})
            setIsLoading(false)
            console.log(value)
        })
    }, [paginate.page, location.pathname])

    const onNavigate = (page) => {
        setPaginate({...paginate, page: page})
    }
    
    return (
        <div className='container'>
            <Title title='Mehdi Computers' />
            {isLoading ? 
                <MyProgress />
                :
                <>
                    <Container maxW='container.xl' p='0'>
                        <ProductHome />
                        {/* <Flex>
                            {products.map(product => 
                                <Box 
                                    maxW='sm' 
                                    borderWidth='1px' 
                                    borderRadius='lg' 
                                    overflow='hidden'
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                <Image src={`http://localhost:8080/api/uploads/${product.image}`} />
                                <Box p='6'>
                                <Box
                                    mt='1'
                                    fontWeight='semibold'
                                    as='h4'
                                    lineHeight='tight'
                                    isTruncated
                                >
                                    {product.title}
                                </Box>
                                <Box>
                                    {product.price} DH
                                </Box>
                                </Box>
                                </Box>
                            )}
                        </Flex> */}
                        <Pagination paginate={paginate} onClick={onNavigate} />
                    </Container>
                </>
            }
        </div>
    )
}

const ProductHome = () => {
    return (
        <Box borderBottom='1px' borderColor='gray.200' p='30px'>
            <Flex>
                <Box  w='50%'>
                    <Image src={laptop}/>
                </Box>
                <Box w='100%'>
                    <Text color='blue.400'>
                        <Link to='/'>
                            HP - 17.3" Laptop - Intel Core i3 - 8GB Memory - 256GB SSD - Natural Silver
                        </Link>
                    </Text>
                    <Flex mt="10px">
                        <Text mr='100px'>Model: 17-by4013dx</Text>
                        <Text>SKU: 6477887</Text>
                    </Flex>
                </Box>
                <Box w='50%'>
                    <Text fontSize='3xl' fontWeight='bold'>3509.59 DH</Text>
                </Box>
            </Flex>
        </Box>
    );
}
export default Home