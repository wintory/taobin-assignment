import axios from 'axios';
import Config from '../configs';

const ApiClient = axios.create({
  baseURL: `${Config.GITHUB_REPOSITORY_URL}/api`,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 5000,
});

export default ApiClient;
