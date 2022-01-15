import { BrowserRouter as Router, Routes, Route as R } from "react-router-dom"
import Layout from "./layout/Layout"
import Inicio from "./pages/Inicio"
import NuevoCliente from "./pages/NuevoCliente"
import EditarCliente from "./pages/EditarCliente"
import VerCliente from "./pages/VerCliente"
function App() {

  return (
    <Router>
      <Routes>
        <R path={"/clientes"} element={<Layout />}>
          <R index element={<Inicio/>} />
          <R path={"nuevo"} index element={<NuevoCliente/>} />
          <R path={"editar/:id"} index element={<EditarCliente/>} />
          <R path={":id"} index element={<VerCliente/>} />
        </R>
      </Routes>
    </Router>
  )
}

export default App
