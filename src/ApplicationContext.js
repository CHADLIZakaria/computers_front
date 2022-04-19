import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext()

export const ShopProvider = props => {
    const [authUser, setAuthUser]=useState(null)
    const [isAdmin, setIsAdmin]=useState(false)

    useEffect(() => {
        let access_token = localStorage.getItem('user')
        if(access_token) {
            //Set User 
            setAuthUser(access_token)
            //Set Role User
            let jwtData = access_token.split('.')[1]
            let decodeJwtJsonData = window.atob(jwtData)
            if(JSON.parse(decodeJwtJsonData).roles.includes('ROLE_ADMIN')) {
                setIsAdmin(true)
            }
            else {
                setIsAdmin(false)
            }
        }
    }, [])
    
    
    return (
        <ShopContext.Provider value={{authUser, setAuthUser, isAdmin, setIsAdmin}}>
            {props.children}
        </ShopContext.Provider>
    )
}