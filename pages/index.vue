<template>
  <div class="container">
    <nuxt/>
  </div>
</template>

<script>
  import Vue from "vue";
  import "../util/glo_request";
  import "../util/filter";
  import "../util/msg";
  import "../util/es62es5";
  import jquery from "jquery";
  Vue.prototype.$jquery = jquery;
  import init_token from "../util/init_token";
  init_token();
  export default {
    mounted() {
    }
  }
</script>

<style lang="less">
  @import "../assets/css/iconfont/iconfont.css";
  // @import "http://at.alicdn.com/t/font_843189_zrgmiohmyin.css";
  @import "../assets/css/current_theme";
  @import "../assets/css/current_app";

  body {
    background: @gray_back;
  }
  
  .container {
    width: 100%;
  }
</style>

