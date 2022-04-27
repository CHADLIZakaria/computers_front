import axios from "axios";
import axiosConfig from '../axiosConfig'

class ProductService {
    findAll(page) {
        return axiosConfig.get(`/products?page=${page}`).then(value => value.data).catch(e => console.log(e))
    }

    findById(id) {
        return axios.get(`http://localhost:8080/api/products/${id}`).then(value => value.data)
    }

    deleteById(id) {
        return axiosConfig.delete(`/admin/products/${id}`)
    }

    async saveProduct(product) {
        console.log(product)
        const formData = new FormData();
        formData.append('brand', product.brand)
        formData.append('color', product.color)
        formData.append('ecran', product.ecran)
        formData.append('price', product.price)
        formData.append('model', product.model)
        formData.append('ram', product.ram)
        formData.append('hdd', product.hdd)
        formData.append('ssd', product.ssd)
        formData.append('processor', product.processor)
        formData.append('systeme_exploitation', product.systeme_exploitation)
        formData.append('file', product.file)
        axiosConfig.post('/admin/products/save', 
            formData,
        ).then(value => console.log("hi"))
    }
    
}
export default new ProductService();