<template>
    <div class="video_button">
        {{buttonText}}
    </div>
</template>

<script>
    export default {
        props:{
            buttonText:{
                type:String,
                default:"button"
            }
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/current_theme";
    .video_button {
        height: 50px;
        line-height: 50px;
        text-align: center;
        transition: .3s;
        color: #fff;
        font-size: 18px;
        background: @theme_logo_color;
        border-radius: 25px;
        &:active {
            background: mix(@theme_logo_color, #000, 80%);
        }
    }
</style>