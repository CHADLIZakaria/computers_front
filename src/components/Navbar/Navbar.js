import { Center, Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <Flex bg='gray.100' p='4'>
            <Center>
                <Text>
                    <Link to="/">Mehdi Computers</Link> 
                </Text>
            </Center>
            <Spacer />
        </Flex>
    )
}

export default Navbar