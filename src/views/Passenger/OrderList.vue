<template>
  <div class="box">
    <header>
      <Nav>
        <template #title>
          <strong>订单记录</strong>
        </template>
      </Nav>
    </header>
    <main>
      <section>
        <article class="empty" v-if="order.length == 0">
          <div>
            <p>没有查到您的订单</p>
          </div>
        </article>
        <article v-else>
          <table
            class="train-ticket"
            v-for="(item, index) in order"
            :key="index"
          >
            <tr>
              <td colspan="2">
                <i class="iconfont icon-dingdan_dingdanliebiao" />{{
                  item.start_station
                }}—{{ item.end_station }}
              </td>
              <td>查看更多</td>
            </tr>
            <tr>
              <td>订单单号：</td>
              <td>{{ item.number }}</td>
              <td>{{ `￥${item.price}` }}</td>
            </tr>
            <tr>
              <td>订单车次：</td>
              <td>{{ `${item.startTime} ${item.trainNum}` }}</td>
              <td>
                <span
                  :class="[
                    item.sate === 2
                      ? 'completed'
                      : item.sate === 4
                      ? 'cancel'
                      : item.sate === 0
                      ? 'unfinished'
                      : '',
                  ]"
                  >{{
                    `${
                      item.sate === 2
                        ? "已出票"
                        : item.sate === 4
                        ? "已取消"
                        : item.sate === 0
                        ? "待支付"
                        : ""
                    }`
                  }}</span
                >
              </td>
            </tr>
            <tr>
              <td>乘车人：</td>
              <td>李斯</td>
              <td></td>
            </tr>
          </table>
        </article>
      </section>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Nav from "@/components/Nav/Nav.vue";
import Footer from "@/components/footer/Footer.vue";
import { mapState } from "vuex";
export default {
  name: "OrderList",
  data() {
    return {
      ticketList: [],
    };
  },
  components: {
    Nav,
    Footer,
  },
  methods: {},
  computed: {
    ...mapState(["order"]),
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.box {
  main {
    section {
      height: 84vh;
      overflow: scroll;
      .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          box-sizing: border-box;
          padding: 28px;
          font-size: 30px;
          color: #7e7e7e;
        }
        width: 100%;
        height: 84vh;
      }
      article {
        .train-ticket {
          width: 96%;
          height: 280px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 20px;
          box-sizing: border-box;
          padding: 30px 40px;
          font-size: 28px;
          color: #7e7e7e;
          tr {
            td:first-child {
              text-align: center;
            }
            td:nth-child(2) {
              color: black;
            }
            td:last-child {
              text-align: right;
              box-sizing: border-box;
              padding-right: 30px;
            }
            .cancel {
              color: #7e7e7e;
            }
            .unfinished {
              color: #fa5a56;
            }
            .completed {
              color: #489bf9;
            }
          }
          tr:nth-child(2) {
            td:last-child {
              color: black;
            }
          }
          tr:first-child {
            td:first-child {
              text-align: left;
              box-sizing: border-box;
              padding-left: 30px;
              .icon-dingdan_dingdanliebiao {
                color: #489bf9;
                font-size: 34px;
                margin-right: 10px;
              }
              font-size: 38px;
              color: black;
            }
            td:last-child {
              color: #7e7e7e;
              position: relative;
              padding-right: 50px;
              &:after {
                position: absolute;
                content: "";
                top: 31px;
                right: 31px;
                width: 20px;
                height: 20px;
                border-bottom: 1px solid #7e7e7e;
                border-left: 1px solid #7e7e7e;
                transform: rotate(-135deg);
              }
            }
          }
        }
      }
    }
  }
}
</style>
