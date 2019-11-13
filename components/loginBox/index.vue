<template>
    <div class="fixd">
        <div class="width_40 pcs loginbox">
            <i class="iconfont icon-chacha white cancelLogin position_absolute cursor" @click="close"></i>
            <div class="width_65 margin_auto">
                <div class="display_block margin_bottom_1 font_size_20 text_center white"> {{ login_state == "login" ? $t("words.login") : login_state=="input_password" ? $t('words.input_password') : $t('words.change_password')}}</div>
                <div class="" v-if="login_state=='login'">
                    <el-input :clearable="true" v-model="phone" class="login width_100" :placeholder="$t('words.phone_number')"></el-input>
                </div>
                <div v-else-if="login_state=='change_password'">
                    <el-input type="password" :clearable="true" v-model="password" class="login width_100" :placeholder="$t('words.password')"></el-input>
                    <el-input type="password" :clearable="true" v-model="confirm_password" class="login margin_top_10 width_100" :placeholder="$t('words.confirm_password')"></el-input>
                </div>
                <div v-else-if="login_state=='input_password'">
                    <el-input  type="password" :clearable="true" v-model="password" class="login width_100" :placeholder="$t('words.password')"></el-input>
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
                    case "tw":
                        (() => {
                            url = 'http://static.humorboom.com/tw/tw1/x-lp-funny.html?temp='+this.temp2;
                        })();
                        break;
                    default:
                        (() => {
                            url = 'http://static.humorboom.com/' + this.platform + '/lp.html';
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
                if (this.login_state == "change_password") {
                    if (this.password == "123456") {
                        this.$msg(this.$t('words.not_123456'), 'error');
                        bus.$emit('showLoading', false);
                        return;
                    }
                    if (this.password != this.confirm_password) {
                        this.$msg(this.$t('words.password_not_equally'), 'error');
                        bus.$emit('showLoading', false);
                        return;
                    }
                }
                var data = this.login_state == 　"change_password" ? {
                    old_password: '123456',
                    new_password: this.password
                } : {
                    username: this.phone,
                    password: this.password
                }
                this.$http(this.login_state === 'change_password' ? 'user/1' : 'login', this.login_state === 'change_password' ? 'patch' : "post", data).then(res => {
                    if (this.login_state == "change_password") {
                        this.login_state = "login";
                        this.regist2login();
                    } else {
                        this.saveToken(res.token, this.phone);
                        if (this.password == '123456') {
                            this.password = "";
                            this.login_state = "change_password"
                        } else {
                            this.$emit('close');
                            this.$msg(this.$t('words.login_success'));
                            bus.$emit("loginSuccess");
                            localStorage.has_change_password = 1;
                        }
                    }
                    bus.$emit('showLoading', false);
                }).catch(res => {
                    if (this.password == "123456") {
                        this.password = "";
                        this.login_state = 'input_password';
                    } else {
                        if(this.login_state == "change_password"){
                            this.$msg(this.$t('words.changepassword_error'), 'error')
                        }else{
                            this.$msg(this.$t('words.username_or_password_error'), 'error')
                        }
                    }
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