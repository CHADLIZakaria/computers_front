import { Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text } from '@chakra-ui/react'
import React from 'react'

const MyInput = ({id, label, onChange, error}) => {
  return (
      <FormControl variant='floating'>
        <Input 
          size='sm' 
          name={id} 
          id={id} 
          placeholder=' ' 
          onChange={onChange} 
          borderColor={error && 'red'} />
        <FormLabel 
          position='absolute'
          top='0'
          left='0'
          zIndex='2'
          transformOrigin='left top'
          transform='scale(0.85) translateY(-24px)'
          >
             {label}
        </FormLabel>
        {error && <FormErrorMessage fontSize='xs'>{error}</FormErrorMessage>}
      </FormControl>
  )
}

export default MyInput