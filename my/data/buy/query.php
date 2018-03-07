<?php
header("Content-Type:application/json");
require("../init.php");
$rrw=[];
session_start();
@$uid=$_SESSION["uid"];;
$sql="select s.lid,s.count,s.cid,c.color from ld_shoppingcart_item s,ld_color c where uid='$uid' and is_checked='1' and s.cid=c.cid";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
for($i=0;$i<count($rows);$i++){
	$lid=$rows[$i]['lid'];
	$sql="select bid,title,price,spec,color from ld_blke where bid='$lid'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_all($result,1);
	array_push($rrw,$row);
}
	//var_dump($rrw);	
	$output=[
		"data"=>$rrw,
		"shop"=>$rows
	];

echo json_encode($output);