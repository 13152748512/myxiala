<?php
header("Content-Type:application/json");
require_once("../init.php");
@$lid=$_REQUEST["lid"];
@$cid=$_REQUEST["cid"];
$output=[];
if($lid){
    $sql="select * from ld_blke where bid=$lid";
    $output["product_info"]=mysqli_fetch_all(mysqli_query($conn,$sql),1)[0];
	//var_dump($output);
    $fid=$output["product_info"]["fid"];
    $sql="select bid, spec from ld_blke where fid=$fid";
    $output["specs"]=mysqli_fetch_all(mysqli_query($conn,$sql),1);
	$sql="select cid,fid,color from ld_color where fid=$fid";
	$output["color"]=mysqli_fetch_all(mysqli_query($conn,$sql),1);
	//var_dump($output["color"]);
	if(!$cid){
		$cid=$output["color"][0]["cid"];
	}
	//var_dump($cid);
	$sql="select * from ld_blke_pic where cid=$cid";
    $output["icon_list"]=mysqli_fetch_all(mysqli_query($conn,$sql),1);
    echo json_encode($output);
}