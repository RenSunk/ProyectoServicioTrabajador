import React from "react"
import { useState } from "react"

const Context = React.createContext({})

export function DataContext({children}){
    const [data, setdata] = useState("")

    return <Context.Provider value={{data, setdata}}>
        {children}
    </Context.Provider>
}

export default Context