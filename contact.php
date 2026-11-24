<?php
/**
 * HostGator Automatic Lead Emailer
 * Automatically emails form submissions to your info@ address
 * without opening the visitor's email app.
 */
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Primary recipient email on your HostGator server:
// (If you also want a copy sent to your personal Gmail/email, add it separated by a comma, e.g. "info@constuction-webcams.com, you@gmail.com")
$host = $_SERVER['HTTP_HOST'] ?? 'constuction-webcams.com';
$clean_domain = preg_replace('/^www\./', '', $host);
$recipient_email = "info@" . $clean_domain;

$name     = strip_tags(trim($_POST['name'] ?? ''));
$company  = strip_tags(trim($_POST['company'] ?? ''));
$email    = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone    = strip_tags(trim($_POST['phone'] ?? ''));
$location = strip_tags(trim($_POST['location'] ?? ''));
$package  = strip_tags(trim($_POST['package'] ?? ''));
$message  = strip_tags(trim($_POST['message'] ?? ''));

if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please enter your name and a valid email address.']);
    exit;
}

$date_str = date('Y-m-d H:i:s T');
$subject  = "New Construction Webcam Quote Request: $name ($location)";

$email_body  = "New Jobsite Camera Quote Request\n";
$email_body .= "Submitted: $date_str\n";
$email_body .= "--------------------------------------------------\n";
$email_body .= "Name:             $name\n";
$email_body .= "Company:          $company\n";
$email_body .= "Email:            $email\n";
$email_body .= "Phone:            $phone\n";
$email_body .= "Jobsite Location: $location\n";
$email_body .= "System Package:   $package\n";
$email_body .= "--------------------------------------------------\n\n";
$email_body .= "Project Details:\n$message\n";

// On HostGator, the From address must match your domain so it passes spam filters
$from_address = "info@" . $clean_domain;
$headers  = "From: Construction Webcams <$from_address>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send automatic email via HostGator mail server
$sent = @mail($recipient_email, $subject, $email_body, $headers);

echo json_encode([
    'success' => true,
    'mail_sent' => (bool)$sent
]);
