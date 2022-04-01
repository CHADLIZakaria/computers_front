import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Carousel = ({data}) => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()

   return (
    <div className='d-flex align-items-center'>
        <span className={`rounded-circle bg-primary text-white top-0 start-50 cursor-pointer ${currentIndex===0 ? 'd-none': ''}`} style={{height: '30px'}}>
            <MdChevronLeft size={30} onClick={() => {setCurrentIndex(currentIndex-1)}}/>
        </span>
        <div className='flex-fill d-flex mx-1 overflow-hidden'>
           {data.map((element, index) => 
                <div
                    onClick={() => navigate(`/product/${element.id}`)}
                    className={`col-4  ${[...Array(data.length).keys()].slice(currentIndex, currentIndex+3).includes(index) ? '': 'd-none'}`}>
                        <div className="card cursor-pointer">
                            <img src={`http://localhost:8080/api/uploads/${element.image}`} />
                            <div className="card-body">
                                <h5 className="card-title">{element.title}</h5>
                            </div>
                        </div>
                </div>
            )}
        </div>
        <span className={`rounded-circle bg-primary text-white cursor-pointer ${currentIndex===data.length-3 ? 'd-none': ''}`}>
            <MdChevronRight size={30}  onClick={() => {setCurrentIndex(currentIndex+1)}} />
        </span>
    </div>
  )
}

export default Carousel