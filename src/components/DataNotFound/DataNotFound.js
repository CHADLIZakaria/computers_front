import React from 'react'
import notFound from './not_found.png'
import './DataNotFound.scss'

const DataNotFound = () => {
    return (
        <div className='d-flex justify-content-center flex-column mx-auto data-not-found'>
            <img src={notFound} alt="not data found" />
            <div className='text-center text-danger h4'>No Data Found</div>
        </div>
    )
}

export default DataNotFound