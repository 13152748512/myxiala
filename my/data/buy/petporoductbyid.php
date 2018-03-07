<?php
header("Content-Type:application/json");
require("../init.php");
@$lid=$_REQUEST["lid"];
@$cid=$_REQUEST["cid"];
$goods=[];
if($lid&&$cid){
	$sql="select title,price,spec,color from ld_blke where bid='$lid'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_all($result,1)[0];
	$sql="select color from ld_color where cid='$cid'";
	$result=mysqli_query($conn,$sql);
	$color=mysqli_fetch_all($result,1)[0];
	$goods=[
		'data'=>$row,
		'color'=>$color
	];		
	echo json_encode($goods);
}