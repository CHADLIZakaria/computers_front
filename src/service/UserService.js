import axiosConfig from '../axiosConfig';

class UserService {
    findAll() {
        return axiosConfig.get(`/users`).then(value => value.data).catch(e => console.log(e))
    }

    deleteById(id) {
        return axiosConfig.delete(`/user/${id}`)
    }

    save(user) {
        return axiosConfig.post('/user/save', user).then(value => value.data).catch(e => console.log(e))
    }
    update(userUpdatePassword) {
        return axiosConfig.post('/user/updatePassword', userUpdatePassword).then(value => value.data).catch(e => console.log(e))
    }
}
export default new UserService();