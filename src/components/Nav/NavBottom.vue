<template>
  <div class="nav_bottom">
    <div>
      <span :class="$store.getters.isYesterday ? 'forbid' : ''" @click="deltoDy"
        >前一天</span
      >
    </div>
    <slot name="center"></slot>
    <div>
      <!--1.绑定点击事件，
          2.每次点击天数+1
          3.判断当前点击的天数 > 本月最后一天时
          4.获取当前月份并且 +1（当月份大于11 月变为1 年数加 +1） ，天数从 1 开始
          5.获取当前日期对应的的周几
          （难点：本月最后一天）
      -->
      <span :class="$store.getters.isTomorrow ? 'forbid' : ''" @click="next"
        >后一天</span
      >
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "NavBottom",
  data() {
    return {};
  },
  components: {},
  methods: {
    ...mapMutations(["addtoDy", "deltoDy"]),
    next() {
      /*1.绑定点击事件，
          2.每次点击天数+1
          3.判断当前点击的天数 > 本月最后一天时
          4.获取当前月份并且 +1（当月份大于11 月变为1 年数加 +1） ，天数从 1 开始
          5.获取当前日期对应的的周几
          （难点：本月最后一天）*/
      this.$store.dispatch("next");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.nav_bottom {
  width: 100%;
  background-color: #5098fd;
  height: 80px;
  padding: 16px 28px;
  box-sizing: border-box;
  display: flex;
  border: none;
  justify-content: start;
  align-items: center;
  margin-top: -5px;
  font-size: 28px;
  div {
    width: 35%;
    color: #fff;
    .icon-houtui {
      color: #fff;
    }
  }
  div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    a {
      width: 100%;
      padding: 0 10px;
      border-radius: 15px;
      background-color: #fff;
      color: #4b8fed;
      display: flex;
      align-items: center;
      span {
        margin-right: 1px;
      }
    }
  }
  div:last-child {
    text-align: right;
  }
  .forbid {
    pointer-events: none;
    color: #7e7e7e;
  }
}
</style>
