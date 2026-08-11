// ==============================
// Watch Log
// ==============================

// 時計コレクション
const watches = [
  {
    name: "ロレックス サブマリーナ ノンデイト",
    image: "images/IMG_2638.jpeg"
  },
  {
    name: "ロレックス ヨットマスター37",
    image: "images/IMG_3378.jpeg"
  },
  {
    name: "ロレックス エクスプローラー36",
    image: "images/41185953-24CB-4223-997D-29C1D9C4AD32.jpeg"
  },
  {
    name: "ロレックス GMTマスター2 コンビ エバーローズ",
    image: "images/IMG_6357.jpeg"
  },
  {
    name: "ハミルトン カーキフィールド メカニカル",
    image: "images/IMG_9658.jpeg"
  },
  {
    name: "G-SHOCK 初代復刻モデル",
    image: "images/IMG_9659.jpeg"
  }
];


// ==============================
// 着用データ
// ==============================

let wearLogs = JSON.parse(
  localStorage.getItem("watchWearLogs") || "[]"
);


// ==============================
// カレンダー
// ==============================

let calendarDate = new Date();


// ==============================
// 日付
// ==============================

function formatDate(date) {

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
}


function formatDisplayDate(dateString) {

  if (!dateString) {
    return "未着用";
  }

  const parts = dateString.split("-");

  return `${parts[0]}/${parts[1]}/${parts[2]}`;
}


// ==============================
// 時計選択
// ==============================

function createWatchSelect() {

  const select =
    document.getElementById("watchSelect");

  if (!select) return;

  select.innerHTML = "";

  watches.forEach((watch, index) => {

    const option =
      document.createElement("option");

    option.value = index;
    option.textContent = watch.name;

    select.appendChild(option);

  });

}


// ==============================
// 着用登録
// ==============================

function addWearLog() {

  const date =
    document.getElementById("wearDate").value;

  const watchIndex =
    document.getElementById("watchSelect").value;


  if (!date) {

    alert("日付を選択してください");

    return;
  }


  if (watchIndex === "") {

    alert("時計を選択してください");

    return;
  }


  const watch =
    watches[Number(watchIndex)];


  if (!watch) {

    alert("時計を選択してください");

    return;
  }


  wearLogs.push({

    date: date,

    name: watch.name

  });


  saveLogs();

  renderAll();


  alert(
    `${watch.name}を${formatDisplayDate(date)}に記録しました`
  );

}


// ==============================
// 保存
// ==============================

function saveLogs() {

  localStorage.setItem(
    "watchWearLogs",
    JSON.stringify(wearLogs)
  );

}


// ==============================
// 着用回数
// ==============================

function getWearCount(name) {

  return wearLogs.filter(
    log => log.name === name
  ).length;

}


// ==============================
// 最終着用日
// ==============================

function getLastWearDate(name) {

  const logs =
    wearLogs.filter(
      log => log.name === name
    );


  if (logs.length === 0) {

    return null;

  }


  logs.sort(
    (a, b) =>
      b.date.localeCompare(a.date)
  );


  return logs[0].date;

}


// ==============================
// Dashboard
// ==============================

function renderDashboard() {

  const totalWatch =
    document.getElementById("totalWatch");

  const totalCount =
    document.getElementById("totalCount");

  const topWatch =
    document.getElementById("topWatch");

  const lastWatch =
    document.getElementById("lastWatch");


  if (totalWatch) {

    totalWatch.textContent =
      `所有時計：${watches.length}本`;

  }


  if (totalCount) {

    totalCount.textContent =
      `総着用回数：${wearLogs.length}回`;

  }


  const counts =
    watches.map(watch => ({

      name: watch.name,

      count: getWearCount(watch.name)

    }));


  counts.sort(
    (a, b) => b.count - a.count
  );


  if (topWatch) {

    if (wearLogs.length > 0) {

      topWatch.textContent =
        `最多着用：${counts[0].name}（${counts[0].count}回）`;

    } else {

      topWatch.textContent =
        "最多着用：まだ記録がありません";

    }

  }


  if (lastWatch) {

    if (wearLogs.length > 0) {

      const latest =
        [...wearLogs].sort(
          (a, b) =>
            b.date.localeCompare(a.date)
        )[0];


      lastWatch.textContent =
        `最終着用：${latest.name}（${formatDisplayDate(latest.date)}）`;

    } else {

      lastWatch.textContent =
        "最終着用：まだ記録がありません";

    }

  }

}


// ==============================
// ランキング
// ==============================

function renderRanking() {

  const ranking =
    document.getElementById("ranking");

  if (!ranking) return;


  ranking.innerHTML = "";


  const data =
    watches.map(watch => ({

      name: watch.name,

      count: getWearCount(watch.name)

    }));


  data.sort(
    (a, b) => b.count - a.count
  );


  data.forEach((item, index) => {

    const div =
      document.createElement("div");

    div.className =
      "ranking-item";


    const rank =
      document.createElement("strong");

    rank.textContent =
      `${index + 1}位`;


    const name =
      document.createElement("span");

    name.textContent =
      item.name;


    const count =
      document.createElement("span");

    count.textContent =
      `${item.count}回`;


    div.appendChild(rank);

    div.appendChild(name);

    div.appendChild(count);


    ranking.appendChild(div);

  });

}


