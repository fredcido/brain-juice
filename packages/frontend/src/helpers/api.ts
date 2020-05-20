import axios from 'axios';
import config from './config';

// TODO Consume global config
axios.defaults.baseURL = config.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
