
window.onload = async function(){

const savedId =
localStorage.getItem("ticketId");

if(savedId){

document.getElementById("formArea").style.display = "none";

document.getElementById("result").innerHTML = `
<h2>予約済み</h2>
<p>整理番号：${savedId}</p>
`;

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

alert("送信に失敗しました");

button.disabled = false;
button.innerText = "予約する";

}

}
