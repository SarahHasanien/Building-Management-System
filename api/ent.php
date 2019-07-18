<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
class MyDB extends SQLite3 {
      function __construct() {
         $this->open('BMS.db');
      }
   }
   $db = new MyDB();
   if(!$db) {
      echo $db->lastErrorMsg();
   }
   $add = $_GET['add'];
   if ($add == "0")
   {
   $sql =<<<EOF
   SELECT *
   FROM
   entitlements;
EOF;
   $ret = $db->query($sql);
   $output['data'] = array();
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ) {
      if ($row['type']==0)
         $t ="Monthly";
      else
         $t="Emergency";
      $output['data'][] = array(
         "name" => $row['name'],
         "type" => $t
     );
   }
   echo json_encode( $output );
}
else
{
   $name = $_GET['name'];
   $type = $_GET['type'];
   //$type="1";
   $sql =<<<EOF
   INSERT INTO entitlements (name,type)
   VALUES ('$name', '$type' );
EOF;

$ret = $db->exec($sql);
if(!$ret) {
   $myObj->$db->lastErrorMsg();
   echo json_encode( $myObj );
} else {
   $myObj->msg = "Records created successfully\n";
   echo json_encode( $myObj );

}
}//elsened

   $db->close();
?>