import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import twilio from "twilio";
import cors from "cors";

// Initialize express app
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Dummy credentials - In real world these come from process.env
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'dummy_sid';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || 'dummy_token';
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || '+1234567890';
const RESTAURANT_MANAGER_PHONE = process.env.RESTAURANT_MANAGER_PHONE || '+0987654321';

const EMAIL_USER = process.env.EMAIL_USER || 'dummy@email.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'dummy_pass';

// Initialize Twilio client lazily if possible, or just catch errors
let twilioClient: twilio.Twilio | null = null;
try {
  twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
} catch (error) {
  console.warn("Twilio client not initialized (missing/invalid credentials). SMS will be mocked.");
}

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use a generic service or configure SMTP
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// API Routes
app.post("/api/book-table", async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body;
    
    // Simulate booking save to DB here...
    
    // 1. Send SMS to Restaurant Manager
    const smsMessage = `New Reservation: ${name} (${guests} guests) on ${date} at ${time}. Phone: ${phone}. Special Requests: ${specialRequests || 'None'}`;
    if (process.env.TWILIO_ACCOUNT_SID && twilioClient) {
        await twilioClient.messages.create({
            body: smsMessage,
            from: TWILIO_PHONE_NUMBER,
            to: RESTAURANT_MANAGER_PHONE
        });
        console.log("SMS sent to manager successfully.");
    } else {
        console.log("Mock SMS Sent to Manager: ", smsMessage);
    }

    // 2. Send Confirmation Email to Customer
    const emailSubject = `Table Reservation Confirmed - The Taj Multicuisine Restaurant`;
    const emailHtml = `
      <h3>Dear ${name},</h3>
      <p>Your table reservation at <strong>The Taj Multicuisine Restaurant</strong> has been confirmed.</p>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Date: ${date}</li>
        <li>Time: ${time}</li>
        <li>Guests: ${guests}</li>
      </ul>
      <p>If you need to cancel or modify your reservation, please contact us at least 2 hours in advance.</p>
      <br />
      <p>Warm Regards,</p>
      <p>The Taj Team</p>
    `;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail({
            from: `"The Taj Reservations" <${EMAIL_USER}>`,
            to: email,
            subject: emailSubject,
            html: emailHtml
        });
        console.log("Email sent to customer successfully.");
    } else {
        console.log("Mock Email Sent to Customer: ", emailHtml);
    }

    res.status(200).json({ success: true, message: "Reservation confirmed and notifications sent." });
  } catch (error) {
    console.error("Error processing reservation:", error);
    res.status(500).json({ success: false, message: "Failed to process reservation." });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
