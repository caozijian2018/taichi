if(!String.prototype.repeat){
  String.prototype.repeat=function(num){
    var str="";
    for(var i=0;i<num;i++){
      str+=this;
    }
    return str;
  }
}

if (!String.prototype.padStart) {
   String.prototype.padStart = function (length, what) {
     if (this.length < length) {
       var str = String(what).repeat(length);
       return str.slice(0, str.length - this.length) + this;
     }else{
       return this;
     }
   }
 }
