import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react'

const MyInput = ({id, label, onChange, error, placeholder, value}) => {
  return (
      <FormControl variant='floating'>
        <Input 
          size='sm' 
          name={id} 
          id={id} 
          placeholder={placeholder} 
          onChange={onChange} 
          value={value}
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
        {error && <Text fontSize='xs' color='red'>{error}</Text>}
      </FormControl>
  )
}

export default MyInput