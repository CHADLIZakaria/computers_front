import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.scss'

const Navbar = ({onClick}) => {

    const navigate = useNavigate()
    
    
    
    return (
        <>
        {  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <span style={{cursor: 'pointer'}}>
                        <AiOutlineMenu onClick={onClick}/>
                    </span>
                    <Link className="navbar-brand mx-3" to="/">Sou9</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item" onClick={() => navigate('/login')}>
                                <span to="home" className="nav-link">
                                    <Link to="signIn">
                                        SignIn
                                    </Link>
                                    /
                                    <Link to="signUp" className='ml-1'>
                                        SignUp
                                    </Link>     
                                </span>
                            </li>
                           
                           
                        </ul>
                    </div>
                </div>
            </nav>
            
        }
        </>
    )
}

export default Navbar