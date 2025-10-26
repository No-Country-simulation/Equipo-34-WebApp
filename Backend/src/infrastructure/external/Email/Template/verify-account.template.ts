export const verify_account_template = (
  email: string,
  company_email: string,
  PORT: number | string,
  token: string
) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirm Your Account</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }

      body {
        background-color: #f9f7ff;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
      }

      .email-container {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(102, 51, 153, 0.1);
        width: 100%;
        max-width: 600px;
        overflow: hidden;
      }

      .email-header {
        background: linear-gradient(135deg, #663399, #8a2be2);
        color: white;
        padding: 30px 40px;
        text-align: center;
      }

      .logo {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 10px;
      }

      .email-body {
        padding: 40px;
      }

      h1 {
        color: #2d1b4e;
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
      }

      p {
        color: #5d5d71;
        line-height: 1.6;
        margin-bottom: 20px;
        font-size: 16px;
      }

      .confirmation-box {
        background-color: #f5f2ff;
        border-radius: 8px;
        padding: 25px;
        margin: 25px 0;
        text-align: center;
        border-left: 4px solid #663399;
      }

      .confirmation-code {
        font-size: 28px;
        font-weight: 700;
        color: #663399;
        letter-spacing: 3px;
        margin: 15px 0;
      }

      .btn {
        display: inline-block;
        background: linear-gradient(135deg, #663399, #8a2be2);
        color: white;
        padding: 14px 35px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
        margin: 20px 0;
        box-shadow: 0 4px 6px rgba(102, 51, 153, 0.25);
      }

      .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 7px 14px rgba(102, 51, 153, 0.3);
      }

      .btn:active {
        transform: translateY(0);
      }

      .user-email {
        font-weight: 600;
        color: #663399;
      }

      .steps {
        margin: 30px 0;
      }

      .step {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
      }

      .step-number {
        background-color: #663399;
        color: white;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        margin-right: 15px;
        flex-shrink: 0;
      }

      .step-content {
        flex: 1;
      }

      .step-title {
        font-weight: 600;
        color: #2d1b4e;
        margin-bottom: 5px;
      }

      .help-text {
        margin-top: 30px;
        font-size: 14px;
        color: #8a8a9e;
        text-align: center;
      }

      .help-text a {
        color: #663399;
        text-decoration: none;
      }

      .help-text a:hover {
        text-decoration: underline;
      }

      .email-footer {
        background-color: #f5f2ff;
        padding: 20px 40px;
        text-align: center;
        border-top: 1px solid #e6e0f5;
        font-size: 14px;
        color: #5d5d71;
      }

      .social-links {
        margin: 15px 0;
      }

      .social-links a {
        display: inline-block;
        margin: 0 10px;
        color: #5d5d71;
        text-decoration: none;
      }

      .social-links a:hover {
        color: #663399;
      }

      @media (max-width: 600px) {
        .email-body {
          padding: 30px 20px;
        }

        .email-header {
          padding: 25px 20px;
        }

        .confirmation-code {
          font-size: 22px;
        }

        .btn {
          display: block;
          width: 100%;
          text-align: center;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <div class="logo">Healthtech</div>
        <h2>Confirm Your Email Address</h2>
      </div>

      <div class="email-body">
        <h1>You're Almost There!</h1>

        <p>Hello <strong>User</strong>,</p>

        <p>
          To start using your account at <strong>Healthtech app</strong>, we
          need to verify that you own this email address:
        </p>

        <p class="user-email" style="text-align: center; font-size: 18px">
          ${email}
        </p>

        <div class="confirmation-box">
          <p>Click the button below to confirm your account:</p>

          <a href="http://localhost:${PORT}/auth/verify/${token}" class="btn"
            >Confirm My Account</a
          >

          <p style="font-size: 14px; margin-top: 15px">
            This link will expire in 24 hours for security reasons.
          </p>
        </div>

        <p>
          If the button doesn't work, copy and paste the following URL into your
          browser:
        </p>

        <p
          style="
            background-color: #f1edff;
            padding: 12px;
            border-radius: 6px;
            font-size: 14px;
            word-break: break-all;
          ">
          http://localhost:${PORT}/auth/verify/${token}
        </p>

        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <div class="step-title">Confirm Your Account</div>
              <p>Click the button above to verify your email address.</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <div class="step-title">Complete Your Profile</div>
              <p>Add additional information to personalize your experience.</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <div class="step-title">Start Exploring</div>
              <p>Discover all the features we have for you.</p>
            </div>
          </div>
        </div>

        <p class="help-text">
          If you didn't create an account with Healthtech, you can safely ignore
          this message.
          <br />Having trouble?
          <a href="mailto:${company_email}">Contact Us</a>
        </p>
      </div>

      <div class="email-footer">
        <div class="social-links">
          <a href="#">Website</a> • <a href="#">Twitter</a> •
          <a href="#">Facebook</a> •
          <a href="#">Instagram</a>
        </div>
        <p>© 2025 Healthtech. All rights reserved.</p>
        <p>
          You're receiving this email because you signed up for Healthtech app.
        </p>
      </div>
    </div>
  </body>
</html>
`;
};
