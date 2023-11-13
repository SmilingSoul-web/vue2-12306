<template>
  <div class="box">
    <article
      class="train-ticket"
      v-for="(item, index) in list"
      :key="index"
      @click="navigateTo(item.id)"
    >
      <div class="train-message">
        <div>
          <strong>{{ item.start_time }}</strong>
          <p><slot name="start" />{{ item.start_station }}</p>
        </div>
        <div>
          <summary>{{ item.train_no }}</summary>
          <slot name="hr"></slot>
          <p>{{ item.run_time }}</p>
        </div>
        <div>
          <strong>{{ item.end_time }}</strong>
          <p><slot name="end" />{{ item.end_station }}</p>
        </div>
      </div>
      <div class="train-seat">
        <slot name="pice" v-bind:list="item.price_list" />
      </div>
    </article>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  name: "TrainList",
  data() {
    return {};
  },
  components: {},
  methods: {
    navigateTo(index) {
      //测试
      this.$emit("test", index);
      /*this.$router.push({
          name: route,
        });
        this.$store.state.pice = index;*/
    },
  },
  mounted() {
    this.$store.commit("shortestTime");
  },
};
</script>

<style lang="less" scoped>
.active {
  color: #00cda2;
}
.train-ticket {
  width: 96%;
  height: 240px;
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 18px 40px;
  font-size: 28px;
  color: #7e7e7e;
  .train-message {
    border-bottom: 1px solid #ececec;
    height: 65%;
  }
  .train-message,
  .train-seat {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 35%;
      padding-bottom: 20px;
      box-sizing: border-box;
      strong {
        font-size: 50px;
        color: black;
      }
      summary {
        width: 100%;
        font-size: 36px;
        color: black;
        list-style: none;
      }
      em {
        display: inline-block;
        color: #fff;
        width: 35px;
        height: 35px;
        line-height: 35px;
        font-size: 24px;
        text-align: center;
        margin-right: 10px;
        border-radius: 8px;
      }
    }
    div:nth-child(1) {
      em {
        background-color: #5098fd;
      }
      p {
        color: black;
        width: 60%;
        text-align: center;
      }
    }
    div:nth-child(2) {
      height: 118px;
      text-align: center;
      p {
        height: auto;
        font-size: 26px;
      }
    }
    div:nth-child(3) {
      text-align: right;
      em {
        background-color: #5ec992;
      }
      p {
        width: 60%;
        color: black;
        float: right;
        text-align: center;
      }
    }
  }
  .train-seat {
    height: 30%;
    em {
      width: 30%;
      margin-right: 38px;
    }
  }
}
</style>
