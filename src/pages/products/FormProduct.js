import { Button, Container, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import MyInput from '../../components/MyInput/MyInput'
import MySelect from '../../components/MySelect/MySelect'
import Title from '../../components/Title/Title'
import { rams } from '../../data/data'
import ProductService from '../../service/ProductService'

const FormProduct = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const productSchema=yup.object().shape({
        model: yup.string().required("Required"),
        brand: yup.string().required("Required"),
        processor: yup.string().required("Required"),
        ram: yup.string().required("Required"),
        hdd: yup.string().required("Required"),
        ssd: yup.string().required("Required"),
        ecran: yup.string().required("Required"),
        price: yup.number().required("Required")
    })

    
    return (
        <>
            <Title title={"Ajouter Produits"} /> 
            <Container maxW='container.xl'>
                <Formik 
                    initialValues={{ 
                                    model: '',
                                    brand: '',
                                    processor: '',
                                    file: null,
                                    price: 0, 
                                    ram: '',
                                    color: '',
                                    hdd: '',
                                    ecran: '',
                                    ssd:'',
                                    systeme_exploitation: '',
                                    frequence: ''
                                }} 
                    enableReinitialize={true}
                    validationSchema={productSchema}
                    onSubmit={(values) => {
                        ProductService.saveProduct(values)
                        //navigate('/products')
                    }}>
                        {({values, setFieldValue, handleChange, errors}) => (
                            <>
                                <Form>
                                    <Flex gap='8'>
                                        <MyInput 
                                            id='model' 
                                            label='Model' 
                                            onChange={handleChange} 
                                            placeholder='e.g. HP'
                                            error={errors.model} />
                                        <MyInput 
                                            id='brand' 
                                            label='Mark' 
                                            placeholder='e.g. HP'
                                            onChange={handleChange} 
                                            error={errors.brand} />
                                    </Flex>
                                    <Flex mt='6' gap='8'>
                                        <MyInput 
                                            id='processor' 
                                            label='Processeur' 
                                            onChange={handleChange} 
                                            placeholder='e.g. Intel Core i3'
                                            error={errors.processor} />
                                        <FormControl variant='floating'>
                                            <FormLabel 
                                                htmlFor={id} 
                                                position='absolute'
                                                top='0'
                                                left='0'
                                                zIndex='2'
                                                transformOrigin='left top'
                                                transform='scale(0.85) translateY(-24px)'>
                                                    Image
                                            </FormLabel>
                                            <Input size='sm' name='file' type="file"  onChange={(e) => {
                                                setFieldValue('file', e.currentTarget.files[0])
                                            }}/>
                                        </FormControl>
                                    </Flex>
                                    <Flex mt='6' gap='8'>
                                        <MyInput 
                                            id='price' 
                                            label='Prix' 
                                            onChange={handleChange} 
                                            placeholder='e.g. 3600.50'
                                            error={errors.price} />
                                        <MySelect 
                                            id='ram' 
                                            label='Ram'
                                            data={rams} 
                                            onChange={handleChange}
                                            error={errors.ram} 
                                            />
                                    </Flex>
                                    <Flex mt='6' gap='8'>
                                        <MyInput 
                                            id='color' 
                                            label='Color' 
                                            onChange={handleChange} 
                                            placeholder='e.g. Black' />
                                        <MySelect 
                                            id='hdd' 
                                            label='Stockage HDD' 
                                            data={['128 Go' ,'512 Go', '1 To', '2 To']} 
                                            onChange={handleChange} 
                                            error={errors.hdd}
                                            />
                                    </Flex>
                                    <Flex mt='6' gap='8'>
                                        <MyInput 
                                            id='ecran' 
                                            label='Ecran' 
                                            placeholder='e.g. 15.6" Laptop'
                                            onChange={handleChange}
                                            error={errors.ecran} />
                                        <MySelect 
                                            id='ssd' 
                                            label='Stockage SSD' 
                                            data={['128 Go' ,'512 Go', '1 To', '2 To']} 
                                            onChange={handleChange} 
                                            error={errors.ssd} />
                                    </Flex>
                                    <Flex mt='6' gap='8'>
                                        <MyInput 
                                            id='systeme_expolitation' 
                                            label='Système Exploitation'
                                            placeholder='e.g. Windows' 
                                            onChange={handleChange} />
                                        <MyInput 
                                            id='frequence' 
                                            name='frequence' 
                                            label='Fréquence' 
                                            placeholder='e.g. 2.4Hz'
                                            onChange={handleChange} />
                                    </Flex>
                                    <Button colorScheme='teal' type="submit" my='4'>Ajouter</Button>
                                </Form>
                                {/* <Flex>
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
                                </Flex> */}
                                   
                              
                             
                            </>  
                        )}
                </Formik>
            </Container>
           
        </>
    )
}

export default FormProduct