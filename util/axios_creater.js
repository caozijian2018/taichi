import axios from 'axios'
import Vue from "vue"
const service = axios.create({
  timeout: 10000, // request timeout
  baseURL:process.env.baseUrl
});
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})
service.interceptors.response.use(
  response => response.data,
  error => {
    var err_msg='error';
    var code = error.response && error.response.status || '00';
    return Promise.reject({err_msg,error:"error",code})
  });
export default service
