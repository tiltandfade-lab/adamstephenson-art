# adamstephenson.art — Project Context for Claude

> **Read this file at the start of every session.** It keeps Claude oriented on what we're building, the decisions already made, and where we left off.

---

## Who This Is For

**Adam Stephenson** — public artist, muralist, illustrator, and digital designer based in Atlanta, GA (originally Decatur, AL). Graffiti roots, music composition background. Does large-scale public murals, printed digital commissions, fine art, and TTRPG tooling on the side.

- Email: adamstephenson17@gmail.com
- Domain: adamstephenson.art (already owned, placeholder site live)
- GitHub: tiltandfade-lab (org account)

---

## What We're Building

### 1. Portfolio Website — adamstephenson.art
A bespoke, hand-coded portfolio site. **Not a CMS template. Not modular.** Every page is designed and coded individually. This is a deliberate choice — Adam's work doesn't fit standard dimensions (murals span aspect ratios from 0.60:1 to 2.36:1) and WordPress/Squarespace templates always felt like a straitjacket.

### 2. TTRPG Adventure Generator (later)
A web app that generates dungeon/urban adventure content for tabletop RPGs. Adam has existing logic built in Obsidian JS with data tables. Will be ported to a web UI. Lightweight for now — outputs series of markdown files. Hosted in the same GitHub org, separate repo TBD.

---

## Tech Stack — Portfolio Site

| Layer | Tool | Notes |
|---|---|---|
| Design mockups | Google Stitch | Free tier, 350 gen/mo. Adam creates mockups, hands to Claude to build |
| Code | Raw HTML / CSS / JS | No framework. Bespoke per page. |
| Hosting | **Netlify (live)** → Cloudflare planned, see "Cloudflare migration plan" below | Cloudflare: no deploy cap, 25 MiB per-file limit. Build: `bash scripts/build.sh` → `dist/` (Netlify ignores it and publishes the repo root). |
| Repo | GitHub (`tiltandfade-lab/adamstephenson-art`) | |
| CMS | Notion (Art Practice HQ) | Portfolio database already well-structured. Used as data source, not build step. |
| Images | WebP, max 2400px, under 300KB | Responsive srcset. Two .heic files need conversion (Bastrop LA + Homewood AL installs). |

**Deploy pipeline:** `git push origin main` → Netlify auto-deploys the repo root (20 production deploys/month cap). After the Cloudflare cutover, Cloudflare runs `scripts/build.sh` and deploys `dist/`.

