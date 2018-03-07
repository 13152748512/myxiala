<?php
header("Content-Type:application/json");
require_once("../init.php");
$sql="select * from ld_index_carousel";
echo json_encode(mysqli_fetch_all(mysqli_query($conn,$sql),1));