<?php
# 01-先连接数据库
$db = mysqli_connect("127.0.0.1","root","","nanshigou");

# 获取参数
$page = ($_REQUEST["page"] -1 ) * 36;
$type = $_REQUEST["sortType"];

# 02-查询获取数据库所有的数据
if($type == 0)
{
  $sql = "SELECT * FROM goods LIMIT $page, 36";
}elseif($type == 1){
  $sql = "SELECT * FROM goods ORDER BY price DESC LIMIT $page, 36";
}else{
  $sql = "SELECT * FROM goods ORDER BY price ASC LIMIT $page, 36";
}

$result = mysqli_query($db,$sql);
# 03-把数据库中的获取所有数据转换为JSON返回
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);
?>
