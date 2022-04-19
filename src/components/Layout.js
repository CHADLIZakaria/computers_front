import { useContext, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { ShopContext } from "../ApplicationContext"


const Layout = ({children}) => {

    const {authUser, setAuthUser, rolesUser, setRolesUser} = useContext(ShopContext)

    useEffect(() => {
        if(localStorage.getItem('user') != null) {
            let access_token = localStorage.getItem('user')
            let jwtData = access_token.split('.')[1]
            let decodeJwtJsonData = window.atob(jwtData)
            let roles = JSON.parse(decodeJwtJsonData).roles
            setRolesUser(roles)
            localStorage.setItem("user", access_token)
            setAuthUser(access_token)
        }
    }, [])
    


    return (
        {children} 
    )
}

export default Layout