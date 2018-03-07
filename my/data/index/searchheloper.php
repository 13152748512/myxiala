<?php
header("Content-Type:application/json");
require_once("../init.php");
@$term=$_REQUEST["term"];
if($term){
  $sql=
    "select bid,title,sold_count from ld_blke ";
  $kws=explode(" ",$term);
  for($i=0;$i<count($kws);$i++){
    $kws[$i]=" title like '%$kws[$i]%' ";
  }
  $where=" where ".implode(" and ",$kws);
  $sql.=$where." order by sold_count desc limit 10";
  echo json_encode(
    mysqli_fetch_all(mysqli_query($conn,$sql),1)
  );
}