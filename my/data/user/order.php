<?php
header("Content-Type:application/json");
require("../init.php");
@$pno=$_REQUEST["pno"];
if(!$pno){
	$pno=1;
}
session_start();
$uid=$_SESSION['uid'];
if($uid){
	$sql="SELECT uname FROM ld_user where uid='$uid'";
	$ouput['uname']=mysqli_fetch_row(mysqli_query($conn,$sql));
	$pagesize=5;
	$offset=($pno-1)*$pagesize;
	$sql="select d.uid,d.lid,d.cid,d.receiver,d.address,d.cellphone,d.ps_time,d.pay_way,d.number,d.time,d.count,c.color, b.title,b.price from ld_order_detail d,ld_color c,ld_blke b where d.uid='$uid' and d.cid=c.cid and b.bid=d.lid LIMIT $offset,$pagesize";
	 $ouput['data']=mysqli_fetch_all(mysqli_query($conn,$sql),1);
	$sql="select count(*) AS c from ld_order_detail where uid='$uid'";
	$result = mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$ouput['totalrecode']=$row["c"];
	$sql = "SELECT count(*) AS B  from ld_order_detail where uid='$uid'";
	$result = mysqli_query($conn,$sql);
	$ouput['zongs']=mysqli_fetch_assoc($result)["B"];
	$ouput['pagecount']=ceil($row["c"]/$pagesize);
	$ouput['pno']=$pno;
	 echo json_encode($ouput);
}