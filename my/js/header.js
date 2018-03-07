(function(){
        ajax({
          type:"get",
          url:"header.html",
        }).then(function(html){
          document.getElementById("header").innerHTML = html;
		  /**搜索跳出*/
      window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var headerTop = document.getElementById("headerTop");
        //console.log(headerTop);
        if (scrollTop >= 820) {
          headerTop.className = "logo fixed";
        } else
          headerTop.className = "logo";
      }

        var loginList = document.getElementById("loginList");
        var welcome = document.querySelector("div.rtt2");
        // console.log(welcome);
        var Uname = document.getElementById("Uname");
        ajax({
          type: "get",
          url: "data/user/isLogin.php",
          dataType: "json"
        }).then(function(data){
          if(data.ok == 1){
          loginList.style.display = "none";
          welcome.style.display = "block";
          Uname.innerHTML = data.uname;
        }else{loginList.style.display = "block";}
        })
        //注销
        var logout = document.getElementById("logout");
        // console.log(logout);
        logout.onclick = function (e) {
          e.preventDefault();
          ajax({
            type: "get",
            url: "data/user/logout.php"
          }).then(function(){
            location = "index.html";
          })
        }

        //注册
        var register = document.querySelectorAll("a.register");
        //console.log(register);
        for(var i=0;i<register.length;i++)
        register[i].onclick=function(e){
          e.preventDefault();
          location = "register.html";
        }
        //搜索
        var inputV = document.querySelector("div.input input.f1");
        search = document.getElementById("search");
        search.onclick = function(e){
          e.preventDefault();
          if (inputV.value.trim() !== "")
			if(location.pathname.slice(location.pathname.lastIndexOf("/")+1)!=="products.html")
				window.open("products.html?kw=" + inputV.value.trim(),"_blank");
		    else
				location="products.html?kw=" + inputV.value.trim();
        }
        if (location.search.indexOf("kw=") !== -1) {
          inputV.value = decodeURI(location.search.split("=")[1]);
        }
        //回车
        inputV.onkeydown=function(e){
          if (e.keyCode == 13)
            search.onclick(e);
        }

        //登录弹出窗口验证
        var form=document.forms[0];
        var msg=document.getElementById("msg");
        var code=document.getElementById("code");
        var hyzm=document.getElementById("hyzm");
        var img=document.getElementById("img");
          hyzm.onclick=function(e){
            e.preventDefault();;
            img.src="data/user/yzm.php";
          } 
       
		function login(){
         // e.preventDefault();
		  var nreg=/^\w{6,15}$/i;
		  var preg=/^\w{6,15}$/;
      var yreg=/^[a-z0-9]{4}$/i;
		  if(!nreg.test(form.uname.value.trim())){
			msg.innerHTML="请输入6-15位字符";
            //console.log("haha");
			form.uname.focus();
			return;
		  }else if(!preg.test(form.upwd.value.trim())){
            msg.innerHTML="请输入6-15位字符";
			form.upwd.focus();
			return;
		  }else if(!yreg.test(code.value.trim())){
            msg.innerHTML="验证码格式错误";
            code.focus();
            return;
          }
          ajax({
            type:"post",
            url:"data/user/login.php",
            data:`uname=${form.uname.value.trim()}&upwd=${form.upwd.value.trim()}&yzm=${code.value.trim()}`,
            dataType:"json"
          }).then(function(data){
            //console.log(data);
            var back=location.search.slice(6);
          if(data.ok==-1){
            msg.innerHTML="请输入正确的验证码";
            img.src="data/user/yzm.php";
          }else if(data.ok==0){
            msg.innerHTML="用户名或密码错误";
          }else {
            location = location.href;
            //console.log(location);
          }
		 })
        }
		var btnn=document.getElementById("btnn");
		 btnn.onclick=function(){login();}
		 window.onkeydown=function(e){
			// console.log(e.keyCode);
          if (e.keyCode == 13){
			  if(dialog.style.height=="380px")
				btnn.onclick();
			}
		 }
		//查询购物车数量
			var cart=document.querySelector("div.gouwu>a.shoppCartNum");
			//console.log(cart);
			ajax({
				type:"get",
				url:"data/cart/shoppCart.php",
				dataType:"json"
			}).then(function(data){
				//console.log("data");
				var sum=0;
				if(data.ok!=-1){
					for(var i=0;i<data.length;i++){
						sum+=parseInt(data[i].count);
					 }
				}else{return;}
					cart.innerHTML=sum;
			})

        //登录弹出
		var shut=document.querySelector("#dialog-login span.shut");
		var dialog=document.getElementById("dialog-login");
		var modal=document.getElementById("modal");
		function popup(){
           // e.preventDefault();
			form.uname.value="";
			form.upwd.value=""
      modal.style.transition="all 2s";
      dialog.style.height="380px";
      dialog.style.border="1px solid #D7D7D7";
      dialog.style.opacity="1";
			modal.style.zIndex=40;
			modal.style.opacity=1;
        }
		document.getElementById("enter").onclick=function(){popup()}
        shut.onclick=function(){
            dialog.style.height="0px";
            dialog.style.border="none";
            dialog.style.opacity="0";
			msg.style.display="none";
      modal.style.transition="";
			modal.style.zIndex=-40;
			modal.style.opacity="0";
			form.uname.value="";
			form.upwd.value="";
        }
		//我的订单
		document.getElementById("myorder").onclick=function(){
			location = "order.html";
		}

      //购物须知
      var shop = document.getElementById("shop");
      //console.log(shop);
      shop.onclick = function(e){
        e.preventDefault();
        location = "guide.html?jz="+-1;
      }
      //首页点击
      var shouye=document.getElementById("shouye");
      shouye.onclick=function(e){e.preventDefault();location="index.html"}
      //全部商品
      var qbsp=document.getElementById("qbsp");
      qbsp.onclick=function(e){e.preventDefault();location="products.html"}
	  //自行车
	  var zxc=document.getElementById("zxc");
      zxc.onclick=function(e){e.preventDefault();location="products.html"}
      //车身商品
      var cssp=document.getElementById("cssp");
	  //console.log(cssp);
      cssp.onclick=function(e){e.preventDefault();location="products.html"}
      //人身商品
      //var rssp=document.getElementById("rssp");
      //rssp.onclick=function(e){e.preventDefault();location="products.html"}
      //其他分类
      //var qtfl=document.getElementById("qtfl");
      //qtfl.onclick=function(e){e.preventDefault();location="products.html"}
      //常见问题
      var cjwt=document.getElementById("cjwt");
     // cjwt.onclick=function(e){e.preventDefault();location=}
	  /**点击购物车**/
	document.getElementById("ShoppCart").onclick=function(e){
		e.preventDefault();
		ajax({
			type:"get",
			url:"data/user/isLogin.php",
			dataType:"json"
		  }).then(data=>{
			if(data.ok==1){
				location="shopping_cart.html";
			}else{
				popup();
			  }
		  })
	}
})
})();

/*模糊搜索*/
/*$(function(){
  $("[name=search]").autocomplete({
		source:"data/index/searchheloper.php",
		//当选中某一项时自动触发
		focus:(e,ui)=>{
			//ui是当前选中项
			//ui.item是当前选中项对应的数据对象
			$("[name=search]").val(ui.item.title);
			return false;
		}
	})
		//在开始加载每个搜索帮助项时自动调用的方法，来生产每一项
	.autocomplete("instance")
		._renderItem=( ul ,item)=>{
		$("ul").css("width",440);
		return $("<li class='search' style='width:440px'>")
			 .append( "<span>" + item.title +"</span>"+"<b class='salee'>"+'销量:'+item.sold_count+"</b>" )
        .appendTo( ul );
	}
	//console.log($(".search>span"));
	$("ul").on("click","li.search>span",function(e){
			//console.log($(e.target).html());
			var val=$(e.target).html();
			console.log(val);
			$("[name=search]").val(val);
	} )
})*/
