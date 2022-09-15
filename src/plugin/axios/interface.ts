import axios from './index';

export function login(params: object) {
  return axios.post('/login', params);
}
