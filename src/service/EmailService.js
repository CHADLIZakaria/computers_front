import axiosConfig from '../axiosConfig';

class EmailService {
    sendEmail(email) {
        return axiosConfig.post('/mail', email).then(value => value.data).catch(e => console.log(e))
    }
}
export default new EmailService();