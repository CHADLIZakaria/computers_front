import { Button, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Stack, useToast } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { AiFillLock, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser } from 'react-icons/ai'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthenticationService from '../../../service/AuthenticationService'
import UserService from '../../../service/UserService'

const AdminProfil = () => {
    const [isPassword, setIsPassword] =  useState(true)
    const [isPassword1, setIsPassword1] =  useState(true)
    const toast = useToast()
    const navigate = useNavigate()
    
    const [user, setUser] = useState({ 
        username: '',
        password: ''
    })
    
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
                alignItems='center'
                h='50vh'>
                <Heading textAlign="center" as="h5" size='lg' my='5'>Update Profil</Heading>
                <Stack spacing={4}>
                    <Formik 
                        initialValues={{ username: AuthenticationService.getNameFromToken(), 
                                        oldPassword: '', 
                                        password: ''}} 
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            console.log({...values, oldUsername: AuthenticationService.getNameFromToken()})
                            
                            UserService.update({...values, oldUsername: AuthenticationService.getNameFromToken()}).then(data => {
                                if(data.data == false) {
                                    console.log('yes')
                                    toast({
                                        title: `Mot de passe incorrect`,
                                        status: 'error',
                                        isClosable: true,
                                      })
                                }
                                else {
                                    AuthenticationService.logout()
                                    navigate('/login')
                                }
                                console.log(data)
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
                                                value={values.username}
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
                                                type={isPassword ? 'password' : 'text' } 
                                                name='oldPassword' 
                                                placeholder='Ancienne Mot de passe' 
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
                                        <InputGroup>
                                            <InputLeftElement
                                            pointerEvents='none'
                                            color='gray.300'
                                            fontSize='1.2em'
                                            children={<AiFillLock />}
                                            />
                                            <Input 
                                                type={isPassword1 ? 'password' : 'text' } 
                                                name='password' 
                                                placeholder='Nouveau Mot de passe' 
                                                borderColor='blue.400' 
                                                onChange={handleChange} />
                                            <InputRightElement>
                                                <IconButton  
                                                    bg='transparent !important'
                                                    onClick={
                                                        () => {
                                                            setIsPassword1(!isPassword1)
                                                        }
                                                    }
                                                    children={isPassword1 ? <AiOutlineEye />  : <AiOutlineEyeInvisible />} 
                                                    >
                                                </IconButton>
                                            </InputRightElement>
                                        </InputGroup>
                                        <Button 
                                            w='fit-content'  
                                            colorScheme='blue'
                                            type='submit'>
                                            Modifier
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                    </Formik>
                </Stack>
            </Flex>
        </Flex>
        
    )
}

export default AdminProfil