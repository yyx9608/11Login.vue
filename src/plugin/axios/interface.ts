import exp from 'constants';
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
export function createTask(params: object) {
  return axios.post('/prj/task/insert', params)
}

function startTask(params: object) {
  return axios.post('/prj/task/start', params)
}
function stopTask(params: object) {
  return axios.post('/prj/task/terminate', params)
}

export default { queryList, login, taskList, createTask, startTask ,stopTask }