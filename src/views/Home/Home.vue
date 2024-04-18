<template>
  <div class="main">
    <!--头部-->
    <header>
      <div class="home_ticket">
        <ul>
          <li>
            <!--起始站-->
            <span
              :class="[
                'animate__animated',
                { animate__backOutRight: animation },
              ]"
              @click="navigateTo('indexbar', $store.state.startstation)"
              >{{ startstation }}</span
            >
            <i @click="stationChange" class="iconfont icon-qiehuan"></i>
            <!--终点站-->
            <span
              :class="[
                'animate__animated',
                { animate__backOutLeft: animation },
              ]"
              @click="navigateTo('indexbar', $store.state.endstation)"
              >{{ endstation }}</span
            >
          </li>
          <li>
            <span @click="navigateTo('calendar')"
              >{{ `${month}月${toDay}日` }}
              <span>{{ `周${$store.getters.week}` }}</span></span
            >
            <div class="tickect_left">
              <van-checkbox-group
                v-model="$store.state.result"
                direction="horizontal"
              >
                <van-checkbox :icon-size="iconSize" name="学生票"
                  >学生票</van-checkbox
                >
                <!-- <span></span>-->
                <van-checkbox :icon-size="iconSize" name="高铁动车"
                  >高铁动车</van-checkbox
                >
              </van-checkbox-group>
            </div>
          </li>
          <li>
            <button type="button" @click="getbtn">立即快速抢票</button>
          </li>
        </ul>
      </div>
    </header>
    <!--中间内容-->
    <article class="home_packet">
      <ul>
        <li>
          <p>新人送<b>8元</b>现金</p>
          <span>可提现微信、支付宝</span>
        </li>
        <img src="../../assets/img/image_02_03.png" alt="" />
        <li>
          <p>粉丝群福利</p>
          <span>20元机票立减劵</span>
        </li>
        <img src="../../assets/img/image_02_05.png" alt="" />
      </ul>
    </article>
    <!--热门榜单-->
    <article class="home_hot">
      <p>热门榜单</p>
      <section>
        <article class="hot_list">
          <div class="hot_left">
            <!--更多-->
            <div class="hot_list_title hot_color_left">
              <span>热门路线</span>
              <a href="#">更多</a>
            </div>
            <!--公共样式-->
            <article class="list_module">
              <ul>
                <li>
                  <p>北京—乌鲁木齐</p>
                  <span
                    ><img src="../../assets/img/image_02_14.png" alt="" />
                    1742人热搜</span
                  >
                </li>
                <li>
                  <p>北京—哈尔滨</p>
                  <span
                    ><img src="../../assets/img/image_02_14.png" alt="" />
                    1423人热搜</span
                  >
                </li>
                <li>
                  <p>北京—三亚</p>
                  <span
                    ><img src="../../assets/img/image_02_14.png" alt="" />
                    1256人热搜</span
                  >
                </li>
              </ul>
            </article>
          </div>
          <div class="hot_cent">
            <div class="hot_list_title">
              <span>特价机票</span>
              <a href="#">更多</a>
            </div>
            <article class="list_module">
              <ul>
                <li>
                  <p>北京 <i class="iconfont icon-feiji1" /> 西安</p>
                  <span
                    ><img src="../../assets/img/image_02_14.png" alt="" />
                    879人热搜</span
                  >
                </li>
                <li>
                  <p>上海 <i class="iconfont icon-feiji1" /> 满洲里</p>
                  <span
                    ><img src="../../assets/img/image_02_14.png" alt="" />
                    647人热搜</span
                  >
                </li>
                <li>
                  <p>乌鲁木齐 <i class="iconfont icon-feiji1" /> 呼和浩克</p>
                  <span
                    ><img src="../../assets/img/image_02_14.png" alt="" />
                    456人热搜</span
                  >
                </li>
              </ul>
            </article>
          </div>
          <div class="hot_right">
            <div class="hot_list_title">
              <span>特价机票</span>
              <a href="#">更多</a>
            </div>
            <article class="list_module">
              <ul>
                <li>
                  <p>北京 <i class="iconfont icon-feiji1" /> 西安</p>
                  <span
                    ><img src="../../assets/img/image_02_14.png" alt="" />
                    879人热搜</span
                  >
                </li>
                <li>
                  <p>上海 <i class="iconfont icon-feiji1" /> 满洲里</p>
                  <span
                    ><img src="../../assets/img/image_02_14.png" alt="" />
                    647人热搜</span
                  >
                </li>
                <li>
                  <p>乌鲁木齐 <i class="iconfont icon-feiji1" /> 呼和浩克</p>
                  <span
                    ><img src="../../assets/img/image_02_14.png" alt="" />
                    456人热搜</span
                  >
                </li>
              </ul>
            </article>
          </div>
        </article>
      </section>
    </article>
    <!--引入组件-->
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      today: true,
      iconSize: "28px",
      //日历
      show: false,
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Footer,
  },
  methods: {
    // 切换按钮
    ...mapMutations(["stationChange"]),
    ...mapActions(["getdate"]),
    //span路由跳转
    // eslint-disable-next-line no-unused-vars
    navigateTo(route, index) {
      /*this.$router.push(route);*/
      if (index == undefined) {
        this.$router.push({
          name: route,
        });
      } else {
        this.$router.push({
          name: route,
          params: { index },
        });
      }
    },
    //查票按钮
    getbtn() {
      //this.$store.dispatch("getdate");
      this.$store.commit("filtrationPromise");
      this.$router.push("/buytick");
    },
  },
  mounted() {
    //获取屏幕尺寸
    this.iconSize = (window.innerWidth / 75) * 3;
    window.onresize = () => {
      //屏幕尺寸变化
      return (() => {
        this.iconSize = (window.innerWidth / 75) * 3;
      })();
    };
  },
  // 初始化加载
  //计算属性
  computed: mapState([
    "month",
    "toDay",
    "week",
    "startstation",
    "endstation",
    "stuChecked",
    "highChecked",
    "animation",
  ]),
  created() {
    this.$store.dispatch("getdate");
  },
  updated() {
    this.$store.dispatch("getdate");
  },
};
</script>

