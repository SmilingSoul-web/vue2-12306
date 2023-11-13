<template>
  <div class="box">
    <header>
      <van-nav-bar
        title="请您支付"
        left-text="订单"
        right-text="完成"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <van-nav-bar left-text="中国铁路电子支付平台" />
    </header>
    <main>
      <van-cell-group>
        <van-cell title="应付金额">
          <template #default>
            <strong>{{ price }}</strong>
          </template>
        </van-cell>
        <van-radio-group v-model="result">
          <van-cell
            v-for="(item, index) in list"
            :key="index"
            @click="result = item.name"
          >
            <template #icon>
              <i
                :style="{ color: item.color }"
                :class="['iconfont', item.icon]"
              />
            </template>
            <template #title
              ><em>{{ item.name }}</em>
            </template>
            <template #right-icon>
              <van-radio :name="item.name" />
            </template>
          </van-cell>
        </van-radio-group>
      </van-cell-group>
    </main>
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Payment",
  data() {
    return {
      price: `￥${this.$route.query.price}`,
      result: "支付宝",
      //循环输出图标
      list: [
        {
          id: 1,
          name: "支付宝",
          icon: "icon-zhifubao",
          color: "#4b8fed",
        },
        {
          id: 2,
          name: "微信",
          icon: "icon-weixin",
          color: "#24db5a",
        },
        {
          id: 3,
          name: "工商银行",
          icon: "icon-gongshangyinhang",
          color: "#d8736f",
        },
        {
          id: 4,
          name: "农业银行",
          icon: "icon-nongyeyinhang",
          color: "#019d97",
        },
        {
          id: 5,
          name: "中国银行",
          icon: "icon-zhongguoyinhang",
          color: "#b92126",
        },
        {
          id: 6,
          name: "建设银行",
          icon: "icon-jiansheyinhang",
          color: "#004f9c",
        },
        {
          id: 7,
          name: "邮政银行",
          icon: "icon-youzhengyinhang",
          color: "#007e3e",
        },
      ],
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      Dialog.alert({
        title: "温馨提示",
        message: `您正在使用${this.result}支付`,
        showConfirmButton: false,
      }).then(() => {});
      setTimeout(Dialog.alert.close, 3000);
      setTimeout(() => {
        this.$store.state.order[this.$route.query.index].sate = 2;
        this.$router.push({ name: "orderlist" });
      }, 3010);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.box {
  /deep/.van-nav-bar__content {
    background-color: #4b8fed;
    i,
    .van-nav-bar__text,
    .van-nav-bar__title {
      color: #fff;
    }
  }
  /deep/.van-nav-bar__content:last-child {
    margin-top: -10px;
  }
  main {
    strong {
      font-size: 35px;
      color: black;
    }
    em {
      margin-left: 20px;
    }
  }
}
</style>
