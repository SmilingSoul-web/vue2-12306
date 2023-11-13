<template>
  <div class="box">
    <van-nav-bar
      title="选择乘车人"
      left-text=""
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <article class="addPerson">
      <i class="iconfont icon-jjia-"></i
      ><router-link to="newly">新增乘车人</router-link>
    </article>
    <p class="contacts">以下是常用联系人</p>
    <div v-if="passengerListAll.length === 0" class="hint">
      <em
        ><i class="iconfont icon-cylxr"></i> 还没有常用联系人
        <a href="#">去添加</a>
      </em>
    </div>
    <article
      v-else
      class="minusPerson"
      v-for="(item, index) in passengerListAll"
      :key="index"
      @click="$refs.checkeds[item.id].toggle()"
    >
      <van-checkbox-group :max="5" v-model="result">
        <van-checkbox
          ref="checkeds"
          shape="square"
          :name="item.id"
        ></van-checkbox>
      </van-checkbox-group>
      <div>
        <strong
          >{{ item.name }} <em>{{ item.type }}</em></strong
        >
        <strong>{{ item.identityCard }}</strong>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Rider",
  data() {
    return {
      result: [],
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    //点击右上角完成跳转到订单页面
    onClickRight() {
      this.$store.state.passengerList =
        this.$store.state.passengerListAll.filter((item) => {
          return this.result.includes(item.id);
        });
      if (this.$route.query.flag) {
        this.$router.go(-3);
      } else {
        this.$router.go(-1);
      }
    },
  },
  mounted() {},
  computed: {
    ...mapState(["passengerListAll"]),
  },
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
  .addPerson {
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 18px 40px;
    color: #4b8fed;
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      margin-left: 15px;
      font-size: 34px;
      color: black;
      vertical-align: middle;
    }
  }
  .contacts {
    width: 100%;
    height: 80px;
    text-align: center;
    color: #7e7e7e;
    line-height: 80px;
    font-size: 24px;
  }
  .hint {
    width: 100%;
    height: 60px;
    text-align: center;
    color: #7e7e7e;
    font-size: 28px;
    .icon-cylxr {
      font-size: 30px;
    }
    a {
      color: black;
    }
  }
  .minusPerson {
    margin-bottom: 10px;
    width: 100%;
    height: 160px;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 18px 40px;
    color: #4b8fed;
    font-size: 32px;
    display: flex;
    justify-content: start;
    align-items: center;
    div:first-child {
      margin-left: 0px;
    }
    div {
      margin-left: 60px;
      color: black;
      display: flex;
      flex-direction: column;
      strong {
        margin-bottom: 20px;
        em {
          color: #7e7e7e;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
