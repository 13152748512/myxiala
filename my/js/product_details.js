window.onload=function(){
var mask=document.getElementById("mask"),
    smask=document.getElementById("supermask"),
	  lgdiv=document.getElementById("glass"),
	  icon_list=document.getElementById("icon_list");
  var dialog=document.getElementById("dialog-login");
	var cartt=document.querySelector("div.gouwu>a.shoppCartNum");
	var lid=location.search.split("=")[1].split("&")[0];
  var btn=document.getElementById("btn1");
  var but2=document.querySelector("div.buy  input.but2");
	var count1=document.querySelector("div.count input").value;
  var modal=document.getElementById("modal");
/*定义是否登录方法*/
function islogin(){
    modal.style.transition="all 2s";
    modal.style.zIndex=40,
    modal.style.opacity=1
    dialog.style.height="380px";
    dialog.style.border="1px solid #D7D7D7";
    dialog.style.opacity="1";
  }

/**加载动态数据**/
(function(){
	//console.log(lid);
	if(location.search.indexOf("&")=="-1"){
		var cid="";
	}else{
		var cid=location.search.split("&")[1].split("=")[1];
	}
	//console.log(cid);
	//为icon_list绑定鼠标进入事件
	var mImg=document.getElementById("mImg");
	icon_list.onmouseover=e=>{
		var tar=e.target;
		if(tar.nodeName=="IMG"){
			mImg.src=tar.dataset.md;
			lgdiv.style.backgroundImage=`url(${tar.dataset.lg})`;
		}
	}
  /*发送请求**/
  ajax({
    type:"get",
    url:"data/product/petporoductbyid.php",
    data:"lid="+lid+"&cid="+cid,
    dataType:"json"
  }).then(outupt=>{
   // console.log(outupt);
    var info=outupt.product_info;
    var imgs=outupt.icon_list;
    mImg.src=imgs[0].md;
    lgdiv.style.backgroundImage=`url(${imgs[0].lg})`;
     var html="";
    for(var pic of imgs){
      html+=`<li><img src="${pic.sm}" data-md="${pic.md}"  data-lg="${pic.lg}"></li>`
    }
    icon_list.innerHTML=html;

    /*右边内容*/
    /*名字*/
    document.querySelector(".data-right p.uname").innerHTML=info.title;
    /*价格**/
	  // console.log(document.querySelector(".data-right div.rmb i.price"));
    document.querySelector(".data-right div.rmb i.price").innerHTML="¥"+info.price;
	document.querySelector(".data-right div.rmb i.promotion").innerHTML="¥"+info.price;
	  /*销售量**/
	  //console.log(document.querySelector("div.sales ul li b.sale"));
	document.querySelector("div.sales b.sale").innerHTML=info.sold_count;
    /*规格**/
    var specs=outupt.specs;
    var html="";
    for(var spec of specs){
      html+=`<li class=${spec.bid===info.bid?"active":""}><a href="product_details.html?lid=${spec.bid}">${spec.spec}</a></li>`
    }
      document.querySelector("div.spec  ul.specs").innerHTML=html;
      
      /*颜色*/
      var html="";
			var colors=outupt.color;
			for(var color of colors){
				html+=`<li class=${color.cid===imgs[0].cid?"active":""}><a href=${location.href.indexOf("&")=="-1"?location.href:location.href.split("&")[0]}&cid=${color.cid}><img src="${color.color}"></a></li> `			
			}
      document.querySelector("div.colorr ul.colors").innerHTML=html;
  })
})();
 
 /*放大镜下的左右 按钮*/
(function(){
	var left=document.querySelector("div.push i.backward");
	var right=document.querySelector("div.push i.forward");
	var ul=document.getElementById("icon_list");
	//console.log(left,right);
	var LIWIDTH=76,mover=0;
	function move(e,dia){
		if(e.className.indexOf("disabled")==-1){
			mover+=dia;
			ul.style.left=-LIWIDTH*mover+20+"px";
			checka();
		}
	}
	function checka(){
		if(mover==0){
			left.className="backward disabled";
		}else if(ul.children.length-mover==5){
			right.className="forward disabled";
		}else{
			left.className="backward";
			right.className="forward";
		}
	}
	right.onclick=function(e){move(e.target,1)};
	left.onclick=function(e){move(e.target,-1)};
})();

/**加减 立即购买 加入购物车***/
(function(){
	/***加减****/
	var count=document.querySelector("div.count");
	count.onclick=function(e){
		var tar=e.target;
		if(tar.nodeName=="I"){
			var val=tar.parentNode.lastElementChild.previousElementSibling;
			//console.log(val);
			if(tar.innerHTML=="+"){
				val.value++;
			}else if(val.value>1){
				val.value--;
			}
		}
	}

	/***立即购买**/
	function open(url){
		window.open(url);
		//console.log("dd");
	}
   btn.onclick=function(){
	var lii=document.querySelectorAll("div.colorr ul.colors>li");
    var count=document.querySelector("div.count input").value;
	//console.log(lii);
	for(var i=0;i<lii.length;i++){
		//console.log(i);
		if(lii[i].className=="active"){
			var href=lii[i].firstElementChild.href.split("?")[1];
			//console.log(href.split("&")[1].split("=")[1]);
		}
		//console.log(lii[i]);
	}
	    var lid=href.split("&")[0].split("=")[1];
		var cid=href.split("&")[1].split("=")[1];
      ajax({
			type:"get",
			url:"data/user/isLogin.php",
			dataType:"json"
		}).then(function(data){
      if(data.ok==0){
        islogin();
      }else{	
      open("buy.html?lid="+lid+"&cid="+cid+"&count="+count);
      }
    }) 
  }
  //console.log(modal);
  //cart=parseInt(cart+n);
  //console.log(cartt);
  //console.log(dialog);
	but2.onclick=function(){
		ajax({
			type:"get",
			url:"data/user/isLogin.php",
			dataType:"json"
		}).then(function(data){
			if(data.ok==0){
        islogin();
			}else{
				ajax({
					type:"get",
					url:"data/cart/addcart.php",
					data:`lid=${lid}&count=${count1}`
				}).then(function(){
					count1=1;
				})
         /**购物车++++***/
        ajax({
          type:"get",
          url:"data/cart/shoppCart.php",
          dataType:"json"
        }).then(function(data){
          //console.log(data);
          var sum=0;
          for(var i=0;i<data.length;i++){
             sum+=parseInt(data[i].count);
          }
           cartt.innerHTML=sum;
        })
			}
		})
	}
})();

/**放大镜***/
(function(){
	/**为遮罩层绑定移入事件*/
	//console.log(lgdiv);
	smask.onmouseover=function(){
		//console.log("进入");
		mask.style.display="block";
		lgdiv.style.display="block";
	}
	/**为遮罩层绑定鼠标移除事件***/
	smask.onmouseout=function(){
		mask.style.display="none";
		lgdiv.style.display="none";
	}
	/*为遮罩层绑定移动事件**/
	var MSIZE=211,MAX=211;
	smask.onmousemove=function(e){
		var t=e.offsetY-MSIZE/2,l=e.offsetX-MSIZE/2;
		//console.log(t);	console.log(y);

		//if(t<0) t=0; else if(t>MAX) t=MAX;
		t=t<0?0:t>MAX?MAX:t;
		//if(l<0) l=0; else if(l>MAX) l=MAX;
		l=l<0?0:l>MAX?MAX:l;
		mask.style.cssText+=`top:${t}px; left:${l}px`;
		lgdiv.style.backgroundPosition=
		  `-${l*16/7}px -${t*16/7}px`;
	}
})();	

/**热卖推荐***/
(function(){
	var sells=document.getElementById("sells");
	var top=document.querySelector("ul.tobo  li.top");
	var bottom=document.querySelector("ul.tobo  li.bottom");
	//console.log(sells);
	ajax({
		type:"get",
		url:"data/product/recommend.php",
		dataType:"json"
	}).then(function(data){
		//console.log(data)
		var html="";
		var html1="";
		for(var i=0;i<data.length;i++){
			//console.log(data[i].bid);
			html+=`<dl>
					<a href="product_details.html?lid=${data[i].bid}">
						<dt class="img">
							<img src="${data[i].color}">
						</dt>
						<dt>
						<h5>${data[i].title}</h5>
						<p>￥${data[i].price}</p>
						</dt>
					</a>
				</dl>`;
			if(i<7){
				//console.log(data[i].bid);
			html1+=`<dl>
					<a href="product_details.html?lid=${data[i].bid}">
						<dt class="img">
							<img src="${data[i].color}">
						</dt>
						<dt>
						<h5>${data[i].title}</h5>
						<p>￥${data[i].price}</p>
						</dt>
					</a>
				</dl>`;
			}
		}
		
		var HEIGHT=251;
		sells.style.height=(data.length+7)*HEIGHT+"px";
		sells.innerHTML=html+html1;
		
		var mover=0;
		function move(dia=1){
			//console.log("启动函数"+mover);
			mover+=dia;
			//console.log(mover);
			if(mover<data.length+1){
				//console.log(mover);
				sells.style.transition="all 1s";
				sells.style.top=-HEIGHT*mover+"px";
			} 
			if(mover*HEIGHT==(data.length+1)*HEIGHT){
				sells.style.transition="";
				sells.style.top=0+"px";
				mover=0;
			}
		}
		var timer=setInterval(move,2000);
		function ver(){
			//console.log("进");
			clearInterval(timer);
			timer=null;
		}
		function out(){
			//console.log("调用定时器");
			timer=setInterval(move,2000);
		}
		sells.onmouseover=function(){ver()}
		sells.onmouseout=function(){out()}
		top.onmouseover=function(){ver()}
		top.onmouseout=function(){out()}
		bottom.onmouseout=function(){out()}
		bottom.onmouseover=function(){ver()}
		
		/**上下点击事件**/
		top.onclick=function(){
			//console.log(mover,sells.style.top);
			if(mover<=0){
				//console.log("进");
				mover=data.length;
				sells.style.transition="";
				sells.style.top=-mover*HEIGHT+"px";				
			}else{
				move(-1);
			}
		}
	    bottom.onclick=function(){move()}
	})
	})()
}
