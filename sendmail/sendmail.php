<?php
// Turn off all error reporting
error_reporting(0);

$EmailTo = "heylanajacobson@gmail.com"; // <- put your email here
$subject = isset($_POST['subject'])?$_POST['subject']:"You've got an inquiry from your awesome website."; // <- put your email subject here

$email = $_POST['Email'];
$name = $_POST['Name'];
list($user, $domain) = explode('@', $EmailTo);

$i=0;
//body text and table rows
foreach($_POST as $_label => $_field){
	if($_label != 'captchaField'){
		$rowColor=($i%2)?'background: #f0f0f0;':'';
		$out .= '<tr style="'.$rowColor.'"><td style="padding:4px 10px; border:1px solid #f0f0f0">'.$_label.'</td><td style="padding:4px 10px; border:1px solid #f0f0f0">'.nl2br($_field).'</td></tr>';
		$i++;
	}
}

// prepare email body text within the table
$Body = '<table style="width:100%; border:1px solid #f0f0f0; border-collapse:collapse;">'.$out.'</table>';

//include PHP Mailer
require 'phpmailer/PHPMailerAutoload.php';
$mail = new PHPMailer;

/*
$mail->IsSMTP(); 								// telling the class to use SMTP
$mail->SMTPAuth   = true;						// enable SMTP authentication
$mail->SMTPSecure = "tls";                 		// sets the prefix to the servier
$mail->Host       = "smtp.gmail.com";			// sets the SMTP server
$mail->Port       = 587;						// set the SMTP port for the GMAIL server
$mail->Username   = "yourmail@gmail.com"; 		// SMTP account username
$mail->Password   = "yourpassword";				// SMTP account password
*/

/*
//GoDaddy SMTP
$mail->isSMTP();
$mail->Host = 'relay-hosting.secureserver.net';
$mail->Port = 25;
$mail->SMTPAuth = false;
$mail->SMTPSecure = false;
*/

$mail->setFrom($email, $name);
$mail->AddReplyTo($email, $name);
$mail->addAddress($EmailTo); // email to you
$mail->addAddress($email); // email to sender
$mail->Subject  = $subject;
$mail->isHTML(true);
$mail->Body     = $Body;
if (isset($_FILES['File']) && $_FILES['File']['error'] == UPLOAD_ERR_OK) {
    $mail->AddAttachment($_FILES['File']['tmp_name'], $_FILES['File']['name']);
}
if($mail->send()) {
	header('Location: ../index.html');
} else {
	$status = 'error';
	//return "Mailer Error: " . $mail->ErrorInfo;
}
echo $status;
?>
