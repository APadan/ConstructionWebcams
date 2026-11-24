<?php
/**
 * HostGator Native Contact / Quote Form Handler
 * Update $recipient_email below to the email address where you want to receive leads.
 */
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// CHANGE THIS TO YOUR PERSONAL OR BUSINESS EMAIL:
$recipient_email = "info@constuction-webcams.com";

$name     = strip_tags(trim($_POST['name'] ?? ''));
$company  = strip_tags(trim($_POST['company'] ?? ''));
$email    = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone    = strip_tags(trim($_POST['phone'] ?? ''));
$location = strip_tags(trim($_POST['location'] ?? ''));
$package  = strip_tags(trim($_POST['package'] ?? ''));
$message  = strip_tags(trim($_POST['message'] ?? ''));

if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid name and email.']);
    exit;
}

$subject = "New 4K Construction Webcam Quote Request: $name ($location)";

$email_content  = "New Jobsite Camera Quote Request from Construction Webcams Website\n";
$email_content .= "=================================================================\n\n";
$email_content .= "Name: $name\n";
$email_content .= "Company: $company\n";
$email_content .= "Email: $email\n";
$email_content .= "Phone: $phone\n";
$email_content .= "Jobsite Location: $location\n";
$email_content .= "Selected Package: $package\n\n";
$email_content .= "Project Details:\n$message\n";

$headers  = "From: Construction Webcams Website <noreply@" . ($_SERVER['HTTP_HOST'] ?? 'constuction-webcams.com') . ">\r\n";
$headers .= "Reply-To: $name <$email>\r\n";

$sent = @mail($recipient_email, $subject, $email_content, $headers);

echo json_encode(['success' => (bool)$sent]);
