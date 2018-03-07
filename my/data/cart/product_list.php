<?php
//获取用户参数（页码）
//返回一组数据（pno当前页码 pagesize当前页记录数 pagecount总页数 totalrecode 总记录数 data 当前页内容）
header("Content-Type:application/json");
require("../init.php");
@$pno=$_REQUEST["pno"];
@$fid=$_REQUEST["fid"];
if($fid=="undefined"){
	$fid="";
	//var_dump($fid);
}
if(!$pno){
	$pno=1;
}
//当前页显示记录数
if($fid){
	$sql="SELECT count(*) FROM ld_blke WHERE fid=$fid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	$pagesize=intval($row[0]);
	//var_dump($pagesize);	
	$pagesize=$pagesize>15?15:$pagesize;
}else{
	$pagesize=15;
} 
$offset=($pno-1)*$pagesize;         //偏移量
if(!$fid){
	$sql="SELECT bid,title,price,sold_count,appraise,color FROM ld_blke  LIMIT $offset,$pagesize";
}else{
	$sql="SELECT bid,title,price,sold_count,appraise,color FROM ld_blke WHERE fid=$fid LIMIT $offset,$pagesize";
}
$result=mysqli_query($conn,$sql);
if(mysqli_error($conn)){
  echo mysqli_error($conn);
}
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
//创建sql语句 获取总记录数
if(!$fid){
	$sql="SELECT count(*) AS c FROM ld_blke";
}else{
	$sql="SELECT count(*) AS c FROM ld_blke WHERE fid=$fid";
}
$result = mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$totalrecode=$row["c"];
//计算总页数
$pagecount=ceil($totalrecode/$pagesize);
//拼装数组
$output=[
	"pno"=>$pno,                //当前页码
	"pagesize"=>$pagesize,			//当前页记录数
	"pagecount"=>$pagecount,    //总页数
	"totalrecode"=>$totalrecode,//总记录数
	"data"=>$rows               //当前页面内容
];
echo json_encode($output);
