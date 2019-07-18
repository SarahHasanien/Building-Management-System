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
   //(1) Fetch el most7kat
   $sql =<<<EOF
   SELECT *
   FROM
   entitlements;
EOF;
   $entitls= $db->query($sql); //Entitls Array
   // (2) Fetch months
   $sql =<<<EOF
   SELECT *
   FROM
    months;
EOF;
   $months = $db->query($sql); //Months Array

   // (3) Fetch users
   $sql =<<<EOF
   SELECT *
   FROM
    user;
EOF;
   $users = $db->query($sql); //Users Array

   $output['data'] = array();
   while($row = $users->fetchArray(SQLITE3_ASSOC) ) { //Users 
      unset($ent_month); // $foo is gone
      $ent_month = array(); // $foo is here again
      while($row2 = $months->fetchArray(SQLITE3_ASSOC)) //Months
      {
         while($row3 = $entitls->fetchArray(SQLITE3_ASSOC)) //Ents
         {
            $user =$row['name'];
            $mon =$row2['month'];
            $ent= $row3['name'];
            //Check if (user,mon,ent) key exists in payments table, if not then add it to the array
            $sql =<<<EOF
            SELECT *
            FROM
            payments where pay_user = '$user' and pay_mon='$mon' and pay_ent='$ent';
EOF;
            $ret = $db->query($sql);
            if(!($r = $ret->fetchArray(SQLITE3_ASSOC) ))
            {
               $ent_month [] = array(
                  "mon" => $row2['month'],
                  "ent" => $row3['name']
                  );
            }
        
         }
      }
      if ($row['type']==0)
         $t ="Admin";
      else
         $t="Resident";
      $output['data'][] = array(
         "name" => $row['name'],
         "id" => $row['user_id'],
         "type" => $t,
         "flat" => $row['flat_number'],
         "email" => $row['email'],
         "entmon" =>$ent_month
     );
   }//End Users Array
   echo json_encode( $output );
   $db->close();
?>
