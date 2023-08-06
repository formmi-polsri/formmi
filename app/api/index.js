import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.formmi.tech'
})

export default api