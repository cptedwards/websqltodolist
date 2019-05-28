var db=openDatabase('db','1.0','test',2*1024*1024);
document.addEventListener("DOMContentLoaded",function(){
	var db= openDatabase('db','1.0','test',2*1024*1024);
	db.transaction(function (tx){
		tx.executeSql("CREATE TABLE IF NOT EXISTS todonew (id INTEGER PRIMARY KEY,todo TEXT)");
		tx.executeSql("CREATE TABLE IF NOT EXISTS todoold (id INTEGER PRIMARY KEY,todo TEXT)");
	});
	db.transaction(function(exe){
		exe.executeSql("SELECT todo FROM todonew",[],function(exe,result){
			console.log(result);
			for(var i=1; i<=result.rows.length;i++){
				document.getElementById("yapacaklarım").appendChild(listolustur(result[i].todo));
			}
		});
	});
});
function listolustur(text){
	var li=document.createElement("li");
	var cbox=document.createElement("input");
	cbox.type="checkbox";
	cbox.id="checkbox";
	cbox.onchange=chcked;
	var lbl=document.createElement("label");
	lbl.textContent=text;
    var textinput=document.createElement("input");
    textinput.type="text";
	var dzltbtn=document.createElement("button");
    dzltbtn.textContent="Düzelt";
	dzltbtn.className="dzlt";
	dzltbtn.id="dzlt";
	dzltbtn.onclick=dzlt;
	var silbtn=document.createElement("button");
    silbtn.textContent="Sil";
	silbtn.className="sil";
	silbtn.onclick=sil;
	li.appendChild(cbox);
	li.appendChild(lbl);
	li.appendChild(textinput);
	li.appendChild(dzltbtn);
	li.appendChild(silbtn);
	return li;
}
function ekle(){
	var gelentext=document.getElementById("yeniyapılacak").value;
	var s=listolustur(gelentext);
	document.getElementById("yapacaklarım").appendChild(s);
	db.transaction(function (exec){
		exec.executeSql("INSERT INTO todonew(todo) VALUES(?)",[gelentext]);
	});
}
var dzlt=function(){
    var li=this.parentNode;
	var textinput=li.querySelector("input[type=text]");
	var label=li.querySelector("label");
	var btn=li.querySelector("button.dzlt");
	var togle=li.classList.contains("dzlt");
	if(togle){
		btn.textContent="Düzelt";
		label.textContent=textinput.value;
		db.transaction(function (exec){
			exec.executeSql("UPDATE todonew SET todo=? WHERE id=?",[label.textContent],[li.id]);
		});
	}
	else{
		btn.textContent="Değiştir";
		textinput.value=label.textContent;
	}
	li.classList.toggle("dzlt");
}
var sil=function(){
	var li=this.parentNode;
	var ul=li.parentNode;
	ul.removeChild(li);
}
var chcked=function(){
	var li=this.parentNode;
	var c=document.getElementById("checkbox");
	var yaptıklarım=document.getElementById("yaptıklarım");
	var yapacaklarım=document.getElementById("yapacaklarım");
	if(c.checked==false){
		yapacaklarım.appendChild(li);
	}
	else{
		c.checked=true;
		yaptıklarım.appendChild(li);
	}
}