import axios from "axios";
import axiosConfig from '../axiosConfig'
import { hdd } from "../data/data";

class ProductService {
    findAll(page) {
        return axiosConfig.get(`/products?page=${page}`).then(value => value.data).catch(e => console.log(e))
    }

    findById(id) {
        return axiosConfig.get(`/products/${id}`).then(value => value.data)
    }

    deleteById(id) {
        return axiosConfig.delete(`/admin/products/${id}`)
    }
    
    async saveProduct(product) {
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
        formData.append('videoCard', product.videoCard)
        formData.append('systemeExploitation', product.systemeExploitation)

        for (let i = 0; i < product.files.length; i++) {
            formData.append(`files`, product.files[i])
        }

        //formData.append('files', product.files)
        axiosConfig.post('/admin/products/save', 
            formData,
        )
        .then(value => console.log(value.data))
    }
    
    updateProduct(id, product) {
        axiosConfig.put(`/admin/product/${id}`, {
            'model': product.model,
            'ecran': product.ecran,
            'brand': product.brand,
            'price': product.price,
            'hdd': product.hdd,
            'ssd': product.ssd,
            'color': product.color,
            'processor': product.processor,
            'systemeExploitation': product.systeme_exploitation
        })
    }

    searchProducts(keyword) {
        return axiosConfig.get(`/products/search?keyword=${keyword}`).then(value => value.data).catch(e => console.log(e))
    }
}
export default new ProductService();