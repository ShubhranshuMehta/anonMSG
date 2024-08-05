import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {

        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'AnonMSG Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
        });
        console.log("email sent" + error?.message);
        return { success: true, message: "verification email sent succesfully" }

    } catch (emailError) {
        console.error("error sending verification mail");
        return { success: true, message: "failed to send verification email" }
    }
}