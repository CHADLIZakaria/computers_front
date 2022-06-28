import { Box, Container, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import DataNotFound from '../../../components/DataNotFound/DataNotFound'
import MyProgress from '../../../components/Progress/MyProgress'
import Title from '../../../components/Title/Title'
import UserService from '../../../service/UserService'

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(() => {
        UserService.findAll().then(value => 
            {   setUsers(value.data)
                setIsLoading(false)
            })
    }, [isLoading])

    const deleteUser = (id) => {
       UserService.deleteById(id).then(() => setUsers(users.filter(user => user.id !== id)))
    }
    
    return (
        <Container maxW='container.xl'> 
            <Title title={"Users"}/>
            {   isLoading ?
                    <MyProgress /> : 
                    users.length !== 0 ?
                    <Box>
                        <TableContainer my='5' border='1px' borderColor='gray.200'>
                            <Table variant='striped' colorScheme='blue'>
                                <Thead>
                                    <Tr>
                                        <Th>#ID</Th>
                                        <Th>Username</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users.map((user, index) => 
                                        <Tr key="index">
                                            <Td>
                                                {index+1}
                                            </Td>
                                            <Td>
                                                {user.username}
                                            </Td>
                                            <Td>
                                                <IconButton 
                                                    icon={<AiOutlineDelete />} 
                                                    colorScheme='red' 
                                                    onClick={() => deleteUser(user.id)} />
                                            </Td>
                                        </Tr>    
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer> 
                    </Box>
                    : 
                    <DataNotFound />
            }
        </Container>
    )
}

export default AdminUsers