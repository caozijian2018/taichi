<template>
    <div class="describeBox text_center font_size_15">
        <!-- <a :href="'http://humorboom.com/?op='+platform" class="white">{{$t('words.home')}}</a>
        <a class="white" :href="'http://static.humorboom.com/'+platform+'/terms.html'">-{{$t('words.terms')}}</a>
        <a href="#" class="white" @click="cancelSub" v-if="show_cancel"> - {{$t('words.cancel')}}</a> -->
    </div>
</template>

<script>
    import getCountry from "../../util/get_country"
    import go4url from "../../util/go4url"
    
    export default {
        data() {
            return {
                platform: "",
                show_term: true,
                show_cancel: true,
            }
        },
        mounted() {
            this.setCountry();
            this.showTermsCancel();
        },
        methods: {
            setCountry() {
                this.$nextTick(() => {
                    this.platform = getCountry();
                })
            },
            showTermsCancel() {
                this.$nextTick(() => {
                    switch (this.platform) {
                        case "tw":
                            (() => {
                                this.show_term = false
                            })();
                            break;
                    }
                })
            },
            cancelSub(terms) {
                var phone = localStorage.phone;
                var platform = this.platform;
                var href_;
                switch (platform) {
                    case "tw":
                        (() => {
                            href_ = "http://static.humorboom.com/" + platform + "/cancel.html?phone=" + phone;
                            location.href = href_;
                        })();
                        break;
                    default:
                        (() => {
                            if (phone) {
                                href_ = "http://static.humorboom.com/" + platform + "/cancel.html?phone=" + phone;
                                location.href = href_;
                            } else {
                                location.href = go4url("unlogin");
                            }
                        })();
                }
    
            },
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/current_theme.less";
    .describeBox {
        background: @light_gray;
        padding: 10px;
        color: #fff;
    }
</style>