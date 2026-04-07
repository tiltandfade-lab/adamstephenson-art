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
| Hosting | Netlify (free tier) | 300 credits/mo hard cap. ~30GB bandwidth. No surprise charges. |
| Repo | GitHub (`tiltandfade-lab/adamstephenson-art`) | |
| CMS | Notion (Art Practice HQ) | Portfolio database already well-structured. Used as data source, not build step. |
| Images | WebP, max 2400px, under 300KB | Responsive srcset. Two .heic files need conversion (Bastrop LA + Homewood AL installs). |

**Deploy pipeline:** `git push origin main` → Netlify auto-deploys in ~30 seconds. Branch deploys get preview URLs automatically.

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

**Backup plan if Netlify gets stingy again:** Cloudflare Pages (unlimited bandwidth, 500 builds/mo free) is pre-approved as a migration target. Same GitHub repo, repoint DNS, ~10 min to set up.

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
| Background | `#1C1C1E` | Dark. Adam's work is highly colorful — white bg washes it out. |
| Accent | `#D4763B` | Warm amber. |
| Body font | Inter | Clean, neutral. |
| Heading font | TBD in Stitch mockups | |
| Image layout | Masonry grid | Required — 6 aspect ratio categories (0.60:1 to 2.36:1). |
| Image format | WebP, srcset | Max 2400px wide, under 300KB each. |

---

## Key Source Files (on Adam's Desktop)

| File | Location | What it contains |
|---|---|---|
| Design Document v2 | `Work/Quick Portfolio/Portfolio_Website_Design_Document_v2.docx` | Full spec: all pages, case studies with exact image filenames/dimensions, CMS strategy, open questions. **Read this before building anything.** |
| Portfolio Brief | `Work/Quick Portfolio/Adam_Stephenson_Portfolio_Brief_for_Google_Stitch.docx` | Brief written specifically for Stitch mockup generation. Curatorial decisions, image inventory. |
| Bio | `Work/Quick Portfolio/STEPHENSON-Bio.docx` | Third-person bio for About page. |
| CV | `Work/Quick Portfolio/STEPHENSON-CV-2026.docx` | Full CV: commissions 2019–2026, collaborations, festivals, exhibitions, press. |
| Images | `Work/Quick Portfolio/` + subfolders | All portfolio images. Two .heic files need conversion before web use. |

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

## Open Questions / Still To Do

- [ ] Domain: Point `adamstephenson.art` DNS to Netlify (Adam does this in his domain registrar — add a CNAME for `www` pointing to `adamstephenson-art.netlify.app`, and an A record or ALIAS for apex)
- [ ] Google Stitch mockups: Adam creates these before building starts
- [ ] Human review pass on Design Document v2
- [ ] Convert two .heic images (Bastrop LA install + Homewood AL install) to WebP before using on site
- [ ] Decide on heading font (currently TBD)
- [ ] TTRPG app: separate repo, later phase

---

## Change Log

| Date | What happened |
|---|---|
| 2026-04-04 | GitHub repo created (`tiltandfade-lab/adamstephenson-art`). Netlify site created and connected. Deploy pipeline verified working. SSH auth set up on Adam's MacBook Pro. `deploy` alias installed via `.zshrc_snippet.sh` — run `deploy "message"` from anywhere to push. CLAUDE.md created. Design Document v2 already complete (built in earlier session from Quick Portfolio source files). |
