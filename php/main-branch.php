<?php
//连接数据库
	header('content-type:text/html;charset=utf-8');
	//1.连接数据库,打开一个到 MySQL 服务器的连接
	$conn=@mysql_connect('localhost','root','123456');//主机，用户名，密码  @容错符号，去掉一些警告。
	if(!$conn){
		die('数据库连接错误'.mysql_error());//die():输出错误，exit()   mysql_error():数据库本身的报错。
	}
	//2.选择数据库
	mysql_select_db('zhg-mogujie',$conn) or die ('选择数据库错误' . mysql_error());
	mysql_query('SET NAMES UTF8');//中文的。
	$query="select * from fenzhi0 ";
	$result=mysql_query($query);
	$arr=array();
	
	for($i=0;$i<mysql_num_rows($result);$i++){
		$arr[$i]=mysql_fetch_array($result);
	}	
	echo json_encode($arr);


?>