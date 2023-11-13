<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item
      :to="item.path"
      :name="item.name"
      v-for="item in sidebar"
      :key="item.name"
    >
      <template #icon>
        <i :class="['iconfont', item.class]"></i>
      </template>
      <span>{{ item.name }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer",
  data() {
    return {
      active: "首页",
      icon: [],
      sidebar: [
        {
          id: 0,
          class: "icon-shouye-shouye",
          name: "首页",
          path: "/",
        },
        {
          id: 1,
          class: "icon-serviceshandiantuikuan",
          name: "抢票",
          path: "",
        },
        {
          id: 2,
          class: "icon-dingdan_dingdanliebiao",
          name: "订单",
          path: "/order/orderlist",
        },
        {
          id: 3,
          class: "icon-tubiao_gerenzhongxin-",
          name: "个人中心",
          path: "",
        },
      ],
    };
  },
  components: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.van-tabbar--fixed {
  height: 100px;
  span {
    font-size: 26px;
  }
}
</style>
