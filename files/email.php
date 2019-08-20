<?php

 include_once('class.phpmailer.php');

 require_once('class.smtp.php');

$emailSubject = 'Customer Has a Question!';
$webMaster = 'prateekparashar@gmail.com';

$nameField = $_POST ['username'];
$emailField = $_POST['email'];
$questionField = $_POST ['message'];

$body = <<<EOD
<br><hr><br>
Name: $nameField <br>
Email: $emailField <br>
Questions: $questionField <br>
EOD;
$headers = "From: $email\r\n";
$headers .= "Content-type: text/html\r\n";

$success = mail($webMaster, $emailSubject, $body, $headers);


$theResults = <<<EOD
EOD;

echo "$theResults";
?> 