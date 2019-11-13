<template>
    <div class="video_box video_padding_1 box_szing" @click="watchMovie">
        <div class="position_relative">
            <img :src="imgSrc" class="width_100" v-show="img_loaded" alt="" @load="img_loaded=true" srcset="">
            <img src="../../static/img/timg.gif" v-if="!img_loaded" class="width_100" alt="">
            <!-- <div class="position_absolute   white time_box">
                {{item.video_duration | secendToTime}}
            </div> -->
        </div>
        <div class="white margin_top_1 margin_bottom_1 phone_hidden">
            {{item.title}}
        </div>
        <div class="display_flex flex_jusify_space gray phone_hidden">
            <div class="display_flex flex_align_center">
                <i class="iconfont icon-chakanguo"></i> <span> 152212</span>
            </div>
            <div class="text_center display_flex flex_align_center">
                <i class="iconfont icon-ai253 "></i> <span> 2018-2-22</span>
            </div>
            <div class="text_right display_flex flex_align_center padding_right_1">
                <i class="iconfont icon-aixin" style="font-size:12px;"></i> <span> 1242</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            watchMovie(){
                this.$router.push({path:`/home/${this.item.id}`});
            },
        },
        data(){
            return {
                img_loaded:false
            }
        },
        filters:{
            secendToTime(s){
                var H = String(Math.floor(s/3600))//.padStart(2,0);
                var m = String(Math.floor(s/60)%60)//.padStart(2,0);
                var s = String((s%60)).padStart(2,0);
                var time =H+":"+m+":"+s;
                return time;
            }
        },
        props:{
            imgSrc:{
                type:String,
                default:"http://assets.pure-babe.com/NicePic/cover/city0005/de7e315a2b9d6d417fea03b094bc2655.jpg",
            },
            item:{
                type:Object,
            }
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/glo";
    @media screen and (max-width:800px){
        .phone_hidden {
            display: none;
        }
    }
    .video_box {
        &.video_padding_1{
            padding:0 3px 10px;
        }
        .gray{
            color:@gray;
        }
        background:@head_bottom_color;
        .time_box {
            right: 10px;
            bottom: 10px;
            padding: 2px 5px;
            background:@head_bottom_color
        }
    }
</style>