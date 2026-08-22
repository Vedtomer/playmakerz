export type WhatsAppRegistration = {
  phone: string;
  fullName: string;
  trialLocation: string;
  packageLabel: string;
};

function toWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

/**
 * Sends a post-payment confirmation via the WhatsApp Cloud API
 * (business.facebook.com/wa/manage). Requires WHATSAPP_PHONE_NUMBER_ID
 * and WHATSAPP_ACCESS_TOKEN, and an approved message template
 * (WHATSAPP_TEMPLATE_NAME) since this is an outbound business-initiated
 * message outside the 24h customer service window.
 */
export async function sendWhatsAppConfirmation(reg: WhatsAppRegistration) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;

  if (!phoneNumberId || !accessToken || !templateName) {
    console.warn("WhatsApp not configured — skipping message send");
    return { skipped: true };
  }

  const fullNumber = toWhatsAppNumber(reg.phone);

  const res = await fetch(
    `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: fullNumber,
        type: "template",
        template: {
          name: templateName,
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", parameter_name: "name", text: reg.fullName },
                { type: "text", parameter_name: "trial_location", text: reg.trialLocation },
                { type: "text", parameter_name: "package", text: reg.packageLabel },
              ],
            },
          ],
        },
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`WhatsApp send failed: ${res.status} ${body}`);
  }

  return res.json();
}

/**
 * Sends a login OTP via a WhatsApp Authentication-category template
 * (WHATSAPP_OTP_TEMPLATE_NAME). Meta generates the body text itself for
 * these ("*123456* is your verification code...") — you only supply the
 * code, both as the body parameter and as the button's copy-code param.
 */
export async function sendWhatsAppOtp(phone: string, otp: string) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const templateName = process.env.WHATSAPP_OTP_TEMPLATE_NAME;

  if (!phoneNumberId || !accessToken || !templateName) {
    throw new Error("WhatsApp OTP is not configured");
  }

  const res = await fetch(
    `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: toWhatsAppNumber(phone),
        type: "template",
        template: {
          name: templateName,
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [{ type: "text", text: otp }],
            },
            {
              type: "button",
              sub_type: "url",
              index: "0",
              parameters: [{ type: "text", text: otp }],
            },
          ],
        },
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`WhatsApp OTP send failed: ${res.status} ${body}`);
  }

  return res.json();
}
