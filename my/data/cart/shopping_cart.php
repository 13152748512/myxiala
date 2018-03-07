<?php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
$uid=$_SESSION["uid"];
//$ror=array();
$ror=[];
if($uid){
	$sql="SELECT s.iid,s.uid,s.lid,s.cid,s.count,s.is_checked,c.color FROM ld_shoppingcart_item s,ld_color c WHERE s.cid=c.cid  and uid='$uid'";
	$result=mysqli_query($conn,$sql);
	$rows=mysqli_fetch_all($result,1);
	if(count($rows)!=0){;
		for($i=0;$i<count($rows);$i++){
			$lid=$rows[$i]["lid"];
			$sql="SELECT bid,title,price,spec,color FROM ld_blke WHERE bid='$lid'";
			$result=mysqli_query($conn,$sql);
			$row=mysqli_fetch_all($result,1);
			$ror[]=$row;
		}
			//var_dump($ror);
		$output=[
			"data"=>$ror,
			"shop"=>$rows
		];
		echo json_encode($output);
	}else{
		echo '{"code":-1}';
	}

	//var_dump($lid);

}