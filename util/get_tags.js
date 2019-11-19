import getCurrentApp from "./get_current_app"
import store from "../store"
export default (arr)=>{
    // 如果是太极获取全部的tag 如果是healthylife 获取在show_other_tag的 然后排重
    var show_other_tag = store().state.show_tag_list;
    var currentapp=getCurrentApp()
    var tags = []
    for(var v of arr){
        if (v.name == currentapp || v.name == "healthy-life-now"){
            if(v.name == "healthy-life-now"){
                for(var healthy_tag of v.tags){
                    var ss = healthy_tag;
                    if(show_other_tag.indexOf(healthy_tag.original_name) > -1){
                        tags.push(healthy_tag)
                    }
                }
            }else{
                tags = tags.concat(v.tags)
            }
        }
    }
    var hash_map ={}
    var filter_tag = tags.filter((item,index,arr)   =>{
        var k = item.original_name
        if(hash_map[k]){
            return false
        }{
            hash_map[k] = 1
            return true
        }
    })
    return filter_tag;
}