const watches = [

{
name:"ロレックス サブマリーナ ノンデイト",
image:"images/IMG_2638.jpeg"
},

{
name:"ロレックス ヨットマスター37",
image:"images/IMG_3378.jpeg"
},

{
name:"ロレックス エクスプローラー36",
image:"images/41185953-24CB-4223-997D-29C1D9C4AD32.jpeg"
},

{
name:"ロレックス GMTマスター2 コンビ エバーローズ",
image:"images/IMG_6357.jpeg"
},

{
name:"ハミルトン カーキフィールド メカニカル",
image:"images/IMG_9658.jpeg"
},

{
name:"G-SHOCK 初代復刻モデル",
image:"images/IMG_9659.jpeg"
}

];


let data =
JSON.parse(localStorage.getItem("watchData")) || {};


function wear(name){

if(!data[name]){

data[name]={
count:0,
last:"なし",
history:[]
};

}


let d=new Date();

let date =
d.getFullYear()+"/"+
(d.getMonth()+1)+"/"+
d.getDate();


data[name].count++;
data[name].last=date;


data[name].history.unshift(date);


localStorage.setItem(
"watchData",
JSON.stringify(data)
);


display();

}



function updateDashboard(){

let total=0;
let top="";
let max=0;


watches.forEach(w=>{

let item=data[w.name] || {count:0};

total+=item.count;


if(item.count>max){

max=item.count;
top=w.name;

}

});


document.getElementById("totalWatch").innerHTML =
"所有時計："+watches.length+"本";


document.getElementById("totalCount").innerHTML =
"総着用回数："+total+"回";


document.getElementById("topWatch").innerHTML =
"🏆 一番着けている時計："+(top||"まだ記録なし");

}



function updateRanking(){

let ranking=[...watches]

.map(w=>({

name:w.name,
count:data[w.name]?.count || 0

}))

.sort((a,b)=>b.count-a.count);


let html="";


ranking.forEach((w,i)=>{

let medal =
i===0?"🥇":
i===1?"🥈":
i===2?"🥉":
(i+1)+"位";


html+=`

<p>
${medal} ${w.name}<br>
${w.count}回
</p>

`;

});


document.getElementById("ranking").innerHTML=html;

}



function display(){

let area=document.getElementById("watches");

if(!area) return;


area.innerHTML="";


watches.forEach(w=>{


let item=data[w.name] || {

count:0,
last:"なし",
history:[]

};


area.innerHTML += `

<div class="card">

<img class="watch-img" src="${w.image}">

<h2>⌚ ${w.name}</h2>

<p>
最終着用日：${item.last}
</p>

<p class="count">
着用回数：${item.count}回
</p>

<button onclick="wear('${w.name}')">
今日着けた
</button>

</div>

`;

});


updateDashboard();
updateRanking();

}


display();
