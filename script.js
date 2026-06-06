
window.onload = async function(){

const savedId =
localStorage.getItem("ticketId");

if(savedId){

checkStatus(savedId);

}

}

async function reserve(){

const button =
document.querySelector("button");

button.disabled = true;
button.innerText = "送信中...";

const name =
document.getElementById("name").value;

const keyword =
document.getElementById("keyword").value;

try{

const res = await fetch(
"https://script.google.com/macros/s/AKfycby2GYeUMEk5QVjW3WpctBAjDi2yNshmFFypHePjeGAKtLx401EoUBYLqwjq4F3_xjiE7Q/exec",
{
method:"POST",

body:JSON.stringify({
name:name,
keyword:keyword
})

});

const data = await res.json();

localStorage.setItem("ticketId", data.id);

document.getElementById("formArea").style.display = "none";

document.getElementById("result").innerHTML = `
<h2>予約完了！</h2>
<p>整理番号：${data.id}</p>
<p>現在待機：${data.waiting}組</p>
`;

}catch(error){

alert("送信失敗");

button.disabled = false;
button.innerText = "予約する";

}

}

async function checkStatus(id){

const res = await fetch(
"https://script.google.com/macros/s/AKfycby2GYeUMEk5QVjW3WpctBAjDi2yNshmFFypHePjeGAKtLx401EoUBYLqwjq4F3_xjiE7Q/exec?mode=status&id=" + id
);

const data = await res.json();

let text = "";

if(data.status === "WAITING"){

text = `
<h2>待機中</h2>
<p>整理番号：${id}</p>
<p>現在待機：${data.waiting}組</p>
`;

}

if(data.status === "CALLED"){

text = `
<h2>お呼び出し中です！</h2>
<p>整理番号：${id}</p>
`;

}

if(data.status === "DONE"){

localStorage.removeItem("ticketId");

document.getElementById("formArea").style.display = "block";

text = `
<h2>ご案内済みです</h2>
<p>再度予約可能です</p>
`;

}

if(data.status === "CANCEL"){

localStorage.removeItem("ticketId");

document.getElementById("formArea").style.display = "block";

text = `
<h2>予約はキャンセルされました</h2>
<p>再度予約可能です</p>
`;

}

document.getElementById("result").innerHTML = text;

}

setInterval(async function(){

const savedId =
localStorage.getItem("ticketId");

if(savedId){

checkStatus(savedId);

}

},5000);
