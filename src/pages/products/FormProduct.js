import { Box, Button, Container, Flex, FormControl, FormLabel, Input, List, ListItem } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import ImagePreview from '../../components/ImagePreview/ImagePreview'
import MyInput from '../../components/MyInput/MyInput'
import MySelect from '../../components/MySelect/MySelect'
import Title from '../../components/Title/Title'
import ProductService from '../../service/ProductService'

const FormProduct = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const productSchema=yup.object().shape({
        title: yup.string().required("Required"),
        description: yup.string().required("Required"),
        mark: yup.string().required("Required"),
        model: yup.string().required("Required"),
        ram: yup.string().required("Required"),
        reference: yup.string().required("Required"),
        hdd: yup.string().required("Required"),
        ssd: yup.string().required("Required"),
        processeur: yup.string().required("Required"),
        ecran: yup.string().required("Required"),
        autonomie: yup.string().required("Required"),
        frequence:  yup.string().required("Required"),
    })

    useEffect(() => {
       
    }, [])
    
    return (
        <>
            <Title title={"Add Products"} /> 
            <Container maxW='container.xl'>
                <Formik 
                    initialValues={{ title: '',  
                                    price: 0, 
                                    mark: '',
                                    model: '',
                                    ram: '',
                                    reference: '',
                                    hdd: '',
                                    ssd:'',
                                    processeur: '',
                                    quantite: 1,
                                    ecran: '',
                                    systeme_exploitation: '',
                                    frequence: '',
                                    autonomie: '',
                                    file: null, }} 
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        console.log(values)
                        ProductService.saveProduct(values)
                        navigate('/products')
                    }}>
                        {({values, setFieldValue, handleChange}) => (
                            <>
                                <Form>
                                    <Flex>
                                        <MyInput id='title' label='Title' onChange={handleChange} />
                                        <MyInput id='mark' label='Mark' onChange={handleChange} />
                                    </Flex>
                                    <Flex mt='2'>
                                        <MyInput id='model' label='Model' onChange={handleChange} />
                                        <FormControl isRequired mr='5' >
                                            <FormLabel htmlFor='file' fontSize='12px'>File</FormLabel>
                                            <Input size='sm' name='file' type="file"  onChange={(e) => {
                                                    setFieldValue('file', e.currentTarget.files[0])
                                                }}/>
                                        </FormControl>
                                    </Flex>
                                    <Flex mt='2'>
                                        <MyInput id='reference' label='Référence' onChange={handleChange} />
                                        <MySelect id='ram' label='Ram' data={['2 Go' ,'4 Go', '6 Go', '8 Go',  '16 Go', '32 Go']} onChange={handleChange} />
                                    </Flex>
                                    <Flex mt='2'>
                                        <MyInput id='processeur' label='Processeur' onChange={handleChange} />
                                        <MySelect id='hdd' label='Stockage HDD' data={['128 Go' ,'512 Go', '1 To', '2 To']} onChange={handleChange} />
                                    </Flex>
                                    <Flex mt='2'>
                                        <MyInput id='price' label='Prix' onChange={handleChange} />
                                        <MySelect id='ssd' label='Stockage SSD' data={['128 Go' ,'512 Go', '1 To', '2 To']} onChange={handleChange} />
                                    
                                    </Flex>
                                    <Flex mt='2'>
                                        <MyInput id='ecran' label='Ecran' onChange={handleChange} />
                                        <MyInput id='frequence' name='frequence' label='Fréquence' onChange={handleChange} />
                                    </Flex>
                                    <Flex mt='2'>
                                        <MyInput id='quantite' name='quantite' label='Quantité' onChange={handleChange} />
                                        <MyInput id='systeme_expolitation' label='Système Exploitation' onChange={handleChange} />
                                    </Flex>
                                    <Flex mt='2' w='50%'>
                                        <MyInput id='autonomie' label='Autonomie' onChange={handleChange} />
                                    </Flex>
                                    <Button colorScheme='teal' type="submit" my='4'>Ajouter</Button>
                                </Form>
                                    <Flex>
                                        <Box p='6' boxShadow='xs'>
                                            {values.file && 
                                                <ImagePreview file={values.file} /> 
                                            }
                                        </Box>
                                        <Box p='6'>
                                           <List spacing={3}>
                                                {values.title &&  <ListItem>{values.title} </ListItem> }
                                                {values.mark &&  <ListItem>{values.mark} </ListItem> }
                                                {values.reference &&  <ListItem>{values.reference} </ListItem> }
                                                {values.ecran &&  <ListItem>{values.ecran} </ListItem> }
                                                {values.ram &&  <ListItem>{values.ram} </ListItem>  }
                                                {values.processeur && <ListItem>{values.processeur} </ListItem> }
                                                {values.hdd &&  <ListItem>{values.hdd} </ListItem>  }
                                                {values.price &&  <ListItem>{values.price} DH</ListItem>  }
                                                {values.ssd &&  <ListItem>{values.ssd} </ListItem>  }
                                                {values.frequence && <ListItem>{values.frequence} </ListItem> }
                                                {values.quantite && <ListItem>{values.quantite} </ListItem> }
                                                {values.stockage && <ListItem>{values.stockage} </ListItem> }
                                                {values.autonomie && <ListItem>{values.autonomie} </ListItem> }
                                                {values.model && <ListItem>{values.model} </ListItem> }
                                            </List>
                                        </Box>
                                    </Flex>
                                   
                              
                                {/* <div className='row col-12 my-3'>
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
                                                <h5 class="card-title product-title">{values.title==='' ?  'Undefined' : values.title}</h5>
                                                <p class="card-text product-price">{values.price} DH</p>
                                            </div>
                                            <div className='card-footer bg-white'>
                                                <p className='text-primary product-information-title'>
                                                    <BsInfoCircleFill/>
                                                    <span className='mx-3'>Information du produit</span>
                                                </p>
                                                <ul class="list-group list-group-flush">
                                                    {values.reference && <li class="list-group-item">{values.reference}</li>}
                                                    {values.ram &&  <li class="list-group-item">{values.ram}</li>}
                                                    {values.model &&  <li class="list-group-item">{values.model}</li>}
                                                    {values.details &&  <li class="list-group-item">{values.details}</li>}
                                                    {values.stockage &&  <li class="list-group-item">{values.stockage}</li> }
                                                    {values.processeur &&  <li class="list-group-item">{values.processeur}</li> }
                                                    {values.ecran &&  <li class="list-group-item">{values.ecran}</li>}
                                                    {values.autonomie &&  <li class="list-group-item">{values.autonomie}</li>}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </>  
                        )}
                </Formik>
            </Container>
           
        </>
    )
}

export default FormProduct