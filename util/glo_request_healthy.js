import Vue from 'vue';
import request from './healthy_axios_creater';
// import ssr_request from './ssr_axios';
import api_list from "./api_list";
var allRequest = (request_name,methods='get',params={}) => {
  var get_url_from_list = !request_name.match(/[\?\/]/);
  var api_arr = ['album', 'user'];
  var vnum = 'v1';
  for(var v of api_arr){
    if(request_name.match(v)){
      if(request_name.match(/album/)){
        vnum = 'v1';
      }else{
        vnum = 'v2'; 
      }
      break;
    };
  }
  var url =  get_url_from_list ? api_list[request_name] : request_name;
  var params_obj={
    url:`/backend_healthy/api/${vnum}/`+url,
    method:methods,
  };
  if(methods=='get'){
    params_obj.params=params;
  }else{
    params_obj.data=params;
  }
  return request(params_obj) ;
}
export default allRequest;
Vue.prototype.$http_healthy = allRequest;
