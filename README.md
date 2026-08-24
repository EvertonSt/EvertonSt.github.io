# Everton S. Andrade � Portfolio

Premium, recruiter-focused portfolio built with React + TypeScript + Vite.

## Tech Stack

- React 19 + TypeScript + Vite
- CSS Custom Properties (no UI framework)
- GitHub Actions auto-deploy to GitHub Pages

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

## Build

```bash
npm run build
```

Output: `dist/` directory.

## Deployment

Deployment is automatic via GitHub Actions. Every push to `main` triggers a build and deploy to GitHub Pages.

**GitHub Pages source must be set to "GitHub Actions"** (not "Deploy from a branch"):
GitHub repo → Settings → Pages → Build and deployment → Source → GitHub Actions.

The site is live at [https://evertonst.github.io/](https://evertonst.github.io/).


## Project Structure

```
src/
  components/
    layout/    � Navbar, Footer
    sections/  � Hero, ProofStrip, FlagshipProject, EngineeringFocus, etc.
    ui/        � Button, Card, Tag, Icon, StatusBadge, SectionHeading
  data/        � projects, experience, skills, links (structured content)
  hooks/       � useScrollSpy, useReducedMotion
  styles/      � CSS variables, global styles
```

## Content Updates

All content is defined in `src/data/`. To update project descriptions, links, or metrics, edit the corresponding file:

- `src/data/projects.ts` � Flagship and additional project data
- `src/data/experience.ts` � Work experience entries
- `src/data/skills.ts` � Technical stack categories
- `src/data/links.ts` � External URLs
