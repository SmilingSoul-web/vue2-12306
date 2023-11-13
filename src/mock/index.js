import Mock from "mockjs";
Mock.setup({
  timeout: "200-600",
});
const { TicketList } = Mock.mock({
  TicketList: {
    list: [
      {
        id: 0,
        train_no: "K1072",
        train_type: "普通",
        start_station: "菏泽",
        start_station_type: "过",
        end_station: "北京",
        end_station_type: "终",
        start_time: "03:52",
        date: "7月25日",
        end_time: "11:07",
        run_time: "7小时15分",
        price_list: [
          {
            price_type: "软卧",
            price: "222",
            num: "20",
          },
          {
            price_type: "硬卧",
            price: "144",
            num: "30",
          },
          {
            price_type: "硬座",
            price: "81",
            num: "1",
          },
        ],
      },
      {
        id: 1,
        train_no: "G746",
        train_type: "高铁",
        start_station: "菏泽",
        start_station_type: "过",
        end_station: "北京",
        end_station_type: "终",
        start_time: "06:22",
        date: "7月25日",
        end_time: "11:15",
        run_time: "4小时53分",
        price_list: [
          {
            price_type: "一等卧",
            price: "221",
            num: "5",
          },
          {
            price_type: "二等卧",
            price: "154",
            num: "10",
          },
          {
            price_type: "二等座",
            price: "103",
            num: "10",
          },
        ],
      },
      {
        id: 2,
        train_no: "G384",
        train_type: "普通",
        start_station: "菏泽",
        start_station_type: "始",
        end_station: "北京",
        end_station_type: "终",
        date: "7月25日",
        start_time: "06:51",
        end_time: "09:46",
        run_time: "2小时55分",
        price_list: [
          {
            price_type: "商务座",
            price: "992",
            num: "10",
          },
          {
            price_type: "一等座",
            price: "511",
            num: "1",
          },
          {
            price_type: "二等座",
            price: "307",
            num: "3",
          },
        ],
      },
      {
        id: 3,
        train_no: "T308",
        train_type: "普通",
        start_station: "西安",
        start_station_type: "过",
        end_station: "武汉",
        end_station_type: "过",
        start_time: "21:49",
        date: "7月18日",
        end_time: "09:14",
        run_time: "11小时25分",
        price_list: [
          {
            price_type: "软卧",
            price: "312",
            num: "5",
          },
          {
            price_type: "硬卧",
            price: "200",
            num: "10",
          },
          {
            price_type: "硬座",
            price: "115",
            num: "3",
          },
        ],
      },
      {
        id: 4,
        train_no: "Z294",
        train_type: "普通",
        start_station: "西安",
        start_station_type: "过",
        end_station: "武汉",
        end_station_type: "终",
        start_time: "23:04",
        date: "7月18日",
        end_time: "11:14",
        run_time: "12小时11分",
        price_list: [
          {
            price_type: "软卧",
            price: "360.5",
            num: "2",
          },
          {
            price_type: "硬卧",
            price: "232.5",
            num: "15",
          },
          {
            price_type: "硬座",
            price: "135.5",
            num: "10",
          },
        ],
      },
      {
        id: 5,
        train_no: "Z128",
        train_type: "普通",
        start_station: "西安",
        start_station_type: "过",
        end_station: "武汉",
        end_station_type: "过",
        start_time: "23:41",
        date: "8月1日",
        end_time: "11:47",
        run_time: "12小时6分",
        price_list: [
          {
            price_type: "软卧",
            price: "360.5",
            num: "2",
          },
          {
            price_type: "硬卧",
            price: "232.5",
            num: "15",
          },
          {
            price_type: "硬座",
            price: "135.5",
            num: "10",
          },
        ],
      },
      {
        id: 6,
        train_no: "G1880",
        train_type: "高铁",
        start_station: "西安北",
        start_station_type: "过",
        end_station: "郑州东",
        end_station_type: "过",
        start_time: "16:30",
        date: "7月24日",
        end_time: "18:38",
        run_time: "2小时8分",
        price_list: [
          {
            price_type: "商务",
            price: "755",
            num: "2",
          },
          {
            price_type: "一等",
            price: "382",
            num: "15",
          },
          {
            price_type: "二等",
            price: "135.5",
            num: "10",
          },
        ],
      },
      {
        id: 7,
        train_no: "Z94",
        train_type: "普通",
        start_station: "西安",
        start_station_type: "始",
        end_station: "郑州",
        end_station_type: "过",
        start_time: "16:42",
        date: "7月23日",
        end_time: "18:38",
        run_time: "6小时4分",
        price_list: [
          {
            price_type: "高软",
            price: "358",
            num: "2",
          },
          {
            price_type: "软卧",
            price: "197",
            num: "15",
          },
          {
            price_type: "硬卧",
            price: "129",
            num: "10",
          },
        ],
      },
      {
        id: 8,
        train_no: "G2206",
        train_type: "高铁",
        start_station: "西安北",
        start_station_type: "过",
        end_station: "郑州东",
        end_station_type: "过",
        start_time: "17:13",
        date: "7月24日",
        end_time: "19:36",
        run_time: "2小时8分",
        price_list: [
          {
            price_type: "商务",
            price: "755",
            num: "2",
          },
          {
            price_type: "一等",
            price: "382",
            num: "15",
          },
          {
            price_type: "二等239",
            price: "135.5",
            num: "10",
          },
        ],
      },
      {
        id: 9,
        train_no: "G2208",
        train_type: "高铁",
        start_station: "西安北",
        start_station_type: "过",
        end_station: "郑州东",
        end_station_type: "终",
        start_time: "17:39",
        date: "7月23日",
        end_time: "18:09",
        run_time: "2小时18分",
        price_list: [
          {
            price_type: "商务",
            price: "755",
            num: "2",
          },
          {
            price_type: "一等",
            price: "382",
            num: "15",
          },
          {
            price_type: "二等239",
            price: "135.5",
            num: "10",
          },
        ],
      },
      {
        id: 10,
        train_no: "G90",
        train_type: "高铁",
        start_station: "西安北",
        start_station_type: "过",
        end_station: "郑州东",
        end_station_type: "终",
        start_time: "18:22",
        date: "7月24日",
        end_time: "20:10",
        run_time: "1小时48分",
        price_list: [
          {
            price_type: "商务",
            price: "755",
            num: "2",
          },
          {
            price_type: "一等",
            price: "382",
            num: "15",
          },
          {
            price_type: "二等239",
            price: "135.5",
            num: "10",
          },
        ],
      },
      {
        id: 11,
        train_no: "G92",
        train_type: "高铁",
        start_station: "西安北",
        start_station_type: "始",
        end_station: "郑州东",
        end_station_type: "过",
        start_time: "18:32",
        date: "7月24日",
        end_time: "20:20",
        run_time: "1小时48分",
        price_list: [
          {
            price_type: "商务",
            price: "755",
            num: "2",
          },
          {
            price_type: "一等",
            price: "382",
            num: "15",
          },
          {
            price_type: "二等239",
            price: "135.5",
            num: "10",
          },
        ],
      },
      {
        id: 12,
        train_no: "G2024",
        train_type: "高铁",
        start_station: "西安北",
        start_station_type: "过",
        end_station: "郑州东",
        end_station_type: "终",
        start_time: "19:05",
        date: "7月26日",
        end_time: "21:09",
        run_time: "1小时56分",
        price_list: [
          {
            price_type: "商务",
            price: "755",
            num: "2",
          },
          {
            price_type: "一等",
            price: "382",
            num: "15",
          },
          {
            price_type: "二等",
            price: "239",
            num: "10",
          },
        ],
      },
      {
        id: 13,
        train_no: "Z106",
        train_type: "普通",
        start_station: "西安",
        start_station_type: "过",
        end_station: "郑州",
        end_station_type: "过",
        start_time: "19:33",
        date: "7月24日",
        end_time: "01:29",
        run_time: "5小时56分",
        price_list: [
          {
            price_type: "软卧",
            price: "197",
            num: "2",
          },
          {
            price_type: "硬卧",
            price: "129",
            num: "15",
          },
          {
            price_type: "硬座",
            price: "72",
            num: "10",
          },
        ],
      },
      {
        id: 14,
        train_no: "T118",
        train_type: "普通",
        start_station: "西安",
        start_station_type: "过",
        end_station: "郑州",
        end_station_type: "过",
        start_time: "20:28",
        date: "7月25日",
        end_time: "03:03",
        run_time: "6小时28分",
        price_list: [
          {
            price_type: "软卧",
            price: "197",
            num: "2",
          },
          {
            price_type: "硬卧",
            price: "129",
            num: "15",
          },
          {
            price_type: "硬座",
            price: "72",
            num: "10",
          },
        ],
      },
      {
        id: 15,
        train_no: "K596",
        train_type: "普通",
        start_station: "西安",
        start_station_type: "始",
        end_station: "郑州",
        end_station_type: "过",
        start_time: "21:28",
        date: "7月24日",
        end_time: "04:26",
        run_time: "7小时28分",
        price_list: [
          {
            price_type: "软卧",
            price: "197",
            num: "2",
          },
          {
            price_type: "硬卧",
            price: "129",
            num: "15",
          },
          {
            price_type: "硬座",
            price: "72",
            num: "10",
          },
        ],
      },
      {
        id: 16,
        train_no: "K1072",
        train_type: "学生票",
        start_station: "菏泽",
        start_station_type: "过",
        end_station: "北京",
        end_station_type: "终",
        start_time: "03:52",
        date: "7月25日",
        end_time: "11:07",
        run_time: "7小时15分",
        price_list: [
          {
            price_type: "软卧",
            price: "222",
            num: "20",
          },
          {
            price_type: "硬卧",
            price: "144",
            num: "30",
          },
          {
            price_type: "硬座",
            price: "81",
            num: "1",
          },
        ],
      },
      {
        id: 17,
        train_no: "D1072",
        train_type: "学生票",
        start_station: "菏泽",
        start_station_type: "过",
        end_station: "北京",
        end_station_type: "终",
        start_time: "03:52",
        date: "7月25日",
        end_time: "11:07",
        run_time: "7小时15分",
        price_list: [
          {
            price_type: "软卧",
            price: "222",
            num: "20",
          },
          {
            price_type: "硬卧",
            price: "144",
            num: "30",
          },
          {
            price_type: "硬座",
            price: "81",
            num: "1",
          },
        ],
      },
      {
        id: 18,
        train_no: "D1072",
        train_type: "高铁",
        start_station: "菏泽",
        start_station_type: "过",
        end_station: "北京",
        end_station_type: "终",
        start_time: "03:52",
        date: "7月25日",
        end_time: "11:07",
        run_time: "7小时15分",
        price_list: [
          {
            price_type: "软卧",
            price: "222",
            num: "20",
          },
          {
            price_type: "硬卧",
            price: "144",
            num: "30",
          },
          {
            price_type: "硬座",
            price: "81",
            num: "1",
          },
        ],
      },
      {
        id: 19,
        train_no: "G1072",
        train_type: "高铁",
        start_station: "菏泽",
        start_station_type: "过",
        end_station: "北京",
        end_station_type: "终",
        start_time: "03:52",
        date: "7月25日",
        end_time: "11:07",
        run_time: "7小时15分",
        price_list: [
          {
            price_type: "软卧",
            price: "222",
            num: "20",
          },
          {
            price_type: "硬卧",
            price: "144",
            num: "30",
          },
          {
            price_type: "硬座",
            price: "81",
            num: "1",
          },
        ],
      },
      {
        id: 20,
        train_no: "D1072",
        train_type: "高铁",
        start_station: "北京",
        start_station_type: "过",
        end_station: "菏泽",
        end_station_type: "终",
        start_time: "03:52",
        date: "7月25日",
        end_time: "11:07",
        run_time: "7小时15分",
        price_list: [
          {
            price_type: "软卧",
            price: "222",
            num: "20",
          },
          {
            price_type: "硬卧",
            price: "144",
            num: "30",
          },
          {
            price_type: "硬座",
            price: "81",
            num: "1",
          },
        ],
      },
    ],
  },
});
//get 请求的截取参数方法
var getQuery = (url, name) => {
  // console.log(url, name);
  const index = url.indexOf("?");
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split("&");
    for (var i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split("=");
      // console.log(itemArr);
      if (itemArr[0] === name) {
        return itemArr[1];
      }
    }
  }
  return null;
};
Mock.mock(/\/api\/get\/ticket/, "get", (options) => {
  // console.debug(ApiPath.user.getUserInfo, options);
  options.url = options.url.replace(/[+]/g, "");
  const start = getQuery(decodeURI(options.url), "start");
  const end = getQuery(decodeURI(options.url), "end");
  const date = getQuery(decodeURI(options.url), "date");
  var newLIst = [];
  for (var i = 0; i < TicketList.list.length; i++) {
    if (
      date == TicketList.list[i].date &&
      start == TicketList.list[i].start_station &&
      end == TicketList.list[i].end_station
    ) {
      newLIst.push(TicketList.list[i]);
    }
  }
  // console.log(newLIst)
  return {
    status: 200,
    message: "获取成功",
    data: newLIst,
  };
});
