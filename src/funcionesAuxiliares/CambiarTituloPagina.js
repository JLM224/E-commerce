export const cambiarTituloPagina = (idPagina) => {
    const titulos = {
    "Pagina Principal": "Página Principal",
    "Sobre Nosotros": "Sobre Nosotros",
    "Contacto": "Contacto",
    "Iniciar Sesion": "Iniciar Sesion",
    "Registrarse": "Registrarse",
    "Recuperar Contraseña": "Recuperar Contraseña",
    "Restablecer Contraseña": "Restablecer Contraseña",
    "Error 404": "Página no encontrada"
    }
    document.title = titulos[idPagina] || "E-commerse"
}