<style lang="less" scoped>
@activeColor: #438af6;
.main {
  max-width: 750px;
  min-width: 320px;
  padding: 50px 18px;
  box-sizing: border-box;
  background: url("../../assets/img/bg.png") no-repeat;
  background-size: 100% 260px;
  font-size: 28px;
  background-color: #f6f6f6;
  overflow: hidden;
  header {
    width: 100%;
    padding: 25px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 30px;
    margin-bottom: 18px;
    .home_ticket {
      ul {
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 120px;
          .icon-qiehuan {
            font-size: 70px;
            color: #727272;
          }
          .tickect_left {
            display: flex;
            justify-content: space-around;
            /deep/.van-checkbox__label {
              line-height: 28px;
              margin-left: 12px;
            }
          }
          span {
            font-size: 45px;
            font-weight: bold;
            width: 45%;
            &:nth-child(3) {
              text-align: right;
            }
            span {
              font-size: 35px;
              font-weight: normal;
            }
          }
          button {
            width: 100%;
            border-radius: 40px;
            height: 94px;
            background-color: @activeColor;
            color: #fff;
            font-size: 35px;
            border: none;
          }
          .van-cell {
            line-height: normal;
            padding: 0;
            width: 250px;
          }
        }
      }
    }
  }
  .home_packet {
    width: 100%;
    height: 120px;
    padding: 22px;
    box-sizing: border-box;
    background-image: linear-gradient(#fde6da, #fdfbf7, #ffffff);
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        p {
          font-size: 28px;
          font-weight: bold;
          b {
            color: #e65d6e;
          }
          margin-bottom: 10px;
        }
        span {
          color: #7e7e7e;
          font-size: 22px;
        }
      }
      li:nth-of-type(2) {
        width: 220px;
        text-align: center;
        border-left: 1px solid #7e7e7e;
      }
      img {
        width: 76px;
        height: 80px;
        border-radius: 45px;
      }
    }
  }
  //样式穿透 /deep/
  //热门榜单
  .home_hot {
    width: 100%;
    padding: 18px;
    box-sizing: border-box;
    background-color: white;
    margin-top: 30px;
    margin-bottom: 80px;
    border-radius: 25px;
    //轮播
    p {
      font-size: 30px;
      font-weight: bold;
      padding: 10px;
    }
    section {
      overflow: scroll;
      //
      .hot_list {
        display: flex;
        width: 146%;
        justify-content: space-between;
        div {
          width: 50%;
          margin: 10px;
          box-sizing: border-box;
          border-radius: 20px;
          .hot_list_title {
            display: flex;
            justify-content: space-between;
            padding: 20px 10px;
            box-sizing: border-box;
            width: 94%;
            height: 40px;
            margin-bottom: 0;
            span {
              font-weight: bold;
              font-size: 26px;
              color: #fff;
            }
          }
          .list_module {
            width: 100%;
            margin-top: 50px;
            ul {
              li {
                width: 86%;
                margin: 20px auto;
                height: 120px;
                background-color: #fff;
                padding: 11px;
                box-sizing: border-box;
                border-radius: 25px;
                p {
                  font-size: 23px;
                }
                span {
                  margin-top: 5px;
                  font-size: 22px;
                  color: #7e7e7e;
                  display: flex;
                }
              }
              img {
                width: 25px;
                height: 25px;
              }
            }
          }
        }
        .hot_left {
          background-color: #5ac6cd;
          a {
            color: #c1f6f9;
          }
        }
        .hot_cent {
          background-color: #3478f5;
          a {
            color: #fff;
          }
          .icon-feiji1 {
            font-size: 24px;
            color: #7e7e7e;
          }
        }
        .hot_right {
          background-color: #bf8769;
          a {
            color: #fff;
          }
          .icon-feiji1 {
            font-size: 24px;
            color: #7e7e7e;
          }
        }
      }
    }
  }
  /*滑动模块*/
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  /*底部*/
}
</style>
