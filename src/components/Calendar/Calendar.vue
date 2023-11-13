<template>
  <div class="box">
    <van-calendar
      title="请选择日期"
      :style="{ height: '100vh' }"
      :max-date="maxDate"
      :poppable="false"
      :min-date="minDate"
      color="#438af6"
      @confirm="returnCofirm"
    />
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Calendar",
  data() {
    return {
      minDate: new Date(),
      maxDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 15
      ),
      week: ["日", "一", "二", "三", "四", "五", "六"],
    };
  },
  components: {},
  methods: {
    returnCofirm(date) {
      //修改vuex中的store值
      this.$store.state.month = date.getMonth() + 1;
      this.$store.state.toDay = date.getDate();
      /*路由跳转*/
      this.$router.back();
      //this.$router.push("/");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.box {
  /deep/.van-calendar__header-title {
    background-color: #438af6;
    color: #fff;
  }
}
</style>
