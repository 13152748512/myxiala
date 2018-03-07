<?php
header("Content-Type:application/json");
require("../init.php");
@$lid=$_REQUEST["lid"];                 //产品编号
@$cid=$_REQUEST["cid"];                 //产品颜色
@$receiver=$_REQUEST["receiver"];       //接收人姓名
@$address=$_REQUEST["address"];         //详细地址
@$cellphone=$_REQUEST["cellphone"];     //手机号
@$ps_time=$_REQUEST["ps_time"];         //配送时间
@$pay_way=$_REQUEST["pay_way"];         //支付方式
@$number=$_REQUEST["number"];           //订单编号
@$time=$_REQUEST["time"];               //下单时间
@$count=$_REQUEST["count"];             //产品数量
session_start();
@$uid=$_SESSION["uid"];
//var_dump($lid);
if($lid&&$cid&&$receiver&&$address&&$cellphone&&$ps_time&&$pay_way&&$number&&$time&&$count&&$uid){
	$sql="INSERT INTO ld_order_detail VALUES(null,'$uid','$lid','$cid','$receiver','$address','$cellphone','$ps_time','$pay_way','$number','$time','$count')";
	$result=mysqli_query($conn,$sql);
	//var_dump($result);
	if($result){
		echo json_encode(["code"=>1,"msg"=>"提交订单成功"]);
	}else{
		echo json_encode(["code"=>-1,"msg"=>"提交订单失败"]);
	}
}else{
	echo json_encode(["code"=>-1,"msg"=>"提交订单失败"]);
}




