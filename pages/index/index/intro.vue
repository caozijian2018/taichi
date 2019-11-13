<template>
    <div class="height_100 background">
        <div class="background padding_bottom_20">
        <div class="intro_box font_size_20 width_90 margin_auto margin_bottom_2" v-if="what_this_type=='tai_chi'" v-html="$t('words.tachigood')">
        </div>
        <div class="intro_box font_size_20 width_90 margin_auto margin_bottom_2" v-else-if="what_this_type=='yoga'" v-html="$t('words.yoga')">
        </div>
        <div class="intro_box font_size_20 width_90 margin_auto margin_bottom_2" v-else v-html="$t('words.fitnessgood')">
        </div>
        <video-button
            button-text="BACK"
            @click.native="back()"
            class="backbutton margin_auto margin_top_1"
        ></video-button>
        </div>

    </div>
</template>

<script>
import videoButton from "../../../components/button";
export default {
    components:{
        videoButton
    },
    data(){
        return {
            tachi:`<h2>Beneficios del Tai Chi</h2>El Tai Chi no se ha estudiado científicamente hasta hace poco. La investigación preliminar muestra que para los adultos mayores, en particular, practicar Tai Chi regularmente puede:<br>1. Mejore el equilibrio y la coordinación, reduciendo el número de caídas <br>2. Mejore la calidad del sueño, como quedarse dormido más tiempo por la noche y sentirse bien <br>3. más alerta durante el día <br>4. Pérdida ósea lenta en mujeres después de la menopausia <br>5. Reducir la presión arterial alta <br>6. Mejora la aptitud cardiovascular <br>7. Alivia el dolor crónico <br>8. Mejora el funcionamiento físico cotidiano <br>`,
            yoga:`<h2>Benefits of Yoga</h2>Derived from the Sanskrit word “yuji,” meaning yoke or union, yoga is an ancient practice that brings together mind and body.<br>It incorporates breathing exercises, meditation and poses designed to encourage relaxation and reduce stress, practicing Yoga regularly may:<br>1. Can Decrease Stress<br>2. Relieves Anxiety<br>3. May Reduce Inflammation<br>4. Could Improve Heart Health<br>5. Improves Quality of Life<br>6. May Fight Depression<br>7. Could Reduce Chronic Pain<br>8. Could Promote Sleep Quality<br>9. Improves Flexibility and Balance<br>10. Could Help Improve Breathing<br>11. May Relieve Migraines<br>12. Promotes Healthy Eating Habits<br>13. Can Increase Strength<br>`,
            fitnessgood:`<h2>Benefits of Fitness</h2>Exercise is defined as any movement that makes your muscles work and requires your body to burn calories.<br>Being active has been shown to have many health benefits, both physically and mentally. It may even help you live longer.<br>Here are the top 9 ways regular exercise benefits your body and brain.<br>1. It Can Make You Feel Happier<br>2. It Can Help With Weight Loss<br>3. It Is Good for Your Muscles and Bones<br>4. It Can Increase Your Energy Levels<br>5. It Can Reduce Your Risk of Chronic Disease<br>6. It Can Help Skin Health<br>7. It Can Help Your Brain Health and Memory<br>8. It Can Help With Relaxation and Sleep Quality<br>9. It Can Reduce Pain<br>`,
            what_this_type:"tai_chi"
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        back(){
            this.$router.push({path:"/"})
        },
        init(){
            this.what_this_type = this.$route.query.type
        },
    },
    watch:{
        "$route":function(){
            this.init()
        }
    }
}

</script>
<style lang='less'>
.background{
    background-image: url("../../../static/img/snack.png");
    background-size: 260%;
}
.backbutton{
    width: 90%;
}
@media screen and (min-width: 1200px){
    .background{
        background-size: 100%;
    }
    .backbutton{
        width: 300px;
    }
}
.intro_box{
    h2{
        padding:20px 0;
    }
    text-indent: 10;
    line-height: 28px;
}
</style>