Drop product cover images here.

The Products section looks for:
  - keeper-{640,960,1280,1600}.webp          -> Keeper card cover
  - invoice-{640,960,1280,1600}.webp         -> Invoice Generator card cover
  - automation-desk-{640,960,1280,1600}.webp -> The Automation Desk card cover
  - animated-tales.png                       -> Animated Tales card cover
  - hair-salon.png                           -> MB Hair Salon card cover

Recommended: 16:10 ratio (e.g. 1440×900). Preferred format is WebP
at 640/960/1280/1600 px wide, set as `image:` (the 960 file) plus
`srcSet:` in src/data/projects.ts, so the browser picks the right
width. A single PNG or JPG in `image:` still works.

If a file is missing, the card automatically falls back to its
gradient + aperture mark, so nothing breaks in the meantime.
