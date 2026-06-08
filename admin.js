const API_URL = "https://script.google.com/macros/s/AKfycbz4bVzgirKaluud8WJ1xq74MzPY7AhATepYnyBiyKcrfGfzukfJNv7ZNhZDkQzgt8xnUQ/exec";
const PASSWORD = "adminbegs";
let autoRefreshTimer = null;
let callCount = 1;

// =============================
// 呼び出し人数
// =============================
function changeCallCount(delta) {
  callCount = Math.max(1, Math.min(10, callCount + delta));
  document.getElementById("callCountDisplay").textContent = callCount;
}

// =============================
// 認証
// =============================
function login() {
  const input = document.getElementById("passwordInput").value;
  if (input === PASSWORD) {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("adminScreen").style.display = "block";
    sessionStorage.setItem("adminAuth", "1");
    startAutoRefresh();
    loadTickets();
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

function logout() {
  sessionStorage.removeItem("adminAuth");
  stopAutoRefresh();
  document.getElementById("adminScreen").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("passwordInput").value = "";
}

window.addEventListener("load", () => {
  if (sessionStorage.getItem("adminAuth") === "1") {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("adminScreen").style.display = "block";
    startAutoRefresh();
    loadTickets();
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
      reject(new Error("通信エラー"));
      delete window[cbName];
      document.body.removeChild(script);
    };
    script.src = `${url}&callback=${cbName}`;
    document.body.appendChild(script);
  });
}

// =============================
// 予約一覧
// =============================
async function loadTickets() {
  try {
    const data = await jsonpGet(`${API_URL}?mode=list`);
    renderTickets(data.tickets);
    updateStats(data.tickets);
  } catch(e) {
    showToast("読み込みエラー");
  }
}

function renderTickets(tickets) {
  const list = document.getElementById("ticketList");
  if (!tickets || tickets.length === 0) {
    list.innerHTML = '<div class="empty">予約はありません</div>';
    return;
  }

  const order = { CALLED: 0, WAITING: 1, DONE: 2, CANCEL: 3 };
  tickets.sort((a, b) => (order[a.status] ?? 9) - (order[b.status] ?? 9));

    // DONE と CANCEL を非表示
    tickets = tickets.filter(t => t.status === "WAITING" || t.status === "CALLED");

  list.innerHTML = tickets.map(t => `
    <div class="ticket">
      <div class="ticket-id">${t.id}</div>
      <div class="ticket-name">${t.name}</div>
      <div style="font-size:12px;color:var(--text-dim)">${t.time}</div>
      <div class="ticket-status status-${t.status}">${labelOf(t.status)}</div>
      <div class="ticket-actions">
        ${t.status === "CALLED" ? `
          <button class="ticket-btn done-btn" onclick="completeTicket(${t.id})">案内済み</button>
        ` : ""}
        ${t.status === "WAITING" || t.status === "CALLED" ? `
          <button class="ticket-btn cancel-btn" onclick="cancelTicket(${t.id})">✕</button>
        ` : ""}
      </div>
    </div>
  `).join("");
}

function updateStats(tickets) {
  if (!tickets) return;
  document.getElementById("countWaiting").textContent =
    tickets.filter(t => t.status === "WAITING").length;
  document.getElementById("countCalled").textContent =
    tickets.filter(t => t.status === "CALLED").length;
  document.getElementById("countTotal").textContent = tickets.length;
}

function labelOf(status) {
  return { WAITING: "待機中", CALLED: "呼び出し中", DONE: "案内済み", CANCEL: "キャンセル" }[status] || status;
}

// =============================
// 操作
// =============================
async function callNext() {
  try {
    const data = await jsonpGet(`${API_URL}?mode=callNext&count=${callCount}`);
    if (data.called && data.called.length > 0) {
      showToast(`No.${data.called.join(", ")} を呼び出しました`);
    } else {
      showToast("待機中の方はいません");
    }
    loadTickets();
  } catch(e) {
    showToast("エラーが発生しました");
  }
}

async function completeTicket(id) {
  try {
    await jsonpGet(`${API_URL}?mode=complete&id=${id}`);
    showToast(`No.${id} を案内済みにしました`);
    loadTickets();
  } catch(e) {
    showToast("エラーが発生しました");
  }
}

async function cancelTicket(id) {
  if (!confirm(`No.${id} をキャンセルしますか？`)) return;
  try {
    await jsonpGet(`${API_URL}?mode=cancel&id=${id}`);
    showToast(`No.${id} をキャンセルしました`);
    loadTickets();
  } catch(e) {
    showToast("エラーが発生しました");
  }
}

async function clearAll() {
  if (!confirm("全データを削除しますか？\nこの操作は取り消せません。")) return;
  try {
    await jsonpGet(`${API_URL}?mode=clear`);
    showToast("全データを削除しました");
    loadTickets();
  } catch(e) {
    showToast("エラーが発生しました");
  }
}

// =============================
// 自動更新
// =============================
function startAutoRefresh() {
  autoRefreshTimer = setInterval(loadTickets, 10000);
}

function stopAutoRefresh() {
  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
}

// =============================
// トースト
// =============================
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}
