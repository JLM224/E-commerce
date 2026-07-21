import DesplazamientoArriba from "./funcionesAuxiliares/DesplazamientoArriba";
import AdminCrearEditarProducto from "./paginas/AdminCrearEditarProducto";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Restablecer_Contrasenia from "./paginas/Restablecer_Contrasenia";
import AdminCrearEditarUsuario from "./paginas/AdminCrearEditarUsuario";
import TituloPrincipal from "./componentes/titulos/TituloPrincipal";
import Recuperar_Contrasenia from "./paginas/Recuperar_Contrasenia";
import Pagina_Principal from "./paginas/Pagina_Principal";
import Admin_Productos from "./paginas/Admin_Productos";
import Sobre_Nosotros from "./paginas/Sobre_Nosotros";
import Iniciar_Sesion from "./paginas/Iniciar_Sesion";
import Admin_Usuarios from "./paginas/Admin_Usuarios";
import NavbarC from "./componentes/navbar/NavbarC";
import FooterC from "./componentes/footer/FooterC";
import Registrarse from "./paginas/Registrarse";
import Contacto from "./paginas/Contacto";
import Error404 from "./paginas/Error404";
import Usuario from "./paginas/Usuario";
import { useEffect } from "react";
import Aos from "aos";
import './App.css';
import RutaPrivada from "./componentes/rutaPrivada/RutaPrivada";
import DetallesDelProducto from "./paginas/DetallesDelProducto";

const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true
    })
  }, [])
  return (
    <div className="contenedor">
      <Router>
        <DesplazamientoArriba />
        <NavbarC />
        <TituloPrincipal/>
        <div className="contenido">
          <Routes>
            <Route path="/" element={<Pagina_Principal/>}/>
            <Route path="/Sobre_Nosotros" element={<Sobre_Nosotros/>}/>
            <Route path="/Contacto" element={<Contacto/>}/>
            <Route path="/Iniciar_Sesion" element={<Iniciar_Sesion/>}/>
            <Route path="/Registrarse" element={<Registrarse/>}/>
            <Route path="/Recuperar_Contrasenia" element={<Recuperar_Contrasenia/>}/>
            <Route path="/restablecer-contrasenia" element={<Restablecer_Contrasenia/>}/>
            <Route path="/DetallesDelProducto/:id" element={<DetallesDelProducto/>}/>
            {/* Administrador */}
            <Route element={<RutaPrivada rolRuta="admin" />}>
            <Route path="/Admin_Usuarios" element={<Admin_Usuarios />} />
            <Route path="/AdminCrearEditarUsuario/:id?" element={<AdminCrearEditarUsuario />} />
            <Route path="/Admin_Productos" element={<Admin_Productos />} />
            <Route path="/AdminCrearEditarProducto/:id?" element={<AdminCrearEditarProducto />} />
            </Route>
            {/* Usuario */}
            <Route path="/Usuario" element={<Usuario/>}/>
            {/* Error 404 */}
            <Route path="*" element={<Error404/>}/>
          </Routes>
        </div>
      </Router>
      <FooterC/> 
    </div>
  )
}

export default App