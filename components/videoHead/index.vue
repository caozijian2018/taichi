<template>
    <div class="bigbox">
        <div class="head_box">
            <div class="display_flex head_innerbox flex_jusify_space">
                <div class="display_flex flex_align_center">
                    <!-- <img
                        src="../../static/img/people.png"
                        @click="goHome"
                        class="cursor head_img padding_left_1"
                        alt
                    />-->
                    <img
                        src="../../static/img/logo.png"
                        @click="goHome"
                        class="cursor head_img padding_left_1"
                        alt
                    />
                    <div class="display_flex flex_align_center classfication_pc">
                        <!-- <div v-if="false" @mouseover="orderselect(item.id)" @mouseleave="selectOrder=''" v-for="item in arr" @click="getList(item.id,'pc')" :key="item.id">
                                                    <div class="hover_cate_back" :class="{hover_cate_back_select:clickSelect==item.id||selectOrder==item.id}">
                                                    </div>
                                                    <span class="pcs">
                                                        {{item.name}}
                                                    </span>
                        </div>-->
                        <div
                            class="cate_div"
                            @mouseover="orderselect('to_cate')"
                            @click="goHome"
                            @mouseleave="selectOrder=''"
                        >
                            <div
                                class="hover_cate_back cataback"
                                :class="{hover_cate_back_select:selectOrder=='to_cate'}"
                            ></div>
                            <span class="pcs">{{$t('words.home')}}</span>
                        </div>

                        <div
                            class="cate_div"
                            v-if="show_login_button"
                            @mouseover="orderselect('login')"
                            @click="showLogin()"
                            @mouseleave="selectOrder=''"
                        >
                            <div
                                class="hover_cate_back cataback"
                                :class="{hover_cate_back_select:selectOrder=='login'}"
                            ></div>
                            <span class="pcs">{{$t('words.login')}}</span>
                        </div>
                        <div
                            class="cate_div"
                            v-if="show_unlogin_button"
                            @mouseover="orderselect('login')"
                            @click="unLogin()"
                            @mouseleave="selectOrder=''"
                        >
                            <div
                                class="hover_cate_back cataback"
                                :class="{hover_cate_back_select:selectOrder=='login'}"
                            ></div>
                            <span class="pcs">{{$t('words.unlogin')}}</span>
                        </div>
                    </div>
                </div>
                <div class="head_icon display_flex">
                    <!-- <i :class="{selectback_ground:showWhich=='search'}" @click.stop="showWichbox('search')" class="iconfont navigator icon-fangdajing"></i> -->
                    <div
                        class="option_animate display_flex flex_align_center"
                        :class="{selectback_ground:showWhich=='option',selected_op:showWhich=='option'}"
                        @click.stop="showWichbox('option')"
                    >
                        <div class="display_flex line_box flex_jusify_space flex_column">
                            <div class="first"></div>
                            <div class="secend"></div>
                            <div class="last"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="option_box" :class="{select:showWhich=='option'}">
            <div class="width_90 margin_auto">
                <!-- <div class="tag  singole_tag white text_center" @click="getList(item.id,'ph')" v-for="item in arr" :key="item.id">
                            {{item.name}}
                </div>-->
                <!-- <video-button :button-text="$t('words.categories')" @click.native="toCate()" class></video-button> -->
                <video-button
                    :button-text="$t('words.benefits_of_tai_chi')"
                    @click.native="Introduction('/intro?type=tai_chi')"
                    class="margin_top_1"
                ></video-button>
                <video-button
                    :button-text="$t('words.benefits_of_martia_arts')"
                    @click.native="Introduction('/intro?type=yoga')"
                    class="margin_top_1"
                ></video-button>

                <video-button
                    v-if="show_login_button"
                    :button-text="$t('words.login')"
                    @click.native="showLogin()"
                    class="margin_top_1"
                ></video-button>
                <video-button
                    v-if="show_unlogin_button"
                    :button-text="$t('words.unlogin')"
                    @click.native="unLogin()"
                    class="margin_top_1"
                ></video-button>
                <div class="text_center margin_top_10">
                    <el-switch
                    v-model="is_ar"
                    @click.native="changeLang()"
                    v-if="op=='mt'"
                    active-text="EN"
                    inactive-text="AR">
                    </el-switch>
                </div>

                <!-- <el-select
                    placeholder="lang"
                    v-model="lang"
                >
                    <el-option v-for="item in lang_arr" :key="item" :value="item" :label="item"></el-option>
                </el-select> -->
            </div>
        </div>
        <div class="search_box" :class="{select:showWhich=='search'}">
            <div class="width_90 margin_auto">
                <el-input @keyup.native.13="Search" class="video_input" v-model="search_word"></el-input>
                <video-button
                    :button-text=" $t('words.search')"
                    @click.native="Search"
                    class="margin_top_1"
                ></video-button>
            </div>
        </div>
        <div
            class="hoverdiv head_hover"
            style="z-index:10002"
            v-if="showWhich!=''"
            @click="showWhich=''"
        ></div>
    </div>
