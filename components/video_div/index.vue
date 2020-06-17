<template>
    <div @click="goWatchMp4(item.id)" class="width_100 video_box margin_bottom_1">
        <div class="hover_img position_relative text_center margin_bottom-1 overflow_hidden" :style="{height:boxheight+'px'}">
            <i class="pcs iconfont icon-weibiaoti1 white play pc_none"></i>
            <div class="width_100 height_100 img_box">
                <img @load="loadImg($event)" :src="prefix + item.cover +'?AuthInfo='+$store.state.file_token" class="pcs video_img_box" style="" alt="">
            </div>
            <div class="hoverdiv mp4hover">
                <div class="white pcs">
                    WATCH IT <i class="iconfont icon-xiangyou"></i>
                </div>
            </div>
            <!-- <div class="video_box_icon white">
                <i class="iconfont icon-bofang"></i> {{item.video_duration || 0 | secendToTime}}
            </div> -->
        </div>
        <div class="padding_1 font back_white">
            <div class="title_text">
                {{item.title}}
            </div>
            <div class="box_footer display_flex flex_align_center  margin_top_10">
                <i class="iconfont icon-shijian1"></i> {{getrandomTime(item.id)}}
                <i class="padding_left_1 iconfont icon-chakanguo" style="font-size:22px"></i> {{(item.show_cnt | parseInt(Math.random()*100)) + 1068}}
                <i class="padding_left_1 iconfont icon-star_full"></i> {{item.id}}
            </div>
        </div>
    </div>
</template>

<script>
    import getCurrentPrefix from "../../util/get_current_prefix"
    export default {
        props: {
            item: {
                type: Object
            }
        },
        data() {
            return {
                boxheight: "",
                boxwidth: "",
                prefix: getCurrentPrefix()
            }
        },
        mounted() {
            this.setWidthandHeight();
        },
        filters: {
            yearMonthDay(val) {
                try {
                    return val.split("T")[0]
                } catch (error) {
                    return "time error"
                }
            },
            secendToTime(s) {
                var H = String(Math.floor(s / 3600)).padStart(2, 0);
                var m = String(Math.floor(s / 60) % 60).padStart(2, 0);
                var S = String(s % 60).padStart(2, 0);
                var time = H + ":" + m + ":" + S;
                return time;
            }
        },
        methods: {
            getrandomTime(id){
               var random_arr_time = [94, 175, 157, 12, 57, 125, 168, 35, 154, 9, 119, 126, 132, 61, 157, 9, 89, 35, 38, 41, 157, 52, 59, 31, 119, 43, 37, 55, 150, 71, 135, 164, 125, 46, 68, 103, 105, 119, 37, 29, 148, 39, 143, 145, 80, 65, 47, 100, 33, 13, 70, 24, 151, 85, 177, 35, 30, 86, 8, 174, 4, 14, 66, 47, 3, 131, 37, 72, 120, 133, 164, 176, 63, 110, 19, 62, 171, 69, 16, 110]
               var index = id % random_arr_time.length;
               var seconds = new Date().getTime() - random_arr_time[index]*24*60*60*1000
               var new_date  = new Date(seconds).getFullYear() +'-'+  (new Date(seconds).getMonth()+1) +'-'+  new Date(seconds).getDate();
               return new_date;
            },
            goWatchMp4(id) {
                this.$router.push({
                    path: "/" + id
                });
            },
            loadImg(e) {
                var img = e.target;
                this.$set(this.item, 'showloading', true);
                this.$nextTick(() => {
                    var divbox = this.$jquery(img.parentNode);
                    var imgtoheightratio = parseFloat(img.width) / parseFloat(img.height);
                    var divtoheightratio = this.boxwidth / this.boxheight;
                    imgtoheightratio / divtoheightratio > 1 ? this.$jquery(img).css("height", "100%") : this.$jquery(img).css("width", "100%");
                });
            },
            setWidthandHeight() {
                var boxwidth;
                try { 
                    boxwidth = this.$jquery(".video_box")[1].offsetWidth;
                } catch (error) {
                    boxwidth = parseFloat(this.$jquery(this.$jquery('.video_box')[this.$jquery(".video_box").length - 1]).css('width'));
                }
                this.boxwidth = boxwidth; // 
                var boxheight = this.boxwidth / 1.2;
                this.boxheight = boxheight
            }
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/current_theme";
    .video_box {
        .title_text {
            font-size: 19px;
        }
        transition-property: box-shadow;
        transition-duration: .4s;
        .img_box {
            //height:200px;
            position: relative;
            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .pc_none {
            z-index: 10001;
        }
        .mp4hover {
            display: none;
        }
        .margin_bottom-1 {
            margin-bottom: -1px;
        }
        .video_box_icon {
            position: absolute;
            left: 0;
            bottom: 2px;
            padding: 4px 10px;
            color: #fff;
            z-index: 1004;
            background: @light_gray;
        }
        .play {
            font-size: 40px;
        }
        .box_footer {
            color: @font_gray;
        }
        @media screen and (min-width:800px) {
            .pc_none {
                display: none;
            }
            &:hover {
                box-shadow: 5px 5px 10px rgba(30, 30, 30, 1.0);
            }
            .hover_img {
                &:hover .mp4hover {
                    display: block;
                    z-index: 10002;
                }
                &:hover img {
                    transform-origin: 50% 50%;
                    transform: translate(-50%, -50%) scale(1.4, 1.4);
                    transition: .3s;
                }
            }
        }
    }
</style>