**What gets published (Cloudflare):** only what `scripts/build.sh` copies — the root `*.html` and `*.js`, `images/`, `gallery/`, `docs/*.pdf`, `sitemap.xml`, `robots.txt`. `stitch-references/` (files up to 39 MB, over Cloudflare's limit), `CLAUDE.md`, `CHANGELOG.md`, `README.md`, `STITCH-BRIEF.md` and other notes stay out. **When adding a new top-level folder or file type the site needs, add it to `scripts/build.sh`.**

**Contact form:** live uses Netlify Forms (`netlify` attribute in `contact.html`), which stops working the moment the site leaves Netlify. The Web3Forms replacement is in the archive branch and ships first (step 1 of the migration plan).

---

## Infrastructure — Already Set Up

- **GitHub repo:** https://github.com/tiltandfade-lab/adamstephenson-art
- **Netlify site:** https://adamstephenson-art.netlify.app
- **Netlify admin:** https://app.netlify.com/projects/adamstephenson-art
- **Netlify ↔ GitHub:** Connected via GitHub App (installation ID 121387029). Push to `main` = auto-deploy.
- **Remote protocol: SSH** (`git@github.com:tiltandfade-lab/adamstephenson-art.git`). HTTPS keeps expiring its cached token and prompting for a username, which always fails because GitHub no longer accepts account passwords at that prompt. SSH avoids the whole credential dance.
- **Deploys verified working** as of 2026-04-04.

### Deploy workflow — IMPORTANT for Claude

**Claude can stage and commit locally, but cannot push.** The sandbox does not carry Adam's GitHub credentials or SSH key. Every deploy Claude does:

1. `git add <specific files>` — prefer staging specific paths over `git add .` so internal docs (like `docs/CONSULTANT-READINESS.md`) don't accidentally get published.
2. `git commit -m "..."` with a real descriptive message.
3. **Stop there.** Tell Adam the commit is staged and give him the exact push command.

**The push command to give Adam, every time:**
```bash
cd ~/Desktop/Work/adamstephenson-art && git push origin main
```

That's it. No username prompt, because the remote is SSH. Netlify picks it up in ~30 seconds.

### If the push ever asks for a username again

The remote got reset to HTTPS somehow. Fix:
```bash
git remote set-url origin git@github.com:tiltandfade-lab/adamstephenson-art.git
git push origin main
```

### Sandbox quirk Claude should know about

When Claude runs `git add` from the sandbox bash, Git will emit a pile of `unable to unlink '.git/objects/tmp_obj_…': Operation not permitted` warnings. These are harmless — staging still works. Sometimes Git also leaves a stale `.git/index.lock`; if so, delete it with `rm -f .git/index.lock` (Claude may need to call `allow_cowork_file_delete` on `.git/index.lock` first to enable deletes in the Desktop folder for this session).

> Claude writes files and commits. Adam pushes over SSH. Netlify deploys. No FTP, no tokens, no username prompts.

### ⚠️ Netlify deploy cap — BATCH COMMITS

**Netlify Starter plan = 20 production deploys/month.** When exceeded, Netlify takes the **entire site offline** ("This team has exceeded the credit limit") until the billing cycle resets or the team upgrades. This already bit us once on 2026-04-07.

**Rule for Claude going forward:** Do NOT push after every small edit. Batch related changes into a single commit, and only hand Adam the push command when a meaningful chunk of work is ready to ship. If iterating on multiple files in one session, stage everything and make ONE commit at the end rather than committing per-file.

Rough budget: aim for **≤15 production deploys per month** on the Netlify side to leave headroom for emergencies. If Adam wants to see intermediate work, preview locally or use a branch deploy instead of pushing to `main`.

**Migration planned:** steps in "Cloudflare migration plan" below. Once cut over, this whole Netlify section can be retired.

---

## Site Structure

**Navigation:** Home | Murals | Digital & Design | Fine Art | About | Contact

### Pages
| Page | Status | Notes |
|---|---|---|
| Home | Not started | Hero rotates 5 specific images (see design doc). Dark bg (#1C1C1E). |
| Murals | Not started | 4 case studies + gallery grid. Masonry layout critical. |
| Digital & Design | Not started | Printed murals, illustration commissions, digital work. |
| Fine Art | Not started | Canvas, works on paper. |
| About | Not started | Bio + CV highlights. |
| Contact | Not started | Simple form or email link. |

### Case Studies (Murals page)
1. **Homecoming** — Decatur, AL. Community mural.
2. **Playing the Sound of the Wind** — Multi-panel installation.
3. **The Upton** — Atlanta. Commissioned building mural.
4. **Appalachian Sunsets** — Landscape series.

---

## Design System

| Token | Value | Notes |
|---|---|---|
| Background | `#1A1714` | Warm near-black (swapped from #1C1C1E 2026-06-11 — that hex is Apple systemGray6, an AI tell). Dark because Adam's work is colorful — white washes it out. |
| Accent | `#94D6CF` | Verdigris, sampled from The Scottie (swapped from burnt orange #D4763B 2026-06-11 — charcoal+orange is the AI duo). Steel blue `#82B3C8` approved as optional secondary. Parchment `#F7EBD1` reserved as ink color for hand-drawn SVG marks. Accent-background buttons use dark text `#1A1714`, never white. Text `#EAE6E0`, dim `#B8B2A9`, border `#2E2A26`. |
| Display font | Lemon Milk (all pages) | Adam 2026-10-02: replaced Playfair Display everywhere. `fonts/LEMONMILK-{Light,Regular,RegularItalic,Medium}.otf`, @font-face at the top of each page's <style>. All caps by design (no lowercase). Weights: 300 hero name / CTA headline, 400 titles, 400 italic pull quotes, 500 section headings. Long single words need phone-safe minimum sizes (≈0.73em per letter incl. tracking). |
| Section heading font | Lemon Milk Medium | Uppercase, `--h-size` / `--h-track` on the bands. Same @font-face set as the rest of the page. |
| Quote/italic font | Lemon Milk Regular Italic | Pull quotes and the CTA kicker. Reads as italic capitals; revisit in the copy sweep if long quotes feel heavy. |
| Nav/labels | Josefin Sans | |
| Body font | DM Sans | |
| Artwork treatment | Live: preview tiles dim + hover zoom | The June de-AI rules (full brightness, no hover scale) are archived, not live. Reconsider during the full sweep. |
| Section headings | Off-white Playfair + linework band | Adam's pick 2026-10-02. `clamp(2rem, 3vw, 2.8rem)` Playfair 400 in `--text`, over a `::after` band filled with `--text` at 17% opacity (edges faded, see below) and masked by `images/HOTM-Linework-Texture.webp` (`center 21% / cover`). The texture is the Hall of the Magician linework from `UP - The Upton/Proposals/w1_Grounded In My Light_Adam Stephenson.psd` (Cover group, Layer 1), cropped to the top 2560×960 and saved as alpha-only WebP (228 KB). |
| Heading texture edge fade | CSS mask layers | The `::after` mask is three layers intersected (`mask-composite: intersect` / `-webkit-mask-composite: source-in`): the linework image, a left-right gradient and a top-bottom gradient. Variables on the band: `--tex-fade-l/r/t/b` (how far in each fade reaches), `--tex-edge` (alpha left at the edge), `--tex-curve` (gradient transition hint: where the fade is half strength). Current: 29% left/right, 22% top/bottom, edge 0, curve 0.45, linework opacity 0.17 (Adam 2026-10-02). Position: `--tex-x: 0.45vw`, `--tex-y: 3%` (Adam's pick; the drawing's measured axis is 0.39vw left of center). Pure CSS; the lab only moves the variables. murals.html has its own copy. |
| Contact form background | Mockingbird pencil sketch | Adam 2026-10-02. `.contact-form-wrap::before`, `--text` at 8% masked by `images/Song-of-the-Mockingbird-Sketch.webp` (`center / auto 100%`, alpha levelled 40 to 150 so pencil reads as solid light line). Source: `/Volumes/Work Drive/LOCK - Lockhart Mural Concepts/Process/sketch.png` (6000×1260, Jan 2021, the *Song of the Mockingbird* concept later proposed to Marietta, M2R), cropped to the perched bird. Same technique as the heading linework: his own drawings as ghosted texture, never invented ornament. |
| Contact lead background | Mockingbird flight sketch | Adam 2026-10-02. Each page's closing CTA band (`.cta` home, `.cta-strip` murals/digital/fineart, `.commission-cta`) gets `::before` with `--text` at 8% masked by `images/Song-of-the-Mockingbird-Flight.webp` (`center / cover`): the whole 5-bird sequence, since these bands are wide. The contact page form uses the single-bird crop at full height. |
| Section ornament | Cool white rule (edge to edge) + 3 diamonds on each section band's top seam; echo (2 side diamonds, no center) on the bottom seam | Only "My Work" animates (one-shot draw, echo 0.2s behind); "Case Studies", "Selected Works" (home) and murals "Case Studies" show it static. murals.html has its own static copy of the CSS, so change values in both files. | Adam 2026-10-02. Markup `.ornament` in the My Work band; all sizes/timings/position are `--orn-*` variables on `.ornament` in index.html; vertical position is `--orn-y` (+ `--orn-from` 1 = from top, 0 = from bottom), with a phone override of `--orn-y` in the ≤600px block, because the band is 163px tall on desktop but 117px on phones. Tune in `labs/ornament.html` (its CSS is a copy of the site block; re-copy if the site block changes). Plays once when the band is revealed, never loops (motion budget). `.section-heading` is `overflow: visible; z-index: 10` so the diamonds overhang into the hero (nav stays above at 100). |
| Heading case | Title Case | Adam 2026-10-02: every heading and section label in title case (My Work, Case Studies, The Process). Artwork titles keep their own styling. Full-sentence headlines (e.g. "Got a wall in mind?") are still sentences, pending the copy sweep. |
| Link style | Live: tracked caps + "→" arrows | The June rules (underlined sentence case, no arrows, no eyebrows) are archived, not live. Reconsider during the full sweep. |
| Image layout | Masonry grid | Required — 6 aspect ratio categories (0.60:1 to 2.36:1). |
| Motion budget | Zero continuous animation (goal) | Adam's call 2026-06-10: 60fps beats sprinkles. Homepage sparkle is gone; **inner pages still run the sparkle canvas** (recolored verdigris 2026-10-02, because the removal was archived with the June pass). Never add Ken Burns or other infinite animations. Event-triggered transitions are fine. |
| Image format | WebP, srcset | Max 2400px wide, under 300KB each. |

---

## Key Source Files (on Adam's Desktop)

| File | Location | What it contains |
|---|---|---|
| Design Document v2 | `Work/Quick Portfolio/Portfolio_Website_Design_Document_v2.docx` | Full spec: all pages, case studies with exact image filenames/dimensions, CMS strategy, open questions. **Read this before building anything.** |
| Portfolio Brief | `Work/Quick Portfolio/Adam_Stephenson_Portfolio_Brief_for_Google_Stitch.docx` | Brief written specifically for Stitch mockup generation. Curatorial decisions, image inventory. |
| Bio | `Work/Quick Portfolio/STEPHENSON-Bio.docx` | Third-person bio for About page. |
| CV (canon) | `Work/Quick Portfolio/_Documents/STEPHENSON-CV-2026.docx` | **Curated, hand-edited shareable CV.** Read `Work/Quick Portfolio/_Documents/CV-ARCHITECTURE.md` before touching. Notion is the unedited source-of-truth history; this docx is the curated subset. The website's `docs/Adam-Stephenson-CV-2026.pdf` is a downstream mirror. |
| Images | `Work/Quick Portfolio/` + subfolders | All portfolio images. Two .heic files need conversion before web use. |

---

## Data ownership and additive-default rule

The role-wide rail (auto-memory `feedback_additive_default_data_ops.md`) applies here: operations on user-curated data are additive by default. Destructive ops require explicit confirmation with item counts.

**Curated data, never wipe or regenerate without explicit conversation:**
- `Work/Quick Portfolio/` and all subfolders. Adam's hand-curated portfolio source set, including images, the Design Document v2, the Stitch Brief, the canon Bio, the canon CV, and the documents subdirectory. Image files in particular are irreplaceable, some originate from older drives or one-off exports.
- The case study source images (Homecoming, Playing the Sound of the Wind, The Upton, Appalachian Sunsets). Heic-to-WebP conversion produces a new file; it does not delete the original.
- `docs/Adam-Stephenson-CV-2026.pdf` is a downstream mirror, regenerable. The canon `.docx` is not.
- The CHANGELOG and any `docs/CONSULTANT-READINESS.md`-style internal notes. Don't "tidy" them by deletion.

**Concrete rules:**
1. When converting image formats (heic to WebP, resizing, compression), write the converted file alongside the original. Do not overwrite the original.
2. Do not run `git rm` or any bulk file deletion against `Work/Quick Portfolio/` from this repo's tooling. The portfolio source set is outside this repo's authority.
3. If you regenerate a downstream artifact (the CV PDF, an exported image kit), confirm with Adam that the upstream source is intact before doing so.
4. Do not attempt to "deduplicate" the portfolio image set. Variants and crops exist on purpose.

---

## Adam's Preferences & Opinions

- **Hates:** Modular CMS templates, Squarespace/WordPress constraints, carousels, standard dimensions being imposed on non-standard work.
- **Loves:** Bespoke design, vibe coding, page-by-page creative control.
- **Workflow style:** Describe → Stitch mockup → Claude builds → Adam reviews → git push.
- **On carousels:** "I don't even really like carousels." Use static layouts where possible.
- **On tools:** Prefers doing everything through Claude (Cowork). Avoids extra SaaS subscriptions where possible.

---

## Current Subscriptions
- Claude Pro (heavy building mode)
- Google AI (Gemini / Stitch access)
- Total: ~$120/mo. May reduce Claude tier once heavy building phase ends.

---

## Session Resume Checklist

When starting a new session, Claude should:
1. Read this file (`CLAUDE.md`)
2. Read `Work/Quick Portfolio/Portfolio_Website_Design_Document_v2.docx` for full spec
3. Check `Work/adamstephenson-art/` for any existing code files
4. Ask Adam what he wants to work on today

---

## Where we are — 2026-10-02 (rollback + sweep start)

**Rollback.** The 10 unpushed June commits are archived on branch `archive/june-local-2026-06-11` (tag `archive-june-local`). Local `main` was reset to the live site (`origin/main` 9e73c8c), then only these carried forward:
- **Palette** (warm near-black `#1A1714`, verdigris `#94D6CF`, warmed text/dim/border, dark text on accent buttons), applied by value mapping across all 13 pages. Also recolored the commission price callout tint and the inner-page sparkle particles, which the June commit had missed or removed.
- **Notes and tooling:** this file, CHANGELOG.md, `scripts/build.sh`, `.gitignore`.
- Anything else from June (Web3Forms contact form, copy, de-AI rules) can be pulled from the archive branch file by file: `git show archive/june-local-2026-06-11:<file>`.

**Working rule:** work locally until Adam is happy, then ONE push. Preview with the `art-site` launch config (python http.server on port 5181, repo root).

**Done this session (local, unpushed):** hero drops the Red Bank slide (still in Selected Works); hero subline = "Public Artist | Muralist | Designer | Atlanta Based" (verbatim); homepage statement section replaced by a "My Work" section heading; Scroll cue removed; murals page intro + "Since 2019 / Southeast & beyond" replaced by the subhead "Public Commissions | Festivals | Permanent Installations" (verbatim).

**Open:**
1. ~~Section heading color~~ Done 2026-10-02 (Adam's pick in the lab): off-white Playfair section headings over a full-width band of Hall of the Magician linework, top slice, 13%. Applied to homepage "My Work" / "Case Studies" / "Selected Works" and murals "Case Studies". About page headings are in-column labels, left for the full sweep.
2. Sparkle canvas on inner pages: keep (verdigris) or remove? Adam's call.
3. Full-site sweep (copy slop pass, truth pass on claims, About rewrite, Hall of the Magician update with 6 new photos in `/Volumes/Work Drive/UP - The Upton/Final Photos/`). June backlog notes are in the archive branch's CLAUDE.md.

## Cloudflare migration plan (agreed shape, 2026-10-02)

One variable at a time; each step is reversible; the domain moves last.
1. **Form first, still on Netlify.** Swap Netlify Forms → Web3Forms (code exists in the archive branch's `contact.html`). Adam creates the free key at web3forms.com himself. Ships in the sweep push; test one real submission on the live site. Export old Netlify submissions (Netlify → Forms → CSV).
2. **Cloudflare in parallel.** Connect the GitHub repo to a Cloudflare project that runs `bash scripts/build.sh` and serves `dist/`. Check the preview URL against the live site, including Netlify-style pretty URLs (`/murals` → `murals.html`), since Google has indexed those.
3. **Add the domain to Cloudflare (Free plan) without switching yet.** Confirm the imported DNS has all five Google MX records (`aspmx.l.google.com` 1, `alt1`/`alt2` 5, `alt3`/`alt4` 10). **Never enable Cloudflare Email Routing**: it replaces the root MX and breaks Google Workspace mail. DNSSEC is off at get.art (no DS record, checked 2026-10-02), so the nameserver switch can't strand the domain.
4. **Switch nameservers at get.art** to the two Cloudflare gives. Both hosts serve the same site during propagation, so there is no downtime.
5. **Attach apex + www to the Cloudflare project.** Verify site, form, and a test email both ways.
6. **A few days later:** disconnect Netlify and cancel.

Side effects: the Cloudflare build stops publishing `CLAUDE.md`, `CHANGELOG.md` and `STITCH-BRIEF.md` (Netlify serves them publicly today). Optional: the domain has no SPF/DMARC records; adding Google's SPF helps Workspace mail land in inboxes.

Cloudflare-native form (later, optional): Cloudflare Email Sending only touches the `cf-bounce` subdomain (safe for Workspace), and sends to verified addresses are free, but it needs the domain on Cloudflare first. Revisit after cutover if Web3Forms disappoints.

## Open Questions / Still To Do

- [ ] Domain: Point `adamstephenson.art` DNS to Netlify (Adam does this in his domain registrar — add a CNAME for `www` pointing to `adamstephenson-art.netlify.app`, and an A record or ALIAS for apex)
- [ ] Google Stitch mockups: Adam creates these before building starts
- [ ] Human review pass on Design Document v2
- [ ] Convert two .heic images (Bastrop LA install + Homewood AL install) to WebP before using on site
- [ ] Decide on heading font (currently TBD)
- [ ] TTRPG app: separate repo, later phase
- [ ] SEO + LLM-trust pass (deferred 2026-06-11): fact consistency across pages, expand sameAs, consider llms.txt / plain-text facts page — make the site legible to LLMs searching for muralists

---

## Changelog discipline

This repo has `CHANGELOG.md`. When you make a load-bearing change (anything that touches deployed pages, the deploy pipeline, the design system, or the case-study set), add a dated CHANGELOG entry in the same edit. CLAUDE.md describes current state, CHANGELOG.md is the audit trail of how we got here.

Format: Keep-a-Changelog. Group by Fixed / Added / Changed / Removed.

The historical "Change Log" table that previously lived in this CLAUDE.md is preserved at the bottom of this file as a sibling source-of-truth. New entries go in CHANGELOG.md, not the inline table.

## Change Log (legacy inline, do not extend; new entries go in CHANGELOG.md)

| Date | What happened |
|---|---|
| 2026-04-04 | GitHub repo created (`tiltandfade-lab/adamstephenson-art`). Netlify site created and connected. Deploy pipeline verified working. SSH auth set up on Adam's MacBook Pro. `deploy` alias installed via `.zshrc_snippet.sh` — run `deploy "message"` from anywhere to push. CLAUDE.md created. Design Document v2 already complete (built in earlier session from Quick Portfolio source files). |
