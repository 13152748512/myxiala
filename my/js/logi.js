window.onload=function(){
(()=>{
  var form=document.querySelector("div.fform form"),
       i=form.uname.parentNode.lastElementChild,
       zc=document.querySelector("[data-zhuce=zc]");
  zc.onclick=function(e){
    e.preventDefault();
    location="register.html";
  }
  var img=document.getElementById("img");
  var code=document.getElementById("code");
  var hyzm=document.getElementById("hyzm");
  var b=document.getElementById("yzm-i");
  //console.log(i);
  hyzm.onclick=function(e){
	e.preventDefault();
    img.src="data/user/yzm.php";
  }
  code.oninput=function(){
		//console.log("jin");
		code.value.trim()!==""?b.style.display="none":b.style.display="inline-block";
	}
	var model=document.getElementById("model");
	var ensure=document.getElementById("ensure");
  document.querySelector("[type=button]").onclick=function(){
	  //console.log("jin");
	var uname=form.uname.value,
		upwd=form.upwd.value;
	var nreg=/^\w{6,15}$/i,
		preg=/^\w{6,15}$/,
		yreg=/^[a-z0-9]{4}$/i;
	if(!nreg.test(uname.trim())){
		i.style.display="inline-block";
		form.uname.focus();
		return;
	}else if(!preg.test(upwd.trim())){
		i.style.display="inline-block";
		form.upwd.focus();
		return;
	}else if(!yreg.test(code.value.trim())){
		b.style.display="inline-block";
		code.focus();
		return;
	}else{
		ajax({
		  type:"post",
		  url:"data/user/login.php",
		  data:`uname=${form.uname.value.trim()}&upwd=${form.upwd.value.trim()}&yzm=${code.value.trim()}`,
		  dataType:"json"
		}).then(data=>{
		  //console.log(data);
		  if(data.ok==0){
				i.style.display="inline-block";
			}else if(data.ok==-1){
				b.style.display="inline-block";
			}else{
				model.style.display="block";
			}
		})
	}
  }
  ensure.onclick=function(){
	location="index.html";
  }
})();
}