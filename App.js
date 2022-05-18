import React from "react"
import Principal from "./Page/Principal"
import { DataContext } from "./Context/Context"
import { TrabajoContext } from "./Context/TrabajoContext"
import { UsuarioContext } from "./Context/UsuarioContext"
const App = () => {
  return (
    <UsuarioContext>
      <TrabajoContext>
        <DataContext>
          <Principal />
        </DataContext>
      </TrabajoContext>
    </UsuarioContext>

  )
}

export default App