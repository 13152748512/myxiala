<?php
header("Content-Type:application/json");
require("../init.php");
$sql="select sid,uname from ld_province";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
echo json_encode($rows);