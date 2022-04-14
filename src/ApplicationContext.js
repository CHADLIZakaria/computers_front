import { createContext, useState } from "react";

export const ShopContext = createContext()

export const ShopProvider = props => {
    const [authUser, setAuthUser]=useState(null)
    const [rolesUser, setRolesUser]=useState(null)
    
    
    return (
        <ShopContext.Provider value={{authUser, setAuthUser, rolesUser, setRolesUser}}>
            {props.children}
        </ShopContext.Provider>
    )
}