</template>

<script>
import videoButton from "../button";
import getCountry from "../../util/get_country";
import initLanguage from "../../util/init_language";
import getLang from "../../util/get_lang";


import bus from "../../util/bus";
import unlogin from "../../util/unlogin";
import getOp from "../../util/get_country";

export default {
    data() {
        return {
            is_ar: true,
            search_word: "",
            clickSelect: "",
            selectOrder: "",
            showWhich: "",
            op: "",
            show_login_button: false,
            show_unlogin_button: false,
            arr: [
                {
                    name: this.$t("words.most_recent"),
                    id: "-create_time"
                },
                {
                    name: this.$t("words.most_liked"),
                    id: "-favor_num"
                },
                {
                    name: this.$t("words.most_viewed"),
                    id: "-show_num"
                }
            ]
        };
    },
    components: {
        videoButton
    },
    mounted() {
        this.getOp();
        this.watchBus();
        this.$nextTick(()=>{
            this.is_ar = getLang() == 'en' ? true : false;
        })
    },
    methods: {
        changeLang(){
            var lang = this.is_ar ? 'en' : 'ar';
            initLanguage(lang);
            location.href = "./?lang=" + lang;
        },
        Introduction(url) {
            this.showWhich = "";
            this.$router.push({
                path: url
            });
        },
        watchBus() {
            bus.$on("loginSuccess", () => {
                this.diffrentOp();
            });
        },
        unLogin() {
            unlogin();
            this.diffrentOp();
            this.$msg(this.$t("words.unlogin_success"));
        },
        diffrentOp() {
            switch (this.op) {
                default:
                    (() => {
                        this.show_login_button = false;
                        this.show_unlogin_button = false;
                    })();
                    break;
            }
        },
        getOp() {
            this.$nextTick(() => {
                this.op = getOp();
                this.diffrentOp();
            });
        },
        Search() {
            bus.$emit("search", this.search_word);
            this.showWhich = "";
            this.$store.commit("search", this.search_word);
            this.search_word = "";
            this.$router.push({
                path: "/"
            });
        },
        goHome() {
            this.$router.push({
                path: "/"
            });
        },
        showLogin() {
            this.$emit("showLogin");
        },
        toCate() {
            this.showWhich = "";
            this.$router.push({
                name: "index-index-categaray"
            });
        },
        orderselect(ordering) {
            this.clickSelect = "";
            this.selectOrder = ordering;
            // alert(ordering);
        },
        getList(ordering, pc_ph) {
            if (pc_ph == "pc") {
                this.clickSelect = ordering;
            } else if (pc_ph == "ph") {
                this.showWhich = "";
            }
            if (this.$route.name != "index-index") {
                this.$router.push({
                    name: "index-index"
                });
            }
            bus.$emit("ordering", ordering);
        },
        showWichbox(type, mouse) {
            if (mouse) {
                if (screen.width < 800) {
                    return;
                }
                this.showWhich = "";
            } else {
                this.showWhich = type == this.showWhich ? "" : type;
            }
        }
    }
};
</script>

