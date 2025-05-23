



<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (!$name || !$email || !$message) {
        echo "Please fill in all the fields.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'toni.majkic@gmail.com'; 
        $mail->Password = 'hxwonxhytmsbuanl';   // App password from gmail
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('toni.majkic@gmail.com', 'Toni');
        $mail->addAddress('toni.majkic@gmail.com'); 
        $mail->addReplyTo($email, $name);

        $mail->isHTML(false);
        $mail->Subject = 'New message from contact form';
        $mail->Body = "Name: $name\nEmail: $email\nMessage:\n$message";

        $mail->send();
        echo 'Thank you! Your message has been sent.';
    } catch (Exception $e) {
        echo "Something went wrong, please try again. {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request.";
}
