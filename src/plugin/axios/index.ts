import axios from 'axios';

const str = process.env.NODE_ENV === 'development' ? '/devServer' : 'http://1486641sd0.iask.in:35485'
axios.defaults.baseURL = str;


export default axios;
