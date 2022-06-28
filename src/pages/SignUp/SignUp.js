import { Button, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { AiFillLock, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import UserService from '../../service/UserService'

const SignUp = () => {
    const [isPassword, setIsPassword] = useState(true)
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
                <Heading textAlign="center" as="h5" size='lg' my='5'>Enregistrer Vous</Heading>
                <Stack spacing={4}>
                    <Formik 
                    initialValues={{ username: '',  
                                    password: ''}} 
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            UserService.save(values).then(data => {
                                navigate('/login')
                            })
                          
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
                                            Enregistrer
                                        </Button>
                                       
                                        <Text  textDecoration='underline' mb='1' color='blue.700'>
                                            <Link to="/login"> &lt;- Authentifier</Link>
                                        </Text>
                                        
                                    </Stack>
                                </Form>
                            )}
                    </Formik>
                </Stack>
            </Flex>
        </Flex>
    )
}

export default SignUp