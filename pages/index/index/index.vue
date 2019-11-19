<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" :keep-alive="true">
    <!-- <div
      class="pcs position_absolute"
      style="width: 100px;height:100px;background:red"
    >
      asdasdasdasdasda
    </div> -->
    <!-- <img src="../../../static/img/logo.png" class="position_absolute pcs" style="z-index:100000;left:0;right:0;top:0;bottom:0;width:200px"/> -->
    <!-- <div class="full_screen black" style="background:black" v-if="!is_mounted">
      <img
        src="../../../static/img/loading.gif"
        class="position_absolute pcs"
        style="width:300px"
        alt=""
        srcset=""
      />
    </div> -->

    <video-banner
      :current-banner="current_banner"
      :style="{ marginTop: op == 'ib' ? '50px' : '0' }"
    ></video-banner>
    <only-infobip-show></only-infobip-show>
    <!-- <div v-else>
      <category-box @ordering="getOrdering"></category-box>
      <div class="pc_flex">
        <video-div v-for="item in list" :item="item" :key="item.id"></video-div>
      </div>
      <div class="text_center margin_bottom_3 paging">
        <el-pagination class="" :current-page="page_" :page-size="12" @current-change="getPage" small layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
      <video-footer></video-footer>
    </div> -->
  </div>
</template>

<script>
import videoDiv from "../../../components/video_div";
import videoHead from "../../../components/videoHead";
import categoryBox from "../../../components/category_box";
import videoFooter from "../../../components/footer";
import videoBanner from "../../../components/banner";
import glo_axios from "../../../util/glo_request";
import get_banner from "../../../util/get_banner";
import getLang from "../../../util/get_lang";
import getCurrentApp from "../../../util/get_current_app";
import bus from "../../../util/bus";
import init_token from "../../../util/init_token";
import OnlyInfobipShow from "./categaray/_index";
import getCountry from "../../../util/get_country";

export default {
  async asyncData({ store, query }) {
    var lang = query.lang || query.country || store.state.locale || "en";
    store.state.locale = lang;
    var page = store.getters.getPage;
    return Promise.all([
      glo_axios("dcb/album/", "get", {
        capacity: 12,
        category: getCurrentApp(),
        ordering: "-create_time",
        page,
        lang
      }),
      glo_axios("dcb/site/", "get", {})
    ])
      .then(res => {
        console.log("xxxxxxx");
        console.log(res);
        return {
          list: res[0].results,
          total: res[0].count,
          banner: res[1].results,
          page_: page
        };
      })
      .catch(res => {
        console.log(res);
      });
  },
  components: {
    videoDiv,
    videoHead,
    videoFooter,
    videoBanner,
    categoryBox,
    OnlyInfobipShow
  },
  data() {
    return {
      list: [],
      banner: [],
      current_banner: {},
      total: 0,
      glo_ordering: "-create_time",
      page_: 0,
      fullscreenLoading: false,
      category: getCurrentApp(),
      is_mounted:false,
      op: ""
    };
  },
  mounted() {
    console.log(9999);
    console.log(this.list);
    this.init();
    this.initBanner();
    this.watchHeadOrdering();
    this.getSearch();
    this.storeSearchWatch();
    this.saveInfo();
    this.fromMp4page();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.op = getCountry();
      });
    },
    storeSearchWatch() {
      var word = this.$store.state.search_word;
      if (word) {
        this.getList({ search: word });
        this.$store.commit("search", "");
      }
    },
    fromMp4page() {
      var mp4id = localStorage.mp4id;
      if (mp4id && localStorage.video_token) {
        localStorage.mp4id = "";
        this.$router.push({
          path: "/" + mp4id
        });
      }
    },
    saveInfo() {
      var query = this.$route.query;
      var phone = query.phone;
      var from_ = query.from;
      if (phone && from_) this.login(phone, from_);
    },
    login(phone, from_) {
      this.$http("login", "post", {
        username: phone,
        password: "123456"
      })
        .then(res => {
          localStorage.video_token = res.token;
          localStorage.phone = phone;
          localStorage.from_ = from_;
          init_token();
        })
        .finally(() => {
          var new_url = location.href.replace(/[?&]phone=\d*/, "");
          new_url = new_url.replace(/[?&]from=\w*/, "");
          location.href = new_url;
        });
    },
    getSearch() {
      bus.$on("search", res => {
        this.getList({ search: res });
      });
    },
    getOrdering(ordering) {
      this.getList({
        ordering
      });
    },
    getPage(page) {
      this.getList({
        page,
        ordering: this.glo_ordering
      });
    },
    watchHeadOrdering() {
      bus.$on("ordering", ordering => {
        this.getList({
          ordering
        });
      });
    },
    getList({
      ordering = "-create_time",
      page = 1,
      capacity = 12,
      search = ""
    }) {
      this.fullscreenLoading = true;
      this.glo_ordering = ordering;
      this.$http("dcb/album/", "get", {
        ordering,
        page,
        category: this.category,
        capacity,
        search,
        lang: getLang()
      })
        .then(res => {
          this.is_mounted = true;
          this.list = res.results;
          this.total = res.count;
          this.$store.commit("setPage", page);
          document.querySelector(".scroll_box").scrollTop = "0";
          this.fullscreenLoading = false;

        })
        .catch(res => {});
    },
    initBanner() {
      console.log(33445);
      console.log(this.banner);
      var banner = get_banner(this.banner);
      console.log(banner);
      this.current_banner = banner;
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/current_theme.less";
.paging {
  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    background: @gray_back;
  }
  .el-pager li {
    background: @gray_back;
  }
}
</style>
