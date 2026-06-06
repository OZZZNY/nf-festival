if(data.status === "WAITING"){

text = `
<h2>待機中</h2>
<p>整理番号：${id}</p>
<p>現在待機：${data.waiting}組</p>
`;

}

else if(data.status === "CALLED"){

text = `
<h2>お呼び出し中です！</h2>
<p>整理番号：${id}</p>
`;

}

else if(data.status === "DONE"){

localStorage.removeItem("ticketId");

document.getElementById("formArea").style.display = "block";

text = `
<h2>ご案内済みです</h2>
<p>再度予約可能です</p>
`;

}

else if(data.status === "CANCEL"){

localStorage.removeItem("ticketId");

document.getElementById("formArea").style.display = "block";

text = `
<h2>予約はキャンセルされました</h2>
`;

}
