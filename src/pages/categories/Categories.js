import React, { useContext, useEffect, useState } from 'react'
import CategoryService from '../../service/CategoryService'
import {Link, Navigate} from 'react-router-dom'
import Title from '../../components/Title/Title'
import Table from '../../components/Table/Table'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import DataNotFound from '../../components/DataNotFound/DataNotFound'
import { ShopContext } from '../../ApplicationContext'
import Progress from '../../components/Progress/Porgress'
import { Field, Form, Formik } from 'formik'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [navCategories, setNavCategories] = useContext(ShopContext)
    
    
    useEffect(() => {
        CategoryService.findAllCategories().then(value => {
            setCategories(value)
            setNavCategories(value)
            setIsLoading(false)
        })
    }, [isLoading])

    const deleteCategeory = (id) => {
        CategoryService.deleteCategoryById(id)
            .then(() => 
                setCategories(categories.filter(category => category.id != id)))
            .then(() => 
                CategoryService.findAllCategories().then(value => setNavCategories(value))
            )
    }


    
    return (
        <div>
            <Title title={"Categories"}/>
            <div className='d-flex justify-content-between align-items-center my-4'>
                <div className="form-group position-relative">
                    <Formik 
                        initialValues={{keyword: ''}}
                        enableReinitialize={true}
                        onSubmit={(value) => {
                            CategoryService.searchCategories(value.keyword).then(value => setCategories(value.data))
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
                <Link to="/category/save" className='btn btn-primary d-flex align-items-center'>
                    Add
                    <AiOutlinePlus />
                </Link>
            </div>
            { 
                isLoading ?
                    <Progress />
                    : 
                    categories.length !== 0 ?
                        <Table data={categories} onDelete={deleteCategeory} /> :
                        <DataNotFound />    
            } 
        </div>
    )
}

export default Categories