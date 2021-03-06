import { Box, Button, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useContext } from 'react'
import { AiFillLock, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../ApplicationContext'
import axiosConfig from '../../axiosConfig'

const Login = () => {
    const navigate = useNavigate()
    const {authUser, setAuthUser, isAdmin, setIsAdmin} = useContext(ShopContext)
    const  [isPassword, setIsPassword]  = useState(true)
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
                            axiosConfig.post(
                                '/login', 
                                {
                                    username: values.username,
                                    password: values.password
                                })
                                .then(value => {
                                    let access_token = value.data.data.access_token
                                    let jwtData = access_token.split('.')[1]
                                    let decodeJwtJsonData = window.atob(jwtData)
                                    localStorage.setItem("user", access_token)
                                    setAuthUser(access_token)
                                    if(JSON.parse(decodeJwtJsonData).roles.includes('ROLE_ADMIN')) {
                                        axiosConfig.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('user')
                                        setIsAdmin(true)
                                    }  
                                    navigate('/products')
                                })
                                .catch(error => 
                                    console.log(error))
                        }}>
                            {({values, setFieldValue, handleChange}) => ( 
                                <Form>
                                    <Stack spacing={3}>
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
                                                type={isPassword ?  'password' : 'text'} 
                                                name='password' 
                                                placeholder='Mot de passe' 
                                                borderColor='blue.400' 
                                                onChange={handleChange} />
                                            <InputRightElement>
                                                <IconButton  
                                                    bg='transparent !important'
                                                    onClick={
                                                        () => {
                                                            setIsPassword(!isPassword)
                                                        }
                                                    }
                                                    children={isPassword ? <AiOutlineEye />  : <AiOutlineEyeInvisible />} 
                                                    >
                                                </IconButton>
                                            </InputRightElement>

                                        </InputGroup>
                                        <Button 
                                            w='fit-content'  
                                            colorScheme='blue'
                                            type='submit'>
                                            Connexion
                                        </Button>
                                        <Box pb='4'>
                                            Vous n'avez pas de compte <br/>
                                            <Text  textDecoration='underline' mb='1' color='blue.700'>
                                                <Link to="/signup">Enregistrer vous</Link>
                                            </Text>
                                        </Box>
                                    </Stack>
                                </Form>
                            )}
                    </Formik>
                </Stack>
            </Flex>
        </Flex>
    )
}

export default Login