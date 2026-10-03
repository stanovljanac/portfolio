/* Starting prices (EUR), shared by both language versions.
   Values wrapped in [[…]] are placeholders and must be filled in
   before production — the build prints a warning while any remain. */

export const PRICING = {
  website: "[[Y]]",
  landing: "[[X]]",
  maintenance: "[[Z]]",
  maintenanceHours: "[[N]]",
};

/* Special offer for the next three client projects. Set `open` to
   false once the three spots are taken — the block then disappears.
   The offer is not renewed. */
export const OFFER = {
  open: true,
  website: "[[Y′]]",
  landing: "[[X′]]",
};
