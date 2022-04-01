import React, { useEffect, useState } from 'react'
import CategoryService from '../../service/CategoryService'
import {Link} from 'react-router-dom'
import Title from '../../components/Title/Title'

const Users = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        //CategoryService.findAllCategories().then(data => setCategories(data))
    }, [])

    const deleteCategeory = (id) => {
        CategoryService.deleteCategoryById(id).then(() => setCategories(categories.filter(category => category.id != id)))
    }
    
    return (
        <div>
            <Title title={"List of categories"}/>
            <table className='table table-hover table-striped'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th></th>
                    </tr>     
                </thead>
                <tbody>
                    {categories.map((category, index) => 
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{category.name}</td>
                            <td className='text-center'>
                                <Link className='btn btn-primary me-3' to={`/category/${category.id}/edit`}>Update</Link>
                                <button className='btn btn-danger'  onClick={() => deleteCategeory(category.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users