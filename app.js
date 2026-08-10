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
// データ保存
// ==============================

let wearLogs = JSON.parse(
  localStorage.getItem("watchWearLogs") || "[]"
);


// ==============================
// カレンダー用年月
// ==============================

let calendarDate = new Date();


// ==============================
// 日付を YYYY-MM-DD にする
// ==============================

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
}


// ==============================
// 今日の日付
// ==============================

const today = new Date();

document.getElementById("wearDate").value =
  formatDate(today);


// ==============================
// 時計選択
// ==============================

function createWatchSelect() {

  const select = document.getElementById("watchSelect");

  select.innerHTML = "";

  watches.forEach((watch, index) => {

    const option = document.createElement("option");

    option.value = index;
    option.textContent = watch.name;

    select.appendChild(option);

  });

}


// ==============================
// 着用記録追加
// ==============================

function addWearLog() {

  const date = document.getElementById("wearDate").value;
  const watchIndex = document.getElementById("watchSelect").value;

  if (!date) {
    alert("日付を選択してください");
    return;
  }

  if (watchIndex === "") {
    alert("時計を選択してください");
    return;
  }

  const watch = watches[watchIndex];

  wearLogs.push({
    date: date,
    name: watch.name
  });

  localStorage.setItem(
    "watchWearLogs",
    JSON.stringify(wearLogs)
  );

  renderAll();

  alert(`${watch.name}を${date}に記録しました`);
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

  const logs = wearLogs
    .filter(log => log.name === name)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (logs.length === 0) {
    return null;
  }

  return logs[0].date;
}


// ==============================
// 日付表示
// ==============================

function formatDisplayDate(dateString) {

  if (!dateString) {
    return "未着用";
  }

  const parts = dateString.split("-");

  return `${parts[0]}/${parts[1]}/${parts[2]}`;
}


// ==============================
// Dashboard
// ==============================

function renderDashboard() {

  document.getElementById("totalWatch").textContent =
    `所有時計：${watches.length}本`;

  document.getElementById("totalCount").textContent =
    `総着用回数：${wearLogs.length}回`;


  // ランキング
  const counts = watches.map(watch => ({
    name: watch.name,
    count: getWearCount(watch.name)
  }));

  counts.sort((a, b) => b.count - a.count);


  if (wearLogs.length > 0) {

    const top = counts[0];

    document.getElementById("topWatch").textContent =
      `最多着用：${top.name}（${top.count}回）`;

  } else {

    document.getElementById("topWatch").textContent =
      "最多着用：まだ記録がありません";

  }


  // 最後に着用した時計
  if (wearLogs.length > 0) {

    const latest = [...wearLogs]
      .sort((a, b) => b.date.localeCompare(a.date))[0];

    document.getElementById("lastWatch").textContent =
      `最終着用：${latest.name}（${formatDisplayDate(latest.date)}）`;

  } else {

    document.getElementById("lastWatch").textContent =
      "最終着用：まだ記録がありません";

  }

}


// ==============================
// ランキング
// ==============================

function renderRanking() {

  const ranking = document.getElementById("ranking");

  ranking.innerHTML = "";

  const data = watches.map(watch => ({
    name: watch.name,
    count: getWearCount(watch.name)
  }));

  data.sort((a, b) => b.count - a.count);


  data.forEach((item, index) => {

    const div = document.createElement("div");

    div.className = "ranking-item";

    div.innerHTML = `
      <strong>${index + 1}位</strong>
      ${item.name}
      <span>${item.count}回</span>
    `;

    ranking.appendChild(div);

  });

}


// ==============================
// カレンダー
// ==============================

function renderCalendar() {

  const calendar = document.getElementById("calendar");
  const title = document.getElementById("calendarTitle");

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  title.textContent =
    `${year}年 ${month + 1}月`;

  calendar.innerHTML = "";


  // 曜日
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

    const div = document.createElement("div");

    div.className = "calendar-weekday";

    div.textContent = day;

    calendar.appendChild(div);

  });


  const firstDay =
    new Date(year, month, 1).getDay();

  const lastDate =
    new Date(year, month + 1, 0).getDate();


  // 空白
  for (let i = 0; i < firstDay; i++) {

    const empty = document.createElement("div");

    empty.className = "calendar-day empty";

    calendar.appendChild(empty);

  }


  // 日付
  for (let day = 1; day <= lastDate; day++) {

    const dateString =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


    const logs = wearLogs.filter(
      log => log.date === dateString
    );


    const div = document.createElement("div");

    div.className = "calendar-day";


    // 今日
    if (dateString === formatDate(new Date())) {
      div.classList.add("today");
    }


    div.innerHTML = `
      <div class="calendar-number">
        ${day}
      </div>
    `;


    // 着用記録がある日
    if (logs.length > 0) {

      div.classList.add("has-wear");

      const names = document.createElement("div");

      names.className = "calendar-watches";

      logs.forEach(log => {

        const shortName =
          log.name
            .replace("ロレックス ", "")
            .replace("ハミルトン ", "")
            .replace("G-SHOCK ", "");

        const watchDiv =
          document.createElement("div");

        watchDiv.textContent = shortName;

        names.appendChild(watchDiv);

      });

      div.appendChild(names);

    }


    calendar.appendChild(div);

  }

}

// ==============================
// 履歴削除
// ==============================

function deleteWearLog(index) {

  const log = wearLogs[index];

  if (!log) {
    return;
  }

  const result = confirm(
    `${log.name}\n${formatDisplayDate(log.date)} の着用記録を削除しますか？`
  );

  if (!result) {
    return;
  }

  wearLogs.splice(index, 1);

  localStorage.setItem(
    "watchWearLogs",
    JSON.stringify(wearLogs)
  );

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

  container.innerHTML = "";


  watches.forEach(watch => {

    const count =
      getWearCount(watch.name);

    const lastDate =
      getLastWearDate(watch.name);


    const card =
      document.createElement("div");

    card.className = "watch-card";


    card.innerHTML = `
      <img
        src="${watch.image}"
        alt="${watch.name}"
      >

      <h3>${watch.name}</h3>

      <p>着用回数：${count}回</p>

      <p>
        最終着用：
        ${formatDisplayDate(lastDate)}
      </p>
    `;


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

  renderWatches();

}


// ==============================
// 初期表示
// ==============================

createWatchSelect();

renderAll();
