// =============================
// 設定：GASのデプロイURLに変更してください
// =============================
const API_URL = "https://script.google.com/macros/s/AKfycby2GYeUMEk5QVjW3WpctBAjDi2yNshmFFypHePjeGAKtLx401EoUBYLqwjq4F3_xjiE7Q/exec";

// ポーリング間隔（ミリ秒）
const POLLING_INTERVAL = 5000;

let pollingTimer = null;

// =============================
// ページ読み込み時の処理
// =============================
window.addEventListener("load", () => {
  const savedId = localStorage.getItem("ticketId");

  if (savedId) {
    // 既存の予約がある場合はフォームを隠して状態確認を開始
    document.getElementById("formArea").style.display = "none";
    startPolling(savedId);
  }
});

// =============================
// 予約ボタン処理
// =============================
async function reserve() {
  const name    = document.getElementById("name").value.trim();
  const keyword = document.getElementById("keyword").value.trim();

  if (!name || !keyword) {
    showResult("<h2>⚠️ 名前とあいことばを入力してください</h2>");
    return;
  }

  showResult("<h2>送信中...</h2>");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ name, keyword }),
    });

    const data = await response.json();

    // 整理番号をlocalStorageに保存
    localStorage.setItem("ticketId", data.id);

    // フォームを隠す
    document.getElementById("formArea").style.display = "none";

    // 状態確認のポーリング開始
    startPolling(data.id);

  } catch (e) {
    showResult("<h2>⚠️ 通信エラーが発生しました</h2><p>再度お試しください</p>");
    console.error(e);
  }
}

// =============================
// ステータス確認（ポーリング）
// =============================
function startPolling(id) {
  // 即座に1回確認
  checkStatus(id);

  // 定期的に確認
  pollingTimer = setInterval(() => {
    checkStatus(id);
  }, POLLING_INTERVAL);
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval(pollingTimer);
    pollingTimer = null;
  }
}

async function checkStatus(id) {
  try {
    const response = await fetch(`${API_URL}?mode=status&id=${id}`);
    const data = await response.json();

    let text = "";

    if (data.status === "WAITING") {
      text = `
        <h2>待機中</h2>
        <p>整理番号：${id}</p>
        <p>現在待機：${data.waiting}組</p>
      `;
    }
    else if (data.status === "CALLED") {
      text = `
        <h2>お呼び出し中です！</h2>
        <p>整理番号：${id}</p>
      `;
    }
    else if (data.status === "DONE") {
      stopPolling();
      localStorage.removeItem("ticketId");
      document.getElementById("formArea").style.display = "block";
      text = `
        <h2>ご案内済みです</h2>
        <p>再度予約可能です</p>
      `;
    }
    else if (data.status === "CANCEL") {
      stopPolling();
      localStorage.removeItem("ticketId");
      document.getElementById("formArea").style.display = "block";
      text = `
        <h2>予約はキャンセルされました</h2>
      `;
    }
    else {
      text = `<h2>⚠️ 不明なステータスです</h2>`;
    }

    showResult(text);

  } catch (e) {
    console.error("ステータス確認エラー:", e);
    // 通信エラーはポーリングを止めず、次回に再試行
  }
}

// =============================
// 結果エリアの表示
// =============================
function showResult(html) {
  document.getElementById("result").innerHTML = html;
}
