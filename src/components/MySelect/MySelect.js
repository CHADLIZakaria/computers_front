import { FormControl, FormLabel, Select, Text } from '@chakra-ui/react'
import React from 'react'

const MySelect = ({id, label, data, onChange, error, selected}) => {
  return (
    <FormControl variant='floating'>
        <Select 
          id={id}
          borderColor={error && 'red'}
          size='sm' 
          onChange={onChange}
          placeholder={`Selectionnez ${label.toLowerCase()}`}>
            {data.map((element, index)  => 
              <option 
                key={index} 
                selected={element === selected && true}
                value={element}>
                  {element}
              </option>
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
        {error && <Text fontSize='xs' color='red'>{error}</Text>}
    </FormControl>
  )
}

export default MySelect