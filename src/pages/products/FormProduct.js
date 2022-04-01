import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { BsInfoCircleFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import ImagePreview from '../../components/ImagePreview/ImagePreview'
import Title from '../../components/Title/Title'
import CategoryService from '../../service/CategoryService'
import ProductService from '../../service/ProductService'
import noPhotos from './no-photos.png'

const FormProduct = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
       
    }, [])
    
    return (
        <>
            <Title title={"Add Products"} /> 
            <div className='row'>
                <Formik 
                    initialValues={{ name: '', description: '', price: 0, category: '', 
                                    file: null, details: ''}} 
                    enableReinitialize={true}
                    validate={(values) => {
                        const errors = {}
                        if(!values.name) {
                            errors.name="Name is required"
                        }
                        return errors
                    }}
                    onSubmit={(values) => {
                        ProductService.saveProduct(values)
                        navigate('/products')
                    }}>
                        {({values, setFieldValue}) => (
                            <>
                                <Form className='px-5 col-6'>

                                    {/* Titre */}
                                    <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Titre</label>
                                        </div>
                                        <div className='col-6'>
                                            <Field type="text" name="name"  className='form-control' />
                                        </div>
                                        <div className='col-3'>
                                            <ErrorMessage component="span" className='text-danger form-text' name='name'/>
                                        </div>
                                    </div>
                                     {/* Prix */}
                                    <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Prix</label>
                                        </div>
                                        <div className='col-6'>
                                            <div class="input-group input-group">
                                                <Field type="text" name="price"  className='form-control' />
                                                <span class="input-group-text" id="inputGroup-sizing-sm">DH</span>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <ErrorMessage component="span" className='text-danger form-text' name='description'/>
                                        </div>
                                    </div>
                                     {/* Mark */}
                                    <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Mark</label>
                                        </div>
                                        <div className='col-6'>
                                            <Field as='select' name='mark' className='form-select'>
                                                <option label="Selectionnez la marque" />
                                                <option value="HP" label="HP" />  
                                            </Field>
                                        </div>
                                        <div className='col-3'>
                                            <ErrorMessage component="span" className='text-danger form-text' name='mark'/>
                                        </div>
                                    </div>
                                     {/* Image */}
                                    <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Image du produit</label>
                                        </div>
                                        <div className='col-6'>
                                            <input type="file"  className='form-control' onChange={(e) => {
                                                setFieldValue('file', e.currentTarget.files[0])
                                            }}/>
                                        </div>
                                    </div>

                                    {/* Model */}
                                    <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Model</label>
                                        </div>
                                        <div className='col-6'>
                                            <Field type="text" name="model"  className='form-control' />
                                        </div>
                                        <div className='col-3'>
                                            <ErrorMessage component="span" className='text-danger form-text' name='model'/>
                                        </div>
                                    </div>

                                    {/* Reference */}
                                    <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Réference</label>
                                        </div>
                                        <div className='col-6'>
                                            <Field type="text" name="reference"  className='form-control' />
                                        </div>
                                        <div className='col-3'>
                                            <ErrorMessage component="span" className='text-danger form-text' name='reference'/>
                                        </div>
                                    </div>

                                     {/* Processeur */}
                                     <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Processeur</label>
                                        </div>
                                        <div className='col-6'>
                                            <Field type="text" name="processeur"  className='form-control' />
                                        </div>
                                        <div className='col-3'>
                                            <ErrorMessage component="span" className='text-danger form-text' name='reference'/>
                                        </div>
                                    </div>
                                    
                                    <button className="btn btn-primary" type="submit">Enregistrer</button>
                                </Form>
                                <div className='row col-6'>
                                    <div className='col-4 product-image'>
                                        {values.file ? 
                                            <ImagePreview file={values.file} /> :
                                            <div>
                                                <img src={noPhotos} className="img-thumbnail"/>
                                            </div>
                                        }
                                    </div>
                                    <div className='col-8'>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 class="card-title product-title">{values.name==='' ?  'Undefined' : values.name}</h5>
                                                <h6 class="card-subtitle mb-2 product-description">{values.description==='' ?  'Undefined' : values.description}</h6>
                                                <p class="card-text product-price">{values.price} DH</p>
                                            </div>
                                            {values.details !== '' &&
                                                <div className='card-footer product-information'>
                                                    <p className='text-primary product-information-title'>
                                                        <BsInfoCircleFill/>
                                                        <span className='mx-3'>Information du produit</span>
                                                    </p>
                                                        <p className='product-information-data'>
                                                            {values.details}
                                                        </p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>  
                        )}
                </Formik>
            </div>
        </>
    )
}

export default FormProduct