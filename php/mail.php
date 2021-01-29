<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	// Please specify your Mail Server - Example: mail.example.com.
ini_set("SMTP","smtp01.binero.se");

// Please specify an SMTP Number 25 and 8889 are valid SMTP Ports.
ini_set("smtp_port","587");

// Please specify the return address to use
ini_set('sendmail_to', 'hello@mariahelenanoren.com');

    $mysql_host = "10.209.2.18";
    /*mysql-01-18*/
	$mysql_username = "247546_wx94094";
	$mysql_password = "rabovagen18binero";
	$mysql_database = "247546-mariahelenanoren";
	
	$name = $_POST["name"]; 
	$email = $_POST["email"];
	$message = $_POST["message"];

	$mailTo = "hello@mariahelenanoren.com";
	$subject = "Mail från min portfolio hemsida";
	$body = "Mail from: ".$name."\r\n Email: ".$email."\r\n Message: ".$message;
	$headers = "From: " . strip_tags($_POST['email']) . "\r\n";
	$headers .= "Reply-To: ". strip_tags($_POST['email']) . "\r\n";
	$headers .= "CC: susan@example.com\r\n"; 
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/htmlcharset=UTF-8\r\n";

	mail($mailTo, $subject, $body, $headers);

/* 	//Open a new connection to the MySQL server
	$mysqli = new mysqli($mysql_host, $mysql_username, $mysql_password, $mysql_database);
	
	//Output any connection error
	if ($mysqli->connect_error) {
		die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
	}	
	
	$statement = $mysqli->prepare("INSERT INTO users_data (user_name, user_email, user_message) VALUES(?, ?, ?)"); //prepare sql insert query
	//bind parameters for markers, where (s = string, i = integer, d = double,  b = blob)
	$statement->bind_param('sss', $name, $email, $message); //bind values and execute insert query
	
	if($statement->execute()){
		print "Hello " . $name . "!, your message has been saved!";
	} else {
		print $mysqli->error; //show mysql error if any
	} */
}
?>