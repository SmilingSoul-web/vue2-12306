import Mock from "mockjs";
//console.log("ticket");
Mock.setup({
  timeout: "200-600",
});
class Ticket {
  constructor() {
    let ticket = this.createTicket();
    this.id = ticket.id;
    this.train_no = "GDSCTKZ"[rand(7)] + rand(9999);
    this.train_type = rand(2) === 1 ? "高铁" : "普通";
    this.start_station = "菏泽";
    this.start_station_type = "过";
    this.end_station = "北京";
    this.end_station_type = "终";
    this.start_time = ticket.startTime;
    this.date = ticket.curDate;
    this.end_time = ticket.endTime;
    this.run_time = ticket.runTime;
    this.price_list = price_list[rand(3)];
    //console.log(this);
  }
  createTicket() {
    let cur,
      curDate,
      final,
      startTimeVal,
      startTimeIndex,
      startTime,
      runTime,
      runTimeVal,
      runHurs,
      runMinutes,
      endTimeVal,
      endTimeIndex,
      endTime,
      id;
    cur = new Date();
    cur.setDate(cur.getDate() + rand(15));
    curDate = cur.getMonth() + 1 + "月" + cur.getDate() + "日";
    final = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 1);
    do {
      startTimeVal = new Date(cur.valueOf() + rand(24 * 3600 * 1000));
    } while (startTimeVal.valueOf() > final.valueOf());
    startTimeIndex = startTimeVal.toLocaleString().indexOf(" ");
    startTime = startTimeVal.toLocaleString().substr(startTimeIndex + 1, 5);
    runTimeVal = rand(24 * 60 * 60 * 1000);
    runHurs = Math.floor(runTimeVal / (60 * 60 * 1000));
    runMinutes = Math.floor(runTimeVal / (1000 * 60)) % 60;
    runTime = runHurs + "小时" + runMinutes + "分";

    endTimeVal = new Date(startTimeVal.valueOf() + runTimeVal);
    endTimeIndex = endTimeVal.toLocaleString().indexOf(" ");
    endTime = endTimeVal.toLocaleString().substr(endTimeIndex + 1, 5);

    id = startTimeVal.valueOf();

    return { id, curDate, startTime, runTime, endTime };
  }
}
function rand(max, min = 0) {
  return Math.floor(Math.random() * max) + min;
}
let price_list = [
  [
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
  [
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
  [
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
];
let list = [];
for (let i = 0; i < 30; i++) {
  list.push(new Ticket());
}
// eslint-disable-next-line no-unused-vars
const ticket = new Ticket();
//console.log(ticket);
const { TicketList } = Mock.mock({ TicketList: { list } });
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
  var curLIst = [];
  for (var i = 0; i < TicketList.list.length; i++) {
    if (
      date == TicketList.list[i].date &&
      start == TicketList.list[i].start_station &&
      end == TicketList.list[i].end_station
    ) {
      curLIst.push(TicketList.list[i]);
    }
  }
  // console.log(curLIst)
  return {
    status: 200,
    message: "获取成功",
    data: curLIst,
  };
});
