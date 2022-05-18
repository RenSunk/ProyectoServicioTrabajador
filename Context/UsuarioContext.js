import React from "react"
import { useState } from "react"

const Context = React.createContext({})

export function UsuarioContext({children}){
    const [usuario, setusuario] = useState({correo:"",contra:"",uid:""})
    return <Context.Provider value={{usuario, setusuario}}>
        {children}
    </Context.Provider>
}

export default Context