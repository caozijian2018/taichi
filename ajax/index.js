import axios from "axios";
var instance = axios.create({
    baseURL: process.env.baseUrl,// == "production" ? "http://presexvideo.com/backend/" : "http://presexvideo.com/backend/",
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
  });
export default instance;