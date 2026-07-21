import { Navigate, Outlet } from "react-router-dom";

const RutaPrivada = ({ rolRuta }) => {
  const usuarioLogueado = sessionStorage.getItem("token")
  const usuarioLogueadoRol = sessionStorage.getItem("rol")

  if (!usuarioLogueado) {
    return <Navigate to="/Iniciar_Sesion" replace />
  }

  if (usuarioLogueadoRol !== rolRuta) {
    if (usuarioLogueadoRol === "usuario") {
      return <Navigate to="/Usuario" replace />
    }

    return <Navigate to="/Admin_Productos" replace />
  }

  return <Outlet />
}

export default RutaPrivada