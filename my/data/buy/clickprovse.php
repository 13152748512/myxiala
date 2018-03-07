<?php
header("Content-Type:application/json");
require("../init.php");
@$sid=$_REQUEST["sid"];
if($sid){
	$sql="select tid,uname from ld_town where sid='$sid'";
	$result=mysqli_query($conn,$sql);
	$rows=mysqli_fetch_all($result,1);
	echo json_encode($rows);
}