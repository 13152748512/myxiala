<?php
	header("Content-Type:application/json");
	require_once("../init.php");
	$sql="SELECT bid,title,price,color FROM	ld_blke WHERE	is_onsale=1";
	$result=mysqli_query($conn,$sql);
	$rows=mysqli_fetch_all($result,1);
	echo json_encode($rows);