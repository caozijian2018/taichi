<template>
    <div class="fixd">
        <div class="width_40 pcs loginbox">
            <i class="iconfont icon-chacha white cancelLogin position_absolute cursor" @click="close"></i>
            <div class="width_65 margin_auto">
                <div class="display_block margin_bottom_1 font_size_20 text_center white"> {{  $t("words.login") }}</div>
                <div class="">
                    <el-input :clearable="true" v-model="phone" class="login width_100" :placeholder="$t('words.phone_number')"></el-input>
                </div>
                <video-button class="margin_top_20 width_100" :button-text="$t('words.next_step')" @click.native="regist2login"></video-button>
                <div class="white margin_top_20 text_center">
                    {{$t("words.not_register_yet")}} ? <a :href="getLpUrl()" class="white underline cursor">{{$t("words.click_here")}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import glo_request from "../../util/glo_request";
    import axios_creater from "../../util/axios_creater";
    import videoButton from "../../components/button";
    import init_token from "../../util/init_token";
    import getCountry from "../../util/get_country";
    import bus from "../../util/bus";
    import unlogin from "../../util/unlogin";
    
    export default {
        data() {
            return {
                phone: '',
                platform: '',
                password: "123456",
                login_state: "login",
                confirm_password: '',
                temp2:"",
                temp: {
                    UserName: 'abc',
                    ServiceName: 'funnyvideo',
                    RefID: 1,
                    Price: 200,
                    PayWay: 1,
                    Telcold: 1,
                    Item: 'funnyVDO',
                    M1: this.phone, //phone
                    M2: [
                        {service_name: "funnyvideo"},
                        {item: "funnyVDO"},
                        {price: 200},
                        {pay_way: 1},
                    ], //（ServiceName|Item|PayWay）
                    // CallBackURL: 'https://fitness-lib.com/backend/api/v1/twmk/transaction',
                    CallBackURL: 'https://humorboom.com/backend/twmk/transaction',
                    TimeStamp: this.formatTime()
                },
            }
        },
        mounted() {
            this.platform = getCountry();
            this.temp2=JSON.stringify(this.temp)
        },
        methods: {
            formatTime(val) {
                function add0(m) {
                    return m < 10 ? '0' + m : m
                }
                var time = val ? new Date(parseInt(val * 1000)) : new Date()
                var y = time.getFullYear()
                var m = time.getMonth() + 1
                var d = time.getDate()
                var h = time.getHours()
                var i = time.getMinutes()
                var s = time.getSeconds()
                return y + add0(m) + add0(d) + add0(h) + add0(i) + add0(s) + '000'
            },
            getLpUrl() {
                var url;
                switch (this.platform) {
                    case "kw":
                        (() => {
                            url = 'http://static.taichi-lifestyle.com/ae2/lp.html';
                        })();
                        break;
                    default:
                        (() => {
                            url = 'http://static.taichi-lifestyle.com/ae2/lp.html';
                        })();
                        break;
                }
                return url;
            },
            close() {
                if (this.login_state == "change_password") {
                    unlogin();
                }
                this.$emit('close');
            },
            regist2login() {
                bus.$emit('showLoading', true);
                var data =  {
                    username: this.phone,
                    password: 123456
                }
                this.$http( 'login', "post", data).then(res => {
                    this.$emit('close');
                    this.$msg(this.$t('words.login_success'));
                    bus.$emit("loginSuccess");
                    bus.$emit('showLoading', false);
                    localStorage.video_token = res.token;
                    localStorage.phone = this.phone;
                    localStorage.user_id = res.user.id;
                    localStorage.vip_expiration = res.user.vip_expiration;
                    localStorage.create_time = res.user.create_time;
                    this.saveToken(res.token, this.phone);
                    location.href = "/"
                }).catch(res => {
                    this.$msg(this.$t('words.username_or_password_error'), 'error')
                    bus.$emit('showLoading', false);
                })
            },
            saveToken(token, phone) {
                localStorage.video_token = token;
                localStorage.phone = phone;
                init_token();
            },
        },
        components: {
            videoButton
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/glo";
    @import "../../assets/css/current_theme";
    .fixd {
        @media screen and (max-width: 900px) {
            .loginbox {
                width:90%;
            }
        }
        .loginbox {
            .cancelLogin {
                right: 20px;
                top: 20px;
                transition-duration: .2s;
                &:hover {
                    color: @light_gray;
                }
            }
            .underline {
                text-decoration: underline;
            }
            .login input {
                background: @body_color;
                border: 1px solid #464646;
                color: #fff;
            }
            background:@head_bottom_color;
            border-radius:10px;
            padding:40px 0 40px;
        }
        position: fixed;
        top:0;
        right:0;
        bottom:0;
        left:0;
        z-index:1005;
        background: rgba(50, 50, 50, 0.6);
    }
</style>