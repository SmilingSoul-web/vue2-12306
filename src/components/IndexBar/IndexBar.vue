<template>
  <div>
    <van-sticky :offset-top="0">
      <div class="header">
        <!--搜索框-->
        <van-search
          v-model="value"
          shape="round"
          background="#438af6"
          placeholder="请输入搜索关键词"
          @input="debounceSearch"
        />
      </div>
    </van-sticky>
    <!--搜索结果-->
    <van-cell
      v-show="!show"
      v-for="(city, index) in result"
      :key="index"
      :title="city"
      @click="handleIndexSelect"
    />
    <div>
      <article v-show="show" class="hot_station">
        <h3>热门车站</h3>
        <ul>
          <li
            v-for="(hotStation, index) in $store.state.hotStation"
            :key="index"
            @click="handleIndexSelect"
          >
            {{ hotStation }}
          </li>
        </ul>
      </article>
      <article v-if="$store.state.history.length != 0" class="hot_station">
        <h3>常用车站</h3>
        <ul>
          <li
            v-for="(name, index) in $store.state.history"
            :key="index"
            @click="handleIndexSelect"
          >
            {{ name }}
          </li>
        </ul>
      </article>
    </div>
    <!--输出-->
    <div class="index_bar" v-show="show">
      <van-index-bar
        :sticky-offset-top="110"
        :index-list="indexList"
        highlight-color="#438af6"
      >
        <!--循环输出城市名称-->
        <div v-for="(city, index) in cityList" :key="index">
          <van-index-anchor :index="city.letter">{{
            city.letter
          }}</van-index-anchor>
          <van-cell
            @click="handleIndexSelect"
            v-show="show"
            v-for="(name, index) in city.data"
            :key="index"
            :title="name.name"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexBar",
  data() {
    return {
      // 定义数据,索引
      indexList: [],
      /*城市名称*/
      //从后端获取数据
      cityList: [],
      //搜索框的值
      value: "",
      //搜索返回结果
      result: [],
      show: true,
    };
  },
  components: {},
  methods: {
    // 从后端拿到数据
    getData() {
      this.$axios.get("/api/get/citydata/").then((res) => {
        this.cityList = res.data.data;
        this.cityList.forEach((item) => {
          //向数组中添加数据
          this.indexList.push(item.letter);
        });
      });
    },
    // 搜索触发方法
    debounceSearch() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.search();
      }, 1000); // 设置延迟时间为500毫秒
    },
    search() {
      // 根据搜索框的输入内容进行搜索并更新搜索结果
      //定义一个数组接收返回结果
      //this.result = [];
      this.result = [];
      let resultName = [];
      this.cityList.forEach((item) => {
        item.data.forEach((name) => {
          // console.log(name.name);
          if (
            name.name.indexOf(this.value) != -1 ||
            name.py.indexOf(this.value.toLowerCase()) != -1 ||
            name.city_pinyin == this.value
          ) {
            resultName.push(name.name);
          }
        });
      });
      this.result = resultName;
      this.show = false;
      if (this.value == "") {
        this.show = true;
      }
    },
    //点击获取数据
    handleIndexSelect(e) {
      // 处理索引栏点击事件，将选中的索引值传递给主页组件
      /*console.log(index);
      console.log(this.$route.params.index);*/
      console.log(e);
      this.$store.state.historyShow = true;
      if (this.$route.params.index == this.$store.state.startstation) {
        this.$store.state.startstation = e.target.innerText;
        this.$store.commit("addHistory", e.target.innerText);
        this.$router.go(-1);
      } else {
        this.$store.state.endstation = e.target.innerText;
        this.$store.commit("addHistory", e.target.innerText);
        this.$router.go(-1);
      }
    },
  },
  /*初始化加载*/
  created() {
    this.getData();
  },
  mounted() {},
  // 销毁事件
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
}
.hot_station {
  width: 100%;
  background-color: #fff;
  height: auto;
  h3 {
    font-size: 32px;
    padding: 20px;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
  }
  li {
    width: 25%;
    text-align: center;
    height: 65px;
    margin: 10px 45px 10px 10px;
    background-color: #efecec;
    font-size: 28px;
    line-height: 65px;
    border-radius: 15px;
  }
}
.index_bar {
  background-color: gainsboro;
}
</style>
