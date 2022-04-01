import axios from "axios";
import CategoryService from "./CategoryService";

class ProductService {
    findAll(page) {
        return axios.get(`http://localhost:8080/api/products?page=${page}`).then(value => value.data).catch(e => console.log(e))
    }

    findById(id) {
        return axios.get(`http://localhost:8080/api/products/${id}`).then(value => value.data)
    }

    findByCategories(categoryName) {
        return axios.get(`http://localhost:8080/api/category/${categoryName}/products`).then(value => value.data).catch(e => console.log(e))       
    }

    async saveProduct(product) {
        const formData = new FormData();
        formData.append('title', product.name)
        formData.append('description', product.description)
        formData.append('price', product.price)
        formData.append('file', product.file)
        axios.post('http://localhost:8080/api/products/save', 
        formData,
        ).then(value => console.log(value))

    }
}
export default new ProductService();