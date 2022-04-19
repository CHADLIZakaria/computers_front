import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import React from 'react'

const MySelect = ({id, label, keys, values, onChange}) => {
  return (
    <FormControl isRequired mr='5' >
        <FormLabel htmlFor={id} fontSize='12px'>{label}</FormLabel>
        <Select size='sm' placeholder={`Selectionnez ${label.toLowerCase()}`}>
            {values.map((_, index)  => 
                <option value={keys[index]}>{values[index]}</option>
            )}
        </Select>
    </FormControl>
  )
}

export default MySelect