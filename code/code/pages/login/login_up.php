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
//数据插入操作
$sql3 = "INSERT INTO student(s_user,s_passwd,s_number,s_name,s_sex,s_t_number) values(26,'B3',3,'Yoha','男',4)";
 
if ($db->query($sql3) === TRUE) {
    echo "新记录插入成功";
}else {
   echo "Error: " . $sql3 . "<br>" . $db->error;
}

$sql = "SELECT * FROM student";
$result = $db->query($sql);

$db->close();
?>