# Google Stitch Design Brief — adamstephenson.art

## How to Use This

1. Open [Google Stitch](https://stitch.withgoogle.com)
2. Upload the reference images listed for each page (from your Quick Portfolio folder)
3. Paste the prompt for that page
4. Generate 3–4 variations, pick the strongest, refine
5. Hand the mockup to Claude to build

Do one page at a time. Start with **Homepage** — it sets the tone for everything else.

---

## Global Style Rules (apply to every page)

Paste this block at the top of every Stitch prompt, then add the page-specific section below it:

```
STYLE FOUNDATION:
- Background: near-black #1C1C1E (not pure black — slightly warm dark gray)
- Accent color: warm amber #D4763B
- Body text: white or light gray on dark backgrounds
- Font: clean, modern sans-serif (Inter or similar) — not condensed, not decorative
- No drop shadows, no gradients, no glassmorphism
- Minimal UI — let the artwork breathe
- Navigation: horizontal top nav, all-caps or small-caps labels, simple underline or color hover state
- No carousels or sliders
- Image containers do NOT force uniform aspect ratios — images display at their natural proportions
- White space is generous — this is a gallery, not a grid of thumbnails
- Overall mood: serious, confident, contemporary art gallery meets working muralist
```

---

## Page 1: Homepage

**Reference images to upload:**
- `Murals/STEPHENSON-Mural-Atlanta-GA-Upton-TunnelFull.jpg` ← hero candidate (ultra-wide)
- `Murals/STEPHENSON-Mural-Decatur-AL-Homecoming-Full.jpg` ← hero candidate (panoramic)
- `Murals/STEPHENSON-True-Strength-Mural-Atlanta-GA-Pullman-Yards.jpg` ← hero candidate
- `Murals/ACMF-2024-Atlanta-Full.jpg` ← hero candidate
- `headshots/STEPHENSON-Headshot-2024.png` ← for tone reference

**Prompt:**
```
Design a homepage for a public artist's portfolio website. The artist is Adam Stephenson —
a muralist, illustrator, and digital designer based in Atlanta, GA.

LAYOUT:
- Full-width hero image taking up 80–90% of the viewport height. Single large mural photograph,
  no text overlay except the artist's name in the bottom-left corner (large, quiet, white).
- Below the hero: a short 2–3 line tagline. Something like "Public art. Large scale.
  Built to last." — simple, confident, left-aligned.
- Below that: a 3-column section with brief navigation hints — Murals / Digital & Design / Fine Art —
  each with a small image preview and a 1-line description. These link to interior pages.
- Footer: minimal. Name, navigation links, Instagram icon only.

No hero text overlay. No "Welcome to my portfolio." No animated text. No call-to-action buttons.
The hero image does the talking.

Apply the STYLE FOUNDATION above.
```

---

## Page 2: Murals (Main Gallery)

**Reference images to upload:**
- `Murals/STEPHENSON-Mural-Atlanta-GA-Upton-Exterior.jpg` (tall — building exterior)
- `Murals/ACMF-2024-Atlanta-Full.jpg` (ultra-wide panoramic)
- `Murals/Homecoming-2019-Decatur-AL-Full.jpg` (wide landscape)
- `Murals/Burn-2020-From-the-Ashes-Phoenix.jpg`
- `Murals/STEPHENSON-Mural-Huntsville-AL-BD-Portrait.jpg` (vertical — figure study)
- `Process & Progress/STEPHENSON-Process-Upton-JCB-Action.jpg` (process shot)

**Prompt:**
```
Design a murals gallery page for a public artist's portfolio.

CRITICAL CONSTRAINT: The artist's murals span wildly different aspect ratios — some are
ultra-wide panoramas (2.4:1), some are square, some are tall building facades (0.6:1).
The layout MUST accommodate all of these naturally without cropping or forcing uniform sizes.

LAYOUT:
- Page header: "Murals" — large, left-aligned, minimal
- Below header: 4 featured case studies displayed as large stacked sections. Each section has:
  - A full-width or near-full-width image at its natural aspect ratio
  - Below the image: project title (left), location and year (right)
  - A 2–3 sentence description below that in smaller text
- Below the case studies: a masonry-style grid of additional mural thumbnails
  (mix of sizes, natural aspect ratios, tight spacing, no captions needed)
- The masonry grid should feel like a well-organized wall, not a photo grid app

The 4 case studies are:
1. Homecoming — Decatur, AL, 2019
2. Playing the Sound of the Wind — multi-panel installation
3. The Upton — Atlanta, GA
4. Appalachian Sunsets — landscape series

Apply the STYLE FOUNDATION above.
```

---

## Page 3: Digital & Design

**Reference images to upload:**
- `Digital Commissions/IPNA-2023-Inman-Park-Festival-Poster.jpg`
- `Digital Commissions/IPNA-2024-Inman-Park-Festival-Poster-Alt.png`
- `Digital Commissions/NOW-2025-Bastrop-LA-Final.png`
- `Digital Commissions/NOW-2025-Homewood-AL-Final.jpg`
- `Digital Commissions/NOW-2025-MountainIron-MN-Final.png`
- `Digital Commissions/STEPHENSON-Digital-Capturing-Spirit-Oakland-Atlanta-GA.jpg`

**Prompt:**
```
Design a Digital & Design portfolio page for a muralist and illustrator.

This section covers: festival poster design, printed mural commissions (designs created
digitally, then printed and installed at large scale), and digital illustration commissions.

LAYOUT:
- Page header: "Digital & Design" — large, left-aligned
- Brief intro line: "Illustration, poster design, and printed mural commissions."
- Three subsections, each with a subtle divider:
  1. "Festival Posters" — 2-column grid, images at natural proportions (mostly portrait orientation)
  2. "Printed Murals" — mixed grid, some images showing final design + install shot side by side
  3. "Digital Illustration" — smaller grid, more casual feel
- Each image: hover state reveals title and year (subtle, no heavy overlay)

The work here is colorful and graphic. The dark background makes the colors pop.
Don't mute or neutralize the images with heavy UI chrome.

Apply the STYLE FOUNDATION above.
```

---

## Page 4: Fine Art

**Reference images to upload:**
- `Fine Art & Portraits/STEPHENSON-FineArt-Abstract-Goodbye.jpg`
- `Fine Art & Portraits/STEPHENSON-FineArt-Jaz-1.jpg`
- `Fine Art & Portraits/STEPHENSON-Portrait-Taylor-compressed.jpg`
- `Fine Art & Portraits/STEPHENSON-Portrait-Paola.jpg`
- `Fine Art & Portraits/STEPHENSON-Portrait-Donatello.jpg`

**Prompt:**
```
Design a Fine Art page for a multidisciplinary artist's portfolio.

This section shows studio work: figurative paintings, portraits, and abstract pieces.
The work is more intimate than the public murals — smaller scale, more personal.

LAYOUT:
- Page header: "Fine Art" — large, left-aligned
- Short artist quote below header (1–2 sentences, italicized, pulled from his statement):
  "I explore different directions in both figurative and abstract work, using each
  for different kinds of meaning."
- Gallery display: a single-column or wide 2-column layout where each work gets real
  space. Images at natural proportions (mix of portrait and landscape).
- Minimal captions: title, medium, year. Nothing more.
- No pricing, no "available" tags, no commercial language. This is a studio practice
  section, not a shop.
- The mood here should be quieter and more contemplative than the murals section.
  More space between images.

Apply the STYLE FOUNDATION above.
```

---

## Page 5: About

**Reference images to upload:**
- `headshots/STEPHENSON-Headshot-2024.png`
- `Process & Progress/Scottie-2023-Nashville-Artist.jpg` (artist at work, good energy)
- `Process & Progress/STEPHENSON-Process-RedBank-TN-Action.jpg`

**Prompt:**
```
Design an About page for a public artist's portfolio website.

LAYOUT:
- Left column (40%): large portrait photo of the artist — straightforward, confident,
  not overly styled. Below it, a secondary image of the artist working on a mural.
- Right column (60%):
  - Name in large type at top
  - Short bio paragraph (3–4 sentences). The artist is Adam Stephenson — Atlanta-based
    muralist, illustrator, and designer. Multidisciplinary practice spanning public murals,
    studio work, design, and photography. Background in music composition.
  - CV highlights below the bio: selected commissions, collaborations, festivals —
    formatted as a clean list, not a table. Years on the left, title/location on the right.
  - At the bottom: Instagram handle + email contact link only.

No "hire me" button. No testimonials section. No skills progress bars.
Just the person, the work history, and how to reach them.

Apply the STYLE FOUNDATION above.
```

---

## Page 6: Contact

**Reference images to upload:**
- Any strong wide mural image as background reference for tone (optional)

**Prompt:**
```
Design a minimal contact page for an artist's portfolio.

LAYOUT:
- Simple, centered or left-aligned layout
- A single heading: "Get in touch"
- Below it, 2–3 sentences of context: "Available for public mural commissions,
  digital illustration, festival posters, and collaborative projects."
- Contact form with 4 fields only: Name, Email, Project type (dropdown), Message
- Submit button styled with the amber accent color #D4763B
- Below the form: email address as plain text (for people who prefer direct email)
- Instagram link
- No phone number, no physical address, no map embed

The page should feel like the end of a well-designed book — quiet, purposeful,
no filler content.

Apply the STYLE FOUNDATION above.
```

---

## Tips for Getting Good Results from Stitch

- **Upload 3–5 images max** per prompt. More than that and Stitch gets confused about what to prioritize.
- **Generate 3–4 variations** per page before committing. The first result is rarely the best.
- **Focus on layout, not color** — Stitch's color sense is unreliable. Describe color in the STYLE FOUNDATION block but expect to correct it. Claude will handle the exact color implementation in code.
- **Export or screenshot** the mockup you like best, then share it with Claude to build.
- **Do Homepage first.** Once that tone is set, the other pages are much easier to prompt.
- If Stitch adds carousels, sliders, or uniform-crop image grids — reject that variation and regenerate. Those are hard constraints.
