import { createContext, useState } from "react";

export const ShopContext = createContext()

export const ShopProvider = props => {
    const [authUser, setAuthUser]=useState({})
    
    return (
        <ShopContext.Provider value={[authUser, setAuthUser]}>
            {props.children}
        </ShopContext.Provider>
    )
}