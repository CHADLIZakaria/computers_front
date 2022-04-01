import axios from "axios";

class CommentService {
    findAll(page) {
        return axios.get(`http://localhost:8080/api/comments?page=${page}`).then(value => value.data).catch(e => console.log(e))
    }
}
export default new CommentService()