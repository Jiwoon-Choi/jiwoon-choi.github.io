# Jiwoon Choi — portfolio and writing

Astro static site for `https://jiwoon-choi.github.io/`. Portfolio content is in `src/pages/index.astro`; essays are Markdown files in `src/content/writing/`. The public Writing section is intentionally minimal. Decap CMS provides a browser editor at `/admin/` once authentication is configured.

## Before replacing the current site

1. Back up or branch the existing `Jiwoon-Choi/jiwoon-choi.github.io` repository. The existing `profile.jpg` and `cv_jiwoon_choi.pdf` are already copied into `public/` from the public repository. Review or replace the CV if it is outdated.
2. Review the updated About and Education wording, projects, email, and research details.
3. Install Node 20.19+ or 22.12+; run `npm install` and `npm run build`. Commit the generated lockfile.
4. Put these files at the root of the existing GitHub Pages repository, commit to `main`, and set **Settings → Pages → Build and deployment → Source: GitHub Actions**. Verify the deployment before removing any old files.

## Enable browser publishing

1. Register for [Decap Turbo](https://turbo.decapcms.org/) (currently a free tier for one site and one seat). Connect GitHub, granting its app access only to the site repository.
2. Create a Turbo site pointing to `Jiwoon-Choi/jiwoon-choi.github.io`, branch `main`, config path `public/admin/config.yml`, and admin interface URL `https://jiwoon-choi.github.io/admin/`. The Site ID is already configured in the included file.
3. Commit and push the site files. Confirm the GitHub Pages workflow succeeds before opening the editor.
4. Open `/admin/`, sign in, create an Essay, and publish. It commits Markdown to GitHub; the workflow then rebuilds the static site. The draft switch hides posts from the public build. Save first if you want to review a draft before publishing.

The CMS editor is open-source; its optional hosted authentication service is a separate dependency. You can later replace Turbo with a self-hosted OAuth proxy while retaining all Markdown files. GitHub Pages provides static hosting; there is no backend on the website itself.

## Local authoring

Run `npm run dev`. To publish without CMS, add `src/content/writing/my-essay.md` with:

```md
---
title: "My essay"
date: 2026-09-26
description: "Short description."
draft: false
---

Essay text here.
```

Only published essays dated today or earlier appear on the site. The initial archive is empty: no essays were invented.
