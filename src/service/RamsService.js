import axios from "axios";

class RamsService {
    async findAll() {
        try {
            const value = await axios.get(`http://localhost:8080/api/admin/rams`, {
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6YWthcmlhIiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJleHAiOjE2NTA4NTgxNDd9.JSlDI2xui6zEcuZ7kzsG2Ijtnun7nRwmPf5BTYGaYDg'
                }
            });
            return value.data;
        } catch (e) {
            return console.log(e);
        }
    }
    async save(values) {
        try {
            const value = await axios.post(`http://localhost:8080/api/admin/rams/save`, 
            {
                "ram": values.ram
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6YWthcmlhIiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJleHAiOjE2NTA4NTgxNDd9.JSlDI2xui6zEcuZ7kzsG2Ijtnun7nRwmPf5BTYGaYDg'
                }
            }, 
            );
            return value.data;
        } catch (e) {
            return console.log(e);
        }
    }

    async deleteById(id) {
        axios.delete(`http://localhost:8080/api/admin/rams/${id}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6YWthcmlhIiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJleHAiOjE2NTA4NTgxNDd9.JSlDI2xui6zEcuZ7kzsG2Ijtnun7nRwmPf5BTYGaYDg'
            }
        }, 
        );
    }

    async update(ram) {
        try {
            const value = await axios.put(`http://localhost:8080/api/admin/rams/${ram.id}`, 
            {
                "ram": ram.ram
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6YWthcmlhIiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJleHAiOjE2NTA4NTgxNDd9.JSlDI2xui6zEcuZ7kzsG2Ijtnun7nRwmPf5BTYGaYDg'
                }
            }, 
            );
            return value.data;
        } catch (e) {
            return console.log(e);
        }
    }
}
export default new RamsService();