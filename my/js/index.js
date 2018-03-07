/*banner轮播*/
$(()=>{
	const LIWIDTH=screen.availWidth;
	//console.log(LIWIDTH);
	$.get("data/index/getCarousel.php").then(data=>{
		var html="";
		for(var img of data){
			html+=`<li>
              <a href="${img.href}" title="${img.title}">
                <img src="${img.img}">
              </a>
            </li>`;
		}
		html+=`<li>
              <a href="${data[0].href}" title="${data[0].title}">
                <img src="${data[0].img}">
              </a>
            </li>`;
		$ul=$(".shutter-img>ul");
		$ul.html(html).css("width",LIWIDTH*(data.length+1));
		$(".shutter-img>ul>li>a").css("width",LIWIDTH);
		var $ids=$(".indicators");
		$ids.html("<li></li>".repeat(data.length)).children().first().addClass("hover");
		const WAIT=5000,DURA=1200;
		 var moved=0,timer=null;
		 function move(ids=1){
			 //console.log(moved);
			 moved+=ids;
       $ul.animate({
         left:-LIWIDTH*moved
       },DURA,()=>{
          if(moved===data.length){
            $ul.css("left",0);
            moved=0;
          }
		  $ids.children(":eq("+moved+")").addClass("hover").siblings().removeClass("hover");
		 })
		}
		  var timer=setInterval(move,WAIT);
		$(".banner-img").hover(
		  ()=>{
			 clearInterval(timer);
			 timer=null;
		   },  
		  ()=>{
			 timer=setInterval(move,WAIT);
		   }
		 )
		$(".shutter-btn>.prev").click(()=>{
			if(!$ul.is(":animated"))
				move();
		 });
		 $(".shutter-btn>.next").click(()=>{
		   if(!$ul.is(":animated")){
			if(moved==0){
			  $ul.css("left",-LIWIDTH*data.length);
			  moved=data.length;
			}
			move(-1);
		   }
		 })
		$ids.on("mouseover","li",function(){
			var $li=$(this);
			var i=$li.index();
			moved=i;
			$ul.stop(true).animate({
			  left:-LIWIDTH*moved
			},DURA,()=>{
				$ids.children(":eq("+i+")").addClass("hover").siblings().removeClass("hover");
			})
		});
	})
})

/// /秒杀倒计时
$(()=>{
	function task(){
		var span=document.querySelector(".ms-show span.rt");
		var data=new Date();
		var jiesu=new Date("2018/2/16");
		var s=parseInt((jiesu-data)/1000);
		var d=parseInt(s/3600/24);
		var h=parseInt(s%(3600*24)/3600);
		var m=parseInt(s%3600/60);
		var s=s%60;
		span.innerHTML=`距结束还有：
	<b>${d}</b>天<b>${h}</b>时<b>${m}</b>分<b>${s}</b>秒`
	}
	task();
	setInterval(task,1000);
})

//倒计时滚动
$(()=>{
	$.ajax({
		type:"get",
		url:"data/index/indexseckill.php",
		success:function(data){
			//console.log(data);
			var html="";
			var html1="";
			for(var i=0;i<data.length;i++){
				html+=`<a href="product_details.html?lid=${data[i].bid}">
                          <img src="${data[i].color}">
                          <h4><span>限时秒杀：</span> ${data[i].title}</h4>
                          <p>¥ ${data[i].price}</p>
                      </a>`;
				if(i<4){
					html1+=`<a href="product_details.html?lid=${data[i].bid}">
                          <img src="${data[i].color}">
                          <h4><span>限时秒杀：</span> ${data[i].title}</h4>
                          <p>¥ ${data[i].price}</p>
                      </a>`
				}
				var $luobo= $("[data-load=bannerImgs]");
				$luobo.html(html+html1)
				$luobo.css("width",(data.length+4)*283);

			}
		},
		erorr:function(){
			alert("网络故障请检查!")
		}
	})
	const LIWIDH=283,WAIT=4000,DURA=1000;
	var moved=0,timer=null;
	$luobo=$("[data-load=bannerImgs]");
    $banner=$(".ms-banner");
	//console.log($luobo);
	function move(ids=1){
		//console.log(moved);
		moved=moved+ids;
		$luobo.animate({
			left:-LIWIDH*moved
		},DURA,function(){
				if(moved*LIWIDH==($luobo.children().length-4)*LIWIDH){
					$luobo.css("left",0);
					moved=0;
				}
			})
	}
	 var timer=setInterval(move,WAIT);
    $banner.hover(
      ()=>{
         clearInterval(timer);
         timer=null;
       },  
      ()=>{
         timer=setInterval(move,WAIT);
       }
     )
	  $("[data-move=right]").click(()=>{
	         if(!$luobo.is(":animated"))
	             move();
	      });
	      $("[data-move=left]").click(()=>{
	        if(!$luobo.is(":animated")){
	         if(moved==0){
	           $luobo.css("left",-LIWIDH*($luobo.children().length-4));
	           moved=$luobo.children().length-4;
	         }
	         move(-1);
	        }
     })
})

