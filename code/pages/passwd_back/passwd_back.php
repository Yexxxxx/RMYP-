<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PWD', '');
define('DB_NAME', 'cms');


@$db = new MySQLi(DB_HOST,DB_USER,DB_PWD,DB_NAME);// 创建连接
// 检测连接
if($db->connect_errno){
    die('数据库连接失败，失败原因为：'.mysqli_connect_error());
}

$db->set_charset('utf8');//设置编码
$num = $_POST['num'];
//echo($chk);
if(substr($num,0,1)=='1'){
    student($db,$num);
}elseif(substr($num,0,1)=='2'){
    trainer($db,$num);
} else {
  echo '学号/工号出错';  
}
function student($db,$num){
    $sql3 = "SELECT * FROM student WHERE s_number='{$num}'";
    $result = $db->query($sql3);
    if(!$result){
    echo('SQL执行出错');
    }
    $row = $result->fetch_array(); 
    if($row){
        echo $num;
    }else{
        echo('无此用户');
        }
}

function trainer($db,$num){
    $sql3 = "SELECT * FROM trainer WHERE t_number='{$num}'";
    $result = $db->query($sql3);
    if(!$result){
    echo('SQL执行出错');
    }
    $row = $result->fetch_array(); 
    if($row){
        echo $num;
    }else{
        echo('无此用户');
        }
}
?>