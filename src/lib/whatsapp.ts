export type WhatsAppRegistration = {
  phone: string;
  fullName: string;
  trialLocation: string;
  packageLabel: string;
};

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

  const toNumber = reg.phone.replace(/\D/g, "");
  const fullNumber = toNumber.length === 10 ? `91${toNumber}` : toNumber;

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
                { type: "text", text: reg.fullName },
                { type: "text", text: reg.trialLocation },
                { type: "text", text: reg.packageLabel },
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
