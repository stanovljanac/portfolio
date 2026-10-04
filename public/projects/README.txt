Project screenshots used on the site.

  mb-hair-salon.png         -> featured work card (desktop)
  mb-hair-salon-mobile.png  -> phone frame in the hero (interim, see below)
  keeper.png                -> Keeper card
  automation-desk.png       -> The Automation Desk card
  invoice.png               -> Invoice Generator card (Mihailo's dashboard screenshot;
                               the live app needs a login, so it is not captured)

Paths are set in src/data/projects.ts (cards) and SALON_MOBILE_SHOT in
src/components/Hero.tsx (hero). A missing image falls back to a placeholder.

All of these are interim. They get recaptured at a consistent size and
resolution (desktop 1440x900 @2x, mobile 390x844 @3x, WebP + srcset) in
session 3 of docs/ROADMAP.md.
