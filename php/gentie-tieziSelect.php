<?php
$con = mysql_connect("localhost","sa","sa");
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}
mysql_select_db("my_db", $con);

$tieziId = $_POST[tieziId];
$sql = "SELECT * from Tiezi
        WHERE tieziId = '$tieziId'";
$result =mysql_query($sql);     //执行SQL
$json ="";
$data =array(); //定义好一个数组.PHP中array相当于一个数据字典.
class tiezi
{
    public $tieziId ;
    public $tieziTitle ;
    public $tieziContent;
    public $tieziScore ;
    public $tieziCreater ;
    public $tieziCreaterData;
    public $tieziAnswer;
    public $tieziLastAnswer ;
    public $tieziLastAnswerDate ;
    public $tieziOverhead;
}
while ($row= mysql_fetch_array($result, MYSQL_ASSOC))
{
    $tiezi =new tiezi();
    $tiezi->tieziId = $row["tieziId"];
    $tiezi->tieziTitle = $row["tieziTitle"];
    $tiezi->tieziContent = $row["tieziContent"];
    $tiezi->tieziScore = $row["tieziScore"];
    $tiezi->tieziCreater = $row["tieziCreater"];
    $tiezi->tieziCreaterData = $row["tieziCreaterData"];
    $tiezi->tieziAnswer = $row["tieziAnswer"];
    $tiezi->tieziLastAnswer = $row["tieziLastAnswer"];
    $tiezi->tieziLastAnswerDate = $row["tieziLastAnswerDate"];
    $tiezi->tieziOverhead = $row["tieziOverhead"];
    $data[]=$tiezi;
}
$json = json_encode($data);//把数据转换为JSON数据.
echo "{$json}";
mysql_close($con);
?>