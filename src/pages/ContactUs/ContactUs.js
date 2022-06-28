import { Box, Button, Flex, Heading, Image, Input, InputGroup, InputLeftElement, Stack, Textarea } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { AiOutlineUser } from 'react-icons/ai'
import { IoArrowForwardCircleOutline } from 'react-icons/io5'
import EmailService from '../../service/EmailService'
import image from './contactUs.jpg'

const ContactUs = () => {
   
    return (
        <Box                            
            backgroundColor='gray.200'
        >
            <Box 
                display='flex'
                flexDirection='row'  
                justifyContent='center'
                h={`calc( 100vh - 56px)`}  
                alignItems='center'>           
                    <Box>
                        <Image src={image}  objectFit='cover'  boxSize='65vh' borderRadius='10px 0px 0px 10px' />
                    </Box>
                    <Flex 
                        bg='white'
                        h='65vh'
                        px='5'
                        borderRadius='0 10px 10px 0'
                        flexDirection='column'
                       >
                        <Heading textAlign="center" as="h5" size='lg' my='5'>Contactez Nous</Heading>
                        <Stack spacing={4}>
                            <Formik 
                                initialValues={{ firstName: '',
                                            lastName: '',
                                            email: '',
                                            description: ''
                                        }} 
                                enableReinitialize={true}
                                onSubmit={(values, { resetForm }) => {
                                    EmailService.sendEmail(values).then(data => {
                                       // console.log(data)
                                        resetForm()
                                        console.log(values)
                                    })                                    
                                    
                                }}>
                                    {({values, setFieldValue, handleChange}) => ( 
                                        <Form>
                                            <Stack spacing={3}>
                                                <Flex gap={3}>
                                                    <InputGroup>
                                                        <InputLeftElement
                                                        pointerEvents='none'
                                                        color='gray.300'
                                                        fontSize='1.2em'
                                                        children={<AiOutlineUser />}
                                                        />
                                                        <Input 
                                                            type='text' 
                                                            placeholder='Nom' 
                                                            name='firstName' 
                                                            borderColor='blue.400'
                                                            value={values.firstName}
                                                            onChange={handleChange} />
                                                    </InputGroup>

                                                    <InputGroup>
                                                        <InputLeftElement
                                                            pointerEvents='none'
                                                            color='gray.300'
                                                            fontSize='1.2em'
                                                            children={<AiOutlineUser />}
                                                        />
                                                        <Input 
                                                            type='text' 
                                                            placeholder='Prénom' 
                                                            name='lastName' 
                                                            borderColor='blue.400'
                                                            value={values.lastName}
                                                            onChange={handleChange} />
                                                    </InputGroup>

                                                </Flex>
                                                
                                                <InputGroup>
                                                    <InputLeftElement
                                                        pointerEvents='none'
                                                        color='gray.300'
                                                        fontSize='1.2em'
                                                        children={<AiOutlineUser />}
                                                    />
                                                    <Input 
                                                        type='text' 
                                                        placeholder='Email' 
                                                        name='email' 
                                                        value={values.email}
                                                        borderColor='blue.400'
                                                        onChange={handleChange} />
                                                </InputGroup>
                                                

                                                <InputGroup>
                                                    <InputLeftElement
                                                        pointerEvents='none'
                                                        color='gray.300'
                                                        fontSize='1.2em'
                                                        children={<AiOutlineUser />}
                                                        />

                                                    <Textarea 
                                                        pl="38px"
                                                        rows={4}
                                                        name='description' 
                                                        placeholder='Entrer votre description' 
                                                        borderColor='blue.400'
                                                        value={values.description}
                                                        onChange={handleChange}/>
                                                </InputGroup>
                                            
                                                <Button 
                                                    w='fit-content'  
                                                    colorScheme='blue'
                                                    rightIcon={<IoArrowForwardCircleOutline />}
                                                    type='submit'>
                                                    Envoyer
                                                </Button>                        
                                            </Stack>
                                        </Form>
                                    )}
                            </Formik>
                        </Stack>
                    </Flex>
            </Box>
        </Box>
    )
}

export default ContactUs