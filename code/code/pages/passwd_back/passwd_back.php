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
    return;
}
$row = $result->fetch_array(); 

if($row){
    session_start();
    $_SESSION['num'] = $row['s_number'];
//    setcookie('username','hello user',time()+20);
    echo('验证成功');
}else{
    echo('无此用户');
}

// $db->set_charset('utf8');//设置编码
// $sql = "SELECT s_number FROM student";
// $result = $db->query($sql);
// $num = [];
// $num['I()']=I();
 
// if ($result->num_rows > 0) {
//     // 输出数据
//     while($row = $result->fetch_assoc()) {
//       if ($num==$row["s_number"])
//       $this->ajaxReturn("123");
//     }
// } else {
//     echo "0 结果";
// }
// $conn->close();
/*
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
$sql = "SELECT s_user,s_passwd,s_number,s_name,s_sex,s_t_number FROM student";
$result = $db->query($sql);
 
if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
        echo "user: " . $row["s_user"]. 
             "passwd: " . $row["s_passwd"].
              "number: " . $row["s_number"].
              "name: ".$row["s_name"].
              "sex: ".$row["s_sex"].
              "s-t-number: ".$row["s_t_number"]."
              <br>";
    }
} else {
    echo "0 结果";
}
$conn->close();
?>
?>