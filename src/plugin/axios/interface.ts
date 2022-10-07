import axios from './index';


// 
export function queryList(params: object) {
  return axios.post('/prj/lab/queryList', params);
}
export function taskList(params: object) {
  return axios.post('/prj/task/queryList', params);
}
export function login(params: object) {
  return axios.post('/login', params, { headers: { 'content-type': 'multipart/form-data' } });
}


export default { queryList, login, taskList }