<?php
header("Content-Type:application/json");
require("../init.php");
@$cid=$_REQUEST["cid"];
if($cid){
	$sql="select aid,uname,phone from ld_amply where cid='$cid'";
	$result=mysqli_query($conn,$sql);
	$rows=mysqli_fetch_all($result,1);
	echo json_encode($rows);
}