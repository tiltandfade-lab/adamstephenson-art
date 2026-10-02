# adamstephenson.art: changelog

Reverse-chronological log of changes to the portfolio site. Newest entries on top.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/): each entry is dated and grouped by `Fixed` / `Added` / `Changed` / `Removed`.

> **Note:** this changelog was started on 2026-05-01 as part of a portfolio-wide changelog rollout. Entries before 2026-05-01 are reconstructed from `git log` on the `main` branch and may collapse multiple commits into single dated entries. The CLAUDE.md inline "Change Log" table is preserved as a sibling source-of-truth.

Update protocol: when you make a load-bearing change to this repo (anything that touches deployed pages, the deploy pipeline, or the design system), add a CHANGELOG entry in the same edit. CLAUDE.md describes current state, CHANGELOG.md is the audit trail.

---

## 2026-10-02

### Changed
- **Rollback to the live site + palette only.** The 10 unpushed June commits are archived on branch `archive/june-local-2026-06-11` (tag `archive-june-local`); `main` reset to `origin/main` (9e73c8c). Carried forward: the warm near-black + verdigris palette (value-mapped across all 13 pages, dark text on accent backgrounds), plus CLAUDE.md, this changelog, `scripts/build.sh` and `.gitignore`. Not carried: Big Shoulders/Young Serif/Newsreader, sparkle removal on inner pages, de-AI link and image rules, June copy, Web3Forms form.
- Palette also applied to things the June commit missed: commission price-callout tint and border (orange alpha → verdigris alpha) and the inner-page sparkle particles.
- Homepage hero subline: "Public Artist · Atlanta, GA" → "Public Artist | Muralist | Designer | Atlanta Based" (verbatim Adam).
- Homepage statement section ("You remember the art that impacts you..." + two intro lines) replaced by a plain "My Work" section heading above the Murals / Digital & Design / Figurative tiles.
- Murals page header: intro sentence and "Since 2019 / Southeast & beyond" meta replaced by the subhead "Public Commissions | Festivals | Permanent Installations" (verbatim Adam).

