import { useEffect, useState } from "react";

/* Contact details are stored as character codes, so they never appear as
   readable text in the JS files. Before the page has loaded (and in the
   prerendered HTML) they are written backwards and flipped back with CSS
   (see <Obfuscated>); real text and links are swapped in after load.
   This only deters simple scrapers that look for "@" or phone numbers in
   page source — it is not a security measure. */
const EMAIL_CODES = [115, 101, 98, 101, 107, 109, 105, 104, 97, 105, 108, 111, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];
/** International format, digits only. */
const PHONE_CODES = [51, 56, 49, 54, 48, 51, 51, 55, 52, 54, 51, 51];

const decode = (codes: number[]) => String.fromCharCode(...codes);
const email = decode(EMAIL_CODES);
const phone = decode(PHONE_CODES);

export const CONTACT = {
  email,
  phoneDisplay: `+${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(8)}`,
  links: {
    email: `mailto:${email}`,
    viber: `viber://chat?number=%2B${phone}`,
    whatsapp: `https://wa.me/${phone}`,
  },
};

// Set once the app has hydrated; components that appear later (e.g. an
// error message) can then show the real text straight away.
let hydrated = false;

/** false on the server and during hydration, true once the page has loaded. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(hydrated);
  useEffect(() => {
    hydrated = true;
    setMounted(true);
  }, []);
  return mounted;
}
