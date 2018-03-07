<?php
header("Content-Type:application/json");
require_once("../init.php");
@$uname=$_REQUEST["uname"];@$upwd=$_REQUEST["upwd"];
@$yzm=$_REQUEST["yzm"];
if($uname&&$upwd&&$yzm){
  $sql="select uid from ld_user where uname='$uname' and binary upwd='$upwd'";
  $row=mysqli_fetch_row(mysqli_query($conn,$sql));
	session_start();
	$yzmm=$_SESSION["captcha"];
	if(strtolower($yzm)!=strtolower($yzmm)){
		echo '{"ok":-1}';
		exit;
	}
  if($row){
    $_SESSION["uid"]=$row[0];
    //var_dump($_SESSION["captcha"]);
    echo json_encode(["ok"=>1]);
  }else
    echo json_encode(["ok"=>0,"msg"=>"用户名或密码错误"]);
}