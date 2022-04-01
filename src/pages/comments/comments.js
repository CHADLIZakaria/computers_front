import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import DataNotFound from '../../components/DataNotFound/DataNotFound'
import Pagination from '../../components/Pagination/Pagination'
import Progress from '../../components/Progress/Porgress'
import Table from '../../components/Table/Table'
import Title from '../../components/Title/Title'
import CommentService from '../../service/CommentService'

const Comments = () => {
    const [comments, setComments] = useState([])
    const [paginate, setPaginate] = useState({page: 1})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        CommentService.findAll(paginate.page).then(value => {
            setComments(value.data.results)
            setPaginate({...paginate, totalElements: value.data.totalElements, totalPages: value.data.totalPages})
            setIsLoading(false)
        })
    }, [paginate.page])

    // const deleteCategeory = (id) => {
    //     CategoryService.deleteCategoryById(id).then(() => setCategories(categories.filter(category => category.id != id)))
    // }
    const onNavigate = (page) => {
        setPaginate({...paginate, page: page})
    }
    
    return (
        <div>
            <Title title={"Comments"}/>
            <div className='d-flex justify-content-between align-items-center my-4'>
                <div class="form-group position-relative">
                    <Formik
                        initialValues={{keyword: ''}}
                        enableReinitialize={true}
                        onSubmit={(value) => {
                            //CategoryService.searchCategories(value.keyword).then(value => setCategories(value.data))
                        }}
                    >
                        <Form>
                            <Field type="text" class="form-control" placeholder="Search" name="keyword" />
                            <button  type="submit" className='btn position-absolute top-50 end-0  translate-middle-y'>
                                <AiOutlineSearch  />
                            </button>
                        </Form>
                    </Formik>
                </div>
                <Link to="/comments/save" className='btn btn-primary d-flex align-items-center'>
                    Add
                    <AiOutlinePlus />
                </Link>
            </div>
            { 
            isLoading ?
                <Progress /> : 
                comments.length !== 0 ?
                    <>
                        <Table data={comments} />
                        <Pagination paginate={paginate} onClick={onNavigate}/>
                    </> :
                    <DataNotFound />    
            }
              
          
        </div>
    )
}

export default Comments