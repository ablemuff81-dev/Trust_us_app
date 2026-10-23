import { Email } from "@convex-dev/auth/providers/Email";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";

export const emailOtp = Email({
  id: "email-otp",
  maxAge: 60 * 15,
  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes: Uint8Array) {
        crypto.getRandomValues(bytes);
      },
    };
    return generateRandomString(random, "0123456789", 6);
  },
  async sendVerificationRequest({ identifier: email, token }) {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.MAIL_FROM_EMAIL;
    if (!apiKey || !senderEmail) {
      throw new Error("BREVO_API_KEY or MAIL_FROM_EMAIL is not set on Convex.");
    }
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Trust Us", email: senderEmail },
        to: [{ email }],
        subject: `Trust Us - code ${token}`,
        htmlContent: `<p>Votre code de connexion Trust Us :</p><p style="font-size:28px;font-weight:bold;letter-spacing:6px">${token}</p><p>Ce code expire dans 15 minutes.</p>`,
      }),
    });
    if (!response.ok) {
      throw new Error(`Could not send the sign-in code (HTTP ${response.status})`);
    }
  },
});