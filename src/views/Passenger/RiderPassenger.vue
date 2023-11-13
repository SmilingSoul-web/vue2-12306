<template>
  <div class="box">
    <header>
      <Nav>
        <template #title>
          <span>{{ startstation }} </span>
          <i class="iconfont icon-xianghujiaohuan"></i>
          <span> {{ endstation }}</span>
        </template>
      </Nav>
    </header>
    <main>
      <TrainList :list="ticketList">
        <template #hr>
          <i class="iconfont icon-changbanjiantou"></i>
        </template>
        <template #pice="{ list }">
          <ul
            v-for="(item, index) in list"
            :key="index"
            @click="isActive = index"
            :class="{ active: isActive == index }"
          >
            <li>
              <strong>{{ item.price_type }}</strong>
            </li>
            <li>{{ `￥${item.price}` }}</li>
            <li>{{ item.num > 10 ? `有` : `${item.num}张` }}</li>
          </ul>
        </template>
      </TrainList>
      <article class="addPerson" @click="redirect">
        <i class="iconfont icon-jjia-"></i
        ><a href="javascript:void (0)">选择乘车人</a>
      </article>
      <article class="minusPerson" v-for="item in passengerList" :key="item.id">
        <i
          @click="delicon(item.id)"
          :class="[
            'iconfont',
            'icon-jian',
            test.includes(item.id) ? 'spin-anticlockwise' : '',
          ]"
        ></i>
        <div>
          <strong
            >{{ item.name }} <em>{{ item.type }}</em
            ><span
              :class="[
                'animate__animated',
                test.includes(item.id)
                  ? 'animate__lightSpeedInRight'
                  : 'animate__lightSpeedInLeft',
              ]"
              v-show="test.includes(item.id)"
              @click="del(item.id)"
              >删除</span
            ></strong
          >
          <strong>{{ item.identityCard }}</strong>
        </div>
      </article>
      <article class="clause">
        <span
          >提交订单表示已阅读
          <a href="#">《铁路互联网购票须知》《服务条款》</a></span
        >
      </article>
      <article class="order">
        <button @click="getorderbtn">提交订单</button>
      </article>
      <article class="hint">
        <em><span>i</span>温馨提示:</em>
        1.显示的卧铺票价均为上铺票价,供您参考。具体票价以您确认支付时实际购买的铺别票价为准。
      </article>
    </main>
  </div>
</template>

