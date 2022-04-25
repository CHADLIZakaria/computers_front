import { FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react'
import React from 'react'

const MyInput = ({id, label, onChange, error}) => {
  return (
    <FormControl variant='floating' mr='5'  >
        <FormLabel htmlFor={id} fontSize='12px' display='flex' gap='3px'>
            {label} 
            <Text color='red'>
              *
            </Text>
        </FormLabel>
        <Input size='sm' name={id} id={id} placeholder={`Entrer ${label}`}  onChange={onChange} borderColor={error && 'red'} />
        {error && <Text color='red' fontSize='xs'>{error}</Text>}
    </FormControl>
  )
}

export default MyInput