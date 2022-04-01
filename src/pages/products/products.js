import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import DataNotFound from '../../components/DataNotFound/DataNotFound'
import Table from '../../components/Table/Table'
import Title from '../../components/Title/Title'
import ProductService from '../../service/ProductService'
import Progress from '../../components/Progress/Porgress'
import Pagination from '../../components/Pagination/Pagination'

const Products = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [paginate, setPaginate] = useState({page: 1})

    useEffect(() => {
        ProductService.findAll(paginate.page).then(value => 
            {
                setProducts(value.data.results)
                setPaginate({...paginate, totalElements: value.data.totalElements, totalPages: value.data.totalPages})
                setIsLoading(false)
            })
    }, [isLoading])

    // const deleteCategeory = (id) => {
    //     CategoryService.deleteCategoryById(id).then(() => setCategories(categories.filter(category => category.id != id)))
    // }
    
    return (
        <div>
            <Title title={"Products"}/>
            <div className='d-flex justify-content-between align-items-center my-4'>
                <div className="form-group position-relative">
                    <Formik
                        initialValues={{keyword: ''}}
                        enableReinitialize={true}
                        onSubmit={(value) => {
                            //CategoryService.searchCategories(value.keyword).then(value => setCategories(value.data))
                        }}
                    >
                        <Form>
                            <Field type="text" className="form-control" placeholder="Search" name="keyword" />
                            <button  type="submit" className='btn position-absolute top-50 end-0  translate-middle-y'>
                                <AiOutlineSearch  />
                            </button>
                        </Form>
                    </Formik>
                </div>
                <Link to="/products/save" className='btn btn-primary d-flex align-items-center'>
                    Add
                    <AiOutlinePlus />
                </Link>
            </div>
            { 
                isLoading ?
                    <Progress />
                    : 
                    products.length !== 0 ?
                        <Table data={products} />
                        :
                        <DataNotFound />    
            }  
        </div>
    )
}

export default Products