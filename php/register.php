<?php
header('Access-Control-Allow-Origin: *');//跨域

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $uname=$_REQUEST["uname"];
    $upwd=$_REQUEST["upwd"];

//链接数据库 ip地址 用户名 密码 库名称
   $serverName = 'localhost';//数据库的IP地址
    $dbUser='root';//用户名
    $dbPwd = '123456';//密码
    $dbName='zhg-mogujie';//库名称
    
    $conn=new mysqli($serverName,$dbUser,$dbPwd,$dbName);
    mysqli_query($conn,"set names utf8");
    if($conn->connect_error){
        $arr=array();
        $arr["status"]=0;
        $arr["msg"]="链接数据库失败";
        print_r(json_encode($arr));
    }

if($uname&&$upwd){
	


//执行sql语句
    $sql=" INSERT INTO user(username,password) 
VALUE('".$uname."','".$upwd."') ;";

//    $sql="SELECT*FROM userinfo WHERE username='jay100' AND upwd='123'";
    $result = $conn->query($sql);//返回一个对象
    if($result>= 1){
        $arr=array();
        $arr["status"]=1;
        $arr["msg"]="注册成功";
        print_r(json_encode($arr));
    }
    else{
        $arr=array();
        $arr["status"]=0;
        $arr["msg"]="注册失败";
        print_r(json_encode($arr));
    }
}

}




//header('content-type:text/html;charset="utf-8"');
//	$conn=@mysql_connect('localhost','root','123456');
//	if(!$conn){
//		die('数据库连接有问题:'.mysql_error());
//	}
//	mysql_select_db('zhg-mogujie');
//	mysql_query('SET NAMES UTF8');
//	echo $_POST['names'];
//	if(isset($_POST['names'])){//判断用户名是否存在
//		$name=$_POST['names'];
//	}else{
//		exit('非法登录');
//	}
//	$query="select * from user where username='$name'";
//	$result=mysql_query($query);//执行
//	if(mysql_fetch_array($result)){
//		echo true;//返回1
//	}else{
//		echo false;//啥也没有
//	}
//	
//	if(isset($_POST['submit'])&&$_POST['submit']=='立即注册'){
//		echo '11';
//		$name=$_POST['username'];//表单的名称
////		$password=($_POST['password']);
//		echo $name;
////		$query="insert login (values(null,,'$phone',)");
//		$query="insert user(username) values ('$name')";
//		mysql_query($query);
//		header('location:http://127.0.0.1/mogujie/index.html');
//	}


//
//
//
//
//
//
//	require "conn.php";//引入数据库连接的文件
//	if(isset($_POST['name']) || isset($_POST['submit'])){
//		$username=@$_POST['name'];
//	}else{
//		exit('非法操作');
//	}
//	
//	$query="select * from user where username='$username'";
//	$result=mysql_query($query);
//	
//	if(mysql_fetch_array($result)){//如果有值代表用户名存在。
//		echo true;//有重复
//	}else{
//		echo false;//没有重复
//	}
//	
//	if(isset($_POST['submit']) && $_POST['submit']=="立即注册"){
//		$username=$_POST['username'];//username：表单的名称
//		$pass=md5($_POST['password']);
//		$query="insert user(username,password) values('$username','$pass')";
//		mysql_query($query);
//		header('location:login.html');
//	}
//	
//	
//	
//	
//	

?>