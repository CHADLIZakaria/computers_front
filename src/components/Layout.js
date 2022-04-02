import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar/Navbar'


const Layout = ({children}) => {
    const [showUserInfo, setShowUserInfo] = useState(false)
    const location = useLocation()
    useEffect(() => {
        setShowUserInfo(false)
    }, [location.pathname])
    

    return (
        <>
            <Navbar />
            <div className='d-flex' onClick={() => setShowUserInfo(false)}>
                <div className='wrapper-content w-100'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout