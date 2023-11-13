import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
/*引入css样式*/
import "./assets/font/iconfont.css";
import "./assets/styles/css/normalize.css";
import "./assets/styles/css/base.css";
// 引入自适应组件
import "amfe-flexible";
/*引入css动画*/
import "animate.css";
/*引入vant样式源文件*/
import "vant/lib/index.less";
/*引入vuat*/
import Vant from "vant";
import "vant/lib/index.css";
/*引入mock数据*/
import "./mock/login.js";
import "./mock/city.js";
import "./mock/ticket.js";
Vue.use(Vant);
//main.js
import axios from "axios";
//把axios对象挂到Vue实例上面，使用axios的时候直接 this.$axios就可以了
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
