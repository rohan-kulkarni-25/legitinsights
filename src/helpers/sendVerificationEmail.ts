import { resend } from "@/lib/resend";

import Email from "../../emails/VerificationEmai";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verfiyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "you@example.com",
      to: email,
      subject: username,
      react: Email(verfiyCode),
    });
    return {
      success: true,
      message: "Verification Email sent successfully !",
    };
  } catch (error) {
    console.log("Error in sending verification EMAILS", error);
    return {
      success: false,
      message: "Something went wrong in sending email.",
    };
  }
}
