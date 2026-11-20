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

GitHub logs in to Google Cloud with **Workload Identity Federation**: no key file. Google Cloud trusts runs from this repository's `main` branch and lets them act as the deploy service account for a short time. (The shakochat.com organization blocks service account key files, which is a good security default.)

1. **Service account** (already done): `github-deploy-german-resume@german-resume.iam.gserviceaccount.com` with the roles Firebase Hosting Admin, API Keys Viewer, Service Account User, Cloud Run Viewer.
2. **Trust GitHub:** open [Cloud Shell](https://shell.cloud.google.com) (the `>_` button in the Google Cloud console) and run:
   ```bash
   PROJECT_ID=german-resume
   REPO=gmontenegrodev/my-resume
   SA=github-deploy-german-resume@${PROJECT_ID}.iam.gserviceaccount.com
   PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')

   gcloud services enable iamcredentials.googleapis.com sts.googleapis.com --project="$PROJECT_ID"

   gcloud iam workload-identity-pools create github \
     --project="$PROJECT_ID" --location=global --display-name="GitHub Actions"

   gcloud iam workload-identity-pools providers create-oidc my-resume \
     --project="$PROJECT_ID" --location=global --workload-identity-pool=github \
     --display-name="my-resume repo" \
     --issuer-uri="https://token.actions.githubusercontent.com" \
     --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
     --attribute-condition="assertion.repository=='${REPO}' && assertion.ref=='refs/heads/main'"

   gcloud iam service-accounts add-iam-policy-binding "$SA" \
     --project="$PROJECT_ID" --role=roles/iam.workloadIdentityUser \
     --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github/attribute.repository/${REPO}"

   echo "projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github/providers/my-resume"
   ```
   The last line prints the provider name for the next step.
3. **Add three repository variables** in GitHub → **Settings → Secrets and variables → Actions → Variables** (none of these are secrets):

   | Name | Value |
   |---|---|
   | `GCP_WORKLOAD_IDENTITY_PROVIDER` | the line printed at the end of step 2 |
   | `GCP_SERVICE_ACCOUNT` | `github-deploy-german-resume@german-resume.iam.gserviceaccount.com` |
   | `FIREBASE_PROJECT_ID` | `german-resume` |

4. Push or merge anything to `main` (or **Actions → Deploy → Run workflow**) and watch it run.

## Configuration

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL used for canonical links, Open Graph, sitemap and JSON-LD | `https://germanresume.com` |

Copy `.env.example` to `.env.local` to override it locally.

## Project team

The `.claude/` folder holds the Claude Code agents (frontend, reviewer, security, SEO) and skills used to build this site. See `CLAUDE.md` and `PLAN.md`.
