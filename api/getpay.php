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
   $sql =<<<EOF
   SELECT *
   FROM
   payments;
EOF;
   $ret = $db->query($sql);
   $output['data'] = array();
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ) {
      $output['data'][] = array(
        "val" => $row['pay_value'],
        "date" => $row['pay_date'],
        "desc" => $row['pay_descr'],
        "ent" => $row['pay_ent'],
        "mon" => $row['pay_mon'],
        "user" => $row['pay_user'],
     );
   }
   echo json_encode( $output );
   ?>