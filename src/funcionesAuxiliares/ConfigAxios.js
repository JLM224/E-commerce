import axios from "axios"

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND,
})

clienteAxios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json"
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default clienteAxios