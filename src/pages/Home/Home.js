import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import Title from '../../components/Title/Title'
import ProductService from '../../service/ProductService'
import Progress from '../../components/Progress/Porgress'
const Home = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [paginate, setPaginate] = useState({page: 1})
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()
    
    useEffect(() => {
        ProductService.findAll(paginate.page).then(value => {
            setProducts(value.data.results)
            setPaginate({...paginate, totalElements: value.data.totalElements, totalPages: value.data.totalPages})
            setIsLoading(false)
        })
    }, [paginate.page, location.pathname])

    const onNavigate = (page) => {
        setPaginate({...paginate, page: page})
    }
    
    return (
        <div className='container'>
            <Title title='Mehdi Computers' />
            {isLoading ? 
                <Progress />
                :
                <>
                    <div class="row row-cols-1 row-cols-md-4 g-4 card-group mb-2">
                        {products.map(product => 
                            <div class="col" onClick={() => navigate(`/product/${product.id}`)}>
                                <div class="card h-100">
                                    <img src={`http://localhost:8080/api/uploads/${product.image}`} class="card-img-top" style={{height: '200px'}} alt="..." />
                                    <div class="card-body">
                                        <h5 class="d-flex justify-content-between">
                                            <span className='d-flex flex-column'>
                                                <span className='card-title'>{product.title}</span>
                                            </span>
                                            <span>
                                                {product.price} DH
                                            </span>
                                        </h5>
                                        <h6 className='card-subtitle text-muted'>
                                            {product.description}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Pagination paginate={paginate} onClick={onNavigate} />
                </>
            }
        </div>
    )
}

export default Home