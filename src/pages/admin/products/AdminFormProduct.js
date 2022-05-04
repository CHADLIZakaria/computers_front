import { Badge, Box, Button, Container, Flex, FormControl, FormLabel, Input, Text, Image, Spacer } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import MyInput from '../../../components/MyInput/MyInput'
import MySelect from '../../../components/MySelect/MySelect'
import Title from '../../../components/Title/Title'
import { hdd, rams, ssd } from '../../../data/data'
import ImagePreview from '../../../components/ImagePreview/ImagePreview'
import ProductService from '../../../service/ProductService'
import Helper from '../../../utils/Helper'
import noPhoto from './no-photos.png'

const AdminFormProduct = () => {
    const {id} = useParams()
    const [imageCurrentIndex, setImageCurrentIndex] = useState(0)
    const navigate = useNavigate()
    const [product, setProduct] = useState({ 
        model: '',
        brand: '',
        processor: '',
        files: null,
        price: 0, 
        ram: '',
        color: '',
        hdd: '',
        ecran: '',
        ssd:'',
        systemeExploitation: '',
        frequence: '', 
        videoCard: ''
    })

    const productSchema=yup.object().shape({
        model: yup.string().required("Required"),
        brand: yup.string().required("Required"),
        processor: yup.string().required("Required"),
        ram: yup.string().required("Required"),
        hdd: yup.string().required("Required"),
        ssd: yup.string().required("Required"),
        ecran: yup.string().required("Required"),
        price: yup.number().required("Required").typeError('Number not valid'),
        files: yup.mixed().required("Required")
    })

    const productUpdateSchema=yup.object().shape({
        model: yup.string().required("Required"),
        brand: yup.string().required("Required"),
        processor: yup.string().required("Required"),
        ram: yup.string().required("Required"),
        hdd: yup.string().required("Required"),
        ssd: yup.string().required("Required"),
        ecran: yup.string().required("Required"),
        price: yup.number().required("Required").typeError('Not a valid number')
    })

    useEffect(() => {
        if(id) {
            ProductService.findById(id).then(values => {
                setProduct({...product, ...values.data});
            });
        }
    }, [])
    
    
    return (
        <>
            <Title title={id ? "Modifier Produit" : "Ajouter Produit"} /> 
            <Container maxW='container.xl'>
                <Formik 
                    initialValues={product} 
                    enableReinitialize={true}
                    validationSchema={id ? productUpdateSchema : productSchema}
                    onSubmit={(values) => {
                        if(id) {
                            ProductService.updateProduct(id, values)
                        }
                        else {
                            ProductService.saveProduct(values)
                        }
                        navigate('/products')
                    }}>
                        {({values, setFieldValue, handleChange, errors}) => (
                            <>
                                <Form>
                                    <Flex gap='8'>
                                        <MyInput 
                                            id='model' 
                                            label='Model' 
                                            onChange={handleChange} 
                                            placeholder='e.g. 99-xxxxxxxx'
                                            value={values.model}
                                            error={errors.model} />
                                        <MyInput 
                                            id='brand' 
                                            label='Mark' 
                                            placeholder='e.g. HP'
                                            onChange={handleChange} 
                                            value={values.brand}
                                            error={errors.brand} />
                                    </Flex>
                                    <Flex mt='6' gap='8'>
                                        <MyInput 
                                            id='processor' 
                                            label='Processeur' 
                                            onChange={handleChange} 
                                            placeholder='e.g. Intel Core i3'
                                            value={values.processor}
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
                                            <Input 
                                                size='sm' 
                                                name='files' 
                                                type='file'  
                                                multiple={true}
                                                borderColor={errors.files && 'red'}
                                                onChange={(e) => {
                                                    setFieldValue('files', e.currentTarget.files)
                                                }}/>
                                            
                                        </FormControl>
                                    </Flex>
                                    <Flex mt='6' gap='8'>
                                        <MyInput 
                                            id='price' 
                                            label='Prix' 
                                            onChange={handleChange} 
                                            placeholder='e.g. 3600.50'
                                            value={values.price}
                                            error={errors.price} />
                                        <MySelect 
                                            id='ram' 
                                            label='Ram'
                                            data={rams} 
                                            onChange={handleChange}
                                            error={errors.ram} 
                                            selected={values.ram}
                                            />
                                    </Flex>
                                    <Flex mt='6' gap='8'>
                                        <MyInput 
                                            id='color' 
                                            label='Couleur' 
                                            value={values.color}
                                            onChange={handleChange} 
                                            placeholder='e.g. Black' />
                                        <MySelect 
                                            id='hdd' 
                                            label='Stockage HDD' 
                                            data={hdd} 
                                            onChange={handleChange} 
                                            selected={values.hdd}
                                            error={errors.hdd}
                                            />
                                    </Flex>
                                    <Flex mt='6' gap='8'>
                                        <MyInput 
                                            id='ecran' 
                                            label='Ecran' 
                                            placeholder='e.g. 15.6" Laptop'
                                            value={values.ecran}
                                            onChange={handleChange}
                                            error={errors.ecran} />
                                        <MySelect 
                                            id='ssd' 
                                            label='Stockage SSD' 
                                            data={ssd} 
                                            onChange={handleChange} 
                                            selected={values.ssd}
                                            error={errors.ssd} />
                                    </Flex>
                                    <Flex mt='6' gap='8'>
                                        <MyInput 
                                            id='systemeExploitation' 
                                            label="Système d'éxploitation"
                                            placeholder='e.g. Windows' 
                                            value={values.systemeExploitation}
                                            onChange={handleChange} />
                                        <MyInput 
                                            id='frequence' 
                                            name='frequence' 
                                            label='Fréquence' 
                                            value={values.frequence}
                                            placeholder='e.g. 2.4Hz'
                                            onChange={handleChange} />
                                    </Flex>
                                    <Box mt='6' w='calc(50% - 18px)' >
                                        <MyInput 
                                            id='videoCard' 
                                            label='Card Vidéo'
                                            placeholder='e.g. NVIDIA GeForce RTX 3060' 
                                            value={values.videoCard}
                                            onChange={handleChange} />
                                       
                                    </Box>
                                    <Button 
                                        colorScheme='teal' 
                                        type="submit" 
                                        my='4'>Ajouter</Button>
                                </Form>
                                
                                {/* Product View  */}
                                <Flex gap='10'>
                                    <Box>
                                        <Box  
                                            w='50%'
                                            margin='auto'
                                        >
                                            { values.files ? 
                                                <ImagePreview file={values.files[imageCurrentIndex]} />
                                                :
                                                <Image src={noPhoto} />
                                                }
                                        </Box>
                                        <Flex 
                                            my='2'
                                            columnGap='2' 
                                            justifyContent='center'>
                                                {values.files && 
                                                    Array.from(Array(values.files.length).keys()).map(index => 
                                                        <Box 
                                                            cursor='pointer'
                                                            border='1px' 
                                                            borderColor={imageCurrentIndex===index ? 'black' : 'gray.200'}
                                                            w='80px' 
                                                            h='80px'
                                                            display='flex'
                                                            alignItems='center'
                                                            p='1'
                                                            onClick={() => setImageCurrentIndex(index)}>      
                                                                <ImagePreview file={values.files[index]} />
                                                        </Box>
                                                    )}
                                        </Flex>
                                    </Box>
                                    <Box 
                                        margin='auto'
                                        w='50%'
                                        px='2'
                                        mt='5'>
                                        <Text 
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            noOfLines='3'>
                                            {Helper.extractTitle(`
                                                ${values.brand      === '' ? 'Mark': values.brand},
                                                ${values.ecran      === '' ? 'Ecran': values.ecran},
                                                ${values.ram        === '' ? 'Ram': values.ram},
                                                ${values.hdd        === '' ? 'HDD': values.hdd},
                                                ${values.ssd        === '' ? 'SSD' : values.ssd},
                                                ${values.processor  === '' ? 'Processeur' : values.processor},
                                                ${values.color      === '' ? 'Couleur' : values.color}`)
                                            }
                                        </Text>
                                        <Text
                                            mt='5'
                                            fontSize='2xl'
                                            color='gray.600'
                                            fontWeight='bold'>
                                            {values.price} DH
                                        </Text> 
                                    </Box>
                                </Flex>
                            </>  
                        )}
                </Formik>
            </Container>
        </>
    )
}

export default AdminFormProduct