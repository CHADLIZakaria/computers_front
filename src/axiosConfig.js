import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/'
})
instance.defaults.headers.post['Content-Type'] = 'application/json';
if(localStorage.getItem('user')) {
    //instance.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('user');
}

export default instance