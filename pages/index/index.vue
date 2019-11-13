<template>
    <div class="container display_flex flex_column" :style="{height:height_}">
        <video-head @showLogin="showLogin" class :class="{height0:is_scroll_bottom}"></video-head>
        <div
            v-loading.fullscreen.lock="fullscreenLoading"
            class="flex_1 overflow_scroll scroll_box"
            style
        >
            <login-box v-if="show_login" @close="show_login=false"></login-box>
            <nuxt-child :is-scroll-bottom="is_scroll_bottom"></nuxt-child>
        </div>
    </div>
</template>

<script>
import videoHead from "../../components/videoHead";
import loginBox from "../../components/loginBox";
import initLanguage from "../../util/init_language";
import initOp from "../../util/init_op";
import bus from "../../util/bus";
import getCountry from "../../util/get_country";
import hasLogin from "../../util/has_login";

import isScrollBottom from "../../util/is_scroll_bottom";

export default {
    components: {
        videoHead,
        loginBox
    },
    data() {
        return {
            prev_scroll: 0,
            height_: "",
            show_login: false,
            is_scroll_bottom: false,
            fullscreenLoading: false
        };
    },
    mounted() {
        this.saveLang();
        this.saveOp();
        this.setHeight();
        this.watchOnresize();
        this.watchBusOfLogin();
        this.watchLogin();
        this.diffrentOp();
       
    },
    methods: {
        diffrentOp() {
            var op = getCountry();
            switch (op) {
                case "tw":
                    (() => {
                        if (!hasLogin() || !localStorage.has_change_password) {
                            this.show_login = true;
                        }
                    })();
                    break;
                default:
                    (() => {})();
                    break;
            }
        },
        watchLogin() {
            bus.$on("showLoginOrHide", v => {
                this.show_login = v;
            });
        },
        watchBusOfLogin() {
            bus.$on("showLoading", v => {
                this.fullscreenLoading = v;
            });
        },
        scroll(res) {
            var is_scroll_bottom = isScrollBottom(res, this);
            this.is_scroll_bottom = is_scroll_bottom;
        },
        saveLang() {
            var lang = this.$route.query.lang || this.$route.query.country;
            initLanguage(lang);
        },
        saveOp() {
            var op = this.$route.query.op || this.$route.query.country;
            initOp(op);
        },
        showLogin() {
            this.show_login = true;
        },
        watchOnresize() {
            window.onresize = this.setHeight;
        },
        setHeight() {
            this.height_ = innerHeight + "px";
        }
    }
};
</script>

<style lang='less'>
</style>