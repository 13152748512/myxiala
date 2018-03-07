window.onload=function(){
//获取焦点
var uname=document.getElementById("myuname");
var upwd=document.getElementById("myupwd");
var uppwd=document.getElementById("cppwd");
var iphone=document.getElementById("myphone");
var email=document.getElementById("myEmail");
var mybtn=document.getElementById("mybtn");
var  form=document.forms[0];
//console.log(uname,upwd,uppwd,iphone,email);
 //console.log(uname);
function getfocus(){
   var b=this.parentElement.lastElementChild.previousElementSibling;
   var i=this.parentElement.lastElementChild;
   var img=this.parentElement
				.lastElementChild
				.previousElementSibling
				.previousElementSibling;
    b.style.display="block";
	i.style.display="none";
	img.style.display="none";
}
uname.onfocus=getfocus;
upwd.onfocus=getfocus;
uppwd.onfocus=getfocus;
iphone.onfocus=getfocus;
//失去焦点
//uPwd.onblur=lose;
//function lose(){
 //  var b=this.parentElement.lastElementChild.previousElementSibling;
  //  b.style.display="none";
//} 
	
//验证用户名密码
function vali(text,reg){
	var b=text.parentElement.lastElementChild.previousElementSibling;
    b.style.display="none";
    var img=text.parentElement
				.lastElementChild
				.previousElementSibling
				.previousElementSibling;
	var i=text.parentElement.lastElementChild;
    if(reg.test(text.value)){
        img.style.display="block";
		text.className=" ";
		return true;
    }else{
        text.className="gain";
		i.style.display="block";
		return false;
	}
 }
 //验证账号
	var y=false;
uname.addEventListener("blur",function(){
	var i=this.parentElement.lastElementChild;
	var img=this.parentElement
				.lastElementChild
				.previousElementSibling
				.previousElementSibling;
	if(uname.value.trim().length>=6){
		(()=>{
			ajax({
				type:"post",
				url:"data/user/chekname.php",
				data:`uname=${uname.value.trim()}`,
				dataType:"json"
			}).then(text=>{
				if(text==false){
					i.innerHTML="用户名已存在";
					i.style.display="block";
					img.style.display="none";
					y=false;
				}else{
					
					y=true;
				}
			})
		})();
	}else{
		i.innerHTML="6-15字符以内";
	}
})
uname.addEventListener("blur",function(){vali(this,/^\w{6,16}$/)});
upwd.onblur=function(){vali(this,/^\w{6,12}$/)};
//重复密码
 var u=false;
 uppwd.onblur=function (){
	var b=this.parentElement.lastElementChild.previousElementSibling;
		b.style.display="none";
	var i=this.parentElement.lastElementChild;
	var img=this.parentElement
				.lastElementChild
				.previousElementSibling
				.previousElementSibling;
	if(upwd.value!==""){
		if(upwd.value!==uppwd.value){
			//设置i
			i.style.display="block";
			u=false;
		}else{
			img.style.display="block";
			u=true;
		}
	}else{
		i.style.display="block";
		u=false;
	}
}

//验证手机
var m=false;
iphone.onblur=function (){
	var b=this.parentElement.lastElementChild.previousElementSibling;
	b.style.display="none";
	var img=this.parentElement
				.lastElementChild
				.previousElementSibling
				.previousElementSibling;
	var i=this.parentElement.lastElementChild;
	if(iphone.value!==""){
		if(/^1[3|5|7|8|6]\d{9}$/.test(iphone.value)){
			img.style.display="block";
			m=true;
		}else{
			b.style.display="block";
			b.style.background="url(img/logi/error_msg_icon.gif) no-repeat";
			b.style.paddingLeft="29px";
			b.style.right="27px";
			b.style.color="#DD0000";
			m=false;
		}
	}else{
		i.style.display="block";
		m=false;
	}
}
//验证邮箱
var t=false;
email.onblur=function(){
	var img=this.parentElement
				.lastElementChild
				.previousElementSibling
	var i=this.parentElement.lastElementChild;
	var reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	if(email.value!==""){
		if(reg.test(email.value)){
			img.style.display="block";
			i.style.display="none";
			t=true;
		}else{
			i.style.display="block";
			t=false;
		}
	}else{
		i.style.display="block";
		t=false;
	}
}
//同意协议
	var p=1;
	var b=false;
	var agree=document.getElementById("agree").firstElementChild;
 agree.onclick=function(){
	var btn=document.querySelector("div.btn input");
	//console.log(btn,agree);
	if(p==0){
		agree.style.backgroundPosition="0px -57px";
		btn.style.backgroundColor="#E4007F";
		p=1;
		b=true;
	}else{
		agree.style.backgroundPosition="0px 0px";
		btn.style.backgroundColor="#cccccc";
		p=0;
		b=false;
	}
 }
 //提交
 var model=document.getElementById("model");
 var ensure=document.getElementById("ensure");
 mybtn.onclick=()=>{	
	var runame=vali(uname,/^\w{6,16}$/);
	var rupwd=vali(upwd,/^\w{6,12}$/);
	//console.log(runame,rupwd);
	//console.log(runame,rupwd,b,u,m,t,y);
		if(runame==true&&rupwd==true&&b==true&&u==true&&m==true&&t==true&&y==true)
		(()=>{	
			ajax({
				type:"post",
				url:"data/user/register.php",
				data:`uname=${uname.value.trim()}&upwd=${upwd.value.trim()}&iphone=${iphone.value.trim()}&Email=${email.value.trim()}`,
				dataType:"json"
			}).then(data=>{
				if(data.ok==1){
					//console.log(data.ok);
					model.style.display="block";
				}else{
					alert(data.ok);
				}
			})
		})();
 }
 ensure.onclick=function(){
	location="logi.html?back="+"index.html";
 }
}