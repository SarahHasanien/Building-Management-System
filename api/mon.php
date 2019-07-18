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
   months;
EOF;
   $ret = $db->query($sql);
   $output['data'] = array();
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ) {
      $output['data'][] = array(
         "month" => $row['month'],
         "year" => $row['year']
     );
   }
   echo json_encode( $output );
}
else
{
  //TODO
}

   $db->close();
?>