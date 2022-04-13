import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import React from 'react'

const MySelect = ({id, label, data, onChange}) => {
  return (
    <FormControl isRequired mr='5' >
        <FormLabel htmlFor={id} fontSize='12px'>{label}</FormLabel>
        <Select size='sm' placeholder={`Select ${label}`}>
            {data.map(values => 
                <option value={values}>{values}</option>
            )}
        </Select>
    </FormControl>
  )
}

export default MySelect