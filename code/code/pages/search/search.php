
<?php
header("Content-type:text/json;charset=utf8");
//定义参数
$id = $_GET["id"];
//表单验证
if(empty($id)){
    echo "[{\"result\":\"表单为空...\"}]";
}else{
    //连接数据库
    $con = mysql_connect("数据库链接","账号","密码");
    //设置数据库字符集  
    mysql_query("SET NAMES UTF8");
    //查询数据库
    mysql_select_db("数据库名", $con);
    $result = mysql_query("SELECT * FROM test WHERE id like '%$id%'");
    $results = array();
    while($row = mysql_fetch_assoc($result))
    {
        $results[] = $row;
        // 将数组转成json格式
        echo json_encode($results);
    }
    //关闭数据库连接
    mysql_close($con);
}
?>