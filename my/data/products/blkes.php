<?php
header("Content-Type:application/json");
require_once("../init.php");
$sql="SELECT fid,fname FROM ld_blke_family";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
echo json_encode($rows);