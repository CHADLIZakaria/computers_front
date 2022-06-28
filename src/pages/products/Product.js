import { Box, Container, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductService from '../../service/ProductService'
import MyProgress from '../../components/Progress/MyProgress'
import Helper from '../../utils/Helper'
import Carousel from '../../components/Carousel/Carousel'

const Product = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [products, setProducts] = useState([])
    
    const [isLoading, setIsLoading] = useState(true)
    const [imageCurrentIndex, setImageCurrentIndex] = useState(0)
    useEffect(() => {
        ProductService.findById(id).then(value => {
            setProduct(value.data)
            setIsLoading(false)
        })
        ProductService.findAllExceptId(id).then(value => {
            setProducts(value.data)
        })
    }, [isLoading])
    
  return ( 
        <Container maxW='container.xl' mt='5'> 
        { isLoading ? 
            <MyProgress /> : 
            <>
                <Flex gap='10'>
                    <Box flex='2'>
                        <Box  
                            h='300px'
                            w='50%'
                            display='flex'
                            alignItems='center'
                            margin='auto'>
                                <Image 
                                    src={`http://localhost:8080/api/uploads/${product.productImages[imageCurrentIndex].image}`} 
                                    w='100%'
                                    maxH='100%'
                                />
                        </Box>
                        <Flex 
                            my='5'
                            columnGap='2' 
                            justifyContent='center'>
                            {product.productImages.map((productImage, index) => 
                                <Box 
                                    cursor='pointer'
                                    border='1px' 
                                    borderColor={imageCurrentIndex===index ? 'black' : 'gray.200'}
                                    w='80px' 
                                    h='80px'
                                    display='flex'
                                    alignItems='center'
                                    p='1'
                                    onClick={() => setImageCurrentIndex(index)}
                                    >
                                    <Image src={`http://localhost:8080/api/uploads/${productImage.image}`} />
                                </Box>    
                            )}
                        </Flex>
                    </Box>
                    <Box flex='1'
                        mt='5'>
                        <Text 
                            mt='1'
                            fontWeight='semibold'
                            as='h4' 
                            px='2'
                            noOfLines='3'>
                            {Helper.extractTitle(`
                                ${product.brand      === '' ? 'Brand': product.brand},
                                ${product.ecran      === '' ? 'Ecran': product.ecran},
                                ${product.ram        === '' ? 'Ram': product.ram},
                                ${product.hdd        === '' ? 'HDD': product.hdd},
                                ${product.ssd        === '' ? 'SSD' : product.ssd},
                                ${product.processor  === '' ? 'Processeur' : product.processor},
                                ${product.color      === '' ? 'Couleur' : product.color}`)
                            }
                        </Text>
                        <Text
                            mt='5'
                            fontSize='2xl'
                            color='gray.600'
                            fontWeight='bold'>
                            {product.price} DH
                        </Text> 
                    </Box>
                </Flex>
                <Carousel data={products} />
            </>
            
        }
        </Container>
   
  )
}

export default Product