const API_URL = "https://script.google.com/macros/s/AKfycbz4bVzgirKaluud8WJ1xq74MzPY7AhATepYnyBiyKcrfGfzukfJNv7ZNhZDkQzgt8xnUQ/exec";

const POLLING_INTERVAL = 5000;
let pollingTimer = null;

// =============================
// ページ読み込み時
// =============================
window.addEventListener("load", () => {
  const savedId = localStorage.getItem("ticketId");
  if (savedId) {
    document.getElementById("formArea").style.display = "none";
    startPolling(savedId);
  }
});

// =============================
// JSONP通信
// =============================
function jsonpGet(url) {
  return new Promise((resolve, reject) => {
    const cbName = "cb_" + Math.random().toString(36).slice(2);
    const script = document.createElement("script");
    window[cbName] = (data) => {
      resolve(data);
      delete window[cbName];
      document.body.removeChild(script);
    };
    script.onerror = () => {
      reject(new Error("JSONP失敗"));
      delete window[cbName];
      document.body.removeChild(script);
    };
    script.src = `${url}&callback=${cbName}`;
    document.body.appendChild(script);
  });
}

// =============================
// 予約
// =============================
async function reserve() {
  const name = document.getElementById("name").value.trim();

  if (!name) {
    showResult("<h2>⚠️ 名前を入力してください</h2>");
    return;
  }

  showResult("<h2>送信中...</h2>");

  try {
    const data = await jsonpGet(
      `${API_URL}?mode=reserve&name=${encodeURIComponent(name)}`
    );

    if (data.error === "CLOSED") {
      showResult("<h2>受付終了</h2><p>本日の受付は終了しました</p>");
      document.getElementById("formArea").style.display = "none";
      return;
    }

    if (data.error === "FULL") {
      showResult("<h2>満員です</h2><p>現在予約を受け付けられません</p>");
      document.getElementById("formArea").style.display = "none";
      return;
    }

    localStorage.setItem("ticketId", data.id);
    document.getElementById("formArea").style.display = "none";
    startPolling(data.id);

  } catch (e) {
    showResult("<h2>⚠️ 通信エラーが発生しました</h2><p>再度お試しください</p>");
    console.error(e);
  }
}

// =============================
// ポーリング
// =============================
function startPolling(id) {
  checkStatus(id);
  pollingTimer = setInterval(() => checkStatus(id), POLLING_INTERVAL);
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval(pollingTimer);
    pollingTimer = null;
  }
}

async function checkStatus(id) {
  try {
    const data = await jsonpGet(`${API_URL}?mode=status&id=${id}`);
    let text = "";

    if (data.status === "WAITING") {
      text = `
        <h2>待機中</h2>
        <p>整理番号：${id}</p>
        <p>現在待機：${data.waiting}組</p>
      `;
    } else if (data.status === "CALLED") {
      text = `
        <h2>お呼び出し中です！</h2>
        <p>整理番号：${id}</p>
      `;
    } else if (data.status === "DONE") {
      stopPolling();
      localStorage.removeItem("ticketId");
      document.getElementById("formArea").style.display = "block";
      text = `<h2>ご案内済みです</h2><p>再度予約可能です</p>`;
    } else if (data.status === "CANCEL") {
      stopPolling();
      localStorage.removeItem("ticketId");
      document.getElementById("formArea").style.display = "block";
      text = `<h2>予約はキャンセルされました</h2>`;
    } else if (data.status === "NOTFOUND") {
      stopPolling();
      localStorage.removeItem("ticketId");
      document.getElementById("formArea").style.display = "block";
      text = `<h2>予約情報が見つかりません</h2><p>再度予約してください</p>`;
    } else {
      text = `<h2>⚠️ 不明なステータスです</h2>`;
    }

    showResult(text);
  } catch (e) {
    console.error("ステータス確認エラー:", e);
  }
}

// =============================
// 結果表示
// =============================
function showResult(html) {
  document.getElementById("result").innerHTML = html;
}
