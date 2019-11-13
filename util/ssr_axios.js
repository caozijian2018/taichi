import axios from "axios";
import { Message } from 'element-ui'
var instance = axios.create({
    baseURL: "http://presexvideo.com/backend/",//process.env.baseUrl,
    timeout: 5000,
  });
  instance.interceptors.response.use(
    response => response.data,
    error => {
      var err_msg='error';
      Message({
        message: err_msg,
        type: 'error',
        duration: 5 * 1000
      })
      var code=error.response.status;
      return Promise.reject({err_msg,error:"error"})
    });
export default instance;