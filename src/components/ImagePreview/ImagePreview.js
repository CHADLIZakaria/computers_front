import { Image } from '@chakra-ui/react'
import React, { useState } from 'react'

const ImagePreview = ({file}) => {
    const [preview, setPreview] = useState(null)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload=() => {
        setPreview(reader.result)
    }
    return (
        <div>
            {preview &&
                <Image src={preview} h='100%' />  
            } 
        </div>
    )
}

export default ImagePreview