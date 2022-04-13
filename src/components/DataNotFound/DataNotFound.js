import { Center, Image } from '@chakra-ui/react'
import React from 'react'
import notFound from './not_found.png'

const DataNotFound = () => {
    return (
        <Center w='100%'>
            <Image src={notFound}  h='350px' alt='Data not found' />
        </Center>
    )
}

export default DataNotFound