# Redesign verification

Verified locally on 2026-09-10 with Node 24.18.0 and headless Chrome.

| Check | Result |
| --- | --- |
| npm ci | PASS; 151 packages installed, zero reported vulnerabilities |
| npm run lint | PASS |
| npm run build | PASS |
| git diff --check | PASS; only Git line-ending notices |
| Browser JavaScript exceptions | None in exercised interactions |
| Widths 320,375,390,430,768,820,1024,1280,1440,1920,2560 | PASS; measured viewport and page geometry, no horizontal overflow |
| Portrait | Complete head/hands/shoes visible; monochrome default; X-only movement and idle reset verified |
| About | Observer entry, exit and repeated entry verified |
| Categories | Exactly three; selection, project URLs and pagination verified |
| Contact | Disclosure, Escape/focus restoration, clipboard contents and feedback verified |
| Keyboard | Category navigation focuses Projects; filter retains focus; visible focus styles |
| Videos | No initial iframes; both YouTube IDs mount on demand; old player removed on navigation |
| Instagram | Official-script attempt; blocked-script feedback and permanent external fallback tested |
| Mobile | Player dimensions >=200px; contact menu contained; contact section reachable after projects |
| Reduced motion | Portrait tracking disabled, About fully opaque, reduced CSS transitions |
| DESIGN.md | Reviewed against implemented tokens, sections and behavior |

Browser audit is reproducible with `node scripts/browser-audit.mjs` after building.
Screenshots and machine-readable results are in the ignored
`node_modules/.cache/monalist-audit/` folder.

YouTube player creation and URLs were verified; playback of the third-party stream,
account/region restrictions, and Instagram playback permission are controlled externally.
The local checks do not claim that every supplied video will play for every visitor.
No formal screen-reader audit or cross-browser certification was performed.

GitHub Actions workflow is created. Its install/lint/build commands passed locally.
A remote green Actions result is pending commit/push; no remote workflow run or deployment
was performed. Hosting setup and project-content editing instructions are in README.md.

The portrait cutout was created with the built-in imagegen background-extraction workflow.
It retains the seated pose and full body, but is AI-assisted rather than a pixel-identical
segmentation mask. The original JPEG is preserved for review or a replacement cutout.
