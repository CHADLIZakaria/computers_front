import React from 'react'
import {Heading} from '@chakra-ui/react'

const Title = ({title}) => {
    return (
        <Heading textAlign="center" as="h2" size='xl' my='5'>{title}</Heading>
    )
}

export default Title