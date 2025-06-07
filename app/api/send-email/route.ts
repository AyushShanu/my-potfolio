import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: "Ayush Portfolio <onboarding@resend.dev>",
      to: ["adhuliya1601@gmail.com"], // your own email only
      subject: `New Contact from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Email send failed:", err.message);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }
}
