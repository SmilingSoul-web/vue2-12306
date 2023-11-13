import Mock from "mockjs";
// 模拟接口延迟功能
Mock.setup({
  timeout: "200-600",
});
// 账号密码数据
const data = Mock.mock({
  data: [
    {
      username: "admin",
      password: "000000",
    },
    {
      username: "wre",
      password: "666666",
    },
    {
      username: "hopu",
      password: "888888",
    },
  ],
});
console.log(data);
// 封装 截取get请求参数方法
var getQuery = (url, name) => {
  // 查找？首次出现的位置，找不到返回-1，找到返回对应的下标
  const index = url.indexOf("?");
  if (index !== -1) {
    const queryStr = url.slice(index + 1).split("&"); //数组
    for (var i = 0; i < queryStr.length; i++) {
      const itemArr = queryStr[i].split("="); //["username","admin","pwd","000"]
      if (itemArr[0] == name) {
        return itemArr[1];
      }
    }
  }
  return null;
};

Mock.mock(/\/api\/get\/login/, "get", (options) => {
  const username = getQuery(options.url, "username");
  const pwd = getQuery(options.url, "pwd");
  var userlist = {};
  // 数组的遍历 map filter foreach evey some
  var resDate = data.data.map((item) => {
    // console.log(item);
    //判断用户输入跟当前后台的账号密码是否匹配
    if (username === item.username && pwd === item.password) {
      userlist = item;
      return true;
    } else {
      return false;
    }
  });
  console.log(resDate); //true // false
  // es7 新增方法includes
  if (resDate.includes(true)) {
    return {
      code: 200,
      message: "登录成功",
      data: userlist,
    };
  } else {
    return {
      code: -1,
      message: "用户名密码不存在",
    };
  }
});
