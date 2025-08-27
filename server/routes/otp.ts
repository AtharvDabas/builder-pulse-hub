import { RequestHandler } from "express";
import { z } from "zod";

// OTP service configuration (replace with real service like Twilio, AWS SNS, etc.)
const OTP_SERVICE_API_KEY = process.env.OTP_SERVICE_API_KEY || "demo_key";
const OTP_EXPIRY_MINUTES = 5;

// In-memory OTP storage (in production, use Redis or database)
const otpStorage = new Map<string, { otp: string; expiresAt: Date; attempts: number }>();

const sendOtpSchema = z.object({
  phoneNumber: z.string().regex(/^\+91[6-9]\d{9}$/, "Invalid Indian phone number"),
  purpose: z.string().optional()
});

const verifyOtpSchema = z.object({
  phoneNumber: z.string().regex(/^\+91[6-9]\d{9}$/, "Invalid Indian phone number"),
  otp: z.string().length(6, "OTP must be 6 digits")
});

export const sendOtp: RequestHandler = async (req, res) => {
  try {
    const { phoneNumber, purpose = "verification" } = sendOtpSchema.parse(req.body);
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    
    // Store OTP with expiry
    otpStorage.set(phoneNumber, {
      otp,
      expiresAt,
      attempts: 0
    });
    
    // In production, integrate with real SMS service
    // Example: Twilio, AWS SNS, MSG91, etc.
    const success = await sendSMS(phoneNumber, otp, purpose);
    
    if (success) {
      res.json({
        success: true,
        message: "OTP sent successfully",
        expiresIn: OTP_EXPIRY_MINUTES * 60, // seconds
        // In demo mode, return OTP for testing
        ...(process.env.NODE_ENV === "development" && { otp })
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to send OTP"
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Invalid request data",
        errors: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }
};

export const verifyOtp: RequestHandler = async (req, res) => {
  try {
    const { phoneNumber, otp } = verifyOtpSchema.parse(req.body);
    
    const storedData = otpStorage.get(phoneNumber);
    
    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: "No OTP found for this number"
      });
    }
    
    // Check if OTP expired
    if (new Date() > storedData.expiresAt) {
      otpStorage.delete(phoneNumber);
      return res.status(400).json({
        success: false,
        message: "OTP has expired"
      });
    }
    
    // Check attempt limit
    if (storedData.attempts >= 3) {
      otpStorage.delete(phoneNumber);
      return res.status(429).json({
        success: false,
        message: "Too many invalid attempts. Request new OTP."
      });
    }
    
    // Verify OTP
    if (storedData.otp === otp) {
      otpStorage.delete(phoneNumber);
      res.json({
        success: true,
        message: "OTP verified successfully",
        verified: true
      });
    } else {
      // Increment attempts
      storedData.attempts += 1;
      otpStorage.set(phoneNumber, storedData);
      
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
        attemptsLeft: 3 - storedData.attempts
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Invalid request data",
        errors: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }
};

// SMS service integration function
async function sendSMS(phoneNumber: string, otp: string, purpose: string): Promise<boolean> {
  try {
    // Example integration with popular SMS services
    
    // Option 1: Twilio
    // const client = require('twilio')(accountSid, authToken);
    // await client.messages.create({
    //   body: `Your ${purpose} OTP is: ${otp}. Valid for ${OTP_EXPIRY_MINUTES} minutes. Do not share with anyone.`,
    //   from: '+1234567890',
    //   to: phoneNumber
    // });
    
    // Option 2: MSG91 (Popular in India)
    // const response = await fetch('https://api.msg91.com/api/v5/otp', {
    //   method: 'POST',
    //   headers: {
    //     'authkey': process.env.MSG91_API_KEY,
    //     'content-type': 'application/JSON'
    //   },
    //   body: JSON.stringify({
    //     template_id: 'your_template_id',
    //     mobile: phoneNumber.replace('+91', ''),
    //     authkey: process.env.MSG91_API_KEY,
    //     otp: otp
    //   })
    // });
    
    // Option 3: AWS SNS
    // const sns = new AWS.SNS({ region: 'ap-south-1' });
    // await sns.publish({
    //   PhoneNumber: phoneNumber,
    //   Message: `Your ${purpose} OTP is: ${otp}. Valid for ${OTP_EXPIRY_MINUTES} minutes.`
    // }).promise();
    
    // For demo purposes, just log and return success
    console.log(`[SMS] Sending OTP ${otp} to ${phoneNumber} for ${purpose}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error('SMS sending failed:', error);
    return false;
  }
}

// Cleanup expired OTPs (run periodically)
export function cleanupExpiredOtps() {
  const now = new Date();
  for (const [phoneNumber, data] of otpStorage.entries()) {
    if (now > data.expiresAt) {
      otpStorage.delete(phoneNumber);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredOtps, 5 * 60 * 1000);
