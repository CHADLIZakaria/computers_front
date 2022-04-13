import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const MyInput = ({id, label, onChange}) => {
  return (
    <FormControl isRequired mr='5' >
        <FormLabel htmlFor={id} fontSize='12px'>{label}</FormLabel>
        <Input size='sm' name={id} id={id} placeholder={`Entrer ${label}`}  onChange={onChange}/>
    </FormControl>
  )
}

export default MyInput