// ==============================
// カレンダー
// ==============================

function renderCalendar() {

  const calendar =
    document.getElementById("calendar");

  const title =
    document.getElementById("calendarTitle");


  if (!calendar || !title) return;


  const year =
    calendarDate.getFullYear();

  const month =
    calendarDate.getMonth();


  title.textContent =
    `${year}年 ${month + 1}月`;


  calendar.innerHTML = "";


  const weekdays = [
    "日",
    "月",
    "火",
    "水",
    "木",
    "金",
    "土"
  ];


  weekdays.forEach(day => {

    const div =
      document.createElement("div");

    div.className =
      "calendar-weekday";

    div.textContent =
      day;

    calendar.appendChild(div);

  });


  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();


  const lastDate =
    new Date(
      year,
      month + 1,
      0
    ).getDate();


  for (
    let i = 0;
    i < firstDay;
    i++
  ) {

    const empty =
      document.createElement("div");

    empty.className =
      "calendar-day empty";

    calendar.appendChild(empty);

  }


  for (
    let day = 1;
    day <= lastDate;
    day++
  ) {

    const dateString =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


    const logs =
      wearLogs.filter(
        log => log.date === dateString
      );


    const div =
      document.createElement("div");

    div.className =
      "calendar-day";


    if (
      dateString === formatDate(new Date())
    ) {

      div.classList.add("today");

    }


    const number =
      document.createElement("div");

    number.className =
      "calendar-number";

    number.textContent =
      day;


    div.appendChild(number);


    if (logs.length > 0) {

      div.classList.add("has-wear");


      const names =
        document.createElement("div");

      names.className =
        "calendar-watches";


      logs.forEach(log => {

        const watchDiv =
          document.createElement("div");


        watchDiv.textContent =
          log.name
            .replace("ロレックス ", "")
            .replace("ハミルトン ", "")
            .replace("G-SHOCK ", "");


        names.appendChild(
          watchDiv
        );

      });


      div.appendChild(names);

    }


    calendar.appendChild(div);

  }

}


// ==============================
// 着用履歴
// ==============================

function renderWearHistory() {

  const container =
    document.getElementById("wearHistory");


  if (!container) {

    console.log(
      "wearHistory が見つかりません"
    );

    return;

  }


  container.innerHTML = "";


  if (wearLogs.length === 0) {

    const empty =
      document.createElement("p");

    empty.textContent =
      "まだ着用履歴がありません";


    container.appendChild(empty);

    return;

  }


  const logs =
    wearLogs
      .map((log, index) => ({

        date: log.date,

        name: log.name,

        index: index

      }))
      .sort(
        (a, b) =>
          b.date.localeCompare(a.date)
      );


  logs.forEach(log => {

    const row =
      document.createElement("div");

    row.className =
      "wear-history-item";


    const text =
      document.createElement("span");

    text.textContent =
      `${formatDisplayDate(log.date)}　${log.name}`;


    const button =
      document.createElement("button");

    button.textContent =
      "削除";


    button.type =
      "button";


    button.addEventListener(
      "click",
      function () {

        deleteWearLog(log.index);

      }
    );


    row.appendChild(text);

    row.appendChild(button);


    container.appendChild(row);

  });

}


// ==============================
// 着用履歴削除
// ==============================

function deleteWearLog(index) {

  if (
    index < 0 ||
    index >= wearLogs.length
  ) {

    return;

  }


  const log =
    wearLogs[index];


  const result =
    confirm(
      `${log.name}\n${formatDisplayDate(log.date)} の着用記録を削除しますか？`
    );


  if (!result) {

    return;

  }


  wearLogs.splice(
    index,
    1
  );


  saveLogs();

  renderAll();

}


// ==============================
// 月変更
// ==============================

function changeMonth(direction) {

  calendarDate.setMonth(
    calendarDate.getMonth() + direction
  );


  renderCalendar();

}


// ==============================
// Collection
// ==============================

function renderWatches() {

  const container =
    document.getElementById("watches");


  if (!container) return;


  container.innerHTML = "";


  watches.forEach(watch => {

    const count =
      getWearCount(watch.name);


    const lastDate =
      getLastWearDate(watch.name);


    const card =
      document.createElement("div");


    card.className =
      "watch-card";


    const image =
      document.createElement("img");

    image.src =
      watch.image;

    image.alt =
      watch.name;


    const title =
      document.createElement("h3");

    title.textContent =
      watch.name;


    const countText =
      document.createElement("p");

    countText.textContent =
      `着用回数：${count}回`;


    const lastText =
      document.createElement("p");

    lastText.textContent =
      `最終着用：${formatDisplayDate(lastDate)}`;


    card.appendChild(image);

    card.appendChild(title);

    card.appendChild(countText);

    card.appendChild(lastText);


    container.appendChild(card);

  });

}


// ==============================
// 全画面更新
// ==============================

function renderAll() {

  renderDashboard();

  renderRanking();

  renderCalendar();

  renderWearHistory();

  renderWatches();

}


// ==============================
// 初期表示
// ==============================

function initialize() {

  const dateInput =
    document.getElementById("wearDate");


  if (dateInput) {

    dateInput.value =
      formatDate(new Date());

  }


  createWatchSelect();

  renderAll();

}


initialize();
