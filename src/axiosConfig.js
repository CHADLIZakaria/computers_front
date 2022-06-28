import axios from "axios";

const instance = axios.create({
    baseURL: 'https://computers-app.herokuapp.com/api/'
})
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance