/* The email address is stored as character codes, so it never appears as
   readable text in the HTML or JS files, and it is never shown on the
   page: a link only gets its real mailto: address at the moment a visitor
   clicks it (see <ContactLink>). This deters scrapers that harvest
   addresses from page source — it is not a security measure.
   Never write the address in plain text anywhere in the repo. */
const EMAIL_CODES = [115, 101, 98, 101, 107, 109, 105, 104, 97, 105, 108, 111, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];

const decode = (codes: number[]) => String.fromCharCode(...codes);

/** Built only when a contact link is clicked. */
export function emailHref(): string {
  return `mailto:${decode(EMAIL_CODES)}`;
}
