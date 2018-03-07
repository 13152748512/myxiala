<?php
	header("Content-Type:application/json");
	require_once("../init.php");
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="SELECT uid,lid,count FROM ld_shoppingcart_item WHERE uid=$uid";
		$result=mysqli_query($conn,$sql);
		$rows=mysqli_fetch_all($result,1);
			echo json_encode($rows);
	}else{
		echo '{"ok":-1}';
	}
	