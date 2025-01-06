import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage.js'

axios.defaults.baseURL = 'http://localhost:8000/api'

axios.interceptors.request.use(config => {

    return config
})

export default axios