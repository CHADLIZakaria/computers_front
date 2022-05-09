// import { Box, Container, Flex, Image, ListItem, UnorderedList } from '@chakra-ui/react'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import Carousel from '../../components/Carousel/Carousel'
// import MyProgress from '../../components/Progress/MyProgress'
// import ProductService from '../../service/ProductService'

// const Product = () => {

//     const [product, setProduct] = useState({})
//     const [products, setProducts] = useState([])
//     const [isLoading, setIsLoading] = useState(true)
//     const {id} = useParams()

//     useEffect(() => {
//         window.scrollTo(0, 0)
//         ProductService.findById(id).then(value => {
//             setProduct(value.data)
//         })
//         ProductService.findAll(1).then(value => 
//             setProducts(value.data.results))
//         setIsLoading(false)
//     }, [isLoading, id])
    

//   return (
//     <>
//         { isLoading ? 
//             <MyProgress />
//             :
//             <Container maxW='container.xl'>
//                 <Flex my='5'>
//                     <Box 
//                         maxW='sm' 
//                         borderWidth='1px' 
//                         borderRadius='lg' 
//                         overflow='hidden'>
//                         <Image src={`http://localhost:8080/api/uploads/${product.image}`} />
//                     </Box>
//                     <Box p='6'>
//                         <Box
//                             mt='1'
//                             fontWeight='semibold'
//                             as='h4'
//                             lineHeight='tight'
//                             isTruncated>
//                             {product.title}
//                         </Box>
//                         <Box>
//                             {product.price} DH
//                         </Box>
//                         <Box>
//                             <UnorderedList>
//                                 <ListItem>{product.mark}</ListItem>
//                                 <ListItem>{product.model}</ListItem>
//                                 <ListItem>{product.quantite}</ListItem>
//                                 <ListItem>{product.hdd}</ListItem>
//                                 <ListItem>{product.sdd}</ListItem>
//                                 <ListItem>{product.processeur}</ListItem>
//                                 <ListItem>{product.frequence}</ListItem>
//                                 <ListItem>{product.autonomie}</ListItem>

//                             </UnorderedList>
//                         </Box>
//                     </Box>
//                 </Flex>
//                 {/* <div className='row mt-5 product mb-5'>
//                     <div className='col-6 product-image'>
//                         <img src={`http://localhost:8080/api/uploads/${product.image}`} className="img-thumbnail" />
//                     </div>
//                     <div className='col-6'>
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title product-title">{product.title}</h5>
//                                 <h6 className="card-subtitle mb-2 product-description">{product.description}</h6>
//                                 <p className="card-text product-price">{product.price} DH</p>
//                             </div>
//                             <div className='card-footer product-information'>
//                                 <p className='text-primary product-information-title'>
//                                     <BsInfoCircleFill/>
//                                     <span className='mx-3'>Information du produit</span>
//                                 </p>
//                                 <ul class="list-group list-group-flush">
//                                     {product.reference && <li class="list-group-item">{product.reference}</li>}
//                                     {product.ram &&  <li class="list-group-item">{product.ram}</li>}
//                                     {product.model &&  <li class="list-group-item">{product.model}</li>}
//                                     {product.details &&  <li class="list-group-item">{product.details}</li>}
//                                     {product.stockage &&  <li class="list-group-item">{product.stockage}</li> }
//                                     {product.processeur &&  <li class="list-group-item">{product.processeur}</li> }
//                                     {product.ecran &&  <li class="list-group-item">{product.ecran}</li>}
//                                     {product.autonomie &&  <li class="list-group-item">{product.autonomie}</li>}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div> */}
//                 <Carousel data={products} />
//             </Container>

//         }
        
//     </>
//   )
// }

// export default Product

import { Box, Container, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductService from '../../service/ProductService'
import MyProgress from '../../components/Progress/MyProgress'
import Helper from '../../utils/Helper'

const Product = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [imageCurrentIndex, setImageCurrentIndex] = useState(0)
    useEffect(() => {
        ProductService.findById(id).then(value => {
            setProduct(value.data)
            setIsLoading(false)
            console.log(product)
        })
    }, [isLoading])
    
  return ( 
        <Container maxW='container.xl' mt='5'> 
        { isLoading ? 
            <MyProgress /> : 
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
        }
        </Container>
   
  )
}

export default Product