import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Title from '../../components/Title/Title'
import CategoryService from '../../service/CategoryService'
import {useContext} from 'react'
import { ShopContext } from '../../ApplicationContext'
import ImagePreview from '../../components/ImagePreview/ImagePreview'

const FormCategory = () => {
    const {id} = useParams()
    const [category, setCategory] = useState({name: '', file: {}})
    const [navCategories, setNavCategories] = useContext(ShopContext)
    
    
    const navigate = useNavigate()
    useEffect(() => {
        if(id !== undefined) {
            CategoryService.findCategoryById(id).then(value => setCategory(value.data)) 
        }
    }, [])
    
    return (
        <>
            <Title title={id !== undefined ? "Update Category" : "Save Category"} />
            <Formik 
                initialValues={{ name: category.name, file: {}}} 
                enableReinitialize={true}
                validate={(values) => {
                    const errors = {}
                    if(!values.name) {
                        errors.name="Name is required"
                    }
                    return errors
                }}
                onSubmit={(values) => {
                    CategoryService.saveCategory(values)
                    CategoryService.findAllCategories().then(value => setNavCategories(value))
                    navigate('/categories')
                }}>
                    {({values, setFieldValue}) => (
                        <Form className='px-5'>
                            <div className='row mb-2 g-3 align-items-center'>
                                <div className='col-3'>
                                    <label className='col-form-label'>Name</label>
                                </div>
                                <div className='col-6'>
                                    <Field type="text" name="name"  className='form-control' />
                                </div>
                                <div className='col-3'>
                                    <ErrorMessage component="span" className='text-danger form-text' name='name'/>
                                </div>
                            </div>
                            <div className='row mb-2 g-3 align-items-center'>
                                <div className='col-3'>
                                    <label className='col-form-label'>File</label>
                                </div>
                                <div className='col-6'>
                                    <input type="file" name="file"  className='form-control' onChange={(e) => {
                                        setFieldValue('file', e.currentTarget.files[0])
                                    }}/>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">{id !== undefined ? "Update" : "Save"}</button>
                        </Form>
                    )}
            </Formik>
        </>
    )
}

export default FormCategory