//动态加载数据
$(()=>{
	$.ajax({
		type:"get",
		url:"data/index/exercise.php",
		success:function(data){
			//console.log(data);
			var {mountain_bike,walking,tire_car,city,road_bicycle,Teenagers}=data;
			//console.log(Teenagers)//,walking,tire_car,city,road_bicycle,Teenagers);
			//山地车
			var html="";
			for(var item of mountain_bike){
				//console.log(item);
				 html+=`<dl>
						  <a href="product_details.html?lid=${item.bid}">
							<dt><img src="${item.color}" alt=""></dt>
							<dd>${item.title}</dd>
							<dd><span>¥${item.price}</span></dd>
							<dd>源自美利达山地车</dd>							
						  </a>
						</dl>`; 
			}
			$(".pans>ul").html(html);
			//通勤代步
			var html1="";
			for(var item of walking){
				//console.log(item);
				 html1+=`<dl>
						  <a href="product_details.html?lid=${item.bid}">
							<dt><img src="${item.color}" alt=""></dt>
							<dd>${item.title}</dd>
							<dd><span>¥${item.price}</span></dd>
							<dd>源自美利达通勤代步车</dd>							
						  </a>
						</dl>`; 
			}
			$(".knife>ul").html(html1);
			//胖台车
			var html2="";
			for(var item of tire_car){
				//console.log(item);
				 html2+=`<dl>
						  <a href="product_details.html?lid=${item.bid}">
							<dt><img src="${item.color}" alt=""></dt>
							<dd>${item.title}</dd>
							<dd><span>¥${item.price}</span></dd>
							<dd>源自美利达通勤代步车</dd>							
						  </a>
						</dl>`; 
			}
			$(".kitchen>ul").html(html2);
			//城市休闲
			var html3="";
			for(var item of city){
				//console.log(item);
				 html3+=`<dl>
						  <a href="product_details.html?lid=${item.bid}">
							<dt><img src="${item.color}" alt=""></dt>
							<dd>${item.title}</dd>
							<dd><span>¥${item.price}</span></dd>
							<dd>源自美利达通勤代步车</dd>							
						  </a>
						</dl>`; 
			}
			$(".credenza>ul").html(html3);
			//公路车
			var html4="";
			for(var item of road_bicycle){
				//console.log(item);
				 html4+=`<dl>
						  <a href="product_details.html?lid=${item.bid}">
							<dt><img src="${item.color}" alt=""></dt>
							<dd>${item.title}</dd>
							<dd><span>¥${item.price}</span></dd>
							<dd>源自美利达通勤代步车</dd>							
						  </a>
						</dl>`; 
			}
			$(".bottle>ul").html(html4);
			//青少年
			var html5="";
			for(var item of Teenagers){
				//console.log(item);
				 html5+=`<dl>
						  <a href="product_details.html?lid=${item.bid}">
							<dt><img src="${item.color}" alt=""></dt>
							<dd>${item.title}</dd>
							<dd><span>¥${item.price}</span></dd>
							<dd>源自美利达通勤代步车</dd>							
						  </a>
						</dl>`; 
			}
			$(".teaSet>ul").html(html5);
		},
		error:function(){
			alert("网络错误请检查！");
		}
	})
})

/*动态加载一楼，二楼，三楼**/
var dd=[];
var topdl=[];
$(()=>{
	$.ajax({
		type:"get",
		url:"data/index/indexNo1.php",
		success:function(data){
			//console.log(data);	
			var html="";
			var html1="";
			var html2="";
			var html3="";
			var {indexNo1,indexNo2,indexNo3}=data;
			for(var key of indexNo1){
				html+=`<div>
				   <dl>
					  <dt>
						<a href="${key.href}"><img src="${key.img}"></a>
					  </dt>
					  <dd>
						<a href="javascript:;">${key.title}</a>
					  </dd>
					  <dd>
						<span>￥：${key.price}</span>
					  </dd>
					</dl>
				</div>`;
				html1+=` <div><dl>
              <dt>
                <a href="${key.href}">${key.title}</a>
              </dt>
              <dd>
                <p>
                  <span>速别：</span>
                  <b>${key.sb}</b>
                </p>
                <p>
                  <span>车架：</span>
                  <b>${key.carriage}</b>
                </p>
              </dd>
              <dd>
                <a href="${key.href}">查看详细</a>
				<a href="#" id="addshopp">加入购物车</a>
              </dd>
            </dl></div>`
			}
				$(".top1").html(html);
				$(".bottom2").html(html1);
			for(var item of indexNo2){
				html2+=`<dl>
				<dt>
				  <a href="${item.href}"><img src="${item.img}"></a>
				</dt>
				<dd>
				  <a href="${item.href}">${item.title}</a>
				</dd>
				<dd>
				  <span>￥：${item.price}</span>
				</dd>
			  </dl>`
			}
			$(".rssp").html(html2);

			for(var bbd of indexNo3){
				html3+=`<dl>
				<dt>
				  <a href="${bbd.href}"><img src="${bbd.img}"></a>
				</dt>
				<dd>
				  <a href="${bbd.href}">${bbd.title}</a>
				</dd>
				<dd>
				  <span>￥：${bbd.price}</span>
				</dd>
			  </dl>`
			}
			$(".cssp").html(html3);
			topdl=$(".top1 div");
			dd=$(".bottom2 div");
		 //console.log(dd);
		},
		erorr:function(){
			alert("网络故障请检查！");
		}
	})
})

