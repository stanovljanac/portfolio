/* Direct contact channels. Fill in before production.
   PHONE is in international format without "+" or spaces (e.g. 381601234567). */

export const EMAIL = "[[email]]";
export const PHONE = "[[telefon]]";

export const LINKS = {
  email: `mailto:${EMAIL}`,
  viber: `viber://chat?number=%2B${PHONE}`,
  whatsapp: `https://wa.me/${PHONE}`,
};
