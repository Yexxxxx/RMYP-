<?php
include '../passwd_alter/passwd_back.php';
include '../passwd_back/passwd_back.js';
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
$no = $_POST['num'];
$pwd_new = $_POST['pwd_new'];
//echo $no;
 $sql3 = "UPDATE student SET s_passwd='$pwd_new' WHERE s_number='$no'";
 $result = $db->query($sql3);

// if(!$result){
//     echo('SQL执行出错');
// }
/*
$row = $result->fetch_array(); 

if($row){
    session_start();
    $_SESSION['num'] = $row['s_number'];
//    setcookie('username','hello user',time()+20);
    echo('验证成功');
}else{
    echo('无此用户');
}

