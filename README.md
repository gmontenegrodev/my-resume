# my-resume

Personal portfolio and resume site for German Montenegro, served at [germanresume.com](https://germanresume.com).

It's a one-page static site built with Next.js 16, React 19, TypeScript and Tailwind CSS. `next build` exports plain HTML/CSS/JS to `out/`, and Firebase Hosting serves it. There's no backend.

## Edit the content

All text lives in **`src/content/resume.ts`**. Edit that file and the site updates. Components never hardcode resume text.

- To show the "Download resume" button, put the PDF at `public/resume.pdf` and set `resumePdf: "/resume.pdf"`.
- To show the GitHub button, set `links.github` to your profile URL.

## Commands

| Task | Command |
|---|---|
| Install | `npm install` |
| Run locally (http://localhost:3000) | `npm run dev` |
| Build the static site to `out/` | `npm run build` |
| Preview the built site | `npm start` |
| Lint | `npm run lint` |
| Type check | `npm run typecheck` |
| Build and deploy by hand | `npm run deploy` |

## Deploy to Firebase Hosting (first time)

1. Install the Firebase CLI and log in:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```
2. Create a project in the [Firebase console](https://console.firebase.google.com) (or reuse one), then link it. This creates `.firebaserc`, which is safe to commit:
   ```bash
   firebase use --add
   ```
3. Build and deploy:
   ```bash
   npm run deploy
   ```
   The site is live at `https://<project-id>.web.app`.
4. Custom domain: in the Firebase console, open **Hosting → Add custom domain**, enter `germanresume.com`, and add the DNS records it shows at your domain registrar. Do this only when you're ready to replace the old site, because changing DNS switches the domain over.

## Automatic deploys (GitHub Actions)

`.github/workflows/deploy.yml` runs on GitHub's servers:

- **On every pull request:** lint, type check, and build. A red ✗ on the PR means something is broken.
- **On every push or merge to `main`:** the same checks, then deploy to the live site.
- **By hand:** GitHub → **Actions** → **Deploy** → **Run workflow**.

### One-time setup

1. **Create a service account** (a "robot" Google account that GitHub uses to deploy):
   Google Cloud console → select your Firebase project → **IAM & Admin → Service Accounts → Create service account**.
   Name it `github-deploy`, and give it the role **Firebase Hosting Admin**.
   If the deploy later fails with a permission error, also add **API Keys Viewer** and **Service Account User**.
2. **Create a key:** open the service account → **Keys → Add key → Create new key → JSON**. A `.json` file downloads.
   Treat this file like a password. Never commit it, and delete it from your computer after step 3.
3. **Add it to GitHub:** repository → **Settings → Secrets and variables → Actions**:
   - **Secrets** tab → New repository secret → name `FIREBASE_SERVICE_ACCOUNT`, value: paste the whole JSON file.
   - **Variables** tab → New repository variable → name `FIREBASE_PROJECT_ID`, value: your Firebase project ID.
4. Push or merge anything to `main` and watch it run in the **Actions** tab.

Shortcut: running `firebase init hosting:github` on your computer does steps 1 to 3 for you. If it asks to overwrite `.github/workflows/`, say **no** to keep this workflow, and rename the secret it creates to `FIREBASE_SERVICE_ACCOUNT` (or update the workflow to use its name).

## Configuration

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL used for canonical links, Open Graph, sitemap and JSON-LD | `https://germanresume.com` |

Copy `.env.example` to `.env.local` to override it locally.

## Project team

The `.claude/` folder holds the Claude Code agents (frontend, reviewer, security, SEO) and skills used to build this site. See `CLAUDE.md` and `PLAN.md`.
