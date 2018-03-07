<?php
require_once("../init.php");
@$uname=$_REQUEST["uname"];//从request中获得uname
	if($uname){
		$sql=//定义SQL语句select * from xz_user...
			"select * from ld_user where uname='$uname'";
		$result=mysqli_query($conn,$sql);//执行SQL查询
		$users=//获得查询结果
			mysqli_fetch_all($result,1);//MYSQLI_ASSOC
		if(count($users)!=0)//如果查询结果中有数据
			echo json_encode(false);//不能使用
		else//否则
			echo json_encode(true);//可以使用
	}