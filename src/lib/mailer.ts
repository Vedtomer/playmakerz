import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | undefined;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

export type RegistrationDetails = {
  fullName: string;
  age: number;
  phone: string;
  email: string;
  playingStyle: string;
  trialLocation: string;
  packageLabel: string;
  amountInr: number;
  paymentId: string;
};

export async function sendRegistrationEmails(details: RegistrationDetails) {
  const from = `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`;
  const t = getTransporter();

  const summaryRows = `
    <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${details.fullName}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Age</td><td>${details.age}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${details.phone}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${details.email}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Playing Style</td><td>${details.playingStyle}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Trial Location</td><td>${details.trialLocation}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Package</td><td>${details.packageLabel}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Amount Paid</td><td>₹${details.amountInr}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Payment ID</td><td>${details.paymentId}</td></tr>
  `;

  await t.sendMail({
    from,
    to: details.email,
    subject: "You're registered for Faridabad Premier League Trials",
    html: `
      <div style="font-family:sans-serif;max-width:480px">
        <h2 style="color:#111">Trial registration confirmed</h2>
        <p>Hi ${details.fullName}, your payment was received and your FPL trial slot is confirmed. Our team will reach out with the exact venue and time.</p>
        <table style="border-collapse:collapse;font-size:14px">${summaryRows}</table>
        <p style="margin-top:16px;color:#666;font-size:13px">Playmakerz HQ, Sector 16, Faridabad, Haryana 121002 · info@playmakerz.in · +91-9999474562</p>
      </div>
    `,
  });

  const notifyTo = process.env.NOTIFY_TO_EMAIL;
  if (notifyTo) {
    await t.sendMail({
      from,
      to: notifyTo,
      subject: `New FPL trial registration — ${details.fullName}`,
      html: `<table style="border-collapse:collapse;font-size:14px">${summaryRows}</table>`,
    });
  }
}

export async function sendOtpEmail(to: string, otp: string) {
  const from = `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`;
  await getTransporter().sendMail({
    from,
    to,
    subject: `${otp} is your Playmakerz admin login code`,
    html: `
      <div style="font-family:sans-serif;max-width:420px">
        <h2 style="color:#111">Admin login code</h2>
        <p style="font-size:32px;font-weight:700;letter-spacing:4px;margin:16px 0">${otp}</p>
        <p style="color:#666;font-size:13px">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
}
