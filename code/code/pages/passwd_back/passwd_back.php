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
$chk = $_POST['num'];
//echo($chk);


$sql3 = "SELECT * FROM student WHERE s_number='{$chk}'";

$result = $db->query($sql3);
if(!$result){
    echo('SQL执行出错');
}
$row = $result->fetch_array(); 

if($row){
    echo $chk;
}else{
    echo('无此用户');
}
?>