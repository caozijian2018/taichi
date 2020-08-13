<template>
    <div>
        <!-- •MSISDN号码
        •退订链接
        •订阅日期，下次续订日期和到期日期 Subscription date, Next renewals date and Expiry date
        •应用计划（每周/每天/每月）
        •服务名称
        •服务徽标-->
        <div class="width_80 phone_width_97 margin_auto margin_top_20 white font_size_20">
            <div>
                <div >
                    <div class="text_center">
                        <span style="font-size: 40px; color: white">taichi-lifestyle</span>
                        <img src="../../../static/img/logo.png" style="width: 200px;" alt />
                    </div>
                    <div id="bbox" class="width_90 margin_auto">
                        <div class="display_flex">
                            <div class="item_tb">Phone number</div>
                            <div class="item_tb">{{phone}}</div>
                        </div>
                        <div class="display_flex">
                            <div class="item_tb">Sub type</div>
                            <div class="item_tb">{{getUserTypeIsMonth()}}</div>
                        </div>
                        <div class="display_flex">
                            <div class="item_tb">Sub Plan</div>
                            <div class="item_tb">{{getUserMn()}}</div>
                        </div>
                        <div class="display_flex" v-if="create_time">
                            <div class="item_tb">Sub date</div>
                            <div class="item_tb">{{getsub()}}</div>
                        </div>
                        <div class="display_flex" v-if="vip_expiration">
                            <div class="item_tb">Sub expiry date</div>
                            <div class="item_tb">{{getVip_expiration()}}</div>
                        </div>
                        <div class="display_flex"  v-if="vip_expiration">
                            <div class="item_tb">Next Renewal date</div>
                            <div class="item_tb">{{getVip_expiration()}}</div>
                        </div>
                    </div>
                    <a class="display_block buttonss" @click="cancel()" v-if="op=='kw'">Unsubscribe</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import getOp from "../../../util/get_country";
import unlogin from "../../../util/unlogin";
import init_token from "../../../util/init_token";
export default {
    data() {
        return {
            op: "",
            phone: "",
            vip_expiration: "",
            create_time: "",
            sub_id: "",
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.op = getOp();
        });
        this.phone = localStorage.phone;
        // this.create_time = localStorage.create_time;
        this.login();
    },
    methods: {
        cancel() {
            // /kwnth/sub/cancel/
            this.$http("/kwmt2/unsubscribe/", "post", {
                userid: localStorage.user_id,
                msisdn: this.phone
            }).then(res => {
                if(res.code == 0){
                    this.$msg("unsubscribe Success")
                }else{
                    this.$msg("unsubscribe Faild")
                }
            });
        },
        getVip_expiration() {
            var year = this.vip_expiration.split("T")[0];
            var hour = new Date(this.vip_expiration).getHours();
            var mit = new Date(this.vip_expiration).getMinutes();
            return year + " " + hour + ":" + mit 
        },
        getsub() {
            var year = this.create_time.split("T")[0];
            var hour = new Date(this.create_time).getHours();
            var mit = new Date(this.create_time).getMinutes();
            return year + " " + hour + ":" + mit
        },
        getUserTypeIsMonth() {
            return new Date(this.vip_expiration).getTime() -
                new Date(this.create_time).getTime() >
                3600 * 1000 * 24 * 8
                ? "monthly"
                : "weekly";
        },
        getUserMn() {
            return new Date(this.vip_expiration).getTime() -
                new Date(this.create_time).getTime() >
                3600 * 1000 * 24 * 8
                ? "3,00"
                : "0.8";
        },
        login() {
            var phone = this.phone;
            // unlogin();
            this.$http("login", "post", {
                username: phone,
                password: "123456"
            })
                .then(res => {
                    this.vip_expiration = res.user.vip_expiration
                    this.create_time = res.user.create_time;
                    localStorage.video_token = res.token;
                    localStorage.user_id = res.user.id;
                    init_token();
                     
                }).catch(res=>{
                    unlogin();
                    location.href = "./"
                })
        },
    }
};
</script>
<style lang='less'>
.buttonss {
    width: 180px;
    height: 40px;
    line-height: 40px;
    background: cornflowerblue;
    border-radius: 20px;
    color: white;
    font-size: 18px;
    font-weight: 800;
    text-align: center;
    margin: 20px auto 0;
}
#bbox {
    .item_tb {
        width: 50%;
        border: 1px solid #dddddd;
        background: #999999;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 17px;
    }
}
</style>