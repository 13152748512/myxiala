$(()=>{

  /**选择自提地点*/
  $(".mode-delivery>span").click(function(){
    $(".choice").fadeIn(700);
  });
  $(".amend").click(function(e){
	   e.preventDefault();
    $(".choice").fadeIn(700);
  });
  $(".padlock>a").click(function(e){
    e.preventDefault();
    $(".choice").fadeOut(500);
  })
  /**新增提货人*/
  $(".new-name>a").click(function(e){
    e.preventDefault();
    if($(".new-lading").css("height")=="0px"){
      $(".new-lading").css({
        height:268,
        borderTop:"1px dotted #000"
      })
    }else{
        $(".new-lading").css({
        height:0,
        borderTop:"none"
      })
    }
  })
	var provse="";
	var wardenry="";
	var distinguish="";
  /***省市***/
  $.ajax({
	type:"get",
    url:"data/buy/provse.php",
    success:function(data){
    //$option=$("<option value="">-请选择-</option>");
		//console.log(data);
		var html="";
		for(var item of data){
			html+=`<option value="${item.sid}">${item.uname}</option>`;
		}
			$(".provse").append(html);
	},
	error:function(){
		alert("网络故障请检查！");
	}
  })
  /***点击省***/
	$(".provse").change(function(e){
		//console.log("jin");
    $(".wardenry").empty();
		var tar=$(e.target);
		if(tar.attr("value")!="-请选择省份-"){
			var sid=tar.val();
				//console.log(sid);
			provse=$(".provse option:selected").html();
			//console.log(provse);
			$.ajax({
				type:"get",
				url:"data/buy/clickprovse.php",
				data:{sid:sid},
				success:function(data){
					//console.log(data);
					var html="";
          $(".wardenry").html("<option value='-请选择城市-'>-请选择城市-</option>")
					for(var item of data){
						html+=`<option value="${item.tid}">${item.uname}</option>`
					}
						$(".wardenry").append(html);
				},
				error:function(){
					alert("网络故障请检查！");
				}
			})
		}
	})
  /***点击市***/
  $(".wardenry").change(function(e){
    $(".distinguish").empty();
    var tar=$(e.target);
    if(tar.attr("value")!="-请选择城市-"){
      var tid=tar.val();
	  wardenry=$(".wardenry option:selected").html();
      //console.log(wardenry);
      $.ajax({
        type:"get",
        url:"data/buy/clickwardenry.php",
        data:{tid:tid},
        success:function(data){
			//console.log(data);
          var html="";
          $(".distinguish").html("<option value='-请选择城市-'>-请选择城市-</option>")
					for(var item of data){
						html+=`<option value="${item.cid}">${item.uname}</option>`
					}
						$(".distinguish").append(html);
        },
        error:function(){
					alert("网络故障请检查！");
				}
      })
    }
  })
  /*点击区*/
  $(".distinguish").change(function(e){
	$(".minutely").empty();
    var tar=$(e.target);
    if(tar.attr("value")!="-请选择区域-"){
      var cid=tar.val();
	  distinguish=$(".distinguish option:selected").html();
      //console.log(cid);
      $.ajax({
        type:"get",
        url:"data/buy/clickdistinguish.php",
        data:{cid:cid},
        success:function(data){
			//console.log(data);
          var html="";
			for(var item of data){
				html+=`<div class="ischecked">
						<input type="radio"  name="minutely"/>
						<span>${provse}</span>
						<span>${wardenry}</span>
						<span>${distinguish}</span>
						<span>${item.uname}</span>
						<span>${item.phone}</span>
					</div>`;
			}
			$(".minutely").html(html);
        },
        error:function(){
			alert("网络故障请检查！");
		}
      })
    }
  })

  /*点击选择**/
 $(".choose>a").click(function(){
	 var s=false;
	 var inp="";
	 var input=$(".ischecked input");
	 for(var i=0;i<input.length;i++){
		 //console.log(input[i]);
		$(input[i]).prop("checked")&&(s=true,inp=$(input[i]));
	 }
		//console.log(inp);
		if(s){
			var html=inp.parent().text();
			$(".detail-address").html(html);
			$(".choice").hide();
		}else{
			alert("请选择地址")
		}
 })
 /**确定添加**/
 //console.log($("append>a"));
 $(".append>a").click(function(e){
	 e.preventDefault();
	 var nreg=/^[\u4e00-\u9fa5]{2,10}$/;
	 var preg=/^1[3|5|7|8|6]\d{9}$/;
	 if(!nreg.test($(".take-name>input").val().trim())){
		$(".err-name").css("display","inline-block");
		$(".take-name>input").focus();
		return;
	 }
	if(!preg.test($(".take-phone>input").val().trim())){
		 $(".err-phone").css("display","inline-block");
		$(".take-phone>input").focus();
		return;
	 }
	 var html="";
	 html+=`<div class="name-no1">
					<input type="radio" name="bill">
					<span >姓名：</span>
					<b class="compellation">${$(".take-name>input").val()}</b>
					<span >手机号：</span>
					<b class="compellation">${$(".take-phone>input").val()}</b>
				</div>`
	$(".name-phone").append(html);
	$(".take-name>input").val("");
	$(".take-phone>input").val("");
 })
 $(".take-name>input").on("input",function(){
	$(".err-name").css("display","none");
 })
 $(".take-phone>input").on("input",function(){
	$(".err-phone").css("display","none");
 })
	/*订单商品*/
 var lid=[],cid=[],count=[];
 var sum_money=0;
 var buy=location.search.slice(location.search.lastIndexOf("=")+1) //返回buy.html"
 if(buy!="shopping_cart.html"){
  /**取值*/
	   lid.push(location.search.split("&")[0].split("=")[1]);
	   cid.push(location.search.split("&")[1].split("=")[1]);
	   count.push(location.search.split("&")[2].split("=")[1]);
	 $.ajax({
		type:"get",
		url:"data/buy/petporoductbyid.php",
		data:{lid:lid[0],cid:cid[0]},
		success:function(data){
			//console.log(data);
			var {data,color}=data;
			//console.log(data,color);
			var html="";
			sum_money=(data.price*count[0]).toFixed(2);
			html+=`<div class="overall">
				<div class="product addp">
					<a href="product_details.html?lid=${lid[0]}&cid=${cid[0]}" class="img"><img src="${data.color}"></a>
					<div class="shopp">	
						<span class="desc">
							<a href="product_details.html?lid=${lid[0]}&cid=${cid}">${data.title}</a>
						</span>
						<p class="col">
							<span>规格：</span>
							<span class="color-desc">${data.spec}</span>
						</p>
						<p class="color-r">
							<span>颜色：</span>
							<img src="${color.color}" alt="">
						</p>
					</div>
				</div>
				<div class="price">¥${data.price}</div>
				<div class="count">${count}</div>
				<div class="subtotal">¥${(data.price*count).toFixed(2)}</div>
			</div>`;
			$(".order-detail").html(html);
			var html1="";
			html1+=`<span><b>商品总金额：</b><i>¥${(data.price*count).toFixed(2)}</i></span>
				<span><b>运费总计：</b><i>0</i></span>
				<span class="extended">总计：<i>¥${(data.price*count).toFixed(2)}</i></span>`
				$(".account").html(html1);
		},
		erorr:function(){
			alert("网络故障请检查!");
		}
	 })
 }
 if(buy=="shopping_cart.html"){
		$.ajax({
			type:"get",
			url:"data/buy/query.php",
			success:function(data){
				//console.log(data);
				var html="";
				var {data,shop}=data;
				//console.log(data,shop.lid);
				for(var item of data){
					//console.log(item[0]);
					for(var key of shop){
					if(item[0].bid==key.lid){
						sum_money+=item[0].price*key.count;
						lid.push(item[0].bid);
						cid.push(key.cid);
						count.push(key.count);
						html+=`<div class="overall">
				    <div class="product addp">
					<a href="product_details.html?lid=${item[0].bid}" class="img"><img src="${item[0].color}"></a>
					<div class="shopp">	
						<span class="desc">
							<a href="product_details.html?lid=${item[0].bid}">${item[0].title}</a>
						</span>
						<p class="col">
							<span>规格：</span>
							<span class="color-desc">${item[0].spec}</span>
						</p>
						<p class="color-r">
							<span>颜色：</span>
							<img src="${key.color}" alt="">
						</p>
					</div>
				</div>
				<div class="price">¥${item[0].price}</div>
            <div class="count">${key.count}</div>
            <div class="subtotal">¥${(item[0].price*key.count).toFixed(2)}</div>
			</div>`;
					}
					}
				}
				$(".order-detail").html(html);
				var html1="";
			html1+=`<span><b>商品总金额：</b><i>¥${sum_money.toFixed(2)}</i></span>
				<span><b>运费总计：</b><i>0</i></span>
				<span class="extended">总计：<i>¥${sum_money.toFixed(2)}</i></span>`
				$(".account").html(html1);
			},
			erorr:function(){
				alert("网络故障请检查！");
			}
		})
 }
//console.log(lid,count,cid);
var leh=0;
var ss=0;
function add(lid,cid,date,ddh,address,uname,uphone,ps_time,pay_way,count){
		var newTab=window.open("");
		$.ajax({
		type:"get",
		url:"data/buy/insert.php",
		data:{lid:lid,cid:cid,receiver:uname,address:address,cellphone:uphone,ps_time:ps_time,pay_way:pay_way,number:ddh,time:date,count:count},
		success:function(data){
			//console.log(data);
			if(ss===leh){
				if(data.code>0){
					newTab.location.href="indent.html?ddh="+ddh+"&uname="+uname+"&uphone="+uphone+"&address="+address+"&sum_money="+sum_money;
					 console.log("尽");
						//location="indent.html?ddh="+ddh+"&uname="+uname+"&uphone="+uphone+"&address="+address+"&sum_money="+sum_money;
				}else{
					alert(data.msg);
				}
			}
		},
		erorr:function(data){
			alert("网络故障请检查！")
		},
	})
}

/*提交订单**/
//var che=false;var inp="";

$("#btn").click(function(e){
	e.preventDefault();
	var che=false;var inp="";
	var sj_che=false, sj_inp="";
	var nameNo1=$(".name-no1>input");
	var elect=$(".time-elect>p input");
	//console.log($(".detail-address").html());
	if($(".detail-address").html()==""){
		alert("请选择配送地址");
		window.scrollTo(0,200);
		$(".choice").fadeIn(700);
		return;
	}
	//console.log(nameNo1);
	for(var i=0; i<nameNo1.length;i++){
		$(nameNo1[i]).prop("checked")&&(che=true,inp=$(nameNo1[i]));
	}
	if(!che){
		alert("请选择提货人");
		window.scrollTo(0,550);
		return;
	}
	for(var i=0;i<elect.length;i++){
		$(elect[i]).prop("checked")&&(sj_che=true,sj_inp=$(elect[i]));
	}
	var Hours=new Date().getHours();
	var Minutes=new Date().getMinutes();
	var Seconds=new Date().getSeconds();
	var date=new Date().toLocaleDateString()+" "+Hours+":"+Minutes+":"+Seconds;
	var ddh=new Date().getTime()+parseInt(Math.random()*1000+1);
	var address=$(".detail-address").text();
	var uname=inp.next().next().html();
	var uphone=inp.parent().children().last().html();
	var ps_time=sj_inp.parent().text();
	var pay_way=$(".alipay").text();
	//console.log(date,ddh,address,uname,uphone,ps_time,pay_way,lid,cid,count);
	//console.log(date);
	 leh=lid.length;
	for(var i=0;i<lid.length;i++ ){
		for(var j=0;j<cid.length;j++){
			for(var b=0;b<count.length;b++){
				if(i==j&&i==b){
					ss+=1;
					//console.log(i,j,b);
					//console.log(lid[i],cid[j],count[b]);
					add(lid[i],cid[j],date,ddh,address,uname,uphone,ps_time,pay_way,count[b]);
				}
			}
		}
	}
})
});

