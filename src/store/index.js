import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    show: false,
    month: new Date().getMonth() + 1, //月份
    toDay: new Date().getDate(), //天
    startstation: "北京", //起始站
    endstation: "菏泽", //终点站
    isStart: false, //点击初始站
    isEnd: false, //点击终点站
    result: [], //高铁学生票
    animation: false, //动画
    promise: [], //请求的数据（原数据）
    ticketList: [], //修改请求的数据
    ticketPice: false, //查看票价，默认不可查看
    pice: {}, //测试点击进入选择座位页面
    //联系人
    passengerListAll: [
      {
        id: 0,
        certificate: "中国居民身份证",
        name: "李斯",
        identityCard: 412422200306015823,
        type: "成人",
      },
      {
        id: 1,
        certificate: "中国居民身份证",
        name: "谢小刚",
        identityCard: 412422200245015823,
        type: "成人",
      },
    ], //乘车人数据
    //乘车人渲染
    passengerList: [],
    //订单数据
    order: [],
    maxdate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 16
    ).getTime(),
    newtime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).getTime(),
    isYesterday: true,
    isTomorrow: false,
    filteritem: "",
    name: "",
    //历史记录数组
    history: [],
    hotStation: ["上海市", "深圳", "香港", "澳门", "杭州市", "武汉市"],
  },
  getters: {
    week(state) {
      //周几，默认时间则显示今天
      let date = new Date(
        `${new Date().getFullYear()}/${state.month}/${state.toDay}`
      );
      return "日一二三四五六".charAt(date.getDay());
    }, //通过当前时间计算周几
    //判断前一天，后一天是否变灰禁止点击
    isYesterday(state) {
      if (
        new Date(
          new Date().getFullYear(),
          state.month - 1,
          state.toDay
        ).getTime() === state.newtime
      ) {
        return true;
      }
    },
    isTomorrow(state) {
      if (
        state.maxdate -
          new Date(
            new Date().getFullYear(),
            state.month - 1,
            state.toDay
          ).getTime() ===
        86400000
      ) {
        return true;
      }
    },
  },
  mutations: {
    //添加常用城市
    addHistory(state, value) {
      state.history.unshift(value);
      let temp = (list) => [...new Set(list)];
      state.history = temp(state.history);
    },
    // 点击切换起始站与终点站
    stationChange(state) {
      state.animation = true;
      // 定时器刷新
      setTimeout(() => {
        state.animation = false;
      }, 1000);
      let temp = state.endstation;
      state.endstation = state.startstation;
      state.startstation = temp;
    },
    // 将axios请求赋值给promise
    getDate(state, date) {
      //默认发时最短
      date = date.sort((a, b) => {
        return (
          a.start_time.replace(/\D/g, "") - b.start_time.replace(/\D/g, "")
        );
      });
      state.ticketList = state.promise = date;
    },
    //筛选方法
    filtrationPromise(state) {
      state.show = false;
      state.filteritem = "";
      //判断是否选择高铁或学生票
      if (state.result.length > 0) {
        for (let i = 0; i < state.result.length; i++) {
          state.filteritem += state.result[i];
        }
        state.ticketList = state.promise.filter((value) => {
          return state.filteritem.indexOf(value.train_type) !== -1;
        });
      } else {
        return (state.ticketList = state.promise);
      }
    },
    //默认筛选发时最短的数据
    shortestTime(state) {
      state.ticketList = state.ticketList.sort((a, b) => {
        return (
          a.start_time.replace(/\D/g, "") - b.start_time.replace(/\D/g, "")
        );
      });
    },
    // 点击加一天或减一天
    addtoDy(state) {
      let adddate = new Date(
        new Date().getFullYear(),
        state.month - 1,
        state.toDay + 1
      );
      if (adddate.getTime() < state.maxdate) {
        state.month = adddate.getMonth() + 1;
        state.toDay = adddate.getDate();
      }
    },
    deltoDy(state) {
      let adddate = new Date(
        new Date().getFullYear(),
        state.month - 1,
        state.toDay - 1
      );
      if (adddate.getTime() >= state.newtime) {
        state.month = adddate.getMonth() + 1;
        state.toDay = adddate.getDate();
      }
    },
    //方法二
    next: (state) => {
      state.toDay++;
      if (
        state.toDay >
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).getDate()
      ) {
        state.month += 1;
        state.toDay = 1;
      }
    },
  },
  actions: {
    //发送axios请求获取数据
    getdate(context) {
      const settime = `${context.state.month}月${context.state.toDay}日`;
      const endstation = context.state.endstation;
      const startstation = context.state.startstation;
      axios
        .get("/api/get/ticket/", {
          params: {
            start: startstation,
            end: endstation,
            date: settime,
          },
        })
        .then((res) => {
          context.commit("getDate", res.data.data);
        })
        .catch((err) => {
          context.commit("getDate", err);
        });
    },
    // 天数+1
    next: ({ commit }) => {
      commit("next");
    },
  },
  modules: {},
});
