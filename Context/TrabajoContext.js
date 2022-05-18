import React from "react"
import { useState } from "react"

const Context = React.createContext({})

export function TrabajoContext({children}){
    const [trabajo, settrabajo] = useState("")
    const [trabajador, settrabajador] = useState({})
    const [cliente, setcliente] = useState("")
    return <Context.Provider value={{trabajo, settrabajo, trabajador, settrabajador, cliente, setcliente}}>
        {children}
    </Context.Provider>
}

export default Context