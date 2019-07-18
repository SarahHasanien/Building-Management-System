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
   outgoings;
EOF;
   $ret = $db->query($sql);
   $output['data'] = array();
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ) {
         $output['data'][] = array(
         "out_id" => $row['out_id'],
         "out_value" => $row['out_value'],
         "out_date" => $row['out_date'],
         "out_owner" => $row['out_user']
             );
   }
   echo json_encode( $output );
}
else
{
   //Before adding new outgoing we first need to check the current value inside the box
   //to make sure it has sufficient amount of money!
   $sql =<<<EOF
      SELECT * from box;
EOF;
   $ret = $db->query($sql);
   $row = $ret->fetchArray(SQLITE3_ASSOC);
   if ($row['value']<$_GET['value']) //Not suffiecient
   {
      $myObj->msg = "Insufficient";
      echo json_encode( $myObj );
   }
   else //Sufficient (Y)! GO ONNNN \O/
   {
      $date = $_GET['date'];
      $owner = $_GET['owner'];
      $value = $_GET['value'];

      $sql =<<<EOF
      INSERT INTO outgoings (out_value,out_date,out_user)
      VALUES ('$value', '$date','$owner' );
EOF;

      $ret = $db->exec($sql);
      if(!$ret) {
      $myObj->$db->lastErrorMsg();
      echo json_encode( $myObj );
      } else {
      $myObj->msg = "Records created successfully\n";
      //Reduce amount of money
      $newvalue = $row['value']-$_GET['value'];
      $sql =<<<EOF
      UPDATE box SET value='$newvalue';
EOF;
      $ret = $db->exec($sql);
      $myObj->msg = "Sufficient";
      $myObj->value = $newvalue;
      echo json_encode( $myObj );
      }
   }

}

   $db->close();
?>