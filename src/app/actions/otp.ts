"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function sendEmailOtpAction(email: string) {
  try {
    // 1. Generate a 4-digit random OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // 2. Set expiration to 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // 3. Save to Supabase (assuming otp_verifications now uses email instead of phone)
    const { error: dbError } = await supabase.from("otp_verifications").insert({
      email: email.trim().toLowerCase(),
      otp,
      expires_at: expiresAt,
    });

    if (dbError) {
      console.error("Error saving OTP to DB:", dbError);
      return { success: false, error: "Failed to generate OTP" };
    }

    // 4. Send Email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      // In development without API key, just log the OTP for testing
      console.log(`[DEV MODE] OTP for ${email} is: ${otp}`);
      return { success: true, message: "OTP logged to console (Dev Mode)" };
    }

    const resend = new Resend(resendApiKey);
    
    const { error: resendError } = await resend.emails.send({
      from: "Avada India <otp@avada.space>",
      to: [email.trim().toLowerCase()],
      subject: "Your Verification Code - Avada India",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; text-align: center; border: 1px solid #eaeaea; border-radius: 12px;">
          <h2 style="color: #10b981; margin-bottom: 20px;">Verification Code</h2>
          <p style="font-size: 16px; color: #555;">Please use the following 4-digit code to verify your application:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; padding: 15px; background: #f0fdf4; border: 1px solid #10b981; border-radius: 8px; color: #047857; margin: 25px 0;">
            ${otp}
          </div>
          <p style="font-size: 14px; color: #888;">This code is valid for 10 minutes.</p>
        </div>
      `,
    });

    if (resendError) {
      console.error("Resend API Error:", resendError);
      return { success: false, error: resendError.message || "Failed to send verification email" };
    }

    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Send Email OTP Action Error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function verifyEmailOtpAction(email: string, otp: string) {
  try {
    const formattedEmail = email.trim().toLowerCase();
    
    // 1. Fetch the latest OTP for this email
    const { data, error } = await supabase
      .from("otp_verifications")
      .select("*")
      .eq("email", formattedEmail)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return { success: false, error: "Invalid or expired OTP" };
    }

    // 2. Check if OTP matches
    if (data.otp !== otp) {
      return { success: false, error: "Incorrect OTP code" };
    }

    // 3. Check if OTP is expired
    if (new Date(data.expires_at) < new Date()) {
      return { success: false, error: "OTP has expired" };
    }

    // 4. Mark the lead as verified (finding by email)
    const { error: updateError } = await supabase
      .from("leads")
      .update({ is_verified: true })
      .eq("email", formattedEmail)
      .order("created_at", { ascending: false })
      .limit(1);

    if (updateError) {
      console.error("Error updating lead verification status:", updateError);
    }

    return { success: true };
  } catch (error) {
    console.error("Verify Email OTP Action Error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
