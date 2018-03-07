<?php
header("Content-Type:application/json");
require("../init.php");
$vehicle=[];
$sql="select bid,fid,title,price,color from ld_blke where fid=1 Limit 8";
$mountain_bike=mysqli_fetch_all(mysqli_query($conn,$sql),1);
//echo json_encode($mountain_bike);
$sql="select bid,fid,title,price,color from ld_blke where fid=2 Limit 8";
$walking=mysqli_fetch_all(mysqli_query($conn,$sql),1);

$sql="select bid,fid,title,price,color from ld_blke where fid=3 Limit 8";
$tire_car=mysqli_fetch_all(mysqli_query($conn,$sql),1);

$sql="select bid,fid,title,price,color from ld_blke where fid=4 Limit 8";
$city=mysqli_fetch_all(mysqli_query($conn,$sql),1);

$sql="select bid,fid,title,price,color from ld_blke where fid=5 Limit 8";
$road_bicycle=mysqli_fetch_all(mysqli_query($conn,$sql),1);

$sql="select bid,fid,title,price,color from ld_blke where fid=6 Limit 8";
$Teenagers=mysqli_fetch_all(mysqli_query($conn,$sql),1);
$vehicle=[
	'mountain_bike'=>$mountain_bike,
	'walking'=>$walking,
	'tire_car'=>$tire_car,
	'city'=>$city,
	'road_bicycle'=>$road_bicycle,
	'Teenagers'=>$Teenagers
];
echo json_encode($vehicle);