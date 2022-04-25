import axios from "axios";
import axiosConfig from '../axiosConfig'

class ProductService {
    findAll(page) {
        return axiosConfig.get(`/products?page=${page}`).then(value => value.data).catch(e => console.log(e))
    }

    findById(id) {
        return axios.get(`http://localhost:8080/api/products/${id}`).then(value => value.data)
    }

    findByCategories(categoryName) {
        return axios.get(`http://localhost:8080/api/category/${categoryName}/products`).then(value => value.data).catch(e => console.log(e))       
    }
    deleteById(id) {
       return axiosConfig.delete(`/admin/api/products/${id}`)
    }

    async saveProduct(product) {
        const formData = new FormData();
        formData.append('title', product.title)
        formData.append('description', product.description)
        formData.append('price', product.price)
        formData.append('mark', product.mark)
        formData.append('model', product.model)
        formData.append('ram', product.ram)
        formData.append('reference', product.reference)
        formData.append('stockage', product.stockage)
        formData.append('processeur', product.processeur)
        formData.append('quantite', product.quantite)
        formData.append('ecran', product.ecran)
        formData.append('systeme_exploitation', product.systeme_exploitation)
        formData.append('autonomie', product.autonomie)
        formData.append('file', product.file)
        axiosConfig.post('/admin/products/save', 
            formData,
        ).then(value => console.log(value))
    }
    
}
export default new ProductService();