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
    $num=0;
    $val = $_GET['val'];
    $desc = $_GET['desc'];
    $ent = $_GET['ent'];
    $datee = $_GET['datee'];
    $mon = $_GET['mon'];
    $sql =<<<EOF
      SELECT * from user;
EOF;
      $ret = $db->query($sql);
      while($row = $ret->fetchArray(SQLITE3_ASSOC) ) {
      $num = $num+1;
      $own = $row['name'];
      $sql =<<<EOF
      INSERT INTO payments (pay_value,pay_date,pay_descr,pay_ent,pay_mon,pay_user)
      VALUES ('$val', '$datee', '$desc', '$ent', '$mon','$own' );
EOF;
      $db->exec($sql);
      }

//Update box value

      $sql =<<<EOF
      SELECT * from box;
EOF;
      $ret = $db->query($sql);
      $row = $ret->fetchArray(SQLITE3_ASSOC);
      $boxValue=$row['value'];
      $newvalue = $boxValue + $val*$num;
      $sql =<<<EOF
      UPDATE box SET value='$newvalue';
EOF;
      $ret = $db->exec($sql);

      $myObj->msg = "Success";
      $myObj->box = $newvalue;

      echo json_encode( $myObj );
?>