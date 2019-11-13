export default (res, vue_obj) => {
  var after = res.target.scrollTop ;
  var to_bottom =after-vue_obj.prev_offset > 0;
  vue_obj.prev_offset = after;
  return to_bottom;
}
