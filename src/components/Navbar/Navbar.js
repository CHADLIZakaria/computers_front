import { Avatar, Box, Center, Fade, Flex, HStack, Image, Input, InputGroup, InputRightElement, List, ListIcon, ListItem, Spacer, Text, useDisclosure, WrapItem } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoLogOutOutline } from 'react-icons/io5'
import { RiSettings5Line } from 'react-icons/ri'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../../ApplicationContext'
import AuthenticationService from '../../service/AuthenticationService'
import ProductService from '../../service/ProductService'
import Helper from '../../utils/Helper'
import './Navbar.scss'

const Navbar = () => {
    const {isAdmin, setIsAdmin, setAuthUser} = useContext(ShopContext)
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const { isOpen, onToggle } = useDisclosure()
    const location = useLocation()

    useEffect(() => {
       searchProducts()
    }, [search])
    const searchProducts=() => {
        if(search === '') {
            setProducts([])
            return;
        }
        ProductService.searchProducts(search).then(values => {
            setProducts(values.data)
        })
    }

    const logout = () => {
        localStorage.removeItem('user')
        setIsAdmin(false)
        setAuthUser(null)
    }

    return (
        <Flex 
            boxShadow='xl' 
            p='3' 
            rounded='md' 
            bg={location.pathname==='/' ? 'transparent': 'gray.600'} 
            w='100%'
            color='white'
            maxH='65px'
            borderRadius='0' >
            <Center>
                <Flex gap='10' alignItems='center'>
                    <Text>
                    <Link to='/'>
                       Computers
                    </Link>
                    </Text>
                    <Box 
                        zIndex='5'
                        position='relative'>
                        <InputGroup 
                            width='fit-content'
                            h='80%' 
                            border='1px' 
                            borderColor='gray.200' 
                            color='gray.600'
                            bg='gray.200'
                            borderRadius='6px'
                            > 
                            <InputRightElement
                                pointerEvents='none'
                                children={<AiOutlineSearch  color='gray'/>
                            }
                            />
                            <Input 
                                type='text' 
                                placeholder='Rechercher'
                                focusBorderColor='transparent'
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                                />
                        </InputGroup>                          
                        {products.length !== 0 && 
                            <Box 
                                position='absolute'
                                top='85%'
                                pt='2'
                                h='50vh'
                                bg='gray.200'
                                overflowY='scroll'
                                zIndex='999'
                                w='150%'>
                                {products.map((product, index) => 
                                    <Box 
                                        key={index}
                                        borderBottom='1px' 
                                        borderColor='gray' 
                                        color='black'
                                        px='3'>
                                        <Flex
                                            alignItems='center'>
                                            <Image 
                                                boxSize='80px'
                                                p='4' 
                                                src={`http://localhost:8080/api/uploads/${product.productImages[0].image}`} />
                                            <Text 
                                                fontSize='xs'>
                                                {Helper.extractTitle(`
                                                    ${product.brand      === '' ? 'Brand': product.brand},
                                                    ${product.ecran      === '' ? 'Ecran': product.ecran},
                                                    ${product.ram        === '' ? 'Ram': product.ram},
                                                    ${product.hdd        === '' ? 'HDD': product.hdd},
                                                    ${product.ssd        === '' ? 'SSD' : product.ssd},
                                                    ${product.processor  === '' ? 'Processeur' : product.processor},
                                                    ${product.color      === '' ? 'Couleur' : product.color}`)
                                                }
                                            </Text>
                                        </Flex>
                                    </Box>
                                )}
                            </Box>
                        }
                    </Box>
                </Flex>
            </Center>
            <Spacer />
            <Center>
                <Text 
                    mr='3'
                    p='2'>
                    <NavLink
                        to="/"
                        className={({ isActive }) => 
                                    (isActive ? "link link-active" : "link")}>
                        Acceuil
                    </NavLink> 
                </Text>
                <Text 
                    mr='3'
                    p='2'>
                    <NavLink 
                        to="/contact-us" 
                        className={({ isActive }) =>  
                        (isActive ? "link link-active" : "link")}>
                        Contactez Nous
                    </NavLink> 
                </Text>
                {isAdmin && 
                    <HStack>
                    <Text p='2'>
                        <NavLink 
                            to="/products"
                            className={({ isActive }) =>  
                                (isActive ? "link link-active" : "link")}>
                            Gérer les produits
                        </NavLink> 
                    </Text>
                    <Text 
                       
                        p='2'>
                        <NavLink 
                            to="/users"
                            className={({ isActive }) =>  
                                (isActive ? "link link-active" : "link")}>
                            Users
                        </NavLink> 
                    </Text>
                    </HStack>
                } 
                {isAdmin &&
                    <WrapItem 
                        onClick={onToggle}
                        position='relative'>
                        <Avatar 
                            name={AuthenticationService.getNameFromToken()}  
                            cursor='pointer' 
                            color='white'
                            bg='#862101' />
                        <Fade in={isOpen}  >
                            <Box
                                position='absolute'
                                top='105%'
                                right='0'
                                color='white'
                                bg='gray.700' 
                                rounded='md'
                                shadow='md'
                                w='160px'
                                px='3'
                                py='2'
                                zIndex='99'
                            >
                            <List spacing={3}>
                                    <Link to='/profil'>
                                        <ListItem fontSize='sm' mb='2' px='2'>
                                                <ListIcon as={RiSettings5Line} color='white' />
                                                Modifier Profil
                                        </ListItem>
                                    </Link>
                                    <Link to='/login' onClick={logout}>
                                        <ListItem fontSize='sm' px='2'>
                                            <ListIcon as={IoLogOutOutline} color='white' />
                                            Déconnexion
                                        </ListItem>
                                    </Link>
                                    
                                </List>
                            </Box>
                        </Fade>
                    </WrapItem>
                }
            </Center>
        </Flex>
    )
}

export default Navbar
