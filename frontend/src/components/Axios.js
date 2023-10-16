import axios from 'axios'



const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:8000/api/',
    timeout:10000,
    headers:{
        Authorization: localStorage.getItem('access_token') ? 'JWT ' + localStorage.getItem('access_token'):null,
        'Content-Type':'application/json',
        Accept:'application/json'
    }
})


export default axiosInstance