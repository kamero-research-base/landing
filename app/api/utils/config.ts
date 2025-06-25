const brevo = require('@getbrevo/brevo');
let apiInstance = new brevo.TransactionalEmailsApi();

// Function to send verification email
export async function sendVerificationEmail(email: string, code: string, name: string): Promise<void> {

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = "Account Verification";
  sendSmtpEmail.htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
      }
      .header {
        background: linear-gradient(135deg, #008080 0%, #006666 100%);
        padding: 40px 20px;
        text-align: center;
      }
      .header h1 {
        color: #ffffff;
        margin: 0;
        font-size: 28px;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      .content {
        padding: 40px 30px;
      }
      .greeting {
        font-size: 18px;
        color: #333333;
        margin-bottom: 20px;
      }
      .message {
        font-size: 16px;
        color: #555555;
        margin-bottom: 30px;
        line-height: 1.6;
      }
      .verification-box {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-radius: 8px;
        padding: 25px;
        text-align: center;
        margin: 30px 0;
        border: 1px solid #dee2e6;
      }
      .verification-label {
        font-size: 14px;
        color: #6c757d;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 10px;
      }
      .verification-code {
        font-size: 32px;
        font-weight: 700;
        color: #008080;
        letter-spacing: 4px;
        margin: 10px 0;
      }
      .footer {
        background-color: #f8f9fa;
        padding: 30px;
        text-align: center;
        border-top: 1px solid #e9ecef;
      }
      .footer-text {
        color: #6c757d;
        font-size: 14px;
        margin: 5px 0;
      }
      .footer-contact {
        margin-top: 20px;
      }
      .footer-contact a {
        color: #008080;
        text-decoration: none;
      }
      .footer-contact a:hover {
        text-decoration: underline;
      }
      .divider {
        height: 1px;
        background-color: #e9ecef;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>ACCOUNT VERIFICATION</h1>
      </div>
      <div class="content">
        <p class="greeting">Dear ${name},</p>
        <p class="message">
          Welcome to Kamero Research Base! We're thrilled to have you join our community. 
          To complete your registration and access all features, please verify your account 
          using the code below.
        </p>
        <div class="verification-box">
          <div class="verification-label">Your Verification Code</div>
          <div class="verification-code">${code}</div>
        </div>
        <p class="message">
          This code will expire in 24 hours for security reasons. If you didn't create an 
          account with us, please disregard this email.
        </p>
      </div>
      <div class="footer">
        <p class="footer-text">Best regards,</p>
        <p class="footer-text"><strong>Kamero Development Team</strong></p>
        <div class="divider"></div>
        <div class="footer-contact">
          <p class="footer-text">
            <a href="mailto:info@kamero.rw">info@kamero.rw</a> | 
            <a href="tel:+250781121117">+250 781 121 117</a>
          </p>
        </div>
      </div>
    </div>
  </body>
  </html>`;
  sendSmtpEmail.sender = { "name": "Kamero Research Base", "email": "noreply@kamero.rw" };
  sendSmtpEmail.to = [
    { "email": email, "name": "Student" }
  ];
  sendSmtpEmail.replyTo = { "email": "info@kamero.rw", "name": "Kamero" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
    console.log('API called successfully. ');
  }, function (error: any) {
    console.error(error);
  });
  
}


// Function to send verification email
export async function sendChangePasswordVerificationEmail(email: string, code: string): Promise<void> {

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = "Email Verification";
  sendSmtpEmail.htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
      }
      .header {
        background: linear-gradient(135deg, #008080 0%, #006666 100%);
        padding: 40px 20px;
        text-align: center;
      }
      .header h1 {
        color: #ffffff;
        margin: 0;
        font-size: 28px;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      .content {
        padding: 40px 30px;
      }
      .greeting {
        font-size: 18px;
        color: #333333;
        margin-bottom: 20px;
      }
      .message {
        font-size: 16px;
        color: #555555;
        margin-bottom: 30px;
        line-height: 1.6;
      }
      .verification-box {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-radius: 8px;
        padding: 25px;
        text-align: center;
        margin: 30px 0;
        border: 1px solid #dee2e6;
      }
      .verification-label {
        font-size: 14px;
        color: #6c757d;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 10px;
      }
      .verification-code {
        font-size: 32px;
        font-weight: 700;
        color: #008080;
        letter-spacing: 4px;
        margin: 10px 0;
      }
      .security-notice {
        background-color: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 6px;
        padding: 15px;
        margin: 20px 0;
        font-size: 14px;
        color: #856404;
      }
      .footer {
        background-color: #f8f9fa;
        padding: 30px;
        text-align: center;
        border-top: 1px solid #e9ecef;
      }
      .footer-text {
        color: #6c757d;
        font-size: 14px;
        margin: 5px 0;
      }
      .footer-contact {
        margin-top: 20px;
      }
      .footer-contact a {
        color: #008080;
        text-decoration: none;
      }
      .footer-contact a:hover {
        text-decoration: underline;
      }
      .divider {
        height: 1px;
        background-color: #e9ecef;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>EMAIL VERIFICATION</h1>
      </div>
      <div class="content">
        <p class="greeting">Hello!</p>
        <p class="message">
          We received a request to change the password for your Kamero Research Base account. 
          To proceed with this change, please verify your email address using the code below.
        </p>
        <div class="verification-box">
          <div class="verification-label">Your Verification Code</div>
          <div class="verification-code">${code}</div>
        </div>
        <div class="security-notice">
          <strong>Security Notice:</strong> If you didn't request a password change, 
          please ignore this email and your password will remain unchanged. Your account 
          security is our priority.
        </div>
      </div>
      <div class="footer">
        <p class="footer-text">Best regards,</p>
        <p class="footer-text"><strong>Kamero Development Team</strong></p>
        <div class="divider"></div>
        <div class="footer-contact">
          <p class="footer-text">
            <a href="mailto:info@kamero.rw">info@kamero.rw</a> | 
            <a href="tel:+250781121117">+250 781 121 117</a>
          </p>
        </div>
      </div>
    </div>
  </body>
  </html>`;
  sendSmtpEmail.sender = { "name": "Kamero Research Base", "email": "noreply@kamero.rw" };
  sendSmtpEmail.to = [
    { "email": email, "name": "Student" }
  ];
  sendSmtpEmail.replyTo = { "email": "info@kamero.rw", "name": "Kamero" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
    console.log('API called successfully. ');
  }, function (error: any) {
    console.error(error);
  });
  
}

// Function to send verification email
export async function sendChangePasswordConfirmationEmail(email: string): Promise<void> {

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = "Password Change Confirmation";
  sendSmtpEmail.htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
      }
      .header {
        background: linear-gradient(135deg, #28a745 0%, #218838 100%);
        padding: 40px 20px;
        text-align: center;
      }
      .header h1 {
        color: #ffffff;
        margin: 0;
        font-size: 28px;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      .success-icon {
        width: 60px;
        height: 60px;
        margin: 20px auto;
        background-color: #28a745;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .checkmark {
        color: white;
        font-size: 30px;
      }
      .content {
        padding: 40px 30px;
        text-align: center;
      }
      .message {
        font-size: 16px;
        color: #555555;
        margin-bottom: 30px;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        padding: 15px 30px;
        background-color: #008080;
        color: #ffffff;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        margin: 20px 0;
        transition: background-color 0.3s;
      }
      .button:hover {
        background-color: #006666;
      }
      .security-tips {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 20px;
        margin: 30px 0;
        text-align: left;
      }
      .security-tips h3 {
        color: #333333;
        margin-bottom: 15px;
        font-size: 18px;
      }
      .security-tips ul {
        color: #555555;
        padding-left: 20px;
        margin: 0;
      }
      .security-tips li {
        margin-bottom: 10px;
      }
      .footer {
        background-color: #f8f9fa;
        padding: 30px;
        text-align: center;
        border-top: 1px solid #e9ecef;
      }
      .footer-text {
        color: #6c757d;
        font-size: 14px;
        margin: 5px 0;
      }
      .footer-contact {
        margin-top: 20px;
      }
      .footer-contact a {
        color: #008080;
        text-decoration: none;
      }
      .footer-contact a:hover {
        text-decoration: underline;
      }
      .divider {
        height: 1px;
        background-color: #e9ecef;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Successfully Changed</h1>
      </div>
      <div class="content">
        <div class="success-icon">
          <span class="checkmark">✓</span>
        </div>
        <p class="message">
          Great news! Your password has been successfully changed. You can now log in to your 
          Kamero Research Base account using your new password.
        </p>
        <a href="https://dashboard.kamero.rw" class="button">Go to Dashboard</a>
        
        <div class="security-tips">
          <h3>Security Tips:</h3>
          <ul>
            <li>Keep your password confidential and never share it with anyone</li>
            <li>Use a unique password that you don't use for other accounts</li>
            <li>Consider enabling two-factor authentication for added security</li>
            <li>If you notice any suspicious activity, contact us immediately</li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <p class="footer-text">Best regards,</p>
        <p class="footer-text"><strong>Kamero Development Team</strong></p>
        <div class="divider"></div>
        <div class="footer-contact">
          <p class="footer-text">
            <a href="mailto:info@kamero.rw">info@kamero.rw</a> | 
            <a href="tel:+250781121117">+250 781 121 117</a>
          </p>
        </div>
      </div>
    </div>
  </body>
  </html>`;
  sendSmtpEmail.sender = { "name": "Kamero Research Base", "email": "noreply@kamero.rw" };
  sendSmtpEmail.to = [
    { "email": email, "name": "Student" }
  ];
  sendSmtpEmail.replyTo = { "email": "info@kamero.rw", "name": "Kamero" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
    console.log('API called successfully. ');
  }, function (error: any) {
    console.error(error);
  });
  
}

// Function to send verification email
export async function sendContactEmail(email: string, message: string, name: string): Promise<void> {

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = `New message from ${name}`;
  sendSmtpEmail.htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            max-width: 650px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #008080 0%, #006666 100%);
            color: white;
            text-align: center;
            padding: 30px 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .header p {
            margin: 10px 0 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .info-section {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
        }
        .info-row {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 600;
            color: #495057;
            width: 100px;
            flex-shrink: 0;
        }
        .info-value {
            color: #212529;
            word-break: break-word;
        }
        .message-section {
            margin-top: 30px;
        }
        .message-label {
            font-weight: 600;
            color: #495057;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .message-box {
            background: #ffffff;
            padding: 20px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            color: #212529;
            line-height: 1.8;
            font-style: normal;
        }
        .footer {
            background-color: #f8f9fa;
            text-align: center;
            padding: 25px;
            font-size: 14px;
            color: #6c757d;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            margin: 5px 0;
        }
        .timestamp {
            background-color: #e7f5f5;
            color: #008080;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            display: inline-block;
            margin-top: 20px;
        }
    </style>
  </head>
  <body>
    <div class="container">
        <div class="header">
            <h1>New Contact Us Message</h1>
            <p>Received via Kamero Research Base Contact Form</p>
        </div>
        <div class="content">
            <div class="info-section">
                <div class="info-row">
                    <div class="info-label">Name:</div>
                    <div class="info-value">${name}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Email:</div>
                    <div class="info-value">${email}</div>
                </div>
            </div>
            
            <div class="message-section">
                <div class="message-label">Message:</div>
                <div class="message-box">${message}</div>
            </div>
            
            <div style="text-align: center;">
                <span class="timestamp">Received on ${new Date().toLocaleString()}</span>
            </div>
        </div>
        <div class="footer">
            <p><strong>Action Required:</strong> Please respond to this inquiry within 1-3 hours.</p>
            <p>This message was sent through the Kamero Research Base contact form.</p>
        </div>
    </div>
  </body>
  </html>`;
  sendSmtpEmail.sender = { "name": name, "email": "noreply@kamero.rw"};
  sendSmtpEmail.to = [
    { "email": "btrjoseph77@gmail.com", "name": "Research Base Support Team" }
  ];
  sendSmtpEmail.replyTo = { "email": email, "name": name };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
    console.log('API called successfully. ');
  }, function (error: any) {
    console.error(error);
  });
  
}


// Function to send verification email
export async function sendContactCopyEmail(email: string, message: string, name: string): Promise<void> {

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = `Your message recieved!`;
  sendSmtpEmail.htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            max-width: 650px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #28a745 0%, #218838 100%);
            color: white;
            text-align: center;
            padding: 40px 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .success-icon {
            width: 60px;
            height: 60px;
            margin: 20px auto 0;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .checkmark {
            color: white;
            font-size: 30px;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 20px;
            color: #212529;
            margin-bottom: 20px;
            font-weight: 500;
        }
        .confirmation-message {
            font-size: 16px;
            color: #495057;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        .info-section {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
        }
        .info-title {
            font-weight: 600;
            color: #212529;
            margin-bottom: 20px;
            font-size: 18px;
        }
        .info-row {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 600;
            color: #495057;
            width: 100px;
            flex-shrink: 0;
        }
        .info-value {
            color: #212529;
            word-break: break-word;
        }
        .message-box {
            background: #ffffff;
            padding: 20px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            margin-top: 15px;
            color: #212529;
            line-height: 1.8;
        }
        .response-time {
            background-color: #e7f5f5;
            border: 1px solid #b8e0e0;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
            text-align: center;
        }
        .response-time-icon {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .response-time-text {
            color: #008080;
            font-weight: 600;
            font-size: 16px;
            margin: 0;
        }
        .response-time-detail {
            color: #006666;
            font-size: 14px;
            margin-top: 5px;
        }
        .footer {
            background-color: #f8f9fa;
            text-align: center;
            padding: 30px;
            border-top: 1px solid #e9ecef;
        }
        .footer-text {
            color: #6c757d;
            font-size: 14px;
            margin: 5px 0;
        }
        .footer-contact {
            margin-top: 20px;
        }
        .footer-contact a {
            color: #008080;
            text-decoration: none;
        }
        .footer-contact a:hover {
            text-decoration: underline;
        }
        .divider {
            height: 1px;
            background-color: #e9ecef;
            margin: 20px 0;
        }
    </style>
  </head>
  <body>
    <div class="container">
        <div class="header">
            <div class="success-icon">
                <span class="checkmark">✓</span>
            </div>
            <h1>Message Received!</h1>
        </div>
        <div class="content">
            <p class="greeting">Dear ${name},</p>
            <p class="confirmation-message">
                Thank you for reaching out to Kamero Research Base! We've successfully received 
                your message and our support team will review it shortly. Here's a copy of your 
                submission for your records:
            </p>
            
            <div class="info-section">
                <h3 class="info-title">Contact Details</h3>
                <div class="info-row">
                    <div class="info-label">Name:</div>
                    <div class="info-value">${name}</div>
                </div>
               <div class="info-row">
                    <div class="info-label">Email:</div>
                    <div class="info-value">${email}</div>
                </div>
            </div>
            
            <div class="info-section">
                <h3 class="info-title">Your Message</h3>
                <div class="message-box">${message}</div>
            </div>
            
            <div class="response-time">
                <div class="response-time-icon">⏱️</div>
                <p class="response-time-text">Expected Response Time</p>
                <p class="response-time-detail">Our team typically responds within 1-3 hours</p>
            </div>
            
            <p class="confirmation-message">
                We appreciate your interest in Kamero Research Base and look forward to 
                assisting you. If your inquiry is urgent, please don't hesitate to call us 
                directly at +250 781 121 117.
            </p>
        </div>
        <div class="footer">
            <p class="footer-text">Best regards,</p>
            <p class="footer-text"><strong>Kamero Support Team</strong></p>
            <div class="divider"></div>
            <div class="footer-contact">
                <p class="footer-text">
                    <a href="mailto:btrjoseph77@gmail.com">btrjoseph77@gmail.com</a> | 
                    <a href="tel:+250781121117">+250 781 121 117</a>
                </p>
            </div>
        </div>
    </div>
  </body>
  </html>`;
  sendSmtpEmail.sender = { "name": "Kamero Research Base", "email": "noreply@kamero.rw"};
  sendSmtpEmail.to = [
    { "email": email, "name": name }
  ];
  sendSmtpEmail.replyTo = { "email": "btrjoseph77@gmail.com", "name": "Kamero Support Team" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
    console.log('API called successfully. ');
  }, function (error: any) {
    console.error(error);
  });
  
}
// Function to send verification email
export async function sendCeoContactCopyEmail(email: string, message: string, name: string): Promise<void> {

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = `New message from ${name}`;
  sendSmtpEmail.htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            max-width: 650px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
            color: white;
            text-align: center;
            padding: 30px 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .header p {
            margin: 10px 0 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .priority-badge {
            display: inline-block;
            background-color: #ff5722;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 15px;
        }
        .content {
            padding: 40px 30px;
        }
        .info-section {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
            border-left: 4px solid #1a237e;
        }
        .info-row {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 600;
            color: #495057;
            width: 100px;
            flex-shrink: 0;
        }
        .info-value {
            color: #212529;
            word-break: break-word;
        }
        .message-section {
            margin-top: 30px;
        }
        .message-label {
            font-weight: 600;
            color: #495057;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .message-box {
            background: #ffffff;
            padding: 20px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            color: #212529;
            line-height: 1.8;
            font-style: normal;
        }
        .action-required {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
            text-align: center;
        }
        .action-required-icon {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .action-required-text {
            color: #856404;
            font-weight: 600;
            font-size: 16px;
            margin: 0;
        }
        .footer {
            background-color: #f8f9fa;
            text-align: center;
            padding: 25px;
            font-size: 14px;
            color: #6c757d;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            margin: 5px 0;
        }
        .timestamp {
            background-color: #e3f2fd;
            color: #1a237e;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            display: inline-block;
            margin-top: 20px;
        }
    </style>
  </head>
  <body>
    <div class="container">
        <div class="header">
            <h1>Executive Contact Message</h1>
            <p>Forwarded to CEO - Kamero Research Base</p>
            <span class="priority-badge">Priority Message</span>
        </div>
        <div class="content">
            <div class="info-section">
                <div class="info-row">
                    <div class="info-label">Name:</div>
                    <div class="info-value">${name}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Email:</div>
                    <div class="info-value">${email}</div>
                </div>
            </div>
            
            <div class="message-section">
                <div class="message-label">Message:</div>
                <div class="message-box">${message}</div>
            </div>
            
            <div class="action-required">
                <div class="action-required-icon">⚡</div>
                <p class="action-required-text">Executive Review Required</p>
            </div>
            
            <div style="text-align: center;">
                <span class="timestamp">Received on ${new Date().toLocaleString()}</span>
            </div>
        </div>
        <div class="footer">
            <p><strong>Note:</strong> This message has been forwarded directly to executive leadership.</p>
            <p>Please respond at your earliest convenience.</p>
        </div>
    </div>
  </body>
  </html>`;
  sendSmtpEmail.sender = { "name": name, "email": "noreply@kamero.rw"};
  sendSmtpEmail.to = [
    { "email": "oturikumwe@gmail.com", "name": "Research Base Support Team" }
  ];
  sendSmtpEmail.replyTo = { "email": email, "name": name };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
    console.log('API called successfully. ');
  }, function (error: any) {
    console.error(error);
  });
 
  
}