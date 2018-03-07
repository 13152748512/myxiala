<?php
require("../init.php");
@$checked=$_REQUEST["checked"];
session_start();
$uid=$_SESSION["uid"];
if($checked!=null){
 $sql="update ld_shoppingcart_item set is_checked=$checked where uid=$uid";
	 mysqli_query($conn,$sql);
}