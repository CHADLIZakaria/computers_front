import { Button, Container, Flex, FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect, useRef, useState } from "react"
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai"
import DataNotFound from "../../components/DataNotFound/DataNotFound"
import MyProgress from "../../components/Progress/MyProgress"
import Title from "../../components/Title/Title"
import RamsService from "../../service/RamsService"

const Rams = () => {
    const [rams, setRams] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    //const [paginate, setPaginate] = useState({page: 1})
    const [isUpdate, setIsUpdate] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef()
    const finalRef = useRef()

    useEffect(() => {
        RamsService.findAll().then(value => 
            {   setRams(value.data)
                //setPaginate({...paginate, totalElements: value.data.totalElements, totalPages: value.data.totalPages})
                setIsLoading(false)
            })
    }, [isLoading])

    const deleteRam = (id) => {
        RamsService.deleteById(id).then(() => setRams(rams.filter(ram => ram.id != id)))
    }
    const formik = useFormik(
        {
        enableReinitialize: true, 
        initialValues: {
          id: 0,
          ram: '',
        },
        onSubmit: (values) => {
            if(values.id == 0) {
                RamsService.save(values).then((data) => {
                    setRams([...rams, {...values, id: data.data.id}])
                })
            } 
            else {
                RamsService.update(values).then((data) => {
                    setRams(rams.map(myRam => {
                        if(data.data.id == myRam.id) {
                            return data.data
                        }
                        return myRam;
                    }));
                });
            } 
            formik.setValues({id: 0, ram: ''})
        },
      })
    
    return (
        <Container maxW='container.xl'> 
            <Title title={"Rams"}/>
            <Flex>
                <InputGroup width='fit-content'> 
                    <InputRightElement
                        pointerEvents='none'
                        children={<AiOutlineSearch />}
                        />
                    <Input type='tel' placeholder='Search' />
                </InputGroup>
                <Spacer />
                <IconButton 
                    icon={<AiOutlinePlus />} 
                    colorScheme='green' 
                    onClick={onOpen} 
                />  
                <RamForm 
                    isOpen={isOpen} 
                    formik={formik}  
                    onClose={onClose} 
                    initialRef={initialRef} 
                    finalRef={finalRef} 
                />

                
            </Flex>
            {   isLoading ?
                    <MyProgress /> : 
                    rams.length !== 0 ?
                    <TableContainer my='5'>
                        <Table border='1px' borderColor='gray.200'>
                            <Thead>
                                <Tr backgroundColor='gray.100'>
                                    <Th>#ID</Th>
                                    <Th>Ram</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            </Tbody>
                                {rams.map((ram, index) => 
                                <Tr backgroundColor={index % 2 == 0 ? 'white' : 'gray.50'}>
                                     <Td>
                                        {index+1}
                                    </Td>
                                    <Td>
                                        {ram.ram}
                                    </Td>
                                    <Td>
                                        <IconButton 
                                            icon={<AiOutlineEdit />} 
                                            colorScheme='blue' 
                                            mr='1'
                                            onClick={() => {
                                                formik.setValues(ram)
                                                onOpen();
                                            } 
                                        }
                                        />
                                        <IconButton 
                                            icon={<AiOutlineDelete />} 
                                            colorScheme='red'
                                            onClick={() => deleteRam(ram.id)}
                                        />
                                     </Td>
                                </Tr>
                                )}                            
                        </Table>
                    </TableContainer>
                    : 
                    <DataNotFound />
            }
        </Container>
    )
}

const RamForm = ({isOpen, onClose, initialRef, finalRef, formik}) => {
    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{formik.values.id == 0 ? 'Ajouter ram' : 'Modifier ram' }</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={formik.handleSubmit}>
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Ram</FormLabel>
                        <Input 
                            name="ram"
                            ref={initialRef} 
                            placeholder='Entrer la ram' 
                            onChange={formik.handleChange}
                            value={formik.values.ram}
                            />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={3}>Cancel</Button>
                    <Button 
                        colorScheme='blue'
                        type='submit'
                        onClick={onClose}
                        >
                        Save
                    </Button>
                </ModalFooter>
            </form>
        </ModalContent>
        </Modal>  
    )
}
export default Rams