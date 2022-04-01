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
                <img src={preview} className="img-thumbnail"/>  
            } 
        </div>
    )
}

export default ImagePreview