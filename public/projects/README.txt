Project screenshots used on the site (src/data/projects.ts).

  web-studio-demo-{640,960,1280,1600}.webp   Web Studio Demo: the hero with the
                                             nav, from a local build of the demo
                                             repo (F:\AI\web-studio-demo), the
                                             demo notice closed
  mb-hair-salon-{640,960,1280,1600}.webp     MB Hair Salon (the booking section)
  keeper-{640,960,1280,1600}.webp            Keeper
  invoice-{640,960,1280,1600}.webp           Invoice Generator: my own dashboard,
                                             the live app needs a login

Format
  Desktop 1440x900 @2x, cut to 16:10, WebP at 640/960/1280/1600 px.
  The webp() helper in src/data/projects.ts builds src (the 960 file) and
  srcset from the slug. Cards show the top of the image (object-position: top)
  in a 16:10 browser frame drawn in CSS.

The WebP files come from scripts/capture-projects.mjs on the business-site
branch (claude/loving-noether-cqi5ff), except web-studio-demo: a 1440x900
@2x Playwright screenshot exported with sharp at the same settings
(WebP quality 82, smartSubsample, effort 6).
