import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import React from 'react'

const MySelect = ({id, label, keys, values, onChange}) => {
  return (
    <FormControl variant='floating'>
        <Select size='sm' placeholder={`Selectionnez ${label.toLowerCase()}`}>
            {values.map((_, index)  => 
                <option key={index} value={keys[index]}>{values[index]}</option>
                )}
        </Select>
        <FormLabel 
          htmlFor={id} 
          position='absolute'
          top='0'
          left='0'
          zIndex='2'
          transformOrigin='left top'
          transform='scale(0.85) translateY(-24px)'>
            {label}
        </FormLabel>
    </FormControl>
  )
}

export default MySelect