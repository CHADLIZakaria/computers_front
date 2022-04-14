import axios from "axios"

class AuthentificationService {
    login(username, password) {
        const formData = new FormData();
        formData.append('username', username)
        formData.append('password', password)
        axios.post('http://localhost:8080/api/login', formData, {headers: {'content-type': 'application/json'}})
        .then(value => {
            if(value.data.access_token) {
                localStorage.setItem("user", value.data.access_token)
            }
            return value.data;
        })
    }
    
    logout() {
        localStorage.removeItem("user")
    }

    setCurrentUser() {
        
    }
}
export default new AuthentificationService()