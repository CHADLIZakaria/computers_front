import { Badge, Box, Container, Flex, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import MyProgress from '../../components/Progress/MyProgress'
import Title from '../../components/Title/Title'
import ProductService from '../../service/ProductService'
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
                    <Container maxW='container.xl'>
                        <Flex>
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
                        </Flex>
                        <Pagination paginate={paginate} onClick={onNavigate} />
                    </Container>
                </>
            }
        </div>
    )
}

export default Home