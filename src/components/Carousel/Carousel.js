import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Helper from '../../utils/Helper'

const Carousel = ({data}) => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()

   return (
    <Flex alignItems='center'>
        <IconButton  
            icon={<MdChevronLeft />} 
            colorScheme='blue' 
            borderRadius='50%' 
            onClick={() => {
                    if(currentIndex > 0)
                     setCurrentIndex(currentIndex-1)
                }
            }
            fontSize='20px' />
           {data.map((element, index) => 
                <Box
                    w='33%'
                    mr='3'
                    onClick={() => navigate(`/products/${element.id}`)}
                    display={[...Array(data.length).keys()].slice(currentIndex, currentIndex+3).includes(index) ? '': 'none'}
                   >
                        <Box>
                            <Image 
                                src={`http://localhost:8080/api/uploads/${element.productImages[0].image}`} 
                                boxSize='300px'
                            />
                            <Text noOfLines={2}>
                                {Helper.extractTitle(`
                                    ${element.brand      === '' ? 'Brand': element.brand},
                                    ${element.ecran      === '' ? 'Ecran': element.ecran},
                                    ${element.ram        === '' ? 'Ram': element.ram +' Mémoire'},
                                    ${element.hdd        === '' ? 'HDD': element.hdd+ ' HDD'},
                                    ${element.ssd        === '' ? 'SSD' : element.ssd+ ' SSD'},
                                    ${element.processor  === '' ? 'Processeur' : element.processor},
                                    ${element.color      === '' ? 'Couleur' : element.color}`)
                                }
                            </Text>
                        
                        </Box>
                </Box>
            )}
        <IconButton  
            icon={<MdChevronRight />}
            colorScheme='blue' 
            borderRadius='50%' 
            onClick={() => {
                if(currentIndex < data.length - 3)
                setCurrentIndex(currentIndex+1)}

            } 
            fontSize='20px' />
        
    </Flex>
  )
}

export default Carousel