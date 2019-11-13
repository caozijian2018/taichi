export default ()=>{ if(process.env.THEME=='dark'){
    require("../assets/css/dark.less")
  }else if(process.env.THEME=='light'){
    require("../assets/css/light.less")
  }}