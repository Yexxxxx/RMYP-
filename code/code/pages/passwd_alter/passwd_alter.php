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
$info  = "修改成功";

if(substr($no,0,1)=='1'){
    student($db,$no, $pwd_new);
}elseif(substr($no,0,1)=='2'){
    trainer($db,$no,$pwd_new);
}
function student($db,$no,$pwd_new){
    $sql3 = "UPDATE student SET s_passwd='$pwd_new' WHERE s_number='$no'";
    $result = $db->query($sql3);
    if($result && mysql_affected_rows()>0){
    echo $info;
    } else {
    echo "出错，未改变";    
    }
}
function trainer($db,$no,$pwd_new){
    $sql3 = "UPDATE trainer SET t_passwd='$pwd_new' WHERE t_number='$no'";
    $result = $db->query($sql3);
     if($result && mysql_affected_rows()>0){
    echo $info;
    } else {
    echo "出错，未改变";    
    }
}


