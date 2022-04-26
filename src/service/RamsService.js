import axios from "axios";
import axiosConfig from '../axiosConfig'

class RamsService {
    async findAll() {
        try {
            const value = await axiosConfig.get(`/admin/rams`);
            console.log(value.data)
            return value.data;
        } catch (e) {
            return console.log(e);
        }
    }
    async save(values) {
        try {
            const value = await axiosConfig.post(`/admin/rams/save`, 
            {
                "ram": values.ram
            } 
            );
            return value.data;
        } catch (e) {
            return console.log(e);
        }
    }

    async deleteById(id) {
        axiosConfig.delete(`/admin/rams/${id}`);
    }

    async update(ram) {
        try {
            const value = await axiosConfig.put(`/admin/rams/${ram.id}`, 
                {
                    "ram": ram.ram
                }
            );
            return value.data;
        } catch (e) {
            return console.log(e);
        }
    }
}
export default new RamsService();