<style lang='less'>
@import "../../assets/css/current_theme";
.el-select-dropdown{
        z-index: 20000 !important;
    }
.bigbox {
    
    overflow: hidden;
    height: 50px;
    &.height0 {
        height: 0px;
    }
    transition-duration: 0.4s;
    transition-property: height;
    .head_box {
        .cate_div {
            background: @head_orange;
        }
        .classfication_pc {
            display: none;
        }
        .line_height_50 {
            line-height: 50px;
        }
        .padding10 {
            height: 50px;
            display: inline-block;
            padding: 0 10px;
        }
        .selectback_ground {
            background: @light_gray;
        }
        position: relative;
        z-index: 10005;
        .head_icon {
            transition-duration: 0.4s;
            i {
                display: inline-block;
                height: 50px;
                line-height: 50px;
                padding: 0 10px;
            }
            & .line_box > div {
                transition-duration: 0.4s;
            }
            color: #fff;
            .selected_op {
                .first {
                    transform-origin: 0 0;
                    transform: translateX(4px) rotate(39deg);
                }
                .secend {
                    opacity: 0;
                    display: none;
                }
                .last {
                    transform-origin: 0 100%;
                    transform: translateX(4px) rotate(-39deg);
                }
            }
            .option_animate {
                // transition-duration: 0.4s;
                padding: 0 10px;
                height: 50px;
                width: 35px;
                & > div {
                    width: 100%;
                    height: 25px;
                    div {
                        width: 100%;
                        height: 3px;
                        border-radius: 1.5px;
                        background: #fff;
                    }
                }
            }
        }
        .head_img {
            height: 40px;
        }
        .navigator {
            font-size: 24px;
        }
        background: @dark;
        .head_innerbox {
            height: 50px;
            color: #fff;
        }
    }
    .option_box {
        padding-top: 10px;
        padding-bottom: 20px;
        .singole_tag {
            background: @dark;
            font-weight: 600;
            font-size: 19px;
            margin-bottom: 8px;
            height: 40px;
            line-height: 40px;
        }
        width: 100%;
        z-index: 10004;
        position: absolute;
        background: darken(@dark, 8%);
        transition-duration: 0.4s;
        transition-property: top;
        top: -330px;
        &.select {
            top: 50px;
        }
    }
    .search_box {
        .video_input {
            .el-input__inner {
                background: mix(@light_gray, #ddd, 90%);
            }
        }
        padding: 10px 0;
        transition: 0.3s;
        position: absolute;
        top: -150px;
        width: 100%;
        height: 100px;
        z-index: 10004;
        background: @light_gray;
        &.select {
            top: 50px;
        }
    }
    @media screen and (min-width: 800px) {
        .head_box {
            .head_icon {
                i {
                    padding: 0 50px;
                }
                .pc_option_none {
                    display: none;
                }
            }
            .classfication_pc {
                display: flex;
                height: 50px;
                line-height: 50px;
                margin-left: 20px;
                & > div {
                    overflow: hidden;
                    position: relative;
                    .hover_cate_back {
                        left: 0;
                        top: 0;
                        border-bottom-left-radius: 150px;
                        border-bottom-right-radius: 150px;
                        right: 0;
                        background: lighten(
                            @head_option_back,
                            10%
                        ); //@head_option_back_select;
                        bottom: 50px;
                        transition-property: bottom;
                        transition-duration: 0.6s;
                        position: absolute;
                        &.cataback {
                            background: saturate(@head_orange, 50%);
                        }
                    }
                    .hover_cate_back_select {
                        bottom: -100px;
                    }
                    width: 200px;
                    text-align: center;
                    font-size: 17px;
                    height: 50px;
                    // line-height:50px;
                    background: @head_option_back;
                }
            }
            .head_hover {
                display: none;
            }
        }
        .option_box {
            width: 30%;
            right: 0;
        }
        .search_box {
            width: 30%;
            right: 0;
        }
    }
}
</style>