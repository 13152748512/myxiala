<?php
header("Content-Type:application/json");
require("../init.php");
$sql="select bid,title,price,color from ld_blke where is_onsale=1";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
echo json_encode($rows);