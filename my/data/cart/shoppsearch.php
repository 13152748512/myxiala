<?php
header("Content-Type:application/json");
require("../init.php");
$name=$_REQUEST["name"];
if(!$name){
	$name="";
}
