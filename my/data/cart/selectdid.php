<?php
header("Content-Type:application/json");
require_once("../init.php");
@$lid=$_REQUEST["lid"];
//var_dump($lid);
$sql="select b.bid,b.fid,b.title,b.price,b.spec,b.color,c.cid,c.color AS c from ld_blke b,ld_color c where  b.fid=c.fid   and bid='$lid'";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
//var_dump($rows);
echo json_encode($rows);