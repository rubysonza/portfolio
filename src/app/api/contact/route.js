import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transport.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}