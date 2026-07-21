import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Swal from "sweetalert2";
import "./Navbar.css";

const NavbarC = () => {
  const token = sessionStorage.getItem("token")
  const rol = sessionStorage.getItem("rol")
  const usuario = sessionStorage.getItem("usuario")
  const navigate = useNavigate()

  const cerrarSesion = async () => {
    await Swal.fire({
      title: `¡Hasta pronto, ${usuario || "Usuario"}! 👋`,
      text: "Esperamos verte nuevamente muy pronto.",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    })
    sessionStorage.clear()
    setTimeout(() => {
      navigate("/")
    }, 1500)
  }  

  return (
    <Navbar expand="lg" className="navbar" variant="dark">
      <Container>
        <NavLink className="nav-link nav-logo" to="/">
          <img src="/logo.jpeg" alt="Logo" className="logo" />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {!token && (
              <>
                <NavLink to="/" className="nav-link">
                  Bienvenidos
                </NavLink>

                <NavLink to="/Sobre_Nosotros" className="nav-link">
                  Sobre Nosotros
                </NavLink>

                <NavLink to="/Contacto" className="nav-link">
                  Contáctanos
                </NavLink>
              </>
            )}

            {/* Administrador */}
            {rol === "admin" && (
              <>          
                <NavLink to="/Admin_Productos" className="nav-link">
                  Admin Productos
                </NavLink>

                <NavLink to="/Admin_Usuarios" className="nav-link">
                  Admin Usuarios
                </NavLink>
              </>
            )}

            {/* Usuario */}
            {rol === "usuario" && (
              <>
                <NavLink to="/" className="nav-link">
                  Inicio
                </NavLink>

                <NavLink to="/Categorias" className="nav-link">
                  Categorías
                </NavLink>

                <NavLink to="/Contacto" className="nav-link">
                  Contacto
                </NavLink>

                <NavLink to="/Mis_Pedidos" className="nav-link">
                  Mis Pedidos
                </NavLink>
              </>
            )}
          </Nav>

          <Nav>
            {!token ? (
              <NavLink to="/Iniciar_Sesion" className="nav-link">
                Iniciar Sesión
              </NavLink>
            ) : (
              <button
                className="btn btn-outline-light"
                onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarC