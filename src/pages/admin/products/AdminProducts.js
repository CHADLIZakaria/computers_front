import { Box, Container, Flex, IconButton, Input, InputGroup, InputRightElement, Spacer, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import DataNotFound from '../../../components/DataNotFound/DataNotFound'
import Pagination from '../../../components/Pagination/Pagination'
import MyProgress from '../../../components/Progress/MyProgress'
import Title from '../../../components/Title/Title'
import ProductService from '../../../service/ProductService'

const AdminProducts = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [paginate, setPaginate] = useState({page: 1})
    const navigate = useNavigate()

    useEffect(() => {
        ProductService.findAll(paginate.page).then(value => 
            {   setProducts(value.data.results)
                setPaginate({...paginate, totalElements: value.data.totalElements, totalPages: value.data.totalPages})
                setIsLoading(false)
            })
    }, [isLoading, paginate.page])

    const onNavigate = (page) => {
        setPaginate({...paginate, page: page})
    }

    const deleteProduct = (id) => {
        ProductService.deleteById(id).then(() => setProducts(products.filter(product => product.id != id)))
    }
    
    return (
        <Container maxW='container.xl'> 
            <Title title={"Products"}/>
            <Flex>
                <InputGroup width='fit-content'> 
                    <InputRightElement
                        pointerEvents='none'
                        children={<AiOutlineSearch />}
                        />
                    <Input type='tel' placeholder='Search' />
                </InputGroup>
                <Spacer />
                <IconButton icon={<AiOutlinePlus />} colorScheme='green' onClick={() => navigate('/products/save')} />        
            </Flex>
            {   isLoading ?
                    <MyProgress /> : 
                    products.length !== 0 ?
                    <Box>
                        <TableContainer my='5' border='1px' borderColor='gray.200'>
                            <Table variant='striped' colorScheme='blue'>
                                <Thead>
                                    <Tr>
                                        <Th>#ID</Th>
                                        <Th>Model</Th>
                                        <Th>Brand</Th>
                                        <Th>Processeur</Th>
                                        <Th>Ecran</Th>
                                        <Th>Video Card</Th>
                                        <Th>HDD</Th>
                                        <Th>SSD</Th>
                                        <Th>Ram</Th>
                                        <Th>Prix</Th>
                                        <Th>Couleur</Th>
                                        <Th>Controll</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {products.map((product, index) => 
                                        <Tr key="index">
                                            <Td>
                                                {index+1}
                                            </Td>
                                            <Td>
                                                {product.model}
                                            </Td>
                                            <Td>
                                                {product.brand}
                                            </Td>
                                            <Td>
                                                {product.processor}
                                            </Td>
                                            <Td>
                                                {product.ecran}
                                            </Td>
                                            <Td>
                                                {product.videoCard}
                                            </Td>
                                            <Td>
                                                {product.hdd}
                                            </Td>
                                            <Td>
                                                {product.ssd}
                                            </Td>
                                            <Td>
                                                {product.ram}
                                            </Td>
                                            <Td>
                                                {product.price} DH
                                            </Td>
                                            <Td>
                                                {product.color}
                                            </Td>
                                            <Td>
                                                <IconButton 
                                                    icon={<AiOutlineEdit />} 
                                                    colorScheme='blue' 
                                                    mr='1' 
                                                    onClick={() => navigate(`/product/edit/${product.id}`)} />
                                                <IconButton 
                                                    icon={<AiOutlineDelete />} 
                                                    colorScheme='red' 
                                                    onClick={() => deleteProduct(product.id)} />
                                            </Td>
                                        </Tr>    
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer> 
                        <Box py='2'>
                            <Pagination 
                                paginate={paginate} 
                                onClick={onNavigate} />
                        </Box>  
                    </Box>

                    
                    : 
                    <DataNotFound />
            }
        </Container>
    )
}

export default AdminProducts