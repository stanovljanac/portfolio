Project screenshots used on the site (src/data/projects.ts).

  mb-hair-salon-{640,960,1280,1600}.webp     MB Hair Salon (the booking section)
  keeper-{640,960,1280,1600}.webp            Keeper
  invoice-{640,960,1280,1600}.webp           Invoice Generator: my own dashboard,
                                             the live app needs a login
  automation-desk-{640,960,1280,1600}.webp   The Automation Desk
  animated-tales.png                         Animated Tales (1280x800; to be
                                             recaptured as WebP)

Format
  Desktop 1440x900 @2x, cut to 16:10, WebP at 640/960/1280/1600 px.
  The webp() helper in src/data/projects.ts builds src (the 960 file) and
  srcset from the slug. Cards show the top of the image (object-position: top)
  in a 16:10 browser frame drawn in CSS.

The WebP files come from scripts/capture-projects.mjs on the business-site
branch (claude/loving-noether-cqi5ff).
