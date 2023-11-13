<template>
  <div>
    <van-cell :value="date" @click="show = true" />
    <van-calendar v-model="currentDate" @select="onSelectDate">
      <template #title="{ date }">
        {{ date.getMonth() + 1 }}月{{ date.getDate() }}日({{ weekday(date) }})
      </template>
    </van-calendar>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Logon",
  data() {
    return {
      currentDate: new Date(),
      //日历
      date: "",
      show: false,
    };
  },
  methods: {
    weekday(date) {
      const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
      return `星期${weekdays[date.getDay()]}`;
    },
    onSelectDate(date) {
      console.log(date);
    },
  },
};
</script>
<style lang="less" scoped></style>
