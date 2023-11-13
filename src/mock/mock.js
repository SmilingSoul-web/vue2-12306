const Mock = require("mockjs");

export default {
  //这里写的地址对应第二步api文件中的请求地址
  // eslint-disable-next-line no-unused-vars
  "get|/api/parameter/query": (option) => {
    return {
      status: 200,
      message: "success",
      data: Mock.mock({
        "list|5": [
          {
            title: "@cname()",
            describe: "@id()",
            creatime: "@city(true)",
            seetime: "@city(true)",
            goodtime: "@city(true)",
            discusstime: "@city(true)",
          },
        ],
      }),
    };
  },
};
