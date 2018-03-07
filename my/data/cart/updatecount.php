<?php
require("../init.php");
@$lid=$_REQUEST["lid"];
@$count=$_REQUEST["count"];
if($lid&&$count){
	$sql="UPDATE ld_shoppingcart_item set count='$count' WHERE lid='$lid'";
	mysqli_query($conn,$sql);
}