import { Base64 } from 'js-base64';
import getCountry from "./get_country";
var getIosTime =()=>{
    // var d = new Date();
    var date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/\.[\d]{3}/, '');
    return date
}
var getSubId = ()=>{
    // var subid = location.href.toLowerCase().split("?refid=")[1];
    var text =  new Date().getTime();
    return text;
}
var getBase64=() =>{
    var country = getCountry();
    var dreamfi;
    switch(country){
        case "pt": (()=>{
            dreamfi="dreamfiiptapi"    
        })();break;
        case "es": (()=>{
            dreamfi="dreamfiiesapi"    
        })();break;
    }
    return '&dcbAuth=' + Base64.encode(dreamfi + "#" + getIosTime() + "#"+getSubId());
}
export default (unlogin)=>{
    var dcbReturnUrl;
    var dcbService;
    var islogin="";
    if(unlogin){
        islogin = "?unlogin=1";
    }
    var country = getCountry();
    switch(country){
        case "pt": (()=>{
            dcbService="PRD_DREAMFII_PT_HUMORBOOM_GENERIC";
            dcbReturnUrl="http://static.humorboom.com/pt/welcome.html"})();break;
        case "es": (()=>{
            dcbService="PRD_DREAMFII_ES_HUMORBOOM_PORTAL";
            dcbReturnUrl="http://static.humorboom.com/es/subscribed.html"})();break;
    }
    var base_url = "http://wf.mobibox.pt/api/wbV2WebFlow/";
    base_url += "?dcbReturnUrl="+encodeURIComponent(dcbReturnUrl+islogin);
    base_url += "&dcbService="+dcbService;
    base_url += getBase64();
    return base_url;
}