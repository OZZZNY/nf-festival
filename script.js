async function reserve(){

alert("reserve開始");

const res = await fetch(
"https://script.google.com/macros/s/あなたのURL/exec",
{
method:"POST",
body:JSON.stringify({
name:"test",
keyword:"test"
})
});

alert("fetch成功");

const text = await res.text();

alert(text);

}
