<template>
    <div class="taglist_box" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="full_screen black" style="background:black" v-if="!is_mounted">
            <img
                src="../../../../static/img/loading.gif"
                class="position_absolute pcs"
                style="width:300px"
                alt=""
                srcset=""
            />
        </div>
        <div>
            <div class="width_100 photntsback" :class="{top0: isScrollBottom}">
                <div class="phtonsbase overflow_scroll nscrol" id="sdcss">
                    <div :style="{width:arr.length * (pcOrPhone?300:150)+'px'}" class="taglibox">
                        <div :class="{dsfx:index==INDEX}" :style="{width:(pcOrPhone ? 300 : 150)+'px'}" style="border-left:1px solid #fff" v-for="(item,index) in arr" @click="moves($event,index,item.id)" class="box_szing float_left text_center ittemstage" :key="item.id">
                            {{item.name}}
                            <div class="cate_border_bottom" :class="{selected_cate :  select_index == index}"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div v-if="arr.length" class="text_center font_size_20 margin_top_50px" style="height:30px;line-height:30px">
                {{arr[INDEX].name}}
            </div> -->
            <div class="pc_flex margin_bottom_3">
                <video-div v-for="item in list" :item="item" :key="item.id"></video-div>
            </div>
            <div class="text_center margin_bottom_3 paging">
                <el-pagination class="" :current-page.sync="page_" :page-size="12" @current-change="_getPage" small layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
        <video-footer></video-footer>
    </div>
</template>

<script>
    import glo_axios from "../../../../util/glo_request";
    import videoDiv from "../../../../components/video_div";
    import pcOrPhone from "../../../../util/get_pc_or_phone";
    import getLang from "../../../../util/get_lang";
    import videoFooter from "../../../../components/footer";
    import getTag from "../../../../util/get_tags";
    import getCurrentApp from "../../../../util/get_current_app";

    export default {
        components: {
            videoDiv,
            videoFooter
        },
        data() {
            return {
                arr: [],
                INDEX: 0,
                list: [],
                pcOrPhone: false,
                fullscreenLoading: false,
                select_index: 0,
                country: '',
                category: '',
                page_: 1,
                tag_id: "",
                total: 0,
                is_mounted: false
            } 
        },
        props:{
            isScrollBottom:{
                type:Boolean
            }
        },
        mounted() {
            this.init();
            this.setLang();
            this.pcOrPhone = pcOrPhone();
        },
        methods: {
            _getPage(page){
                this.page_ = page;
                this.$store.state.cate_page = page
                document.querySelector('.scroll_box').scrollTop="0";
                this.getList()
            },
            init(){
                this.category = getCurrentApp();
                this.$http("dcb/site/", "get", {
                    ordering: "-create_time",
                    lang: this.$store.state.locale
                }).then(res => {
                    this.select_index = this.INDEX = this.$store.state.index || 0;
                    this.arr = res.results;
                    this.page_ = this.$store.getters.getCatePage;
                    this.initBanner();
                    this.getList();
                })
            },
            setLang() {
                this.country = getLang();
            },
            moves(e, index, id) {
                this.page_ = 1;
                this.$store.commit("catePage", this.page_);
                this.select_index = index;
                this.INDEX = index;
                this.$store.commit("setIndex", this.INDEX);
                var screleft = e.target.offsetLeft - this.$jquery("#sdcss")[0].scrollLeft;
                var scrolx = e.target.offsetLeft - (window.innerWidth / 2 - 50);
                this.$jquery("#sdcss").animate({
                    "scrollLeft": scrolx
                }, 200);
                this.getList();
            },
            initBanner() {
                var current = getTag(this.arr);
                this.arr = current;
            },
            getList1() {
                this.fullscreenLoading = true;
                this.$http("dcb/album/tag/" + this.arr[this.INDEX].id + "/", "get", {
                    category: this.category,
                    capacity: 1000,
                    lang: this.country,
                }).then(res => {
                    this.fullscreenLoading = false;
                    this.list = res.album;
                    this.page_ = this.$store.getters.getCatePage;
                    document.querySelector('.scroll_box').scrollTop="0";
                })
            },
            getList() {
                this.fullscreenLoading = true;
                // var tag =  this.arr[this.INDEX].is_healthy_life ? this.arr[this.INDEX].original_name+"|Tai Chi Video" : this.arr[this.INDEX].original_name;
                // var category = this.arr[this.INDEX].is_healthy_life ? this.category + '|healthy-life-now' : this.category;
                this.$http("dcb/album/", "get", {
                    tags: this.arr[this.INDEX].original_name,
                    page: this.page_,
                    category: this.category,
                    capacity: 12,
                    ordering: '-create_time',
                    lang: this.country
                }).then(res => {
                    this.fullscreenLoading = false;
                    this.list = res.results;
                    this.total = res.count;
                    this.page_ = this.$store.getters.getCatePage
                    document.querySelector('.scroll_box').scrollTop="0";
                    this.is_mounted = true;
                })
            }
        }
    }
</script>

<style lang='less'>
    @import "../../../../assets/css/current_theme.less";
    @grayy: rgba(82, 82, 82, 1.0);
    .taglist_box {
        .margin_top_50px {
            margin-top: 49px;
        }
        .cate_border_bottom {
            width: 100%;
            transition: .5s;
            position: absolute;
            bottom: 0px;
            height: 3px;
            background: transparent;
        }
        .photntsback {
            &.top0{
                top:0;
            }
            z-index: 10003;
            position: fixed;
            top: 50px;
            .dsfx {
                //color:@glore;
                background: darken(@dark,10) !important;
                font-weight: 600;
            }
            .ittemstage {
                .selected_cate {
                    background: orange;
                }
                &:hover {
                    .cate_border_bottom {
                        background: orange;
                    }
                }
                cursor: pointer;
                position: relative;
                width: 200px;
                background: @dark;
                color: #fff;
                font-size: 16px;
            }
            .taglibox {
                height: 50px;
                line-height: 50px;
            }
        }
        @media screen and (max-width:800px) {
            // .cate_border_bottom {
            //      display: none;
            // }
        }
    }
</style>