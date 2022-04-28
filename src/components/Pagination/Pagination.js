import { Button, Center, Flex, IconButton } from '@chakra-ui/react'
import React from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const Pagination = ({paginate, onClick}) => {
  return (
    <>
        {paginate.totalPages > 1 && 
            <Center>
                <Flex color='white'>
                    <IconButton
                    variant='outline'
                    colorScheme='blue'
                    mr='1'
                    icon={<MdKeyboardArrowLeft />}
                    onClick={() => onClick(1)}
                    />
                    {[...Array(paginate.totalPages).keys()].map(element => 
                        <Button  
                            variant={`${element+1===paginate.page ? 'solid': 'outline'}`} 
                            colorScheme='blue'  
                            onClick={() => onClick(element+1)}
                            mr='1'>{element+1}</Button>
                    )}
                    <IconButton
                        variant='outline'
                        colorScheme='blue'
                        icon={<MdKeyboardArrowRight />}
                        onClick={() => onClick(paginate.totalPages)}
                        />
                </Flex>
            </Center>
        }
    </>
    )
}

export default Pagination