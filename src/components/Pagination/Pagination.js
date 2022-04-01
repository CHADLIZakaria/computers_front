import React from 'react'
import './Pagination.scss'

const Pagination = ({paginate, onClick}) => {
  return (
    <nav>
        <ul className="pagination justify-content-center">
            <li className={`page-item ${paginate.page===1 && 'disabled'}`} onClick={() => onClick(1)}>
                <span className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </span>
            </li>
            {[...Array(paginate.totalPages).keys()].map(element => 
                <li className={`page-item ${element+1===paginate.page && 'active'}`} onClick={() => onClick(element+1)}>
                    <span className="page-link">{element+1}</span>
                </li>
            )}
            <li className={`page-item ${paginate.page===paginate.totalPages && 'disabled'}`} onClick={() => onClick(paginate.totalPages)}>
                <span className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </span>
            </li>
        </ul>
    </nav>
  )
}

export default Pagination