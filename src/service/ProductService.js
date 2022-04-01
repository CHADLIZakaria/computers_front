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
        let category = await CategoryService.findCategoryById(product.category).then(value => value.data)
        const formData = new FormData();
        const categoryFormData = new FormData();
        categoryFormData.append("id", category.id)
        categoryFormData.append("name", category.name)
        categoryFormData.append("icon", category.icon)
        formData.append('title', product.name)
        formData.append('description', product.description)
        formData.append('price', product.price)
        formData.append('file', product.file)
        formData.append('category.id', category.id)
        formData.append('category.name', category.name)
        formData.append('category.icon', category.icon)
        axios.post('http://localhost:8080/api/products/save', 
        formData,
        ).then(value => console.log(value))

    }
}
export default new ProductService();