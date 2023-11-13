<template>
  <div class="box">
    <header>
      <Nav>
        <template #title>
          <p>未完成</p>
        </template>
      </Nav>
      <van-notice-bar
        wrapable
        :scrollable="false"
        background="#f6f1f1"
        color="#d7766b"
        text="为了保证您顺利出行,请提前了解上、下车站所在地政府有关防控政策,持相关有效证明乘车，并在车站和列车上全程佩戴口罩,感谢支持和配合。"
      />
    </header>
    <main>
      <!--车票信息-->
      <TrainList :list="orderList">
        <template #hr>
          <i class="iconfont icon-changbanjiantou"></i>
        </template>
        <template #pice>
          <div class="time">
            {{ `乘车时间:  ${new Date().getFullYear()}年${month}月${toDay}日` }}
          </div>
        </template>
      </TrainList>
      <!--乘车人信息-->
      <article class="minusPerson" v-for="item in passengerList" :key="item.id">
        <div>
          <strong
            >{{ item.name }} <em>{{ item.type }}</em>
            <span>{{ `￥${order[index].price}` }}</span>
          </strong>
          <summary>{{ item.certificate }}</summary>
          <strong>{{ `${order[index].sect}12车厢06F号` }}</strong>
        </div>
      </article>
    </main>
    <footer>
      <van-submit-bar
        label="总金额:"
        decimal-length="2"
        text-align="left"
        :price="
          parseInt(`${order[index].price}00`) *
          this.$store.state.order[index].rider.length
        "
      >
        <template #button>
          <div class="footer-button">
            <button type="button" @click="cancel">取消订单</button>
            <button type="button" @click="pay">立即支付</button>
          </div>
        </template>
      </van-submit-bar>
    </footer>
  </div>
</template>

<script>
import Nav from "@/components/Nav/Nav.vue";
import TrainList from "@/components/Train/TrainList.vue";
import { mapState } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pay",
  data() {
    return {
      ticketList: [],
      index: this.$store.state.order.findIndex(
        (item) => item.number === this.$route.query.number
      ), //查找下标
    };
  },
  components: {
    Nav,
    TrainList,
  },
  methods: {
    pay() {
      //跳转支付
      this.$toast.loading({
        message: "正在跳转付款页面请稍等...",
        forbidClick: true,
      });
      //三秒后跳转
      setTimeout(() => {
        this.$router.push({
          name: "payment",
          query: {
            price:
              this.$store.state.order[this.index].price *
              this.$store.state.order[this.index].rider.length,
            index: this.index,
          },
        });
      }, 2000);
      this.$store.state.passengerList = [];
    },
    //取消订单
    cancel() {
      this.$router.push({ name: "orderlist" });
      this.$store.state.order[this.index].sate = 4;
      this.$store.state.passengerList = [];
    },
  },
  mounted() {},
  computed: {
    ...mapState(["order", "toDay", "month"]),
    orderList() {
      return this.$store.state.ticketList.filter((item) => {
        return this.$store.state.order[this.index].serial.includes(item.id);
      });
    },
    passengerList() {
      return this.$store.state.order[this.index].rider;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  main {
    .icon-changbanjiantou {
      font-size: 1px;
      color: #4b8fed;
    }
    .time {
      display: block;
      width: 100%;
      height: 60px;
      margin-top: 20px;
    }
    /deep/.train-message {
      border-bottom: none;
    }
    .minusPerson {
      width: 96%;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 20px;
      box-sizing: border-box;
      padding: 40px;
      color: orange;
      font-size: 32px;
      display: flex;
      justify-content: start;
      align-items: center;
      height: 220px;
      box-sizing: border-box;
      div {
        color: black;
        display: flex;
        width: 100%;
        flex-direction: column;
        summary {
          list-style: none;
          color: #7e7e7e;
        }
        strong {
          margin-bottom: 20px;
          position: relative;
          span {
            position: absolute;
            width: 100px;
            height: 40px;
            color: #d66269;
            right: 0;
            top: 0;
          }
          em {
            border: 1px solid #4b8fed;
            color: #4b8fed;
            margin-left: 10px;
            border-radius: 10px;
          }
        }
      }
    }
  }
  .footer-button {
    width: 320px;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    button {
      width: 140px;
      height: 96%;
      border-radius: 10px;
      border: none;
    }
    button:first-child {
      background-color: #e7f5fe;
      color: #4b8fed;
      margin-right: 16px;
    }
    button:last-child {
      background-color: #ee7d31;
      color: #fff;
    }
  }
  /deep/.van-submit-bar__text {
    margin-left: 20px;
    span {
      color: #7e7e7e;
    }
    .van-submit-bar__price {
      margin-left: 10px;
      font-size: 40px;
      color: orange;
    }
  }
}
</style>
