<?php
	$name = $_POST["name"]; 
	$email = $_POST["email"];
	$message = $_POST["message"];

	$to = 'hello@mariahelenanoren.com';
	$subject = 'Mail from ' . $name . "via contact form";
	$message = $message;
	$headers = 'From: ' . $email . "\r\n" .
	'Reply-To: ' . $email . "\r\n" .
	'X-Mailer: PHP/' . phpversion();

	mail($to, $subject, $message, $headers);
	header("Location: ../contact.html");
?>