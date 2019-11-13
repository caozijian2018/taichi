<template>
    <div class="">
        <div class="display_flex margin_auto order_box">
            <div @click="getList(item.id)" :class="{seleced_ordering:selec_ordering==item.id}" v-for="item in arr" :key="item.id">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selec_ordering: "-create_time",
                arr: [{
                        name: this.$t('words.most_recent'),
                        id: "-created",
                    },
                    {
                        name: this.$t('words.most_liked'),
                        id: "show_cnt",
                    },
                    {
                        name: this.$t('words.most_viewed'),
                        id: "-show_cnt",
                    }
                ]
            }
        },
        mounted() {
             
        },
        methods: {
            getList(ordering) {
                this.selec_ordering = ordering
                this.$emit("ordering", ordering);
            }
        }
    }
</script>

<style lang='less'>
    .order_box {
        font-size: 19px;
        .seleced_ordering {
            font-weight: 600;
        }
        cursor: pointer;
        width: 600px;
        &>div {
            flex: 1;
            height: 50px;
            line-height: 50px;
            color: #000;
            text-align: center;
        }
        @media screen and (max-width:800px) {
            & {
                &>div{
                    padding:0 20px;
                    line-height: 25px;
                }
                width: 100%;
            }

        }
    }
</style>