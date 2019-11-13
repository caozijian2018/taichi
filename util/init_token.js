import axios_creater from "./axios_creater";
// import ssr_axios from "./ssr_axios";
import bus from "./bus"
export default () => {
  if (process.browser) {
    bus.$emit("login");
    var token = localStorage.video_token;
    if (token) {
      axios_creater.defaults.headers.common["Authorization"] ="Bearer "+ token;//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODQsInVzZXJuYW1lIjoiMTU5Mjg4MDc5NjIiLCJleHAiOjE1NDAwODY4ODAsImVtYWlsIjoiIn0.4VoPQGsb-yfBciNWD0BLy1XBttri2ArU8a-9P6ueflI"  // token;
    }else{
      axios_creater.defaults.headers.common["Authorization"] = null;
    }
  }
};
