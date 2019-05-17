import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-9527b.firebaseio.com/'
});
export default instance;