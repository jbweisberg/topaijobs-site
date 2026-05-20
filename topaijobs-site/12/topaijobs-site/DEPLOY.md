# TopAIJobs.com — Deployment Guide
## GitHub + Cloudflare Pages

---

## STEP 1: CREATE GITHUB REPO (5 minutes)

1. Go to **github.com** → click **New Repository**
2. Name: `topaijobs-site`
3. Set to **Public** (Cloudflare Pages works with both, but public is fine for a marketing site)
4. Do NOT initialize with README (we already have files)
5. Click **Create Repository**

### Push the files:

If you have Git installed locally:
```bash
cd topaijobs-site
git init
git add .
git commit -m "Initial site launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/topaijobs-site.git
git push -u origin main
```

If you don't have Git, use **GitHub Desktop** (download from desktop.github.com) or upload files directly via the GitHub web interface (drag and drop).

---

## STEP 2: CONNECT CLOUDFLARE PAGES (5 minutes)

1. Go to **dash.cloudflare.com**
2. If you don't have an account, create one (free)
3. In the left sidebar: **Workers & Pages** → **Create**
4. Click **Pages** tab → **Connect to Git**
5. Authorize GitHub and select the `topaijobs-site` repository
6. Configure build settings:
   - **Production branch:** `main`
   - **Build command:** (leave blank — no build step needed for static HTML)
   - **Build output directory:** `/` (root — our files are at the top level)
7. Click **Save and Deploy**

Cloudflare will deploy in ~30 seconds. You'll get a URL like `topaijobs-site.pages.dev` — your site is already live there.

---

## STEP 3: CONNECT YOUR DOMAIN (5 minutes)

### Option A: If your domain is already on Cloudflare DNS
1. In the Pages project → **Custom domains** → **Set up a custom domain**
2. Enter: `topaijobs.com`
3. Also add: `www.topaijobs.com`
4. Cloudflare auto-configures the DNS records

### Option B: If your domain is at another registrar
1. In the Pages project → **Custom domains** → **Set up a custom domain**
2. Enter: `topaijobs.com`
3. Cloudflare will show you the DNS records to add at your registrar:
   - Type: `CNAME`
   - Name: `@` (or `topaijobs.com`)
   - Target: `topaijobs-site.pages.dev`
4. Add another CNAME for `www`:
   - Type: `CNAME`
   - Name: `www`
   - Target: `topaijobs-site.pages.dev`
5. DNS propagation takes 5 minutes to 24 hours (usually fast)

**Better option:** Transfer your domain TO Cloudflare for free DNS management. In Cloudflare dashboard → **Websites** → **Add a site** → follow the nameserver instructions from your registrar.

SSL/HTTPS is automatic. Cloudflare handles it.

---

## STEP 4: POST-DEPLOYMENT CHECKLIST

### Immediate (do now):
- [ ] Verify site loads at topaijobs.com
- [ ] Test all nav links work
- [ ] Test mobile responsive (check on your phone)
- [ ] Verify 404 page works (visit topaijobs.com/anything-random)

### This week:
- [ ] Set up Beehiiv account → get embed code → swap into all newsletter forms
- [ ] Set up hello@topaijobs.com email (use Cloudflare Email Routing — free — or forward via your registrar)
- [ ] Add Google Analytics or Plausible analytics snippet to each HTML page (before </body>)
- [ ] Submit sitemap to Google Search Console (manual XML sitemap below)
- [ ] Create OG share image (1200x630px branded card) and add to <head> tags
- [ ] Create favicon and add to <head> tags

---

## HOW TO PUBLISH NEW ARTICLES

### The workflow:
1. Duplicate `_ARTICLE_TEMPLATE.html`
2. Rename it with your slug: `ghost-job-index-q2-2026.html`
3. Move it into the right folder: `market-intel/ghost-job-index-q2-2026.html`
4. Edit the content (all editable sections marked with ✏️ EDIT comments)
5. Update the category index page (`market-intel/index.html`) — add a new card at the top
6. Update homepage `index.html` — swap in the new article card in "Latest Intelligence"
7. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "New post: Ghost Job Index Q2 2026"
   git push
   ```
8. Cloudflare auto-deploys in ~30 seconds

### Article checklist:
- [ ] Title tag and meta description updated
- [ ] OG tags updated (title, description, URL)
- [ ] Canonical URL set
- [ ] Schema.org JSON-LD updated (headline, dates)
- [ ] Category tag correct (it-rankings / it-market / it-career)
- [ ] Inline newsletter signup included
- [ ] Share buttons work
- [ ] Related articles section populated
- [ ] Article added to category index page
- [ ] Article added to homepage (if featured)

---

## SITEMAP (create as sitemap.xml in root)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://topaijobs.com/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://topaijobs.com/rankings/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://topaijobs.com/market-intel/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://topaijobs.com/career-moves/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <!-- Add each new article URL here when published -->
</urlset>
```

Submit at: https://search.google.com/search-console → Add property → Enter topaijobs.com → Sitemaps → Submit sitemap.xml

---

## FILE STRUCTURE REFERENCE

```
topaijobs-site/
├── index.html                          ← Homepage
├── 404.html                            ← Custom 404
├── sitemap.xml                         ← Create this (template above)
├── _ARTICLE_TEMPLATE.html              ← Copy this for new posts
├── assets/
│   ├── css/
│   │   └── main.css                    ← All shared styles
│   ├── js/
│   │   └── main.js                     ← Nav, scroll, animations
│   └── img/                            ← OG images, favicon, etc.
├── rankings/
│   ├── index.html                      ← Rankings section page
│   ├── top-25-ai-roles-total-comp-2026.html
│   ├── 10-companies-ai-leadership-reports-to-ceo.html
│   └── best-ai-roles-no-phd.html
├── market-intel/
│   ├── index.html                      ← Market Intel section page
│   └── ghost-job-index-q2-2026.html
└── career-moves/
    ├── index.html                      ← Career Moves section page
    └── ai-career-leverage-map.html
```

---

## AUTO-DEPLOY

Every `git push` to `main` triggers an automatic Cloudflare Pages build and deploy. No manual steps. Edit → push → live in 30 seconds.

For staging/preview: create a branch (e.g., `draft-ghost-job`), push it, and Cloudflare generates a preview URL at `draft-ghost-job.topaijobs-site.pages.dev` that you can review before merging to main.

---

## COST

**$0/month.** Cloudflare Pages free tier includes:
- 500 builds/month
- Unlimited bandwidth
- Unlimited requests
- Global CDN (300+ locations)
- Free SSL
- Free DDoS protection
- Preview deployments on branches

You won't hit these limits with a content site.
