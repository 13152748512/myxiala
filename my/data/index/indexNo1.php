<?php
header("Content-Type:application/json");
require_once("../init.php");
$sql="select * from ld_index_noyi  where seq_recommended!=0 order by seq_recommended";
$result=mysqli_query($conn,$sql);
$output['indexNo1']=mysqli_fetch_all($result,1);

$sql="select * from ld_index_noer where seq_recommended!=0 order by seq_recommended";
$result=mysqli_query($conn,$sql);
$output['indexNo2']=mysqli_fetch_all($result,1);

$sql="select * from ld_index_nosan where seq_recommended!=0 order by seq_recommended";
$result=mysqli_query($conn,$sql);
$output['indexNo3']=mysqli_fetch_all($result,1);
echo json_encode($output);