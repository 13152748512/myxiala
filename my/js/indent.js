$(()=>{
	var ddh=location.search.split("&")[0].split("=")[1];
	var uname=location.search.split("&")[1].split("=")[1];
	var uphone=location.search.split("&")[2].split("=")[1];
	var address=location.search.split("&")[3].split("=")[1];
	var sum_money=location.search.split("&")[4].split("=")[1];
	var line_item=document.getElementById("line_item");
	//console.log(ddh,uname,uphone,address,sum_money);
	//console.log(decodeURI(uname));
	$(".myddh").html("订单号："+ddh);
	$(".myname").html(decodeURI(uname));
	$(".myphone").html(uphone);
	$(".myaddress").html(decodeURI(address));
	$(".myrmb").html("¥"+sum_money);
	line_item.onclick=function(e){
		e.preventDefault();
		location="order.html";
	}
});