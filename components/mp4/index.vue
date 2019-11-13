<template>
    <div class="">
        <video id="mp4" autoplay class="width_100" controls="controls" preload  :src="mp4Src"></video>
        <!-- <div style="z-index:10000">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At doloribus labore magnam aliquid atque placeat ipsum nihil excepturi similique, autem ipsa vero. Mollitia vel quo est consectetur fugiat dolore qui.
        </div> -->
    </div>
</template>

<script>
    export default {
        props:{
            mp4Src:{
                type:String
            }
        },
        data() {
            return {
               
            }
        },
        mounted() {
            this.controlTime();
        },
        methods: {
            controlTime(){
               var videoNode = document.getElementById("mp4")
                 videoNode.addEventListener("timeupdate", (res)=>{
                    // var play_time = res.target.currentTime
                    // var duration = res.target.duration;
                    // console.log(play_time);
                    // console.log(duration);

                    // if((duration-play_time >10 && play_time>30)){
                    // }else{
                    //     res.target.currentTime=31;
                    // }
                 });
            }

        }
    }
</script>

<style lang="less">
</style>
