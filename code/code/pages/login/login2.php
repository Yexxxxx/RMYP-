<?php
header('content-type:text/html;charset=utf-8');
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
$post = $_POST['no'];
$password =$_POST['pwd'];

$sql = "SELECT * FROM student WHERE s_number='{$post}'AND s_passwd='{$password}'";
$result = $db->query($sql);
if(!$result){
    echo('SQL执行出错');
    return;
}
$row = $result->fetch_array(); 
if($row){
    session_start();
    $_SESSION['no'] = $row['s_number'];
    //$_SESSION['pwd'] = $row['s_passwd'];
    $_SESSION['is_login'] = 1;
//    setcookie('username','hello user',time()+20);
    echo('登录成功');
}else{
    echo('用户名密码有误');
}

