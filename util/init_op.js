
export default (op) => {
  if (process.browser) {
      if(op){
        localStorage.op = op;
      }
  }
}
