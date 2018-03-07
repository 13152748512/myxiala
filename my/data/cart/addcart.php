<?php
require_once("../init.php");
@$bid=$_REQUEST["lid"];
@$cid=$_REQUEST["cid"];
@$count=$_REQUEST["count"];
if(!$count){
	$count=1;
}
session_start();
@$uid=$_SESSION["uid"];
if($bid&&$count&&$uid&&$cid){
	$sql="SELECT * from ld_shoppingcart_item WHERE lid=$bid and uid='$uid' and cid='$cid'";
	$result=mysqli_query($conn,$sql);
	if(!mysqli_fetch_row($result)){
		$sql="INSERT INTO ld_shoppingcart_item values (null,$uid,$bid,$cid,$count,1)";
	}else{
		$sql="UPDATE ld_shoppingcart_item set count=count+$count WHERE lid=$bid and uid='$uid' and cid='$cid'";
	}
	mysqli_query($conn,$sql);
	echo '{"ok":1,"msg":"加入购物车成功"}';
}else{
	echo '{"ok":1,"msg":"加入购物车失败"}';
}