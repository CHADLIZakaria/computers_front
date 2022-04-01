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

                                     {/* Ram */}
                                     <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Ram</label>
                                        </div>
                                        <div className='col-6'>
                                            <Field as='select' name='mark' className='form-select'>
                                                <option label="RAM" />
                                                <option value="2Go" label="2Go" />  
                                                <option value="4Go" label="4Go" />  
                                                <option value="6Go" label="6Go" />  
                                                <option value="8Go" label="8Go" />  
                                                <option value="16Go" label="16Go" />
                                                <option value="32Go" label="32Go" />  
                                            </Field>
                                        </div>
                                        <div className='col-3'>
                                            <ErrorMessage component="span" className='text-danger form-text' name='reference'/>
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

                                    {/* Stockage */}
                                     <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Stockage</label>
                                        </div>
                                        <div className='col-6'>
                                            <Field as='select' name='stockage' className='form-select'>
                                                <option label="Stockage" />
                                                <option value="128 Go" label="128Go" />  
                                                <option value="512 Go" label="512Go" />  
                                                <option value="1 To" label="1To" />  
                                                <option value="2 To" label="2To" />   
                                            </Field>
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

                                    {/* Qauntite */}
                                    <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Quantité</label>
                                        </div>
                                        <div className='col-6'>
                                            <Field as='select' name='quantite' className='form-select'>
                                                <option label="Quantité" />
                                                {[...Array(10).keys()].map(element => (
                                                     <option value={element+1} label={element+1} />  
                                                ))}
                                               
                                            </Field>
                                        </div>
                                        <div className='col-3'>
                                            <ErrorMessage component="span" className='text-danger form-text' name='reference'/>
                                        </div>
                                    </div>

                                    {/* Ecran */}
                                    <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Ecran</label>
                                        </div>
                                        <div className='col-6'>
                                            <Field type="text" name="ecran"  className='form-control' />
                                        </div>
                                        <div className='col-3'>
                                            <ErrorMessage component="span" className='text-danger form-text' name='ecran'/>
                                        </div>
                                    </div>

                                    {/* Fréquence */}
                                    <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Fréquence</label>
                                        </div>
                                        <div className='col-6'>
                                            <Field type="text" name="frequence"  className='form-control' />
                                        </div>
                                        <div className='col-3'>
                                            <ErrorMessage component="span" className='text-danger form-text' name='frequence'/>
                                        </div>
                                    </div>

                                    {/* Système d'exploitation */}
                                    <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Système d’exploitation</label>
                                        </div>
                                        <div className='col-6'>
                                            <Field type="text" name="frequence"  className='form-control' />
                                        </div>
                                        <div className='col-3'>
                                            <ErrorMessage component="span" className='text-danger form-text' name='frequence'/>
                                        </div>
                                    </div>

                                    {/* Autonomie */}
                                    <div className='row mb-2 g-3 align-items-center'>
                                        <div className='col-3'>
                                            <label className='col-form-label'>Autonomie</label>
                                        </div>
                                        <div className='col-6'>
                                            <Field type="text" name="frequence"  className='form-control' />
                                        </div>
                                        <div className='col-3'>
                                            <ErrorMessage component="span" className='text-danger form-text' name='frequence'/>
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