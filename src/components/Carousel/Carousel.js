import { Box, Flex, IconButton, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Carousel = ({data}) => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()

   return (
    <Flex>
        <IconButton  
            icon={<MdChevronLeft />} 
            colorScheme='blue' 
            borderRadius='50%' 
            fontSize='20px' />
        {/* <span className={`rounded-circle bg-primary text-white top-0 start-50 cursor-pointer ${currentIndex===0 ? 'd-none': ''}`} style={{height: '30px'}}>
            <MdChevronLeft size={30} onClick={() => {setCurrentIndex(currentIndex-1)}}/>
        </span> */}
        {/* <div className='flex-fill d-flex mx-1 overflow-hidden'> */}
           {data.map((element, index) => 
                <Box
                    w='100%'
                    onClick={() => navigate(`/product/${element.id}`)}
                    className={`col-4  ${[...Array(data.length).keys()].slice(currentIndex, currentIndex+3).includes(index) ? '': 'd-none'}`}>
                        <div className="card cursor-pointer">
                            <Image 
                                src={`http://localhost:8080/api/uploads/${element.image}`} 
                                boxSize='300px'
                                />
                            <div className="card-body">
                                <h5 className="card-title">{element.title}</h5>
                            </div>
                        </div>
                </Box>
            )}
        {/* </div> */}
        {/* <span className={`rounded-circle bg-primary text-white cursor-pointer ${currentIndex===data.length-3 ? 'd-none': ''}`}>
            <MdChevronRight size={30}  onClick={() => {setCurrentIndex(currentIndex+1)}} />
        </span> */}
        <IconButton  
            icon={<MdChevronRight />}
            colorScheme='blue' 
            borderRadius='50%' 
            fontSize='20px' />
        
    </Flex>
  )
}

export default Carousel