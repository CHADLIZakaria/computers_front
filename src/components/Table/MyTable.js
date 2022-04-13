import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

const MyTable = ({data, onDelete}) => {
    const navigate = useNavigate()
    return (
            <>
            {data.length !== 0 && 
                <TableContainer my='5' border='1px' borderColor='gray.200'>
                    <Table variant='striped' colorScheme='blue'>
                        <Thead>
                            <Tr>
                                {Object.keys(data[0]).map(key => (
                                            <Th>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</Th>
                                ))}
                                <Th>Controll</Th>
                            </Tr>
                        </Thead>
                        <Tbody>

                        {data.map(ligne => 
                                 <Tr>
                                     {Object.values(ligne).map(column => 
                                             <Td width='100px'>
                                                 {typeof(column)!=='object' ?
                                                     column !== null &&   (/(.png|jpg|jpeg|gif|tiff)$/i).test(column) ? 
                                                         <img src={`http://localhost:8080/api/uploads/${column}`}/> : 
                                                         column:
                                                     column === null ? "": column.name
                                                 }
                                             </Td>)}
                                     <Td>
                                        <IconButton icon={<AiOutlineEdit />} colorScheme='blue' mr='1' onClick={() => navigate(`/product/${Object.values(ligne)[0]}/edit`)}></IconButton>
                                        <IconButton icon={<AiOutlineDelete />} colorScheme='red' onClick={() => onDelete(Object.values(ligne)[0])}></IconButton>
                                     </Td>
                                 </Tr>
                             )}
                        </Tbody>
                    </Table>
                </TableContainer>
            }
            </>
    )
}

export default MyTable