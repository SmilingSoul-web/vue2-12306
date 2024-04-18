<template>
  <!--最大的容器-->
  <div class="box">
    <!--头部内容-->
    <Nav>
      <template #title>
        <span>{{ startstation }} </span>
        <i class="iconfont icon-xianghujiaohuan" @click="stationChange"></i>
        <span> {{ endstation }}</span>
      </template>
    </Nav>
    <NavBottom>
      <template #center>
        <div>
          <router-link to="/calendar">
            <span>
              {{ `${month}月${toDay}日` }} {{ `周${$store.getters.week}` }}
            </span>
            <span class="iconfont icon-rili"></span>
          </router-link>
        </div>
      </template>
    </NavBottom>
    <!--为空显示-->
    <section>
      <article class="empty" v-if="ticketList.length == 0">
        <div>
          <p>
            很抱歉，按您的查询条件，当前未找到从 {{ startstation }} 到{{
              endstation
            }}的列车，您可以查询其它时间段列车
          </p>
          <img src="../../assets/img/huoche.png" alt="" />
        </div>
      </article>
      <!--循环组件-->
      <TrainList @test="test" :list="ticketList">
        <template #start>
          <em>始</em>
        </template>
        <template #end>
          <em>始</em>
        </template>
        <template #hr>
          <hr width="60%" />
        </template>
        <template #pice="{ list }">
          <em v-for="(pice, index) in list" :key="index"
            >{{ pice.price_type }}:
            <span v-if="!ticketPice" :class="[pice.num > 10 ? 'active' : '']">{{
              pice.num > 10 ? `有` : `${pice.num}张`
            }}</span>
            <span v-else>{{ `￥${pice.price}` }}</span>
          </em>
        </template>
      </TrainList>
    </section>
    <!--    <TrainList />-->
    <!--筛选-->
    <van-popup
      v-model="$store.state.show"
      position="bottom"
      :style="{ height: '45%' }"
      class="tabbar_popup"
    >
      <div class="tabbar_btn">
        <button>重置</button>
        <button @click="$store.state.show = false">关闭</button>
      </div>
      <dl class="tabbar_dl">
        <dt>车次类型</dt>
        <dd
          v-for="(type, index) in ticketType"
          :key="index"
          @click="action(type)"
          :class="{ active: checked.includes(type) }"
        >
          {{ type }}
        </dd>
        <dt>出发站</dt>
        <dd>菏泽</dd>
        <dd>菏泽东</dd>
      </dl>
      <button type="button" @click="filtrationPromise">确定</button>
    </van-popup>
    <footer>
      <TicketFooter />
    </footer>
  </div>
</template>

<script>
import TicketFooter from "@/components/footer/TicketFooter.vue";
// eslint-disable-next-line no-unused-vars
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Nav from "@/components/Nav/Nav.vue";
import NavBottom from "@/components/Nav/NavBottom.vue";
import TrainList from "@/components/Train/TrainList.vue";
export default {
  name: "BuyTick",
  data() {
    return {
      checked: [],
      ticketType: ["高铁", "普通车", "只看票"], //车票类型
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TicketFooter,
    // eslint-disable-next-line vue/no-unused-components
    Nav,
    // eslint-disable-next-line vue/no-unused-components
    NavBottom,
    // eslint-disable-next-line vue/no-unused-components
    TrainList,
  },
  methods: {
    ...mapMutations(["addtoDy", "stationChange", "filtrationPromise"]),
    // 子传父
    test(index) {
      this.$router.push({
        name: "riderpassenger",
        query: { id: index },
      });
    },
    action(value) {
      if (this.checked.includes(value)) {
        this.checked = this.checked.filter((item) => {
          console.log(this.checked.includes(value));
          return item !== value;
        });
      } else {
        console.log("添加");
        this.checked.push(value);
      }
      this.$store.state.result = this.checked.slice();
    },
  },
  computed: {
    ...mapState([
      "month",
      "toDay",
      "week",
      "ticketList",
      "startstation",
      "endstation",
      "ticketPice",
    ]),
  },
  mounted() {
    this.$store.dispatch("getdate");
  },
  watch: {
    toDay() {
      this.$store.dispatch("getdate");
    },
    startstation() {
      this.$store.dispatch("getdate");
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  max-width: 750px;
  min-width: 320px;
  background-color: #f6f6f6;
  .content {
    padding: 16px 16px 160px;
  }
  section {
    .empty {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        box-sizing: border-box;
        padding: 28px;
        font-size: 30px;
        color: #7e7e7e;
        img {
          width: 519px;
          height: 179px;
          margin-left: 10%;
        }
      }
    }
    .empty {
      width: 100%;
      height: 80vh;
    }
    height: 80vh;
    overflow: scroll;
  }
  .tabbar_popup {
    .tabbar_btn {
      width: 100%;
      height: 100px;
      background-color: #3c3b4b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 28px;
      box-sizing: border-box;
      button {
        width: 100px;
        height: 60%;
        font-size: 35px;
        background-color: #3c3b4b;
        border: none;
        color: #fff;
      }
    }
    .tabbar_dl {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 68px;
      dt {
        width: 100%;
        height: 60px;
        font-size: 28px;
        color: #7e7e7e;
        line-height: 60px;
      }
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      dd {
        padding: 4px 30px;
        text-align: center;
        line-height: 60px;
        font-size: 28px;
        background-color: #f7f8fa;
        border-radius: 15px;
        margin-right: 45px;
        margin-bottom: 40px;
      }
    }
    button {
      margin-left: 10%;
      width: 80%;
      height: 80px;
      border-radius: 15px;
      border: 1px solid #69a7fd;
      background-color: #fff;
      font-size: 35px;
      color: #69a7fd;
      box-sizing: border-box;
    }
    .active {
      border: 1px solid #69a7fd;
      color: #69a7fd;
    }
  }
}
</style>
