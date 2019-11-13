import Vue from 'vue';
import { Message } from 'element-ui';
Vue.prototype.$msg =(msg='success',type="success")=>{
    Message({
        message: msg,
        type: type,
        duration:3000,
        customClass:"msg",
      });
 }