- Section headings (Adam's pick from the lab: "Off-white · Playfair · None", linework full band, top slice, 13%): homepage "My Work", "Case Studies", "Selected Works" and murals "Case Studies" are now off-white Playfair over a full-width band of Hall of the Magician linework, tinted by CSS mask. Homepage "Selected Works" header extended to a full-width band.

- Headings and section labels set in title case site-wide (Adam 2026-10-02: "if Case Studies is init cap then My Work should be too"): My Work, murals subhead "Public Commissions", commission page The Process / Is This a Good Fit? / What Goes into the Price / Also Available: Vinyl Murals, About stats Went Pro / States & Counting / Largest Wall, contact Based In. Sentence-style headlines (commission h1, contact h1, CTAs) left as sentences for the copy sweep.

### Added
- `images/Song-of-the-Mockingbird-Flight.webp`: the full 6000×1260 Mockingbird sketch (all five birds), alpha levelled, 3200 px wide, 224 KB.
- `images/Song-of-the-Mockingbird-Sketch.webp`: Mockingbird pencil sketch, source x 3000–4700 of 6000, alpha levelled, alpha-only, 161 KB.
- `images/HOTM-Linework-Texture.webp`: Hall of the Magician linework (Upton proposal PSD, Cover group, Layer 1; extracted for the bumper lab), top 2560×960, alpha-only, 228 KB.

- Section headings centered horizontally and vertically in their bands (symmetric padding, grid centering); "View all work" stays pinned right of "Selected Works" and drops beneath it on phones.

- Contact page: the 2021 *Song of the Mockingbird* pencil sketch (`LOCK - Lockhart Mural Concepts/Process/sketch.png`, cropped to the perched bird) ghosted behind the form column with the same treatment as the heading linework: off-white at 13%, full height, centered. Pencil alpha levelled (40 to 150) so strokes read as solid light lines.
- Section headings ("My Work", "Case Studies", "Selected Works", murals "Case Studies") switched from Playfair Display to Lemon Milk Medium, Adam's brand font: uppercase, `clamp(1.5rem, 2.4vw, 2.2rem)`, 0.04em tracking (`--h-size`, `--h-track`). Served from `fonts/LEMONMILK-Medium.otf` (34 KB); `scripts/build.sh` now copies `fonts/`. Everything else stays Playfair for now.
- Heading linework position is now variable: `--tex-x` (sideways nudge in vw, so it scales with the band) and `--tex-y` (21%). The drawing's own mirror axis measures 0.39% of the width left of center; the lab has a snap-to-center button.
- Mockingbird sketch (contact form and all contact leads) faded from 13% to 8% (Adam).
- Heading linework mask rebuilt as three intersected layers (texture, left-right gradient, top-bottom gradient) driven by `--tex-fade-l/r/t/b`, `--tex-edge`, `--tex-curve` on the section bands, so the texture itself can fade at its edges. Adam's values from the lab: 29% left/right, 22% top/bottom, edge alpha 0, half-way point 0.45; linework strength raised 13% → 17%. Tuned in `labs/heading-fade.html` (gitignored).
- Contact leads (the closing call-to-action band on home, murals, digital, fine art and commission): full *Song of the Mockingbird* flight sketch behind each, off-white at 13%, `cover` so the wide bands show the whole sequence. About page CTA is inline buttons, not a band, so it has none.
- Static ornament (top rule with three diamonds + bottom echo with two) on the other section bands of the same rank: homepage "Case Studies" and "Selected Works", murals "Case Studies". Only "My Work" animates. Murals page carries a static copy of the ornament CSS.
- "My Work" bottom echo: the same draw on the band's bottom edge (straddling the seam with the preview tiles), side diamonds only, starting 0.2s after the top one (`--orn-echo-lag`).
- "My Work" top ornament (final values from Adam via the lab: cool white #EEF3F5, rule on the band's top edge so the diamonds straddle the hero/band seam, twinkle 0.45s soft, glint 84px / 1.1s; band no longer clips and sits at z-index 10, under the nav): rule with a small diamond 30px in from each side and a larger diamond centered. One-shot on reveal: center diamond twinkles in, the side diamonds travel out from it drawing the rule, center glints again when they land. Driven by `--orn-*` variables, including vertical position (`--orn-y` from the top or bottom via `--orn-from`, with a separate phone value); static under reduced motion. Tuned in `labs/ornament.html` (gitignored).

### Removed
- Red Bank outer-wall photo from the homepage hero rotation (Adam: bad photo of him at that scale). Red Bank stays in Selected Works.
- Homepage "Scroll" cue.
- Homepage CTA "Commission a print" button (Adam: "one button, one contact"). "Start a conversation" is the only button.

### Added
- `labs/section-headings.html` (gitignored, never deploys): color/type/treatment options for section headings.

---

## 2026-09-30

### Added
- `scripts/build.sh`: Cloudflare Pages build. Copies only the public site into `dist/` (89 files, largest 5.8 MB), keeping `stitch-references/` (two files over Cloudflare's 25 MiB limit), `CLAUDE.md` and working notes off the live site. Verified locally: 13 pages, 170 internal links, none missing.
- `.gitignore` for `dist/` and `.DS_Store`.

### Changed
- Contact form moved off Netlify Forms to Web3Forms (JSON POST to `api.web3forms.com`, honeypot `botcheck`). Until `WEB3FORMS_KEY` is set, submitting opens the visitor's email app with name, email and message filled in. Send failures show the email address instead of a false "received".
- CLAUDE.md: hosting documented as Cloudflare Pages (migration in progress, cutover target 2026-10-02).

---

## 2026-06-11

### Changed
- Statement line 2 finalized: "Some of it the soul keeps." (Adam-picked from active-voice drafts). Each sentence now renders as its own unbreakable line (span + nowrap) with fluid type sized off the measured 11.65em width of the longer line, so the lines never wrap at any viewport width, they just shrink.
- Homepage statement rewritten (verbatim Adam, chat 2026-06-11): "We remember the art that impacts us. It can become something that is carried by the soul." Replaces the 2026-06-10 Voice & Ideas line. Orphan on the old line fixed structurally with `text-wrap: balance` on the statement and CTA headline.
- Display font: Young Serif → Big Shoulders Display (Adam's pick after a five-candidate comparison; condensed civic-poster sans, fits the mural-festival world). Hero name now uppercase 700 at tightened line-height; page h1s and case-hero titles 700; mid-level headings 500. Newsreader italic retained for pull quotes, DM Sans body, Josefin Sans nav.
- Palette swap (de-AI pass batch 3): background #1C1C1E (Apple systemGray6) → warm near-black #1A1714; accent burnt orange #D4763B → verdigris #94D6CF sampled from The Scottie; text/dim/border tokens warmed to match (#EAE6E0 / #B8B2A9 / #2E2A26). Accent-background buttons switched to dark text (verdigris is light; white failed contrast). Steel blue #82B3C8 approved as optional secondary; parchment #F7EBD1 reserved as hand-drawn-mark ink.
- Contact page h1 "Let's make something worth seeing." → "Every mural starts with an email." (Adam-approved); intro first sentence trimmed to avoid repeating the h1.
- De-AI-pattern visual pass (batch 2): Playfair Display replaced site-wide with Young Serif (Newsreader italic for pull quotes/kicker — Young Serif has no italic). All artwork now renders at full brightness with no hover zoom; scrims only behind text. Links restyled to underlined sentence case; homepage preview links varied ("See the murals" / "See the design work" / "See the paintings"). Fade-up scroll reveals replaced with one-shot clip-path image wipe (images only, text static, reduced-motion safe). Hero/statement/CTA type weights normalized to 400, hero max size trimmed for Young Serif's heavier color.
- Copy: contact intro and message placeholder rewritten in Adam's voice (approved 2026-06-11, no em dashes per Adam); homepage CTA button "Start a conversation" → "Let's Talk!".

### Removed
- All decorative accent eyebrows (cta/contact/about/page/case "Case Study 01"-style labels) and all "→" link arrow suffixes (case-study prev/next pagination arrows retained). Letter-spacing hover tricks removed.

- Sparkle particle canvas removed from ALL remaining pages (about, contact, murals, commission, digital, fineart, and all six case studies) — completes the zero-continuous-animation rule that started with the homepage on 2026-06-10. First batch of the de-AI-pattern visual pass.

### Fixed
- Image wipe reveal rebuilt after images rendered black in local preview (curtain stuck): clip-path transition replaced with a transform-based curtain (`::after` slides off), plus triple fallback — transitionend cleanup, 1.6s per-element timer, 5s global timer — so an image can never stay hidden regardless of browser quirks.
- Appalachian Sunsets mislocated as "Atlanta, GA" in homepage gallery caption + alt — corrected to Red Bank, TN (four walls confirmed correct).
- `about.html` headshot alt text said "painting the Homecoming mural in Decatur" but the image is the Scottie headshot — corrected.
- Homepage section-preview tiles had one-word alts ("Murals", "Digital & Design", "Figurative") — replaced with descriptive artwork alts.

---

## 2026-06-10 (branch: visual-refresh)

### Changed
- Homepage visual refresh (on `visual-refresh` branch, pending review/merge): hero now rotates 5 murals with slow Ken Burns drift and crossfade; staggered hero name reveal; nav gains scrolled state (blur + darken); scroll-triggered reveals on statement, previews, case rows, and CTA; oversized outlined case study numerals; larger hero type. All motion respects `prefers-reduced-motion`.
- Homepage copy: replaced Claude-voice tagline block with verbatim Adam lines — "You remember the art that impacts you. You carry that with you." (Voice & Ideas, JEKS answer) plus two chat-verbatim intro lines (2026-06-10). Old tagline was on the banned-phrases list (see `feedback_voice_in_writing`).
- CTA rewritten: "Got a wall in mind?" / "Let's make a landmark." (Claude-drafted, explicitly approved by Adam 2026-06-10); buttons simplified to "Start a conversation" / "Commission a print".
- About page stat corrected 70 ft → 76 ft; Oakland poster year filled in (2024); CV PDF mirror refreshed (committed with this batch, from prior session).

### Removed
- Sparkle particle canvas removed from the homepage. Profiled as the fps bottleneck (confirmed via `?sparkle=off` A/B); even rewritten with sprite stamping + 30fps it kept the page under 60fps. New site-wide rule: zero continuous animation (see CLAUDE.md motion budget). Other pages still carry the old canvas until their refresh.
- Ken Burns hero zoom (same fps reasoning); hero is crossfade-only.
- Unpushed Web3Forms contact-form commit reverted; Netlify Forms retained until the Cloudflare Pages migration.

---

## 2026-05-01

### Added
- `CLAUDE.md` "Data ownership and additive-default rule" section protecting `Work/Quick Portfolio/`, case study source images, and the canon CV/Bio files. Cross-links to the role-wide rail in auto-memory.
- `CHANGELOG.md` (this file).

---

## Reconstructed history (best-effort, from git log)

### 2026-04 (multiple commits)

**Changed**
- About page: replaced stats with scale-forward trio, removed redundant client list (commit 91909d2).
- Switched body font to DM Sans, kept Josefin Sans on nav and buttons (commit ab9f6f8).
- Sitewide font size bump to 17px, palette image full-height layout (commit 5b37764).
- Homepage tagline tightened, digital page reorder, commission edits, em dashes removed (commit 8f728da).
- Digital page: reorder grid, update Inman Park poster titles (commit 6335935).
- Commission page: removed pricing intro, preserved final cost note, swapped header image (commit 7030d1c).

**Added**
- CV on About page plus three new mural case studies (commit b9a9bc7).
- Google Search Console verification meta tag (commit 694e62f).
- SEO scaffolding: schema.org JSON-LD, canonicals, geo tags, image alt text, sitemap (commit 010317e).
- Digital personal works, Oakland poster, palette to commission page (commit 97b99bc).

**Fixed**
- Mural info corrections: Red Bank not River Clay, From The Ashes in Chattanooga, Scottie naming (commit ada3ae9).
- About page rewrite: good-fit section, verbatim pull quote (commit 03e355d).
- Removed scaffolding line from about page, fixed mural info (commit c69fc18).

**Removed**
- All em dashes from visible content sitewide (commit 339502f). Aligns with Adam's wholesale ban on em dashes.

### 2026-04-07

**Fixed**
- **Netlify deploy cap incident.** Symptom: site went offline ("This team has exceeded the credit limit"). Root cause: Netlify Starter plan caps at 20 production deploys per month and we exceeded it by pushing after every small edit. Fix: added the BATCH COMMITS rule to CLAUDE.md, target less than 15 production deploys per month, prefer branch deploys for intermediate work. Backup migration target identified: Cloudflare Pages.

### 2026-04-04

**Added**
- GitHub repo created (`tiltandfade-lab/adamstephenson-art`).
- Netlify site created and connected (https://adamstephenson-art.netlify.app).
- Deploy pipeline verified working: `git push origin main` triggers auto-deploy in about 30 seconds.
- SSH auth set up on Adam's MacBook Pro (remote uses SSH not HTTPS to avoid the credential dance).
- `deploy` alias installed via `.zshrc_snippet.sh`: run `deploy "message"` from anywhere to push.
- CLAUDE.md created.
- Design Document v2 already complete (built in earlier session from Quick Portfolio source files).
