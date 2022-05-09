import { Box, Flex, IconButton, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

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
                    onClick={() => navigate(`/products/${element.id}`)}
                    display={[...Array(data.length).keys()].slice(currentIndex, currentIndex+3).includes(index) ? '': 'none'}
                    
                    className={`col-4  ${[...Array(data.length).keys()].slice(currentIndex, currentIndex+3).includes(index) ? '': 'd-none'}`}>
                        <div className="card cursor-pointer">
                            <Image 
                                src={`http://localhost:8080/api/uploads/${element.productImages[0].image}`} 
                                boxSize='300px'
                                />
                            <div className="card-body">
                                <h5 className="card-title">{element.brand}</h5>
                            </div>
                        </div>
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