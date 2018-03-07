/*获取商品 总页数 总记录数 当前页码内容 当前页数数量*/
 /*定义全局函数和全局变量*/
 var pages;
 var PNO,PAGESIZE,PAGECOUNT,TOTALRECODE,DATA;
function gain(pno,pagesize,pagecount,totalrecode,data){
	//console.log(pno,pagesize,pagecount,totalrecode,data);
	PNO=pno;
	PAGESIZE=pagesize;
	PAGECOUNT=pagecount;
	TOTALRECODE=totalrecode;
	DATA=data;
	pages=pagecount;
	var html="";
	for(var data of data){
	html+=`<dl class="gdsLitContTab">
		  <dt>
			  <a href="javascript:;"><img src="${data.color}" alt=""  data-bid=${data.bid}></a>
		  </dt>
		  <dd>
			  <div class="ddtop" data-bid=${data.bid}>
				  <span ><a href="javascript:;" data-bid=${data.bid}>${data.title}</a></span>
				  <p>￥${data.price}</p>
			  </div>
			  <div class="ddmid clear">
				  <p class="lf">
					  <span>销量：</span>
					  <em>${data.sold_count}</em>
				  </p>
				  <p class="rt">
					 <span>评价：</span>
					 <em>${data.appraise}</em>
				  </p>
			  </div>
			  <div class="ddbtm" data-bid=${data.bid}>
				  <a href="#" class="buy" >立即购买</a>
				  <a href="#" class="add-cart">加入购物车</a>
			  </div>
		  </dd>
	  </dl>`;
    }
	document.querySelector(".gdsLitCont").innerHTML=html;
	//console.log(pno);
	/**创建页码*/
	var html="";
	 pno=parseInt(pno);
	//上一页
	html+=`<li class="paging-btm  ${pno==1?'ativer':''}"><a href="#">上一页</a></li>`
	//上上一页
	if(pno-2>0){
	  html+=`<li><a href="#">${pno-2}</a></li>`;
	}
	//上一页
	if(pno-1>0){
	  html+=`<li><a href="#">${pno-1}</a></li>`;
	}
	//当前页
	html+=`<li class="pno"><a href="#">${pno}</a></li>`;
	//下一页
	if(pno+1<=pagecount){
	  html+=`<li><a href="#">${pno+1}</a></li>`;
	}
	//下下一页
	if(pno+2<=pagecount){
	  html+=`<li><a href="#">${pno+2}</a></li>`;
	}
	//下一页
	html+=`<li class="paging-btm  ${pno==pagecount?'ativer':''}"><a href="#">下一页</a></li>`;
	document.querySelector("div.paging>ul.rt").innerHTML=html;	
}