//自行车换图
$(()=>{
	var a1=document.querySelectorAll("div.imgs  a.show");
	 //console.log(a1[0]);
	function taskqq(){
		//查找id为slider下的class为show的img
		var a1=document.querySelector("div.imgs  a.show");
		//清除img的class
		var a1=document.querySelector("div.imgs  a.show");
		a1.className="";
		//如果img的下一个元素不为null
		if(a1.nextElementSibling!=null){
			//设置img的下一个兄弟元素的class为show
			a1.nextElementSibling.className="show";
		}else{//否则
			//设置id为slider下的第一个子元素的class为show
			document.querySelector("div.imgs>:first-child").className="show";
		}
	}
	var timer=setInterval(taskqq,5000);
	var imgss=document.querySelector("div.imgs");
	imgss.onmouseover=function(){
		clearInterval(timer);
		timer=null;
	}
	imgss.onmouseout=function(){
		timer=setInterval(taskqq,5000);
	}
})

//爱源于运动
$(()=>{
	var LIWIDTH=110;
	var divs=document.querySelectorAll(".contents div.content");
	//console.log(divs);
	$(".f4tabs").mouseover(e=>{
		$tar=$(e.target);
		//console.log($tar);
		if( $tar.is("img")||$tar.is("a") ){		  //加入并列条件	||$tar.is("img")												
			var i=$tar.parent().index(); 
			//console.log(i);
			$(".box").css("left",LIWIDTH*i);
						
			//console.log(divs);
			for(var j=0;j<divs.length;j++){
				//console.log(j);				
				if(i==j){
				//console.log(111111111);
				$div=$(divs[j]);
				$div.siblings().css("z-index","");
				$div.css("z-index","10");
				}

			}

		}
	});
})

//楼层滚动
$(()=>{
   var $lift=$("#lift");
   //console.log($lift);
	//为window绑定事件
	$(window).scroll(()=>{
		var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
		//console.log(scrollTop);
		var $ms=$("#ms");
		//console.log($cont);
		var offsetTop=$ms.offset().top;
		//console.log(offsetTop);
    //console.log(scrollTop+innerHeight/2);
		if(offsetTop<scrollTop+innerHeight/4){
			$lift.fadeIn(500);
			//console.log("进入");
		}else{
			$lift.fadeOut(500);
			//console.log("出去");
		}
		$floors=$(".floor");
		$floors.each((i,elem)=>{
			var $f=$(elem);
			//console.log($f,i);
			if($f.offset().top<scrollTop+innerHeight/4)
				$("#lift>ul").find(".lift_item:eq("+i+")").addClass("hover").siblings().removeClass("hover");
		})
	})
	$lift.children("ul").on("click","li:not(:last-child)",function(e){	
      var $li=$(this);
      e.preventDefault();
			var i=$li.index();
			var $fi=$(".floor:eq("+i+")");
		 // console.log($fi.offset().top)
			var offsetTop=$fi.offset().top;
			$("html,body").animate({
				scrollTop:offsetTop-100,
				//documentDocumentElementScrollTop:offsetTop-65
			},500)
		})
})

//返回顶部
$(function(){
  var totop=document.getElementById("roof");
  var timer;
  function to(){
    var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    return function(){
      scrollTop-=48;
      if(scrollTop<0){
        clearInterval(timer);
        timer=null;
      }
      window.scrollTo(0,scrollTop);
    }
  }
  totop.onclick=function(){
    var too=to();
    timer=setInterval(too,10);
  }
});

//车身商品2D转动
$(()=>{
  
  //鼠标移入事件
  $(".top1").on("mouseover","div",function(){
    $this=$(this);
	//console.log(dd);
    var i=$this.index();
      //console.log(dd);
    for(var j=0; j<dd.length;j++){
      if(i==j){
        $this.children().css({transform:'rotateY(-180deg)'});
        $(dd[j]).children().css({transform:'rotateY(0deg)'});
		setTimeout(()=>{$this.css({zIndex:-1});},300); 
      }
    }
  })
    
  //鼠标移出事件
  //console.log(topdl)
  $(".bottom2").on("mouseout","div",function(){
     console.log("jin");
    //console.log("bottom2");
	//console.log(e.targret);
    $this=$(this);
    var i=$this.index();
      //console.log($this);
    for(var j=0; j<topdl.length;j++){
      if(i==j){
        //console.log(i,j);
        //console.log($this.children())
        $this.children().css({transform:'rotateY(-180deg)'});
		//$this.css("zIndex",8);
        $(topdl[j]).children().css({transform:'rotateY(0deg)'});
		function zd(bb){
			$(topdl[j]).css({zIndex:8});
			//console.log($(topdl[j]))
		}
		setTimeout(zd($(topdl[j])),50);
      }
    }
  })
})