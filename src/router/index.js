import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login/Login.vue";
import Logon from "@/views/Login/Logon.vue";
import Home from "@/views/Home/Home.vue";
import IndexBar from "../components/IndexBar/IndexBar.vue";
import Calendar from "../components/Calendar/Calendar.vue";
import BuyTicket from "@/views/BuyTicket/BuyTicket.vue";
import RiderPassenger from "@/views/Passenger/RiderPassenger.vue";
import Rider from "@/views/Passenger/Rider.vue";
import Newly from "@/views/Passenger/Newly.vue";
import Order from "@/views/Passenger/Order.vue";
import Pay from "@/views/Pay/Pay.vue";
import Payment from "@/views/Pay/Payment.vue";
import OrderList from "@/views/Passenger/OrderList.vue";
import { Toast } from "vant";
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject)
    return originalPush.call(this, location, resolve, reject);
  return originalPush.call(this, location).catch(() => {});
};

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar,
  },
  {
    path: "/order",
    component: Order,
    //子路由
    children: [
      {
        path: "/",
        redirect: "riderpassenger",
        name: "riderpassenger",
        component: RiderPassenger,
      },
      {
        path: "riderpassenger",
        name: "riderpassenger",
        component: RiderPassenger,
      },
      {
        path: "rider",
        name: "rider",
        component: Rider,
      },
      {
        path: "newly",
        name: "newly",
        component: Newly,
      },
      {
        path: "pay",
        name: "pay",
        component: Pay,
      },
      {
        path: "payment",
        name: "payment",
        component: Payment,
      },
      {
        path: "orderlist",
        name: "orderlist",
        component: OrderList,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/indexbar",
    name: "indexbar",
    component: IndexBar,
  },
  {
    path: "/buytick",
    name: "buytick",
    component: BuyTicket,
  },
  {
    path: "/logon",
    name: "logon",
    component: Logon,
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  // 判断目标路由是否需要身份验证
  if (to.meta.requiresAuth) {
    // 进行身份验证的逻辑
    // 如果已经登录，放行
    if (
      JSON.parse(localStorage.getItem("phone")) != null ||
      JSON.parse(localStorage.getItem("username")) != null
    ) {
      next();
    } else {
      // 否则重定向到登录页面
      Toast.fail("请先登陆");
      next({ path: "/login", query: { path: "order/orderlist" } });
    }
  } else {
    // 不需要身份验证的页面，直接放行
    next();
  }
});
export default router;
