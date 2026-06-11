# adamstephenson.art: changelog

Reverse-chronological log of changes to the portfolio site. Newest entries on top.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/): each entry is dated and grouped by `Fixed` / `Added` / `Changed` / `Removed`.

> **Note:** this changelog was started on 2026-05-01 as part of a portfolio-wide changelog rollout. Entries before 2026-05-01 are reconstructed from `git log` on the `main` branch and may collapse multiple commits into single dated entries. The CLAUDE.md inline "Change Log" table is preserved as a sibling source-of-truth.

Update protocol: when you make a load-bearing change to this repo (anything that touches deployed pages, the deploy pipeline, or the design system), add a CHANGELOG entry in the same edit. CLAUDE.md describes current state, CHANGELOG.md is the audit trail.

---

## 2026-06-10 (branch: visual-refresh)

### Changed
- Homepage visual refresh (on `visual-refresh` branch, pending review/merge): hero now rotates 5 murals with slow Ken Burns drift and crossfade; staggered hero name reveal; nav gains scrolled state (blur + darken); scroll-triggered reveals on statement, previews, case rows, and CTA; oversized outlined case study numerals; larger hero type. All motion respects `prefers-reduced-motion`.
- Homepage copy: replaced Claude-voice tagline block with verbatim Adam lines — "You remember the art that impacts you. You carry that with you." (Voice & Ideas, JEKS answer) plus two chat-verbatim intro lines (2026-06-10). Old tagline was on the banned-phrases list (see `feedback_voice_in_writing`).
- CTA rewritten: "Got a wall in mind?" / "Let's make a landmark." (Claude-drafted, explicitly approved by Adam 2026-06-10); buttons simplified to "Start a conversation" / "Commission a print".
- About page stat corrected 70 ft → 76 ft; Oakland poster year filled in (2024); CV PDF mirror refreshed (committed with this batch, from prior session).

### Removed
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
