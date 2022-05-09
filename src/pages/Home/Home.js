import { Badge, Box, Button, Flex, Grid, GridItem, Image, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import MyProgress from '../../components/Progress/MyProgress'
import ProductService from '../../service/ProductService'
import Helper from '../../utils/Helper'
import './Home.scss'

const Home = () => {
    const { isOpen, onOpen } = useDisclosure()
    const [products, setProducts] = useState([])
    const [paginate, setPaginate] = useState({page: 1})
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    
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
                        <Grid 
                            px='10'
                            mt='3'
                            columnGap='2'
                            rowGap='2'
                            templateColumns='repeat(3, 1fr)'> 
                            {products.map(product => 
                                <GridItem 
                                    maxW='sm' 
                                    borderWidth='1px' 
                                    borderRadius='lg' 
                                    w='100%'
                                    overflow='hidden'>
                                        <Box  
                                            height='300px'
                                            position='relative'>
                                            <Image 
                                                p='2' 
                                                src={`http://localhost:8080/api/uploads/${product.productImages[0].image}`} />
                                        </Box>
                                        <Box>
                                            <Text
                                                position='relative'
                                                textAlign='right'
                                                right='0'
                                                top='0'> 
                                                <Badge  
                                                    mt='3'
                                                    fontWeight='bold'
                                                    fontSize='lg' 
                                                    px='3' 
                                                    bg='gray.600'
                                                    color='white'
                                                    borderRadius='3px'
                                                    marginTop='4'
                                                    as='h3'>
                                                        {product.price} DH
                                                </Badge>
                                            </Text>
                                            <Text 
                                                mt='1'
                                                fontWeight='semibold'
                                                as='h4'
                                                cursor='pointer'
                                                px='2'
                                                color='blue.300'
                                                textDecoration='underline'
                                                onClick={() => navigate(`/products/${product.id}`)}
                                                noOfLines='2'>
                                                {Helper.extractTitle(`
                                                    ${product.brand      === '' ? 'Brand': product.brand},
                                                    ${product.ecran      === '' ? 'Ecran': product.ecran},
                                                    ${product.ram        === '' ? 'Ram': product.ram +' Mémoire'},
                                                    ${product.hdd        === '' ? 'HDD': product.hdd+ ' HDD'},
                                                    ${product.ssd        === '' ? 'SSD' : product.ssd+ ' SSD'},
                                                    ${product.processor  === '' ? 'Processeur' : product.processor},
                                                    ${product.color      === '' ? 'Couleur' : product.color}`)
                                                }
                                            </Text>
                                        </Box>
                                </GridItem>
                            )}
                        </Grid>   
                        <Box py='2'>
                            <Pagination 
                                paginate={paginate} 
                                onClick={onNavigate} />
                        </Box>     
                    </>
                }
           </Box>  
        </>
    )
}

export default Home