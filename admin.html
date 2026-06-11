<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dream BEGUS 管理画面</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Share+Tech+Mono&display=swap');

  :root {
    --gold: #d4af37;
    --bg: #0a0a0a;
    --surface: #111;
    --surface2: #1a1a1a;
    --border: #2a2a2a;
    --text: #e0e0e0;
    --text-dim: #888;
    --waiting: #d4af37;
    --called: #4fc3f7;
    --done: #81c784;
    --cancel: #e57373;
    --open: #81c784;
    --closed: #e57373;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Noto Sans JP', sans-serif;
    min-height: 100vh;
  }

  #loginScreen {
    display: flex; justify-content: center; align-items: center; height: 100vh;
  }

  .login-box {
    background: var(--surface); border: 1px solid var(--gold);
    border-radius: 16px; padding: 40px; width: 90%; max-width: 360px; text-align: center;
  }

  .login-box h1 { color: var(--gold); font-size: 20px; margin-bottom: 6px; letter-spacing: 2px; }
  .login-box p  { color: var(--text-dim); font-size: 13px; margin-bottom: 28px; }

  .login-box input {
    width: 100%; padding: 12px 16px;
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 8px; color: white; font-size: 16px; margin-bottom: 14px;
    outline: none; font-family: 'Share Tech Mono', monospace; letter-spacing: 3px;
    transition: border-color 0.2s;
  }
  .login-box input:focus { border-color: var(--gold); }

  .login-box button {
    width: 100%; padding: 12px; background: var(--gold); color: #000;
    border: none; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer;
  }

  .login-error { color: var(--cancel); font-size: 13px; margin-top: 12px; display: none; }

  #adminScreen { display: none; }

  header {
    background: var(--surface); border-bottom: 1px solid var(--border);
    padding: 16px 24px; display: flex; justify-content: space-between; align-items: center;
    position: sticky; top: 0; z-index: 10;
  }

  header h1 { color: var(--gold); font-size: 16px; letter-spacing: 2px; }

  #logoutBtn {
    background: transparent; border: 1px solid var(--border);
    color: var(--text-dim); padding: 6px 14px;
    border-radius: 6px; font-size: 13px; cursor: pointer; transition: all 0.2s;
  }
  #logoutBtn:hover { border-color: var(--cancel); color: var(--cancel); }

  .container { max-width: 700px; margin: 0 auto; padding: 24px 16px; }

  .stats {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px;
  }

  .stat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 16px; text-align: center;
  }

  .stat-card .num {
    font-size: 32px; font-family: 'Share Tech Mono', monospace; color: var(--gold); line-height: 1;
  }
  .stat-card .label { font-size: 11px; color: var(--text-dim); margin-top: 6px; }

  .config-panel {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 16px 20px; margin-bottom: 16px;
    display: flex; flex-direction: column; gap: 14px;
  }

  .config-row {
    display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  }

  .config-label { font-size: 13px; color: var(--text-dim); }

  .reception-toggle { display: flex; gap: 8px; }

  .toggle-btn {
    padding: 7px 18px; border-radius: 20px; border: 1px solid var(--border);
    font-size: 13px; font-weight: 700; cursor: pointer;
    background: var(--surface2); color: var(--text-dim);
    transition: all 0.2s; font-family: 'Noto Sans JP', sans-serif;
  }

  .toggle-btn.active-open   { background: #002200; border-color: var(--open);   color: var(--open); }
  .toggle-btn.active-closed { background: #2a0000; border-color: var(--closed); color: var(--closed); }

  .limit-row { display: flex; align-items: center; gap: 8px; }

  .limit-input {
    width: 64px; padding: 6px 10px;
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 8px; color: white; font-size: 16px;
    font-family: 'Share Tech Mono', monospace; text-align: center; outline: none;
    transition: border-color 0.2s;
  }
  .limit-input:focus { border-color: var(--gold); }

  .limit-save {
    padding: 6px 14px; background: var(--gold); color: #000;
    border: none; border-radius: 8px; font-size: 13px; font-weight: 700;
    cursor: pointer; transition: opacity 0.2s;
  }
  .limit-save:hover { opacity: 0.85; }

  .limit-status { font-size: 12px; color: var(--text-dim); }

  .call-setting {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 16px 20px; margin-bottom: 16px;
    display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  }

  .call-setting label { font-size: 13px; color: var(--text-dim); white-space: nowrap; }

  .call-count-btns { display: flex; align-items: center; gap: 8px; }

  .count-btn {
    background: var(--surface2); border: 1px solid var(--border);
    color: var(--text); width: 32px; height: 32px; border-radius: 6px;
    font-size: 18px; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
  }
  .count-btn:hover { border-color: var(--gold); color: var(--gold); }

  #callCountDisplay {
    font-family: 'Share Tech Mono', monospace; font-size: 22px;
    color: var(--gold); min-width: 28px; text-align: center;
  }

  .actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }

  .btn {
    padding: 14px; border: none; border-radius: 10px;
    font-size: 15px; font-weight: 700; cursor: pointer;
    transition: opacity 0.2s, transform 0.1s; font-family: 'Noto Sans JP', sans-serif;
  }
  .btn:active { transform: scale(0.97); }
  .btn:hover  { opacity: 0.85; }

  .btn-call {
    background: var(--gold); color: #000;
    grid-column: 1 / -1; font-size: 17px; padding: 16px;
  }

  .btn-clear {
    background: var(--surface2); color: var(--cancel); border: 1px solid var(--cancel);
  }

  .btn-refresh {
    background: var(--surface2); color: var(--text-dim); border: 1px solid var(--border);
  }

  .section-title {
    font-size: 12px; color: var(--text-dim); letter-spacing: 1px;
    text-transform: uppercase; margin-bottom: 12px;
  }

  .ticket-list { display: flex; flex-direction: column; gap: 8px; }

  .ticket {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 10px; padding: 14px 16px;
    display: flex; align-items: center; gap: 12px;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ticket-id {
    font-family: 'Share Tech Mono', monospace; font-size: 18px; color: var(--gold); min-width: 36px;
  }

  .ticket-info { flex: 1; }
  .ticket-name { font-size: 15px; }
  .ticket-time { font-size: 11px; color: var(--text-dim); margin-top: 2px; }

  .ticket-status {
    font-size: 12px; padding: 4px 10px; border-radius: 20px; font-weight: 700;
  }

  .status-WAITING { background: #2a2000; color: var(--waiting); }
  .status-CALLED  { background: #002a3a; color: var(--called); }
  .status-DONE    { background: #002200; color: var(--done); }
  .status-CANCEL  { background: #2a0000; color: var(--cancel); }

  .ticket-actions { display: flex; gap: 6px; }

  .ticket-btn {
    background: transparent; border: 1px solid var(--border);
    color: var(--text-dim); padding: 4px 10px; border-radius: 6px;
    cursor: pointer; font-size: 12px; transition: all 0.2s; white-space: nowrap;
  }
  .ticket-btn.done-btn:hover   { border-color: var(--done);   color: var(--done); }
  .ticket-btn.cancel-btn:hover { border-color: var(--cancel); color: var(--cancel); }

  .empty { text-align: center; color: var(--text-dim); padding: 32px; font-size: 14px; }

  #toast {
    position: fixed; bottom: 24px; left: 50%;
    transform: translateX(-50%) translateY(80px);
    background: var(--surface); border: 1px solid var(--gold);
    color: var(--gold); padding: 10px 24px; border-radius: 20px; font-size: 14px;
    transition: transform 0.3s ease; z-index: 100; white-space: nowrap;
  }
  #toast.show { transform: translateX(-50%) translateY(0); }
</style>
</head>
<body>

<!-- ログイン -->
<div id="loginScreen">
  <div class="login-box">
    <h1>♦ BEGUS ADMIN ♦</h1>
    <p>管理者パスワードを入力してください</p>
    <input type="password" id="passwordInput" placeholder="パスワード"
      onkeydown="if(event.key==='Enter')login()">
    <button onclick="login()">ログイン</button>
    <div class="login-error" id="loginError">パスワードが違います</div>
  </div>
</div>

<!-- 管理画面 -->
<div id="adminScreen">
  <header>
    <h1>♦ Dream BEGUS 管理画面</h1>
    <button id="logoutBtn" onclick="logout()">ログアウト</button>
  </header>

  <div class="container">

    <div class="stats">
      <div class="stat-card">
        <div class="num" id="countWaiting">-</div>
        <div class="label">待機中</div>
      </div>
      <div class="stat-card">
        <div class="num" id="countCalled">-</div>
        <div class="label">呼び出し中</div>
      </div>
      <div class="stat-card">
        <div class="num" id="countTotal">-</div>
        <div class="label">本日合計</div>
      </div>
    </div>

    <div class="config-panel">
      <div class="config-row">
        <div class="config-label">受付状態</div>
        <div class="reception-toggle">
          <button class="toggle-btn" id="btnOpen"   onclick="setReception('OPEN')">受付中</button>
          <button class="toggle-btn" id="btnClosed" onclick="setReception('CLOSED')">受付終了</button>
        </div>
      </div>
      <div class="config-row">
        <div class="config-label">予約上限人数</div>
        <div class="limit-row">
          <input type="number" id="limitInput" class="limit-input" min="1" max="999" value="20">
          <button class="limit-save" onclick="saveLimit()">保存</button>
          <span class="limit-status" id="limitStatus"></span>
        </div>
      </div>
    </div>

    <div class="call-setting">
      <label>同時呼び出し人数：</label>
      <div class="call-count-btns">
        <button class="count-btn" onclick="changeCallCount(-1)">－</button>
        <div id="callCountDisplay">1</div>
        <button class="count-btn" onclick="changeCallCount(1)">＋</button>
      </div>
      <span style="font-size:12px;color:var(--text-dim)">人まとめて呼び出す</span>
    </div>

    <div class="actions">
      <button class="btn btn-call" onclick="callNext()">▶ 次の人を呼ぶ</button>
      <button class="btn btn-refresh" onclick="loadTickets()">↻ 更新</button>
      <button class="btn btn-clear" onclick="clearAll()">⚠ 全データ削除</button>
    </div>

    <div class="section-title">予約一覧</div>
    <div class="ticket-list" id="ticketList">
      <div class="empty">読み込み中...</div>
    </div>

  </div>
</div>

<div id="toast"></div>

<script src="admin.js"></script>
</body>
</html>