<script>
import Nav from "@/components/Nav/Nav.vue";
import { mapState } from "vuex";
import TrainList from "@/components/Train/TrainList.vue";
export default {
  name: "RiderPassenger",
  data() {
    return {
      ticketPice: true,
      checked: [],
      isActive: 2,
      delBtn: false,
      //测试数据
      test: [],
    };
  },
  components: {
    Nav,
    TrainList,
  },
  methods: {
    //随机生成订单编号
    orderNumber() {
      let ordernum = "";
      //定义单号数据
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for (let i = 0; i < 11; i++) {
        ordernum += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return ordernum;
    },
    //提交订单判断
    getorderbtn() {
      let phone = JSON.parse(localStorage.getItem("phone"));
      let username = JSON.parse(localStorage.getItem("username"));
      if (this.$store.state.passengerList.length === 0) {
        this.$toast.fail("请添加联系人");
      } else if (phone != null || username != null) {
        let number = this.orderNumber(); //订单编号
        let order = {
          number: number, //订单编号
          serial: this.$route.query.id, //列车编号
          sect: this.ticketList[0].price_list[this.isActive].price_type, //所选座位
          sate: 0, //当前状态
          price: parseInt(this.ticketList[0].price_list[this.isActive].price), //单价
          rider: this.$store.state.passengerList, //乘车人
          trainNum: this.ticketList[0].train_no, //车次
          startTime: this.ticketList[0].date, //出发时间
          start_station: this.ticketList[0].start_station,
          end_station: this.ticketList[0].end_station,
        };
        this.$store.state.order.push(Object.assign({}, order));
        this.$toast.loading({
          message: "余票充足请稍等...",
          forbidClick: true,
        });
        setTimeout(() => {
          this.$router.push({
            name: "pay",
            query: {
              number: number,
            },
          });
        }, 2500);
      } else {
        this.$toast.fail("请先登录");
        this.$router.push({
          name: "login",
          query: {
            path: `order/riderpassenger?id=${this.$route.query.id}`,
          },
        });
      }
    },
    //添加乘车人跳转登陆
    redirect() {
      let phone = JSON.parse(localStorage.getItem("phone"));
      let username = JSON.parse(localStorage.getItem("username"));
      if (phone != null || username != null) {
        this.$router.push("rider");
      } else {
        this.$toast.fail("请先登录");
        this.$router.push({
          name: "login",
          query: {
            path: `order/riderpassenger?id=${this.$route.query.id}`,
          },
        });
      }
    },
    //删除图标
    delicon(id) {
      if (this.test.includes(id)) {
        this.test = this.test.filter((item) => {
          return item !== id;
        });
      } else {
        this.test.push(id);
      }
    },
    //删除
    del(id) {
      console.log(id);
      const targetIndex = this.$store.state.passengerList.findIndex(
        (item) => item.id === id
      );
      if (targetIndex !== -1) {
        this.$store.state.passengerList.splice(targetIndex, 1);
      }
    },
  },
  computed: {
    ...mapState(["startstation", "endstation", "pice", "passengerList"]),
    ticketList() {
      return this.$store.state.ticketList.filter((item) => {
        return item.id == this.$route.query.id;
      });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: auto;
  main {
    width: 100%;
    height: auto;
    .icon-changbanjiantou {
      font-size: 1px;
      color: #4b8fed;
    }
    .addPerson,
    .minusPerson {
      width: 96%;
      height: 100px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 20px;
      box-sizing: border-box;
      padding: 18px 40px;
      color: orange;
      font-size: 32px;
    }
    .addPerson {
      display: flex;
      justify-content: start;
      align-items: center;
      a {
        margin-left: 15px;
        font-size: 34px;
        color: orange;
        vertical-align: middle;
      }
    }
    .minusPerson {
      display: flex;
      justify-content: start;
      align-items: center;
      color: #2eaae0;
      height: 150px;
      .spin-anticlockwise {
        transform: rotate(90deg);
        color: red;
      }
      div {
        margin-left: 60px;
        color: black;
        display: flex;
        width: 100%;
        flex-direction: column;
        strong {
          margin-bottom: 20px;
          position: relative;
          span {
            position: absolute;
            width: 120px;
            height: 60px;
            background-color: orange;
            text-align: center;
            line-height: 60px;
            font-size: 35px;
            border-radius: 10px;
            color: #fff;
            right: 0;
            top: 28px;
          }
          em {
            border: 1px solid #7e7e7e;
            color: #7e7e7e;
            margin-left: 10px;
          }
        }
      }
    }
    .clause {
      width: 96%;
      height: 100px;
      margin: 20px auto;
      padding: 18px 45px;
      font-size: 30px;
      box-sizing: border-box;
      a {
        color: #4b8fed;
      }
    }
    .order {
      width: 96%;
      height: 100px;
      margin: 20px auto;
      padding: 18px 70px;
      font-size: 30px;
      box-sizing: border-box;
      button {
        width: 100%;
        height: 80px;
        border-radius: 10px;
        border: none;
        background-color: #4b8fed;
        color: #fff;
        font-size: 32px;
      }
    }
    .hint {
      position: relative;
      width: 96%;
      height: 180px;
      margin: 70px auto;
      padding: 60px 40px;
      font-size: 28px;
      box-sizing: border-box;
      border: 2px #7e7e7e dashed;
      border-radius: 15px;
      color: #7e7e7e;
      em {
        position: absolute;
        left: -2px;
        top: -4px;
        color: black;
        background-color: #f6f6f6;
        span {
          display: inline-block;
          text-align: center;
          width: 40px;
          height: 40px;
          font-size: 32px;
          line-height: 40px;
          border-radius: 20px;
          background-color: #4b8fed;
          color: #fff;
        }
      }
    }
    .active {
      color: #7e7e7e;
      border: 1px solid #4b8fed;
      &:before {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 30px;
        height: 30px;
        content: "";
        border-radius: 5px;
        border-top-right-radius: 15px;
        background-color: #4b8fed;
      }
      &:after {
        content: "";
        position: absolute;
        right: 0;
        top: 2px;
        z-index: 3;
        width: 23px;
        height: 16px;
        border-left: 5px solid #fff;
        border-bottom: 5px solid #fff;
        transform: rotate(-45deg);
      }
    }
  }
  /deep/.train-message {
    height: 40%;
  }
  /deep/.train-ticket {
    height: 400px;
    ul {
      width: 160px;
      height: 160px;
      text-align: center;
      background-color: #fbfbfb;
      border-radius: 15px;
      margin-right: 30px;
      box-sizing: border-box;
      padding: 40px 20px;
      position: relative;
      li {
        strong {
          font-weight: bold;
          font-size: 35px;
          color: black;
        }
      }
    }
  }
  /deep/.train-seat {
    height: 55%;
  }
}
</style>
