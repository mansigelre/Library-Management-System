export function generateVerificationOtpEmailTemplate(otpCode) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
      
      <h2 style="color: #333; text-align: center; margin-bottom: 20px;">
        Verify Your Email Address
      </h2>
      
      <p style="font-size: 16px; color: #555; margin: 0 0 10px;">
        Dear User,
      </p>
      
      <p style="font-size: 16px; color: #555; margin: 0 0 20px;">
        To complete your registration or login, please use the following verification code:
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <span style="display: inline-block; font-size: 28px; font-weight: bold; color: #2563eb; background: #eef4ff; padding: 12px 24px; border-radius: 6px; letter-spacing: 4px;">
          ${otpCode}
        </span>
      </div>
      
      <p style="font-size: 14px; color: #777; margin: 0 0 10px;">
        This code is valid for 15 minutes. Please do not share this code with anyone.
      </p>
      
      <p style="font-size: 14px; color: #777; margin: 0 0 20px;">
        If you did not request this email, please ignore it.
      </p>
      
      <footer style="margin-top: 30px; text-align: center; font-size: 13px; color: #999;">
        <p>Thank you,<br><b>LibraTrack Team</b></p>
        <p style="font-size: 12px; color: #aaa; margin-top: 10px;">
          This is an automated message. Please do not reply to this email.
        </p>
      </footer>
      
    </div>
  `;
}

export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
      
      <h2 style="color: #333; text-align: center; margin-bottom: 20px;">
        Reset Your Password
      </h2>
      
      <p style="font-size: 16px; color: #555; margin: 0 0 10px;">
        Dear User,
      </p>
      
      <p style="font-size: 16px; color: #555; margin: 0 0 20px;">
        You requested to reset your password. Please click the button below:
      </p>
      
      <!-- Reset Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetPasswordUrl}" target="_blank" 
           style="display: inline-block; font-size: 16px; font-weight: bold; color: #fff; background: #2563eb; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
          Reset Password
        </a>
      </div>
      
      <p style="font-size: 14px; color: #777; margin: 0 0 10px;">
        If the button doesn’t work, copy and paste this link into your browser:
      </p>
      
      <!-- Fallback link -->
      <p style="font-size: 14px; color: #2563eb; word-break: break-all; margin: 0 0 20px;">
        ${resetPasswordUrl}
      </p>
      
      <p style="font-size: 14px; color: #777; margin: 0 0 20px;">
        This link will expire in 30 minutes. If you did not request a password reset, please ignore this email.
      </p>
      
      <footer style="margin-top: 30px; text-align: center; font-size: 13px; color: #999;">
        <p>Thank you,<br><b>LibraTrack Team</b></p>
        <p style="font-size: 12px; color: #aaa; margin-top: 10px;">
          This is an automated message. Please do not reply to this email.
        </p>
      </footer>
      
    </div>
  `;
}

