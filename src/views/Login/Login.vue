<template>
  <div class="box">
    <header class="header">
      <button>关闭</button>
      <div class="title">
        <strong>{{ title }}</strong>
        <a href="#" @click="cutTitile" :class="{ active: !isActive }"
          >账号密码登陆</a
        >
        <a href="#" @click="cutTitile" :class="{ active: isActive }"
          >手机号验证码登陆</a
        >
      </div>
    </header>
    <section class="main">
      <form @submit.prevent="onsubmit">
        <!--登陆-->
        <article v-if="isActive" class="regsiter">
          <ul>
            <!--手机号登陆-->
            <li>
              <input
                type="text"
                oninput="if(value.length > 11)value = value.slice(0, 15)"
                placeholder="请输入手机号"
                ref="refphone"
                v-model="regPhone"
              />
              <span>+86</span>
            </li>
            <!--获取验证码-->
            <li>
              <input
                type="text"
                placeholder="请输入验证码"
                ref="refcode"
                v-model="authCode"
              />
              <button
                type="button"
                :disabled="verifyPhone"
                :class="[!verifyPhone && show ? 'truebtn' : 'falsebtn']"
                @click="getCode"
              >
                {{ !show ? `${this.count}后发送验证码` : `获取验证码` }}
              </button>
            </li>
            <!--文字说明-->
            <li>
              <strong>未注册手机号验证后自动自动创建账号</strong>
              <a href="#">语音验证码</a>
            </li>
            <!--勾选协议-->
            <li>
              <em
                ><van-checkbox v-model="agreement" icon-size="30"
                  >我已阅读并同意
                  <a href="#">《用户协议》、《隐私用户》</a></van-checkbox
                ></em
              >
            </li>
          </ul>
        </article>
        <!--账号登陆-->
        <article v-else class="regsiter">
          <ul>
            <!--账号登陆-->
            <li>
              <input
                type="text"
                oninput="if(value.length > 11)value = value.slice(0, 15)"
                placeholder="请输入手机号/邮箱"
                ref="refname"
                v-model="username"
              />
            </li>
            <!--输入密码-->
            <li>
              <input
                :type="isPwd ? 'text' : 'password'"
                placeholder="请输入密码"
                v-model="pwd"
                ref="refpwd"
              />
              <button
                v-show="verifyPwd"
                type="button"
                class="yanjing"
                @click="isPwd = !isPwd"
                :class="['iconfont', isPwd ? 'icon-yanjing' : 'icon-biyan--']"
              ></button>
            </li>
            <!--图片验证码-->
            <li>
              <input
                type="text"
                placeholder="请输入验证码"
                ref="refcode"
                v-model="imgCode"
              />
              <div class="code" @click="refreshCode">
                <identify :identifyCode="identifyCode"></identify>
              </div>
            </li>
          </ul>
        </article>
        <!--登陆按钮-->
        <button type="submit">登陆</button>
        <dl>
          <dt>一键登录</dt>
          <dt>密码登陆</dt>
        </dl>
      </form>
    </section>
    <footer class="footer">
      <i class="iconfont icon-shejiaotubiao-06"></i>
      <i class="iconfont icon-weixin"></i>
      <i class="iconfont icon-qq"></i>
    </footer>
  </div>
</template>

<script>
import Identify from "@/components/Code/Identify.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      isActive: true, //控制标题
      title: "手机验证码登陆",
      regPhone: "", //手机号
      authCode: "", //验证码
      username: "", //用户名
      pwd: "", //密码
      agreement: false, //用户协议
      imgCode: "", //图片验证码
      isPwd: false,
      //60秒倒计时
      show: true,
      count: "",
      timer: null,
      flag: true, //该值变化，就会触发刷新
      code: "", //刷新后的验证码
      //图片验证码
      // 随机抽取四位数
      identifyCodes: "1234567890asdfghjklzxcvbnmqwertyuiop",
      identifyCode: "",
    };
  },
  components: {
    Identify,
  },
  methods: {
    //图片验证码
    // 验证码处理
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 刷新验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
      console.log(this.identifyCode);
    },
    //点击切换登陆方式
    cutTitile(e) {
      if (e.target.classList.contains("active")) return;
      let active = document.querySelector(".active");
      active.classList.remove("active");
      e.target.classList.add("active");
      this.title = e.target.innerText;
      this.isActive = !this.isActive;
    },
    //60秒倒计时
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    //登陆验证
    onsubmit() {
      if (this.isActive) {
        /*手机号登陆*/
        if (this.verifyPhone) {
          this.$toast("手机号不正确");
          /*清空手机号*/
          this.regPhone = "";
          /*光标聚焦*/
          this.$refs.refphone.focus();
        } else if (!/^\d{4,6}$/.test(this.authCode)) {
          this.$toast("验证码不正确");
          /*清空验证码*/
          this.authCode = "";
          /*光标聚焦*/
          this.$refs.refcode.focus();
        } else if (!this.agreement) {
          this.$toast("请勾选用户协议");
          this.agreement = true;
        } else if (this.$route.query.path == undefined) {
          //用户存储
          localStorage.setItem("phone", JSON.stringify(this.regPhone));
          this.$toast.success("登陆成功");
          this.$router.push("/");
        } else {
          localStorage.setItem("phone", JSON.stringify(this.regPhone));
          this.$toast.success("登陆成功");
          this.$router.push(this.$route.query.path);
        }
      } else {
        /*密码登录*/
        if (this.username == "") {
          this.$toast("账号不能为空");
          /*光标聚焦*/
          this.$refs.refname.focus();
        } else if (this.pwd == "") {
          this.$toast("密码不能为空");
          /*光标聚焦*/
          this.$refs.refpwd.focus();
        } else if (this.imgCode === "") {
          this.$toast("验证码不能为空");
          /*光标聚焦*/
          this.$refs.refcode.focus();
        } else if (this.identifyCode !== this.imgCode) {
          this.$toast("验证码不正确");
          /*光标聚焦*/
          this.$refs.refcode.focus();
        } else {
          /*const axios = require("axios");*/
          this.$axios({
            method: "get",
            url: "/api/get/login",
            //URL中的查询参数,get请求用这个
            params: {
              username: this.username,
              pwd: this.pwd,
            },
          }).then((response) => {
            if (response.data.code == 200) {
              if (this.$route.query.path == undefined) {
                //用户存储
                localStorage.setItem("username", JSON.stringify(this.username));
                this.$toast.success("登陆成功");
                this.$router.push("/");
              } else {
                localStorage.setItem("username", JSON.stringify(this.username));
                this.$toast.success("登陆成功");
                this.$router.push(this.$route.query.path);
              }
            } else {
              this.$toast.fail("用户名密码不存在");
              this.username = "";
              this.pwd = "";
              this.imgCode = "";
              this.$refs.refname.focus();
            }
          });
        }
      }
    },
  },
  computed: {
    /*获取验证码显示*/
    verifyPhone() {
      let regrule =
        /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
      return !regrule.test(this.regPhone);
    },
    verifyPwd() {
      return !this.pwd == "";
    },
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
};
</script>