window.onload=function(){
  (function(){
    var pno=1;
	var fid;
	var min;
	var max;
	/****先调一次****/
	function coob(pno){
		ajax({
		type:"get",
		url:"data/cart/between.php",
		data:"pno="+pno+"&"+"fid="+fid+"&"+"min="+min+"&"+"max="+max,
		dataType:"json"
	  }).then(function(data){
			var {pno,pagesize,pagecount,totalrecode,data}=data;
			//console.log(data);
			gain(pno,pagesize,pagecount,totalrecode,data);
		})
	}
		coob(pno);
  document.querySelector("div.paging>ul.rt").onclick=function(e){
	 // console.log(pno);
	e.preventDefault();
	var tar=e.target;
	if(tar.nodeName=="A"&&tar.innerHTML!=="上一页"&&tar.innerHTML!=="下一页"){
	  pno=tar.innerHTML;
	  coob(pno,fid,min,max);
	}
		if(pno>1&&tar.innerHTML=="上一页"){
			//console.log(pno);
			//console.log("进来");
			pno--;
			coob(pno);
		}
		if(pno<pages&&tar.innerHTML=="下一页"){
		  pno++;
		  coob(pno);
		}	
	}
  //加载自行车名
	ajax({
		type:"get",
		url:"data/products/blkes.php",
		dataType:"json"
	}).then(function(data){
		//gain(1);
		var html="";
		html+=`<a href="javascript:gain(PNO,PAGESIZE,PAGECOUNT,TOTALRECODE,DATA);" class="qb">全部</a>`
		for(var key of data){
			html+=`<a href="javascript:;" data-fid="${key.fid}">${key.fname}</a>`;
		}
		document.querySelector("div.choose>div.set").innerHTML+=html;
	})
		/***点击全部 山地车 。。。。**/
	document.querySelector("div.choose>div.set").onclick=function(e){
		var tar=e.target;
		if(tar.nodeName=="A"){
		 fid=tar.dataset.fid!=undefined?tar.dataset.fid:"";
		ajax({
			type:"get",
			url:"data/cart/product_list.php",
			data:"fid="+fid,
			dataType:"json"
		}).then(function(data){
				//console.log(data);
				var {pno,pagesize,pagecount,totalrecode,data}=data;
				gain(pno,pagesize,pagecount,totalrecode,data);
			})
		}
	}
	/**点击价格****/
	document.querySelector("div.choose>div.price").onclick=function(e){
		e.preventDefault();
		var tar=e.target;
		if(tar.nodeName=="A"){
			min=tar.innerHTML.slice(0,tar.innerHTML.indexOf("-"));
			max=tar.innerHTML.slice(tar.innerHTML.indexOf("-")+1);
			//console.log(pno,fid,min,max);
			coob(1,fid,min,max);
			/*ajax({
				type:"get",
				url:"data/cart/between.php",
				data:"fid="+fid+"&"+"min="+min+"&"+"max="+max,
				dataType:"json"
			}).then(function(data){
				console.log(data);
				var {pno,pagesize,pagecount,totalrecode,data}=data;
					gain(pno,pagesize,pagecount,totalrecode,data);
			})*/
		}
	}
 })();
  //加入购物车
  $(function(){
    var gdsLitCont=document.querySelector(".gdsLitCont");
    var dialog=$("#dialog-login");
    var modal=$("#modal");
    //console.log(cartt,dialog);
    //console.log(gdsLitCont);
     gdsLitCont.onclick=function(e){
      e.preventDefault();
      var tar=e.target;
      //var lid=tar.parentElement.dataset.bid;
      if(tar.className=="add-cart"){
		var lid=tar.parentElement.dataset.bid;
		 //console.log(lid);
        ajax({
        type:"get",
        url:"data/user/isLogin.php",
        dataType:"json"
        }).then(function(data){
          if(data.ok==0){
            dialog.css({
              height:380,
              border:"1px solid #D7D7D7",
              opacity:1
            });
            modal.css({
              transition: "all 2s",
              zIndex:40,
              opacity:1
            });
          }else{
            $(".choice").show();
            ajax({
              type:"get",
              url:"data/cart/selectdid.php",
              data:`lid=${lid}`,
							dataType:"json"
            }).then(function(data){
               //console.log(data); 
               var html="";
               for(var i=0;i<data.length;i++){
                // console.log(data[i]);
                  html+=` <div class="vessel">
                      <!--编号-->
                      <div class="number">
                        <input type="radio" name="single"  data-lid="${data[i].bid}" data-cid="${data[i].cid}">
                        <span>${i+1}</span>
                      </div>
                      <!--名称-->
                      <div class="vessel-name">
                        <p class="vessel-title">${data[i].title}</p>
                        <p>
                          <span>规格：</span>
                          ${data[i].spec}
                          <span class="vessel_cor">颜色：</span>
                           <img class="vessel_img" src="${data[i].c}">
                        </p>
                      </div>
                      <!--单价-->
                      <div class="vessel-price">
                        <span>¥${data[i].price}</span>
                      </div>
                      <!--图片-->
                      <div class="vessel-color">
                         <img src="${data[i].color}">
                      </div>
                    </div>`
               }
                $(".minutely").html(html);
            })
          }
        })
       // }
      }else
	  /***如果是立即购买***/
	  if(tar.className=="buy"){
		  //console.log(tar);
	    var lid=tar.parentElement.dataset.bid;
		window.open("product_details.html?lid="+lid,"_blank");
	  }else
	  /**跳转**/
	  if(tar.nodeName=="A"||tar.nodeName=="IMG"){
		var lid=tar.dataset.bid;
		  //console.log(lid);
		window.open("product_details.html?lid="+lid,"_blank");
	  }
    }
		
		/*商品详情关闭按钮*/
    $(".padlock a").click(function(e){
       e.preventDefault();
       $(".choice").hide();
    });
		/*加入购物车成功确认按钮*/
		$("#ensure").click(function(){
			$("#model").hide();
			location="shopping_cart.html";
		})
		/*加入购物车*/
		$(".choose-b a").click(function(){
			var che=false;
			var inp="";
			//console.log($(".vessel input"));
			var inps=$(".vessel input");
			for(var i=0;i<inps.length;i++){
				$(inps[i]).prop("checked")&&(che=true,inp=$(inps[i]));
			}
			if(che){
				var lid=inp.data().lid;
				var cid=inp.data().cid;
				//console.log(lid,cid);
				ajax({
              type:"get",
              url:"data/cart/addcart.php",
              data:`lid=${lid}&cid=${cid}`,
			  dataType:"json"
            }).then(function(data){
							//console.log(data);
							if(data.ok>0){
								//alert(data.msg);
								$("#model").show();
							}else{
								alert(data.msg);
							}
						});
						$(".choice").hide();
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
						$("#ShoppCart").html(sum);
						//console.log(sum);
					})
			}else{
				alert("请选择商品");	
			}
		})
  })
}