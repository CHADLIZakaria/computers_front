import { Button, Flex, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from '@chakra-ui/react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import React from 'react'
import { AiFillLock, AiOutlineEye, AiOutlineUser } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    return (
        <Flex
            flexDirection='column'
            h={`calc( 100vh - 56px)`}
            backgroundColor='gray.200'
            justifyContent='center'
            alignItems='center'
        >
            <Flex 
                bg='white'
                p='6'
                borderRadius='10px' 
                flexDirection='column'
                h='50vh'>
            <Heading textAlign="center" as="h5" size='lg' my='5'>Authentification</Heading>
                <Stack spacing={4}>
                    <Formik 
                    initialValues={{ username: '',  
                                    password: ''}} 
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            const formData = new FormData()
                            console.log(values)
                            formData.append('username', values.username)
                            formData.append('password', values.password)
                            axios.post('http://localhost:8080/api/login', formData)
                                .then(value => {
                                    let access_token = value.data.access_token
                                    let jwtData = access_token.split('.')[1]
                                    let decodeJwtJsonData = window.atob(jwtData)
                                    if(JSON.parse(decodeJwtJsonData).roles.includes('ROLE_ADMIN')) {
                                        localStorage.setItem("user", access_token)
                                        navigate('/admin/products')
                                    }
                                }).catch(error => console.log(error))
                        }}>
                            {({values, setFieldValue, handleChange}) => ( 
                                <Form>
                                    <InputGroup>
                                        <InputLeftElement
                                        pointerEvents='none'
                                        color='gray.300'
                                        fontSize='1.2em'
                                        children={<AiOutlineUser />}
                                        />
                                        <Input 
                                            type='text' 
                                            placeholder='Username' 
                                            name='username' 
                                            borderColor='blue.400'
                                            onChange={handleChange} />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputLeftElement
                                        pointerEvents='none'
                                        color='gray.300'
                                        fontSize='1.2em'
                                        children={<AiFillLock />}
                                        />
                                        <Input 
                                            type='password' 
                                            name='password' 
                                            placeholder='Mot de passe' 
                                            borderColor='blue.400' 
                                            onChange={handleChange} />
                                        <InputRightElement children={<AiOutlineEye color='green.500' />} />
                                    </InputGroup>
                                    <Button 
                                        w='fit-content'  
                                        colorScheme='blue'
                                        type='submit'
                                        onClick={() => {
                                            
                                        }}
                                        >
                                        Connexion
                                    </Button>
                                </Form>
                            )}
                        
                    </Formik>
                
                </Stack>
            </Flex>
        </Flex>
    )
}

export default Login