<style lang="less" scoped>
@bgColor: #ffffff; //背景颜色
@color: #adaabb; //默认字体颜色
@activeColor: #16a87b; //字体高亮颜色
//设置input框输入高亮
textarea:focus,
input[type="text"]:focus,
input[type="datetime"]:focus,
input[type="password"]:focus,
input[type="number"]:focus {
  border-color: rgba(82, 168, 236, 0.8);
  outline: 0;
  outline: thin dotted \9;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
.box {
  min-width: 320px;
  max-width: 750px;
  padding: 60px;
  font-size: 28px;
  background-color: #fff;
  .header {
    width: 100%;
    height: 300px;
    button {
      width: 78px;
      height: 34px;
      color: @color;
      font-size: 32px;
      background-color: #fff;
      border: none;
      margin-bottom: 60px;
    }
    .title {
      height: 200px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      box-sizing: border-box;
      padding: 0 20px;
      strong {
        width: 100%;
        font-size: 46px;
        font-weight: bold;
      }
      a {
        margin-top: 50px;
        height: 40px;
      }
      .active {
        color: orange;
        border-bottom: orange solid 1px;
      }
    }
  }
  .main {
    height: auto;
    .regsiter,
    .login {
      height: auto;
      font-size: 28px;
    }
    .regsiter {
      ul {
        li {
          position: relative;
          margin-top: 50px;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          input {
            box-sizing: border-box;
            width: 100%;
            height: 90px;
            border-radius: 45px;
            padding-left: 35px;
            border: 0;
            font-size: 32px;
            background-color: #eff0f4;
          }
          span,
          button,
          .code {
            position: absolute;
            top: 25px;
            right: 46px;
            width: 90px;
            height: 40px;
            line-height: 40px;
            font-size: 35px;
          }
          .code {
            margin-top: -25px;
            right: 40px;
            color: @color;
            width: 200px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            z-index: 2;
          }
          span,
          strong {
            color: @color;
          }
          strong {
            font-size: 24px;
            margin-left: 15px;
          }
          em {
            width: 100%;
            box-sizing: border-box;
            font-size: 26px;
            padding: 25px;
          }
          span {
            &:after {
              position: absolute;
              display: inline-block;
              top: 6px;
              right: 0px;
              border-left: 20px solid @color;
              border-bottom: 20px solid @color;
              border-color: transparent @color @color transparent;
              content: "";
              transform: rotate(45deg);
            }
          }
          .falsebtn,
          .truebtn {
            text-align: right;
            width: 260px;
            height: 60px;
            right: 46px;
            font-size: 33px;
            line-height: 60px;
            color: @color;
            top: -10px;
            background-color: #eff0f4;
          }
          .yanjing {
            color: @color;
            background-color: #eff0f4;
            font-size: 52px;
            top: 2px;
          }
          .truebtn {
            color: @activeColor;
          }
          button {
            width: 160px;
            border: none;
            top: 10px;
            right: 0px;
            border-radius: 30px;
          }
          a {
            color: @activeColor;
            font-size: 24px;
            margin-right: 15px;
          }
        }
      }
    }
    button {
      width: 100%;
      height: 90px;
      border-radius: 45px;
      border: none;
      font-size: 35px;
      color: #fff;
      margin-top: 20px;
      background-color: @color;
    }
    dl {
      width: 100%;
      height: 36px;
      margin-top: 40px;
      display: flex;
      justify-content: center;
      color: #6c737b;
      dt:first-child {
        border-right: 1px solid @color;
      }
      dt {
        padding: 0 20px;
      }
    }
  }
  .footer {
    margin-top: 190px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    i {
      width: 78px;
      height: 78px;
      border-radius: 100%;
      line-height: 78px;
      text-align: center;
      font-size: 55px;
      background-color: #f6f7fb;
    }
    i:first-child {
      color: #fb7573;
    }
    i:nth-child(2) {
      color: #00cda2;
    }
    i:last-child {
      color: #489bf9;
      position: relative;
    }
  }
}
</style>
