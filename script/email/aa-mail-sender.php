<?php
/**
 * Auto Acoustics Mail Sender
 * 
 * Uses PHPMailer to send emails through the Auto Acoustics SMTP server
 */

// Define constants for email configuration
define('AA_SMTP_HOST', 'mail.aaa-city.com');
define('AA_SMTP_PORT', 587);
define('AA_SMTP_USERNAME', 'smtpmailer@aaa-city.com');
define('AA_SMTP_PASSWORD', 'Aut0SMTPMa1l3r');
define('AA_SMTP_ENCRYPTION', 'tls'); // STARTTLS

// Check if PHPMailer is already included
if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    // If PHPMailer is not available, include the PHPMailer class via composer autoload
    // or directly include the PHPMailer files
    if (file_exists(__DIR__ . '/../../vendor/autoload.php')) {
        require_once __DIR__ . '/../../vendor/autoload.php';
    } else {
        // If no composer autoload, include PHPMailer classes directly
        require_once __DIR__ . '/PHPMailer/Exception.php';
        require_once __DIR__ . '/PHPMailer/PHPMailer.php';
        require_once __DIR__ . '/PHPMailer/SMTP.php';
    }
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

/**
 * Create HTML email content for contact form submissions
 * 
 * @param array $formData The sanitized form data
 * @return string HTML email content
 */
function createContactEmailHtml($formData) {
    // Get form data
    $name = isset($formData['name']) ? htmlspecialchars($formData['name']) : 'Not provided';
    $email = isset($formData['email']) ? htmlspecialchars($formData['email']) : 'Not provided';
    $phone = isset($formData['phone']) ? htmlspecialchars($formData['phone']) : 'Not provided';
    $message = isset($formData['message']) ? nl2br(htmlspecialchars($formData['message'])) : 'Not provided';
    
    // Create HTML email content
    $html = '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0066cc; color: white; padding: 10px 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; }
            .footer { font-size: 12px; text-align: center; margin-top: 20px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Auto Acoustics Contact Form Submission</h2>
            </div>
            <div class="content">
                <div class="field">
                    <p class="label">Name:</p>
                    <p>' . $name . '</p>
                </div>
                <div class="field">
                    <p class="label">Email:</p>
                    <p>' . $email . '</p>
                </div>
                <div class="field">
                    <p class="label">Phone:</p>
                    <p>' . $phone . '</p>
                </div>
                <div class="field">
                    <p class="label">Message:</p>
                    <p>' . $message . '</p>
                </div>
            </div>
            <div class="footer">
                <p>This email was sent from the Auto Acoustics website contact form.</p>
            </div>
        </div>
    </body>
    </html>
    ';
    
    return $html;
}

/**
 * Send an email using the AA SMTP server
 *
 * @param string $to Recipient email address
 * @param string $subject Email subject
 * @param string $htmlBody HTML email body content
 * @param string $fromName Display name for the sender
 * @param string $replyTo Optional reply-to email address
 * @return array Result with success flag and message
 */
function sendAAEmail($to, $subject, $htmlBody, $fromName = 'Auto Acoustics Website', $replyTo = '') {
    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 0;                      // 0 = off, 1 = client messages, 2 = client and server messages
        $mail->isSMTP();                           // Send using SMTP
        $mail->Host       = AA_SMTP_HOST;         // Set the SMTP server
        $mail->SMTPAuth   = true;                  // Enable SMTP authentication
        $mail->Username   = AA_SMTP_USERNAME;     // SMTP username
        $mail->Password   = AA_SMTP_PASSWORD;     // SMTP password
        $mail->SMTPSecure = AA_SMTP_ENCRYPTION;   // Enable TLS encryption
        $mail->Port       = AA_SMTP_PORT;         // TCP port to connect to (587 for TLS)

        // Recipients
        $mail->setFrom(AA_SMTP_USERNAME, $fromName);
        $mail->addAddress($to);                    // Add a recipient
        
        // Add reply-to if provided
        if (!empty($replyTo)) {
            $mail->addReplyTo($replyTo);
        }

        // Content
        $mail->isHTML(true);                       // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = $htmlBody;
        
        // Generate plain text version from HTML
        $mail->AltBody = strip_tags(str_replace('<br>', "\n", $htmlBody));
        
        // Send the email
        $mail->send();
        
        return [
            'success' => true,
            'message' => 'Email sent successfully'
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => "Email could not be sent. Mailer Error: {$mail->ErrorInfo}"
        ];
    }
}

// API endpoint handler if file is accessed directly
if (basename($_SERVER['SCRIPT_FILENAME']) == basename(__FILE__)) {
    header('Content-Type: application/json');

    // Check if it's a POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        // Validate required fields
        if (!isset($data['to']) || !isset($data['subject']) || !isset($data['message'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Missing required fields (to, subject, message)'
            ]);
            exit;
        }

        // Send email
        $result = sendAAEmail(
            $data['to'],
            $data['subject'],
            $data['message'],
            $data['fromName'] ?? 'Auto Acoustics',
            $data['replyTo'] ?? ''
        );

        // Return result
        echo json_encode($result);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'This endpoint only accepts POST requests'
        ]);
    }
} 
?> 