import clienteAxios from "../../funcionesAuxiliares/configAxios";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import swal from "sweetalert2";
import "./Formulario.css";

const Formulario = ({ Pagina }) => {
  const navigate = useNavigate();

  const [errores, setErrores] = useState({});

  const [registro, setRegistro] = useState({
    usuario: "",
    email: "",
    telefono: "",
    contrasenia: "",
    repContrasenia: "",
    terminosYCondiciones: false,
  });

  const [login, setLogin] = useState({
    usuario: "",
    contrasenia: "",
  });

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleClickDelBotonParaRegistro = async (ev) => {
    try {
      ev.preventDefault();

      const erroresFormulario = {};

      const {
        usuario,
        email,
        telefono,
        contrasenia,
        repContrasenia,
        terminosYCondiciones,
      } = registro;

      if (!usuario) erroresFormulario.usuario = "Campo usuario está vacío";
      if (!email) erroresFormulario.email = "Campo email está vacío";
      else if (!validarEmail(email))
        erroresFormulario.email = "Ingrese un email válido";

      if (!telefono) erroresFormulario.telefono = "Campo telefono está vacío";
      if (!contrasenia)
        erroresFormulario.contrasenia = "Campo contraseña está vacío";
      if (!repContrasenia)
        erroresFormulario.repContrasenia =
          "Campo repetir contraseña está vacío";
      if (!terminosYCondiciones)
        erroresFormulario.terminosYCondiciones =
          "Acepta los términos y condiciones";

      if (Object.keys(erroresFormulario).length > 0) {
        setErrores(erroresFormulario);
        return;
      }

      if (contrasenia !== repContrasenia) {
        swal.fire({
          icon: "error",
          title: "Las contraseñas no coinciden",
        });
        return;
      }

      const usuarioRegistrado = await clienteAxios.post("/usuarios", {
        usuario,
        email,
        telefono,
        contrasenia,
      })

      swal.fire({
        title: usuarioRegistrado.data.mensaje,
        text: "¡En breve recibirás un email de confirmación!",
        icon: "success",
      });

      setRegistro({
        usuario: "",
        email: "",
        telefono: "",
        contrasenia: "",
        repContrasenia: "",
        terminosYCondiciones: false,
      })

      setErrores({});

      setTimeout(() => {
        navigate("/Iniciar_Sesion");
      }, 1000)
    } catch (error) {
  const mensajeBackend = error.response?.data?.mensaje;

  if (mensajeBackend) {
    if (mensajeBackend.includes("usuario")) {
      setErrores(prev => ({ ...prev, usuario: mensajeBackend }));
    } 
    else if (mensajeBackend.includes("email")) {
      setErrores(prev => ({ ...prev, email: mensajeBackend }));
    } 
    else if (mensajeBackend.includes("teléfono")) {
      setErrores(prev => ({ ...prev, telefono: mensajeBackend }));
    }
    else {
      swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: mensajeBackend,
      });
    }
  } else {
    swal.fire({
      icon: "error",
      title: "Error al registrar",
      text: "Revisá los campos o contactá al administrador.",
    })
  }
 }
}

  const handleChangeDatosRegistro = (ev) => {
    const value =
      ev.target.type === "checkbox"
        ? ev.target.checked
        : ev.target.value;

    if (errores[ev.target.name]) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        [ev.target.name]: "",
      }));
    }

    setRegistro({
      ...registro,
      [ev.target.name]: value,
    });
  };

  const handleChangeDatosLogeo = (ev) => {
    if (errores[ev.target.name]) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        [ev.target.name]: "",
      }))
    }

    setLogin({
      ...login,
      [ev.target.name]: ev.target.value,
    })
  }

  const handleClickBotonLogueo = async (ev) => {
    try {
      ev.preventDefault();

      const erroresLogin = {};
      const { usuario, contrasenia } = login;

      if (!usuario) erroresLogin.usuario = "Campo usuario vacío";
      if (!contrasenia)
        erroresLogin.contrasenia = "Campo contraseña vacío";

      setErrores(erroresLogin);

      if (usuario && contrasenia) {
        const response = await clienteAxios.post("/usuarios/login", {
          usuario,
          contrasenia
        })
        const { token, rol, usuario: nombreUsuario, idUsuario } = response.data.data

        sessionStorage.setItem("token", token)
        sessionStorage.setItem("rol", rol)
        sessionStorage.setItem("usuario", nombreUsuario)
        sessionStorage.setItem("idUsuario", idUsuario)
        
      swal.fire({
        title: `¡Bienvenido ${nombreUsuario}!`, 
        text: "Has iniciado sesión correctamente", 
        icon: "success",
      })
      
      setLogin({
        usuario: "",
        contrasenia: "",
      })
      
    if (rol === "usuario") {
      setTimeout(() => {
        navigate("/Usuario")
      }, 1000)
    } else {
      navigate("/Admin_Productos")
    }
  }
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text:
          error.response?.data?.mensaje ||
          "Algo salió mal. Revisá los datos o contactá al admin.",
      })
    }
  }
  return (
    <div className="form-container">
  <h3>
    {Pagina === "Registrarse"
      ? "Registro de usuario"
      : "Iniciar sesión"}
  </h3>

  <Form>
    <Form.Group className="mb-3" controlId="Usuario">
      <Form.Label>Usuario</Form.Label>
      <Form.Control
        type="text"
        placeholder="Ingrese un nombre de usuario"
        name="usuario"
        className={
          errores.usuario
            ? "form-control is-invalid"
            : "form-control"
        }
        value={
          Pagina === "Registrarse"
            ? registro.usuario
            : login.usuario
        }
        onChange={
          Pagina === "Registrarse"
            ? handleChangeDatosRegistro
            : handleChangeDatosLogeo
        }
      />
      {errores.usuario && (
        <p className="text-danger">{errores.usuario}</p>
      )}
    </Form.Group>

    {Pagina === "Registrarse" && (
      <Form.Group className="mb-3" controlId="Email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese su email"
          name="email"
          className={
            errores.email
              ? "form-control is-invalid"
              : "form-control"
          }
          value={registro.email}
          onChange={handleChangeDatosRegistro}
        />
        {errores.email && (
          <p className="text-danger">{errores.email}</p>
        )}
      </Form.Group>
    )}

    {Pagina === "Registrarse" && (
      <Form.Group className="mb-3" controlId="Telefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su teléfono"
          name="telefono"
          className={
            errores.telefono
              ? "form-control is-invalid"
              : "form-control"
          }
          value={registro.telefono}
          onChange={handleChangeDatosRegistro}
        />
        {errores.telefono && (
          <p className="text-danger">{errores.telefono}</p>
        )}
      </Form.Group>
    )}

    <Form.Group className="mb-3" controlId="Contrasenia">
      <Form.Label>Contraseña</Form.Label>
      <Form.Control
        type="password"
        placeholder="Ingrese su contraseña"
        name="contrasenia"
        className={
          errores.contrasenia
            ? "form-control is-invalid"
            : "form-control"
        }
        value={
          Pagina === "Registrarse"
            ? registro.contrasenia
            : login.contrasenia
        }
        onChange={
          Pagina === "Registrarse"
            ? handleChangeDatosRegistro
            : handleChangeDatosLogeo
        }
      />
      {errores.contrasenia && (
        <p className="text-danger">{errores.contrasenia}</p>
      )}
    </Form.Group>

    {Pagina === "Registrarse" && (
      <Form.Group className="mb-3" controlId="RepContrasenia">
        <Form.Label>Repetir contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Repita su contraseña"
          name="repContrasenia"
          className={
            errores.repContrasenia
              ? "form-control is-invalid"
              : "form-control"
          }
          value={registro.repContrasenia}
          onChange={handleChangeDatosRegistro}
        />
        {errores.repContrasenia && (
          <p className="text-danger">
            {errores.repContrasenia}
          </p>
        )}
      </Form.Group>
    )}

    {Pagina === "Registrarse" && (
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Aceptar términos y condiciones"
          name="terminosYCondiciones"
          checked={registro.terminosYCondiciones}
          onChange={handleChangeDatosRegistro}
        />
        {errores.terminosYCondiciones && (
          <p className="text-danger">
            {errores.terminosYCondiciones}
          </p>
        )}
      </Form.Group>
    )}

    <Container className="text-center my-2">
      <Button
        variant="success"
        className="formc-btn"
        type="submit"
        onClick={
          Pagina === "Registrarse"
            ? handleClickDelBotonParaRegistro
            : handleClickBotonLogueo
        }
      >
        {Pagina === "Registrarse"
          ? "Enviar datos"
          : "Ingresar"}
      </Button>

      {Pagina === "Iniciar_Sesion" && (
        <div className="text-center mt-3">
          <NavLink to="/Recuperar_Contrasenia">
          ¿Olvidaste tu contraseña?
          </NavLink>
        </div>)}

      {Pagina === "Iniciar_Sesion" && (
        <div className="mt-3">
          <p>¿No tienes aún una cuenta?</p>

          <NavLink to="/Registrarse" className="nav-link">
            Registrarse
          </NavLink>
        </div>
      )}
    </Container>
  </Form>
</div>
  )
}

export default Formulario