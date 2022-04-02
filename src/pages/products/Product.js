import React, { useEffect, useState } from 'react'
import { BsInfoCircleFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import Carousel from '../../components/Carousel/Carousel'
import ProductService from '../../service/ProductService'
import './Product.scss'
import Progress from '../../components/Progress/Porgress'

const Product = () => {

    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
        ProductService.findById(id).then(value => {
            setProduct(value.data)
        })
        ProductService.findAll(1).then(value => 
            setProducts(value.data.results))
        setIsLoading(false)
    }, [isLoading, id])
    

  return (
    <>
        { isLoading ? 
            <Progress />
            :
            <>
                <div className='row mt-5 product mb-5'>
                    <div className='col-6 product-image'>
                        <img src={`http://localhost:8080/api/uploads/${product.image}`} className="img-thumbnail" />
                    </div>
                    <div className='col-6'>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title product-title">{product.title}</h5>
                                <h6 className="card-subtitle mb-2 product-description">{product.description}</h6>
                                <p className="card-text product-price">{product.price} DH</p>
                            </div>
                            <div className='card-footer product-information'>
                                <p className='text-primary product-information-title'>
                                    <BsInfoCircleFill/>
                                    <span className='mx-3'>Information du produit</span>
                                </p>
                                <ul class="list-group list-group-flush">
                                    {product.reference && <li class="list-group-item">{product.reference}</li>}
                                    {product.ram &&  <li class="list-group-item">{product.ram}</li>}
                                    {product.model &&  <li class="list-group-item">{product.model}</li>}
                                    {product.details &&  <li class="list-group-item">{product.details}</li>}
                                    {product.stockage &&  <li class="list-group-item">{product.stockage}</li> }
                                    {product.processeur &&  <li class="list-group-item">{product.processeur}</li> }
                                    {product.ecran &&  <li class="list-group-item">{product.ecran}</li>}
                                    {product.autonomie &&  <li class="list-group-item">{product.autonomie}</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Carousel data={products} />
            </>

        }
        
    </>
  )
}

export default Product