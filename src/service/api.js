import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 2000
})

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('TOKEN')
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function (error) {
    if(error.response.status === 401) {
        localStorage.removeItem('TOKEN')
        window.location.href = '/login'
    }

    return Promise.reject(error)
})

api.interceptors.response.use(function (response) {
    return response
}, function (error) {
    return Promise.reject(error)
})

