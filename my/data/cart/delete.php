<?php
require("../init.php");
@$iid=$_REQUEST["iid"];
if($iid){
	$sql="delete from ld_shoppingcart_item where iid='$iid'";
	mysqli_query($conn,$sql);
}else{
		session_start();
		$uid=$_SESSION["uid"];
		$sql="delete from ld_shoppingcart_item where uid='$uid'";
		mysqli_query($conn,$sql);
}
