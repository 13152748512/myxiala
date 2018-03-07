(function(){
  var chbAll=document.querySelector(".check-top>img");
  var chb=document.getElementById("content-box-body");
  var base=document.querySelector("div.base");
  var model=document.getElementById("model");
  var ensure=document.getElementById("ensure");
  var callOff=document.getElementById("call-off");
	var btn=document.querySelector(".foot-cash");
  //console.log(base);
  /****点击全部删除******/
  var n=0;
  var s=0
  base.onclick=function(e){
    e.preventDefault();
    var tar=e.target;
	  if(tar.nodeName=="IMG"){
      if(tar.src.endsWith("normal.png")){
        tar.src="img/cart/product_true.png";
        n=1;
      }else{
        tar.src="img/cart/product_normal.png";
        n=0;
      }
    }   
    /**全选删除****/
    if(tar.nodeName="A"&&tar.innerHTML=="删除"){
      //console.log(n);
        if(n>0){
          //console.log("进");
          model.style.display="block";
          s=1;
        }
    }
    //console.log(n);
  }
  /****弹出确定***/
  ensure.onclick=function(e){
    var iid=e.target.dataset.iid;
    // console.log(iid);
    ajax({
      type:"get",
      url:"data/cart/delete.php",
      data:s>0?"":`iid=${iid}`
    }).then(loadCart);
    model.style.display="none";
  }
  /**弹出取消***/
  callOff.onclick=function(){
    model.style.display="none";
    s=0;
  }
  /*点击全选*/
 chbAll.onclick=function(e){
    var checked=0;
    if(e.target.src.endsWith("normal.png")){
      e.target.src="img/cart/product_true.png";
        checked=1;
    }else if(e.target.src.endsWith("true.png")){
      e.target.src="img/cart/product_normal.png";
        checked=0;
    }
    ajax({
      type:"get",
      url:"data/cart/selectAll.php",
      data:"checked="+checked
    }).then(loadCart);
 }
  /***点击单选 加减  删除**/
  var checked;
chb.onclick=function(e){
    var tar=e.target;
	/***点击单选**/
    if(tar.className=="chk"){
      var iid=tar.dataset.iid;
      if(tar.src.endsWith("normal.png")){
          checked=1;
      }else if(tar.src.endsWith("true.png")){
       // console.log("jin");
          checked=0;
      }
      ajax({
        type:"get",
        url:"data/cart/selectOdd.php",
        data:"checked="+checked+"&iid="+iid
      }).then(loadCart);
    }
	/***点击加  减***/
	if(tar.className=="reduce"||tar.className=="add"){
		//console.log("ss");
		var lid=tar.parentElement.dataset.lid;
		var count=tar.parentElement.firstElementChild.nextElementSibling.value;
		if(tar.innerHTML=="-"){
			if(tar.parentElement.firstElementChild.nextElementSibling.value>1)
				count--;
				//console.log(count);
				addcart(lid,count);
				//console.log(count1);
	}else if(tar.innerHTML=="+"){
				count++;
			addcart(lid,count);
			//console.log(count);
	    }
	 }
	/****删除*****/
	if(tar.className=="remove"){
		var iid=tar.dataset.iid;
    ensure.dataset.iid=`${iid}`;
		//console.log(iid);
		model.style.display="block";
	}
}
function addcart(lid,count){
	//console.log(lid,count)
	ajax({
		type:"get",
		url:"data/cart/updatecount.php",
		data:`lid=${lid}&count=${count}`
	}).then(loadCart);
}  
function loadCart(){
	ajax({
		type:"get",
		url:"data/cart/shopping_cart.php",
		dataType:"json"
	}).then(data=>{
		console.log(data);
		var selectall=true,total=0,selected=0;
		if(data.code){
			var html=`<div class="xgsp"><img src="img/logi/bq.jpg">主人还没有商品！<a href="products.html" >去选购商品.....</a></div>`;
			document.getElementById("content-box-body").innerHTML=html;
		}else{
			var {data,shop}=data;
			var html="";
			for(var i=0;i<data.length;i++){
				for(var j=0;j<=shop.length;j++){
				if(j==i){
				shop[j].is_checked==1&&(checked=1);
					//console.log(j,i);
				html+=`<div class="imfor">
						<div class="check">
							<img data-iid="${shop[j].iid}" class="chk" src="${shop[j].is_checked==1?'img/cart/product_true.png':
					'img/cart/product_normal.png'}" alt="">
						</div>
						<div class="product">
							<a href="product_details.html?lid=${data[i][0].bid}" class="img lf"><img src="${data[i][0].color}"/></a>
							<div class="shopp">	
								<span class="desc">
									<a href="product_details.html?lid=${data[i][0].bid}">${data[i][0].title}</a>
								</span>
								<p class="col">
									<span>规格：</span>
									<span class="color-desc">${data[i][0].spec}</span>
									<span>颜色：</span>
									<img class="shop-color" src="${shop[j].color}"/>
								</p>
							</div>
						</div>
						<div class="pric">
							<b class="rmb">¥${data[i][0].price}</b>
						</div>
						<div class="num" data-lid="${shop[j].lid}">
							<span class="reduce">-</span>
							<input type="text" value="${shop[j].count}" />
							<span class="add">+</span>
						</div>
						<div class="total-price">
							<span>¥${(data[i][0].price*shop[j].count).toFixed(2)}</span>
						</div>
						<div class="del">
							<a href="javascript:;" class="remove" data-iid="${shop[j].iid}">删除</a>
						</div>
					</div>`;
				        shop[j].is_checked=="1"&&(selected++,total+=data[i][0].price*shop[j].count);
                        shop[j].is_checked=="0"&&(selectall=false);
					}
				}
			}
				document.getElementById("content-box-body").innerHTML=html;
				//console.log(selectall);
				chbAll.src=selectall?"img/cart/product_true.png":"img/cart/product_normal.png";
                document.querySelector("span.totle").innerHTML=selected;
				document.querySelector("span.tota").innerHTML=selected;
				document.querySelector("span.totalPrices").innerHTML=total.toFixed(2);
				document.querySelector("span.foot-price").innerHTML=total.toFixed(2);
				
		}
	})
}
	/*点击去结算*/
btn.onclick=function(e){
	e.preventDefault();
	var tar=e.target;
	if(tar.nodeName=="A"){
		if(document.querySelectorAll(".imfor").length>=1&&checked==1){;
			location="buy.html?back=shopping_cart.html";
		}else{
			alert("请选择商品");
			return;
		}
	}
}
 loadCart();
})();