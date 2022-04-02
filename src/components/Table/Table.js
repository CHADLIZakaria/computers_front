import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Table.scss"

const Table = ({data, onDelete}) => {
    const navigate = useNavigate()
    return (
            <>
            {data.length !== 0 && 
                <div class="table-responsive">
                    <table className="table-manage table  table-bordered table-striped">
                        <thead className='table-dark'>
                            <tr>
                                {Object.keys(data[0]).map(key => (
                                    <td>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                ))}
                                <td>
                                    Controll
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(ligne => 
                                <tr>
                                    {Object.values(ligne).map(column => 
                                            <td>
                                                {typeof(column)!=='object' ?
                                                    column !== null &&   (/(.png|jpg|jpeg|gif|tiff)$/i).test(column) ? 
                                                        <img src={`http://localhost:8080/api/uploads/${column}`}/> : 
                                                        column:
                                                    column === null ? "": column.name
                                                }
                                            </td>)}
                                    <td>
                                        <button className='btn btn-primary mr-3' onClick={() => navigate(`/category/${Object.values(ligne)[0]}/edit`)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => onDelete(Object.values(ligne)[0])}>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
            </>
    )
}

export default Table