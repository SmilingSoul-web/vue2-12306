<template>
  <van-tabbar v-model="active">
    <van-tabbar-item @click="test" v-for="item in sidebar" :key="item.name">
      <template #icon="">
        <i :class="['iconfont', item.class]"></i>
      </template>
      {{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer",
  data() {
    return {
      icon: [],
      active: 2,
      sidebar: [
        {
          id: 1,
          class: "icon-shaixuan",
          name: "筛选",
        },
        {
          id: 2,
          class: "icon-shijian",
          name: "耗时最短",
        },
        {
          id: 3,
          class: "icon-caozuoruanjian-18",
          name: "发时最短",
        },
        {
          id: 4,
          class: "icon-bottle",
          name: "所需票价",
        },
      ],
    };
  },
  components: {},
  methods: {
    test() {
      /*if (this.active === 0) {
        this.$store.state.show = true;
      }*/
      switch (this.active) {
        case 0:
          this.$store.state.show = true;
          break;
        case 1:
          this.$store.state.ticketList.sort((a, b) => {
            return (
              a.run_time.replace(/\D/g, "") - b.run_time.replace(/\D/g, "")
            );
          });
          break;
        case 2:
          this.$store.commit("shortestTime");
          break;
        case 3:
          this.$store.state.ticketPice = !this.$store.state.ticketPice;
          break;
      }
    },
  },
  mounted() {},
  created() {},
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
