<template>
  <div class="box">
    <van-nav-bar
      title="添加乘车人"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <em>基本信息(用于身份核验,请务必正确填写) </em>
    <div class="input-box">
      <van-field
        readonly
        clickable
        label="证件类型:"
        :value="certificate"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
          item-height="100px"
        />
      </van-popup>
      <!-- 输入姓名 -->
      <van-field
        v-model="name"
        type="text"
        label="姓名:"
        placeholder="请输入真实姓名，以便购票"
        ref="refname"
      />
      <!-- 允许输入正整数，调起纯数字键盘 -->
      <van-field
        v-model="identityCard"
        type="text"
        placeholder="用于身份核验，请正确填写"
        label="证件号码:"
        ref="refid"
        maxlength="18"
      />
      <van-field
        readonly
        clickable
        label="旅客类型:"
        :value="type"
        @click="showType = true"
        class="type"
      />
      <van-popup v-model="showType" round position="bottom">
        <van-picker
          show-toolbar
          :columns="passengerType"
          @cancel="showType = false"
          @confirm="onType"
          item-height="100px"
        />
      </van-popup>
      <em>联系方式</em>
      <van-field
        v-model="phone"
        type="digit"
        placeholder="请准确填写乘车人手机号"
        label="手机号码:"
        ref="refphone"
      />
    </div>
    <!--button 按钮-->
    <article class="btn">
      <button type="button" @click="enterBtn">确定</button>
    </article>
    <article class="footer">
      <em><i>i</i>点击确定表示您已阅读并同意以下内容</em>
      <strong>
        根据实名制要求，购买汽车票需提交乘客的身份证件信息，并需在乘车时出具对应身份证件用于验证，请确保录入信息真实有效。飞猪将通过加密等方式保护您录入的身份证件信息，且仅在具体订票过程中提供给与您进行交易的商户/承运人。
      </strong>
    </article>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Newly",
  data() {
    return {
      name: "",
      type: "成人",
      phone: "",
      identityCard: "",
      show: false,
      isShow: false,
      certificate: "中国居民身份证",
      showPicker: false,
      showType: false,
      columns: [
        "中国居民身份证",
        "港澳居民来往内地通行证",
        "港澳台居民居住证",
        "护照",
        "台湾居民来往大陆通行证",
        "外国人永久居留身份证",
      ],
      passengerType: ["成人", "儿童", "学生", "残军"],
    };
  },
  components: {},
  methods: {
    //确认按钮
    enterBtn() {
      console.log(
        this.$store.state.passengerListAll[
          this.$store.state.passengerListAll.length - 1
        ].id + 1
      );
      //18位身份证正则
      let regular18 =
        /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      //15位身份证正则
      let regular15 =
        /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
      //手机号正则
      let regularPhone =
        /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
      let id =
        this.$store.state.passengerListAll[
          this.$store.state.passengerListAll.length - 1
        ].id + 1;
      // eslint-disable-next-line no-unused-vars
      let temp = {
        id: id,
        certificate: this.certificate,
        name: this.name,
        identityCard: this.identityCard,
        type: this.type,
      };
      if (this.name === "") {
        this.$toast("请输入姓名");
        this.$refs.refname.focus();
      } else if (this.identityCard === "") {
        this.$toast("请输入身份证号码");
        this.$refs.refid.focus();
      } else if (
        regular18.test(this.identityCard) ||
        regular15.test(this.identityCard)
      ) {
        if (this.phone === "") {
          this.$toast("请输入手机号");
          this.$refs.refphone.focus();
        } else if (!regularPhone.test(this.phone)) {
          this.$toast("手机号不正确");
          this.phone = "";
          this.$refs.refphone.focus();
        } else if (
          //通过some判断身份证号是否重复
          this.$store.state.passengerListAll.some(
            (item) => item.identityCard == this.identityCard
          )
        ) {
          this.$toast.fail("用户已存在");
        } else {
          this.$toast.success("添加成功");
          this.$store.state.passengerListAll.push(temp);
          this.$router.push({
            name: "rider",
            query: {
              flag: true,
            },
          });
        }
      } else {
        this.identityCard = "";
        this.$toast("身份证号码输入不正确");
        this.$refs.refid.focus();
      }
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    onType(value) {
      this.type = value;
      this.showType = false;
    },
    onClickLeft() {
      this.$router.back();
    },
    //input框去除文本
  },
  mounted() {},
  watch: {
    // eslint-disable-next-line no-unused-vars
    identityCard(newvalue, oldvalue) {
      console.log(oldvalue); // 只允许输入字母和数字
      if (!/^[a-zA-Z0-9]*$/.test(newvalue)) {
        this.identityCard = newvalue = newvalue.replace(/[^a-zA-Z0-9]/g, ""); // 移除非字母和数字的字符
      }
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  font-size: 28px;
  /deep/.van-nav-bar__content {
    background-color: #4b8fed;
    i,
    .van-nav-bar__text,
    .van-nav-bar__title {
      color: #fff;
    }
  }
  em {
    display: inline-block;
    height: 88px;
    width: 100%;
    font-size: 28px;
    box-sizing: border-box;
    padding: 20px 32px;
    background-color: #f6f6f6;
    line-height: 50px;
  }
  .btn {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    button {
      width: 84%;
      margin: 46px 60px;
      height: 88px;
      background-color: #4b8fed;
      color: #fff;
      border: none;
    }
  }
  .footer {
    em {
      padding-left: 0px;
    }
    i {
      display: inline-block;
      width: 35px;
      height: 35px;
      border-radius: 20px;
      line-height: 35px;
      text-align: center;
      background-color: black;
      color: #fff;
      vertical-align: middle;
    }
    width: 100%;
    box-sizing: border-box;
    padding: 40px 30px;
    strong {
      color: #7e7e7e;
    }
  }
  /deep/.van-cell:first-child,
  .type {
    &:before {
      position: absolute;
      content: "";
      width: 20px;
      height: 20px;
      transform: rotate(-45deg);
      border-bottom: 5px solid #7e7e7e;
      border-left: 5px solid #7e7e7e;
      top: 24px;
      right: 40px;
    }
  }
}
</style>
