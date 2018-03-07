<?php
header("Content-Type:application/json");
require_once("../init.php");
@$n=$_REQUEST["uname"];
if($n===null||$n===""){
	die("uname required");
}
@$p=$_REQUEST["upwd"];
if($p===null||$p===""){
	die("upwd required");
}
@$i=$_REQUEST["iphone"];
if($i===null||$i===""){
	die("iphone required");
}
@$e=$_REQUEST["Email"];
if($e===null||$e===""){
	die("Email required");
}
$sql="INSERT INTO ld_user(uname,upwd,email,phone) VALUES('$n','$p','$e','$i')";
$result=mysqli_query($conn,$sql);
if($result===false){
	echo json_encode(["ok"=>0,"msg"=>"注册失败"]);
}else{
	echo json_encode(["ok"=>1]);
}