import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

$authHost.interceptors.request.use((config) => {
    (config.headers ??= {}).Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

//когда access токен кончается
$authHost.interceptors.response.use((config) => {
    return config
}, async (error) => {

    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && error.config._isRetry) {
        //чтобы не было 401, 401, 401,...
        originalRequest._isRetry = true
        try {
            const response = await $authHost.get(`${process.env.REACT_APP_API_URL}refresh`)
            localStorage.setItem('token', response.data.accessToken)
            return $authHost.request(originalRequest)
        } catch (e) {
            console.log('Не авторизован')
        }
    }
    //если не 401
    throw error
})

export default {
    $authHost,
    $host
}