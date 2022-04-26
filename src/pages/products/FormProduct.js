import { Box, Button, Container, Flex, FormControl, FormLabel, IconButton, Input, List, ListItem } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import ImagePreview from '../../components/ImagePreview/ImagePreview'
import MyInput from '../../components/MyInput/MyInput'
import MySelect from '../../components/MySelect/MySelect'
import Title from '../../components/Title/Title'
import ProductService from '../../service/ProductService'
import RamsService from '../../service/RamsService'
import { FiSettings } from "react-icons/fi";

const FormProduct = () => {
    const {id} = useParams()
    const [rams, setRams] = useState([])
    const [isLoading, setIsLoading] = useState(true)
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
        RamsService.findAll().then(data => {
            setRams(data.data);
            setIsLoading(false)
        })
    }, [isLoading])
    
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
                    validationSchema={productSchema}
                    onSubmit={(values) => {
                        ProductService.saveProduct(values)
                        navigate('/products')
                    }}>
                        {({values, setFieldValue, handleChange, errors}) => (
                            <>
                                {!isLoading && 
                                     <Form>
                                        <Flex gap='8'>
                                            <MyInput id='model' label='Model' onChange={handleChange} error={errors.model} />
                                            <MyInput id='mark' label='Mark' onChange={handleChange} error={errors.mark} />
                                        </Flex>
                                        <Flex mt='6' gap='8'>
                                            <MyInput id='reference' label='Référence' onChange={handleChange} />
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
                                            <Flex flex='1'>
                                                <MyInput id='processeur' label='Processeur' onChange={handleChange} />
                                            </Flex>
                                            <Flex flex='1' alignItems='end'>
                                                <MySelect 
                                                    id='ram' 
                                                    label='Ram'
                                                    keys={rams.map(ram => ram.id)} 
                                                    values={rams.map(ram => ram.ram)} 
                                                    onChange={handleChange} />
                                                <IconButton 
                                                size='sm'
                                                    icon={<FiSettings />}
                                                    onClick={() => {
                                                       
                                                    } 
                                                }
                                                />
                                            </Flex>
                                            
                                        </Flex>
                                        <Flex mt='6' gap='8'>
                                            <MyInput id='price' label='Prix' onChange={handleChange} />
                                            <MySelect 
                                                id='hdd' 
                                                label='Stockage HDD' 
                                                keys={['128 Go' ,'512 Go', '1 To', '2 To']} 
                                                values={['128 Go' ,'512 Go', '1 To', '2 To']} 
                                                onChange={handleChange} />
                                        </Flex>
                                        <Flex mt='6' gap='8'>
                                            <MyInput 
                                                id='ecran' 
                                                label='Ecran' 
                                                onChange={handleChange} />
                                            <MySelect 
                                                id='ssd' 
                                                label='Stockage SSD' 
                                                keys={['128 Go' ,'512 Go', '1 To', '2 To']} 
                                                values={['128 Go' ,'512 Go', '1 To', '2 To']} 
                                                onChange={handleChange} />
                                        
                                        </Flex>
                                        <Flex mt='6' gap='8'>
                                            <MyInput id='systeme_expolitation' label='Système Exploitation' onChange={handleChange} />
                                            <MyInput 
                                                id='frequence' 
                                                name='frequence' 
                                                label='Fréquence' 
                                                onChange={handleChange} />
                                        </Flex>
                                        <Flex mt='6' gap='8' w='50%'>
                                            <MyInput 
                                                id='autonomie' 
                                                label='Autonomie' 
                                                onChange={handleChange} />
                                        </Flex>
                                        <Button colorScheme='teal' type="submit" my='4'>Ajouter</Button>
                                    </Form>
                                }
                               
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