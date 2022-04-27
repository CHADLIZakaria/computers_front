import { Container, Flex, IconButton, Input, InputGroup, InputRightElement, Spacer, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import DataNotFound from '../../components/DataNotFound/DataNotFound'
import MyProgress from '../../components/Progress/MyProgress'
import Title from '../../components/Title/Title'
import ProductService from '../../service/ProductService'

const Products = () => {
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
    }, [isLoading])

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
                    <TableContainer my='5' border='1px' borderColor='gray.200'>
                        <Table variant='striped' colorScheme='blue'>
                            <Thead>
                                <Tr>
                                    <Th>#ID</Th>
                                    <Th>Ram</Th>
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
                                                {product.ram}
                                            </Td>
                                        <Td>
                                            <IconButton 
                                                icon={<AiOutlineEdit />} 
                                                colorScheme='blue' 
                                                mr='1' 
                                                onClick={() => navigate(`/product//edit`)}></IconButton>
                                            <IconButton 
                                                icon={<AiOutlineDelete />} 
                                                colorScheme='red' 
                                                onClick={() => deleteProduct(product.id)} />
                                        </Td>
                                    </Tr>    
                                )}
                                
                            {/* {data.map(ligne => 
                                    <Tr>
                                        {Object.values(ligne).map(column => 
                                                <Td width='100px'>
                                                    {typeof(column)!=='object' ?
                                                        column !== null &&   (/(.png|jpg|jpeg|gif|tiff)$/i).test(column) ? 
                                                            <img src={`http://localhost:8080/api/uploads/${column}`}/> : 
                                                            column:
                                                        column === null ? "": column.name
                                                    }
                                                </Td>)}
                                        <Td>
                                            <IconButton icon={<AiOutlineEdit />} colorScheme='blue' mr='1' onClick={() => navigate(`/product/${Object.values(ligne)[0]}/edit`)}></IconButton>
                                            <IconButton icon={<AiOutlineDelete />} colorScheme='red' onClick={() => onDelete(Object.values(ligne)[0])}></IconButton>
                                        </Td>
                                    </Tr>
                                )} */}
                            </Tbody>
                        </Table>
                        </TableContainer> 
                        : 
                        <DataNotFound />
            }
        </Container>
        // <div>
        //     <Title title={"Products"}/>
        //     <div className='d-flex justify-content-between align-items-center my-4'>
        //         <div className="form-group position-relative">
        //             <Formik
        //                 initialValues={{keyword: ''}}
        //                 enableReinitialize={true}
        //                 onSubmit={(value) => {
        //                     //CategoryService.searchCategories(value.keyword).then(value => setCategories(value.data))
        //                 }}
        //             >
        //                 <Form>
        //                     <Field type="text" className="form-control" placeholder="Search" name="keyword" />
        //                     <button  type="submit" className='btn position-absolute top-50 end-0  translate-middle-y'>
        //                         <AiOutlineSearch  />
        //                     </button>
        //                 </Form>
        //             </Formik>
        //             <Button colorScheme='teal' size='xs'>
        //                 Button
        //             </Button>
        //         </div>
        //         <Link to="/products/save" className='btn btn-primary d-flex align-items-center'>
        //             Add
        //             <AiOutlinePlus />
        //         </Link>
        //     </div>
        //     { 
        //         isLoading ?
        //             <Progress />
        //             : 
        //             products.length !== 0 ?
        //                 <Table data={products} onDelete={deleteProduct}/>
        //                 :
        //                 <DataNotFound />    
        //     }  
        // </div>
    )
}

export default Products