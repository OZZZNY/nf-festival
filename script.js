const API_URL = "https://script.google.com/macros/s/AKfycbzx9TkSfeeCDCZJJ--UAtC-SWDQibu7edxzQ-TLbcaNkSV71_PENwmwL-fL_h-6ls8eYw/exec";

const POLLING_INTERVAL = 5000;

let pollingTimer = null;

window.addEventListener("load", () => {
  const savedId = localStorage.getItem("ticketId");
  if (savedId) {
    document.getElementById("formArea").style.display = "none";
    startPolling(savedId);
  }
});

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
      redirect: "follow",        // ← GASのリダイレクトに対応
      body: JSON.stringify({ name, keyword }),
    });

    const data = await response.json();

    localStorage.setItem("ticketId", data.id);
    document.getElementById("formArea").style.display = "none";
    startPolling(data.id);

  } catch (e) {
    showResult("<h2>⚠️ 通信エラーが発生しました</h2><p>再度お試しください</p>");
    console.error(e);
  }
}

function startPolling(id) {
  checkStatus(id);
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
    const response = await fetch(
      `${API_URL}?mode=status&id=${id}`,
      { redirect: "follow" }     // ← GASのリダイレクトに対応
    );

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
  }
}

function showResult(html) {
  document.getElementById("result").innerHTML = html;
}
