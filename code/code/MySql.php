<?php
$name=$_GET["name"] ;//接收参数
$conn = mysqli_connect("localhost", "test","root","root");//连接MYSQL数据库
$sql = "SELECT name,age FROM xcx WHERE name='$name'";//响应请求
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {// 输出小程序数组
    while($row = mysqli_fetch_assoc($result)) {
        echo json_encode($row);//将请求结果转换为json格式
    }
}
?>