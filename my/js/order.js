function demand(pno){
	console.log(pno);
	$.ajax({
		type:"get",
		url:"data/user/order.php",
		data:{pno:pno},
		success:function(data){
			console.log(data);
			var {uname,data,totalrecode,zongs,pagecount,pno}=data;
			var html="";
			for(var tmp of data){
				html+=`<div class="list">
								<div class="orderNum">
									<span class="hcolor">${tmp.time}</span>
									<span class="hcolor">订单号：${tmp.number}</span>
								</div>
								<div class="xingq">
									<!-- 订单详情-->
									<div class="product">
										<a href="product_details.html?lid=${tmp.lid}&cid=${tmp.cid}" class="img"><img src="${tmp.color}"></a>
										<div class="shopp">	
											<span class="desc">
												<a href="product_details.html?lid=${tmp.lid}&cid=${tmp.cid}">${tmp.title}</a>
											</span>
										</div>
									</div>
									 <!--收货人-->
									 <div class="sname line">${tmp.receiver}</div>
									 <!-- 总计 -->
									<div class="price line">¥${(tmp.count*tmp.price).toFixed(2)}</div>
									<!--支付方式-->
									<div class="pay line">${tmp.pay_way}</div>
									<!-- 状态 -->
									<div class="respon line abolish">取消</div>
									<!-- 详情 -->
									<div class="detail line"><a href="#" data-address="${tmp.address}" data-cid="${tmp.cid}" data-color="${tmp.color}" data-count="${tmp.count}" data-lid="${tmp.lid}" data-number="${tmp.number}" data-pay_way="${tmp.pay_way}" data-price="${tmp.price}" data-ps_time="${tmp.ps_time}" data-receiver="${tmp.receiver}" data-title="${tmp.title}" data-cellphone="${tmp.cellphone}" data-time="${tmp.time}">订单详情</a><span>></span></div>
								</div>
							</div>`
			}
			$("#Detailslist").html(html);
			$(".punam ").html(uname[0]);
			//拼页码
			var html1="";
			var pno=parseInt(pno);
			var pagecount=parseInt(pagecount);
			html1+=`<li><a href="javascript:;">第一页</a></li>`
			if(pno-1>=1){
				html1+=`<li><a href="javascript:;">${pno-1}</a></li>`
			}
			html1+=`<li><a href="javascript:;" class="ativer">${pno}</a></li>`
			if(pno+1<=pagecount){
				html1+=`<li><a href="javascript:;">${pno+1}</a></li>`
			}
			html1+=`<li><a href="javascript:demand(${pno+1>pagecount?pagecount:(pno+1)});">下一页</a></li>`
			$(".paging ul").html(html1);
			$("#quanbu").html(zongs);
		},
		erorr:function(){
			alert:("网络故障请检查！")
		}
	})
}
$(()=>{
	demand(1);
	$(".paging ul").on("click","a",function(e){
		var tar=$(e.target);
		if(tar.html()!="第一页"&&tar.html()!="下一页"){
			demand(tar.html());
		}
		if(tar.html()=="第一页"){
			demand(1);
		}
	})
	$("[data-guide=quanbu]").click(function(e){
		e.preventDefault();
		console.log("...");
		location="order.html";
	})
})

$("#Detailslist").on("click",".detail a",function(e){
	e.preventDefault();
	var tar=e.target;
	var address=tar.dataset.address.replace(/^\s+|\s+$/g,"");
	var phone=address.substr(-11);
	var pick=address.substr(0,address.length-11);
	var cid=tar.dataset.cid;
	var color=tar.dataset.color;
	var count=tar.dataset.count;
	var lid=tar.dataset.lid;
	var number=tar.dataset.number;
	var cellphone=tar.dataset.cellphone
	var pay_way=tar.dataset.pay_way.replace(/^\s+|\s+$/g,"");
	var price=tar.dataset.price;
	var ps_time=tar.dataset.ps_time.replace(/^\s+|\s+$/g,"");
	var receiver=tar.dataset.receiver;
	var title=tar.dataset.title;
	var time=tar.dataset.time;
	//console.log(address);
	//console.log("...");
	$.ajax({
		type:"get",
		url:"theOrder.html",
		success:function(data){
			//console.log(data);
			$(".perCentOrdList").html(data);
			$(".compellation").html(receiver);
			$(".telephone").html(cellphone);
			$(".location").html(pick);
			$(".payment").html(pay_way);
			$(".freight").html("¥0");
			$(".dispatching").html(ps_time);
			$(".distribution").html("用户自提");
			$(".mark").html(number);
			$(".place").html(time);
			$(".shoop").html("林芝高山自行车行");
			$(".address").html(pick);
			$(".relation").html(phone);
			$(".name_img").attr("src",color);
			//console.log($(".name_img").attr("src"));
			$(".product_name").html(title);
			$(".univalence").html(price);
			$(".amount").html(count);
			$(".extended").html((price*count).toFixed(2));
			$(".check").attr("href",'product_details.html?lid='+lid+'&cid='+cid);	
			$(".amount").html((price*count).toFixed(2));
			$(".handle").html((price*count).toFixed(2));
		},
		erorr:function(){
			alert("网络故障请检查")
		}
	})
})