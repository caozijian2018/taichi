<template>
    <div>
        <el-carousel :height="banner_height" :interval="5000" :type="pc_banner" arrow="always">
            <el-carousel-item @click.native="jumpBanner(item.jump_url)" v-for="item in currentBanner.banner" :key="item.id">
                <img :src="item.img_url" alt="" class="width_100">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import isPc from "../../util/get_pc_or_phone"
    import getInnerWidth from "../../util/get_width"
    export default {
        props: {
            currentBanner: {
                type: Object
            }
        },
        data() {
            return {
                pc_banner: '',
                banner_height: "0px"
            }
        },
        computed: {
            currentBanner_: {
                get() {
                    return this.currentBanner
                },
            }
        },
        mounted() {
            console.log(3322)
            console.log(this.currentBanner)
            this.pc_phone();
            this.setHeight();
            this.watchWidth();
        },
        methods: {
            jumpBanner(mp4id) {
                this.$router.push({
                    path: "/" + mp4id
                })
            },
            setHeight() {
                this.$nextTick(() => {
                    this.banner_height = (parseInt(this.$jquery(this.$jquery('.el-carousel__mask')[0]).css("width")) / 1.5 || getInnerWidth() / 1.5) + "px";
                })
            },
            watchWidth() {
                window.addEventListener("resize", () => {
                    this.pc_phone();
                    this.setHeight();
                })
            },
            pc_phone() {
                this.pc_banner = isPc() ? "card" : "";
            }
        }
    }
</script>

<style lang='less'>
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>