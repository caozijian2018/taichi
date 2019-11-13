import getCurrentApp from "./get_current_app"
export default (arr)=>{
    var currentapp=getCurrentApp()
    for(var v of arr){
        if (v.name == currentapp){
            return v;
        }
    }
}