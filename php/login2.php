<?php
	header('content-type:text/html;charset=utf-8');
	$conn=mysql_connect('localhost','root','123456');
	mysql_select_db('zhg-mogujie');
	mysql_query('SET NAMES UTF8');
	
if(isset($_POST['username'])){
	$username=$_POST['username'];
	$password=$_POST['password'];
}else{
	exit('非法操作');
}
// and password='$password'
$query="select * from user where username='$username' and password='$password'";
$result=mysql_query($query);

if(mysql_fetch_array($result)){
	echo true;
}else{
	echo false;
}