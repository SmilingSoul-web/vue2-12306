<template>
  <div class="header">
    <div @click="navigateTo">
      <span class="iconfont icon-houtui"></span>
    </div>
    <div>
      <slot name="title"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Nav",
  data() {
    return {};
  },
  components: {},
  methods: {
    navigateTo() {
      this.$router.back();
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  background-color: #5098fd;
  height: 100px;
  padding: 16px 28px;
  box-sizing: border-box;
  display: flex;
  border: none;
  justify-content: start;
  align-items: center;
  div {
    width: 30%;
    color: #fff;
    .icon-houtui {
      color: #fff;
    }
  }
  div:nth-child(2) {
    display: flex;
    width: 40%;
    justify-content: center;
    align-items: center;
    font-size: 32px;
  }
  div:last-child {
    text-align: right;
  }
}
</style>
