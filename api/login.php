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
   $email = $_GET['mail'];
   $password = $_GET['pass'];
   $sql =<<<EOF
   SELECT *
   FROM
    user
   WHERE
    email = '$email'
   AND password = '$password';
EOF;

   $ret = $db->query($sql);
   $row=$ret->fetchArray(SQLITE3_ASSOC);

   if ($row != false)
   {
         $myObj->msg = "Success";
         $myObj->id =$row['user_id'];
         $myObj->name = $row['name'];
         $myObj->type = $row['type'];
         $myObj->flat = $row['flat_number'];
         $myJSON = json_encode($myObj);
         echo json_encode($myObj);
}
else
      {
         $myObj->msg = "Failure";
         $myJSON = json_encode($myObj);
         echo $myJSON;
      }
   $db->close();
?>