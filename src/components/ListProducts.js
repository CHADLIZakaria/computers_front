import React, {useEffect, useState} from 'react'
import ProductService from '../service/ProductService'
import Title from './Title/Title'
import {useParams} from "react-router-dom"

const ListProducts = () => {
    
    const [products, setProducts] = useState([])
    const {name} = useParams()

    useEffect(() => {
        if(name !== '') 
            ProductService.findByCategories(name).then(value => setProducts(value))
        ProductService.findByCategories(name).then(value => console.log(value))
    }, [name])

    
    
    return (
        <div>
            <Title title={name}/>
                <div className='container'>
                    <div className='row'>
                        <div className="card-group">
                            <div className="card">
                                <img src="..." class="card-img-top" />
                                <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
        </div>
    )
}

export default ListProducts