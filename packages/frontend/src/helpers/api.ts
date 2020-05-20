import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : 'https://mind-juice.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
