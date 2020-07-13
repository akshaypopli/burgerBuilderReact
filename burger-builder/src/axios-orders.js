import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-63567.firebaseio.com/'
});

export default instance;