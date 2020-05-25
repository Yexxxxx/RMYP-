<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PWD', '');
define('DB_NAME', 'cms');


@$db = new MySQLi(DB_HOST,DB_USER,DB_PWD,DB_NAME);// 创建连接
// 检测连接
if($db->connect_errno){
    die('数据库连接失败，失败原因为：'. mysqli_connect_error());
}

$db->set_charset('utf8');//设置编码
$username = $_POST['no'];
$password = $_POST['pwd'];
$info = $_POST['info'];
$info="账号密码错误";
$sql = "SELECT * FROM student WHERE s_number='{$username}' AND s_passwd='{$password}'";
$result = $db->query($sql);
if(!$result){
   echo $info;
}
$row = $result->fetch_array(); 
if($row){
    $info="登入成功";
    echo $info;
}else{
    echo $info;
}