<?php
header("Content-Type:application/json");
require("../init.php");
@$tid=$_REQUEST["tid"];
if($tid){
	$sql="select cid,uname from ld_classify where tid='$tid'";
	$result=mysqli_query($conn,$sql);
	$rows=mysqli_fetch_all($result,1);
	echo json_encode($rows);
}