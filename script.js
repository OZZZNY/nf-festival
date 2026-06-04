window.onload = async function(){

const savedId =
localStorage.getItem("ticketId");

if(savedId){

checkStatus(savedId);

}

}

async function reserve(){

const name =
document.getElementById("name").value;

const keyword =
document.getElementById("keyword").value;

const res = await fetch("https://script.google.com/macros/s/AKfycby2GYeUMEk5QVjW3WpctBAjDi2yNshmFFypHePjeGAKtLx401EoUBYLqwjq4F3_xjiE7Q/exec",{

method:"POST",

body:JSON.stringify({
name:name,
keyword:keyword
})

});

const data = await res.json();

localStorage.setItem("ticketId", data.id);

document.getElementById("formArea").style.display = "none";

checkStatus(data.id);

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

text = `
<h2>ご案内済みです</h2>
`;

}

document.getElementById("result").innerHTML = text;

}
