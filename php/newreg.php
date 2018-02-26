<?php
	header('content-type:text/html;charset=utf-8');
	$conn=mysql_connect('localhost','root','123456') or die('数据库连接错误'.mysql_error());
	mysql_select_db('zhg-mogujie') or die('选择数据库错误'.mysql_error());
	mysql_query('SET NAMES UTF8');
	
	if(isset($_POST['username'])){
		$username=$_POST['username'];
		$password=$_POST['password'];
	}else{
		exit('非法操作');
	}

	$query="insert user(username,password) values('$username','$password')";
	mysql_query($query);
	$query2="select * from user where username='$username'";	
	$result=mysql_query($query2);
	if(mysql_fetch_array($result)){
		echo true;
	}else{
		echo false;
	}
?>