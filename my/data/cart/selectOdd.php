<?php
require("../init.php");
@$checked=$_REQUEST["checked"];
@$iid=$_REQUEST["iid"];
if($checked!=null&&$iid!=null){
	//var_dump($checked);
	//var_dump($iid);
	$sql="UPDATE ld_shoppingcart_item SET is_checked='$checked' WHERE iid='$iid'";
	mysqli_query($conn,$sql);
}