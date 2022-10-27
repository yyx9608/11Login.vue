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

function sampleResult(params: object) {
  return axios.post('/prj/task/result/queryList', params)
}
function sampleInfo(params: object) {
  return axios.post('/prj/sample/queryList', params)
}
function generateRepo(params: object) {
  return axios.post( '/prj/task/result/report', params)
}

function sampleVerify(params: object) {
  return axios.post( '/prj/sample/verify', params)
}
function resultVerify(params: object) {
  return axios.post( '/prj/task/result/verify', params)
}
export default { queryList, login, taskList, createTask, startTask ,stopTask , sampleResult ,sampleInfo ,generateRepo ,sampleVerify ,resultVerify}