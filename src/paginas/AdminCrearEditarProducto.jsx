import { Container, Form, Button, Image } from "react-bootstrap"
import clienteAxios from "../funcionesAuxiliares/configAxios"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useCallback } from "react"
import Swal from "sweetalert2"

const AdminCrearEditarProducto = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [formularioCrearProducto, setFormularioCrearProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    stock: ""
  })

  const [imagen, setImagen] = useState(null)

  const obtenerProductoPorId = useCallback(async () => {
    try {
      const res = await clienteAxios.get(`/productos/${id}`)
      const producto = res.data.producto

      setFormularioCrearProducto({
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
        stock: producto.stock
      })

      setImagen(producto.imagen)

    } catch (error) {
      console.log("Error al obtener producto", error)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      obtenerProductoPorId()
    }
  }, [id, obtenerProductoPorId])

  const handleChangeFormularioCrearProducto = (ev) => {
    setFormularioCrearProducto({
      ...formularioCrearProducto,
      [ev.target.name]: ev.target.value
    })
  }

  const handleClickFormularioCrearProducto = async (ev) => {
    ev.preventDefault()

    if (
      formularioCrearProducto.nombre.trim() &&
      formularioCrearProducto.descripcion.trim() &&
      formularioCrearProducto.categoria.trim() &&
      formularioCrearProducto.precio !== "" &&
      formularioCrearProducto.stock !== "" &&
      imagen
    ) {
      try {
        const formData = new FormData()

        formData.append("nombre", formularioCrearProducto.nombre)
        formData.append("precio", formularioCrearProducto.precio)
        formData.append("descripcion", formularioCrearProducto.descripcion)
        formData.append("categoria", formularioCrearProducto.categoria)
        formData.append("stock", formularioCrearProducto.stock)
        formData.append("imagen", imagen)

        const res = await clienteAxios.post("/productos", formData)

        if (res.status === 201) {
          Swal.fire({
            title: "Producto creado con éxito",
            text: "En breve serás redirigido a la página de productos.",
            icon: "success"
          })

          setFormularioCrearProducto({
            nombre: "",
            precio: "",
            descripcion: "",
            categoria: "",
            stock: ""
          })

          setImagen(null)

          setTimeout(() => {
            navigate("/Admin_Productos")
          }, 500)
        }

      } catch (error) {
        console.log(error)

        Swal.fire({
          title: "Error",
          text: "No se pudo crear el producto.",
          icon: "error"
        })
      }
    }
  }

  const handleClickFormularioEditarProducto = async (ev) => {
    ev.preventDefault()

    try {
      const formData = new FormData()

      formData.append("nombre", formularioCrearProducto.nombre)
      formData.append("precio", formularioCrearProducto.precio)
      formData.append("descripcion", formularioCrearProducto.descripcion)
      formData.append("categoria", formularioCrearProducto.categoria)
      formData.append("stock", formularioCrearProducto.stock)

      if (imagen && typeof imagen !== "string") {
        formData.append("imagen", imagen)
      }

      const res = await clienteAxios.put(`/productos/${id}`, formData)

      if (res.status === 200) {
        Swal.fire({
          title: "Producto editado con éxito",
          text: "En breve serás redirigido a la página de productos.",
          icon: "success"
        })

        setTimeout(() => {
          navigate("/Admin_Productos")
        }, 500)
      }

    } catch (error) {
      console.log(error)

      Swal.fire({
        title: "Error",
        text: "No se pudo editar el producto.",
        icon: "error"
      })
    }
  }

  return (
    <Container className="form-container">
      <h2>{id ? "Editar Producto" : "Crear Producto"}</h2>
      <hr />

      <Form
        onSubmit={
          id
            ? handleClickFormularioEditarProducto
            : handleClickFormularioCrearProducto
        }
      >

          {!id && (
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
           type="text"
           name="nombre"
           value={formularioCrearProducto.nombre}
           onChange={handleChangeFormularioCrearProducto}
           placeholder="Introduce el nombre del producto" />
        </Form.Group>)}

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={formularioCrearProducto.precio}
            onChange={handleChangeFormularioCrearProducto}
            placeholder="Introduce el precio del producto"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="descripcion"
            value={formularioCrearProducto.descripcion}
            onChange={handleChangeFormularioCrearProducto}
            placeholder="Introduce la descripción del producto"
          />
        </Form.Group>

          {!id && (
        <Form.Select name="categoria" value={formularioCrearProducto.categoria}
          onChange={handleChangeFormularioCrearProducto} className="my-3">
         <option value="">Seleccione una categoría</option>
         <option value="alimentos">Alimentos</option>
         <option value="bebidas">Bebidas</option>
         <option value="lacteos">Lácteos</option>
         <option value="congelados">Congelados</option>
         <option value="snaks">Snaks</option>
         <option value="limpieza">Limpieza</option>
         <option value="higiene_personal">Higiene Personal</option>
         <option value="Otros">Otros</option>
        </Form.Select>)}

        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={formularioCrearProducto.stock}
            onChange={handleChangeFormularioCrearProducto}
            placeholder="Introduce el stock del producto"
          />
        </Form.Group>

        {typeof imagen === "string" && (
          <div className="mb-3 text-center">
            <Image
              src={imagen}
              alt="Imagen del producto"
              rounded
              fluid
              style={{ maxWidth: "250px" }}
            />
          </div>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="file"
            name="imagen"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            {id ? "Guardar cambios" : "Crear producto"}
          </Button>
        </div>

      </Form>
    </Container>
  )
}

export default AdminCrearEditarProducto