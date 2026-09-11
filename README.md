# Monalist — video editing portfolio

React 19, TypeScript 6, Vite 8. The visual source of truth is [DESIGN.md](DESIGN.md).

## Local development

Use Node 24 and npm:

```sh
npm ci
npm run dev
```

On Windows PowerShell, use `npm.cmd` if the machine blocks `npm.ps1`.
Stop a running Vite server before `npm ci` on Windows to release native build-tool files.

## Update the portfolio

Edit [src/data/MonalistProject.js](src/data/MonalistProject.js). This exact JavaScript filename
is checked against the TypeScript Project interface using JSDoc and TypeScript checkJs.
Each entry contains category, platform, title, description, software, tools, videoUrl,
embedUrl, thumbnail, and optional year/duration. Category IDs are `storytelling`,
`product`, and `longform`. Keep project IDs unique.

The five supplied links are included. Titles are editable category-based working titles;
descriptions do not claim that specific techniques were verified by watching the source.
The software list is the supplied editing toolkit, not a technical audit of each video.

For Instagram, place your own cover image in `public/images/projects/` and set
`thumbnail: '/images/projects/your-cover.jpg'`. Until then, neutral editorial covers are
intentional. Nothing is scraped. Public embeds load only after a click and may be
unavailable because of Instagram privacy settings, embedding permissions, cookies,
or browser restrictions. The View on Instagram link always remains available.

For YouTube, keep videoId and embedUrl consistent. Empty thumbnail uses maxresdefault,
then hqdefault, then a neutral cover. Players mount on demand without autoplay.
Embedding depends on the video's owner/platform settings; View on YouTube is also available.
Reference: [YouTube player documentation](https://developers.google.com/youtube/player_parameters).

Navigation, category labels and real contact details are in `src/data/content.ts`.
No account statistics or unprovided contact details are displayed.

## Portrait

Original: `src/images/landing_section/my_landing_image.jpeg`.
Display cutout: `src/images/landing_section/my_landing_image_cutout.png`.
The component automatically prefers the PNG/WebP cutout and falls back to the JPEG if absent.
The original was kept intact. The transparent asset was produced with the built-in imagegen
background-extraction workflow; it is an AI-assisted extraction, not a pixel-identical mask.
Mona's full seated pose, hands and shoes are visible. Review the extraction before publishing
if exact photographic fidelity is essential.

Generation prompt:

> Use case: background-extraction. Edit the supplied photograph only. Remove the entire background (sky, grass, road and concrete barrier), leaving ONLY the exact photographed person on genuine transparent alpha. Preserve identity and every original detail: face, glasses, red bandana, hair including wisps, expression, both peace-sign hands and fingers, brown leather jacket, cream blouse, black trousers, both full shoes. Preserve the exact seated pose, proportions and original photographic colors and lighting. Do not reconstruct or restyle the person, do not make her stand. Keep full body from head through shoes, no cropping of any part, no soft outline or halo. Tight portrait composition around the complete silhouette with 4% transparent padding. No floor, objects, background, shadow, text or watermark. This is a faithful cutout for an editorial portfolio.

## Verification and CI

```sh
npm run lint
npm run build
node scripts/browser-audit.mjs
```

The browser audit requires local Chrome and Node 24; set CHROME_PATH if Chrome is installed
elsewhere. It uses Chrome DevTools with no npm test dependency. It checks eleven widths,
overflow, filtering, player URLs/lifecycle, menu keyboard behavior, portrait movement,
reduced motion and browser exceptions. Screenshots/report are stored in the ignored
`node_modules/.cache/monalist-audit/` directory.

[Frontend CI](.github/workflows/frontend-ci.yml) runs on pushes and pull requests to main:
Node 24, cached npm, npm ci, lint, build. There was no pre-existing test command.
Local steps can be verified here; a hosted Actions result requires committing/pushing the
workflow to GitHub. No commit or push is performed automatically.

## Deployment

No existing hosting integration was found. Connect this repository to one static hosting
service (for example Vercel), choose the Vite preset, Node 24, build command
`npm run build`, and output directory `dist`. Use repository root as the project root.
The site needs no API keys or runtime secrets. Enable deployments from main and use the
Frontend CI check as a branch-protection requirement in GitHub.

Account connection, domain setup and any branch-protection settings must be configured
in the hosting/GitHub account. No duplicate deployment workflow has been added.
If you later choose GitHub Pages under a repository subpath, configure Vite base and
public asset URLs for that subpath before deploying.
