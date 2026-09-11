# Monalist Portfolio Design System

## 1. Design Concept

A monochrome editorial portfolio for Mona, video editor and content creator. Six chapters: 01 Landing, 02 About, 03 Storytelling, 04 Product, 05 Long Form, 06 Contact. Huge PORTFOLIO type behind Mona's full-body portrait, with navigation beside her.

## 2. Brand Personality

Minimal, cinematic, confident, personable. Short copy and small chapter/format labels. No invented metrics, clients, testimonials, location, or availability claims.

## 3. Reference Image Interpretation

Borrow person/type overlap and editorial hierarchy. Create a sparse monochrome composition rather than reproducing reference colors, grids, or dense content.

## 4. Color System

--color-black #0a0a0a; --color-dark #161616; --color-grey-900 #242424; --color-grey-700 #555555; --color-grey-500 #888888; --color-grey-300 #c8c8c8; --color-grey-100 #eeeeee; --color-white #ffffff. Light theme uses #eeeeee canvas/#fff panels/#0a0a0a ink. Dark theme uses #0a0a0a canvas/#161616 panels/#fff ink. Preference persists in localStorage, default light. Existing dark About/Contact chapters keep their cinematic dark surfaces. Secondary text #555 on light, #c8c8c8 on dark. Video retains original colors during playback; covers grayscale. Portrait alone can reveal original color on desktop interaction.

## 5. Typography

Display Arial, Helvetica Neue, sans-serif, weight 900, tracking -0.065em, line-height .9. PORTFOLIO clamp(3.4rem,14.7vw,17.5rem). Chapter headings clamp(3rem,7.5vw,8rem). Body Arial/Helvetica 16px/1.65. Metadata Courier New 12–14px/1.5. Functional controls >=14px. No external fonts.

## 6. Grid

Content max-width 1600px. Desktop insets clamp(24px,5vw,96px). Portrait centered near 53%; nav at 78%. Project sections contain horizontal strips with card information below each media. Strips scroll only horizontally; page scroll remains vertical.

## 7. Spacing

Scale 4,8,12,16,24,32,48,64,96px. Chapter padding >=80px vertically except independently positioned hero. Mobile gutters 20px (16px at 320). 1px rules, square corners, no shadows/glass.

## 8. Responsive Layout

Below 540px: one project per strip position. 540–1179px: two cards. At 1180px and above: three cards. Fewer projects leave natural unused space, never duplicates. Details use a modal below 768px and inline content at 768px+. Portrait/nav composition remains responsive. 1920+: max-width 1600. Breakpoints 600,900,1024px; short landscape uses natural heights.

## 9. Navigation

HOME, ABOUT, WORK, CONTACT sit above the large PORTFOLIO word and near Mona on desktop. Active chapter has short rule and aria-current. CONTACT disclosure uses aria-expanded/controls. Escape closes and restores focus; outside click closes. WORK behaves as a real disclosure control with submenu links to Storytelling, Product, and Long Form; the submenu is keyboard- and touch-accessible and remains usable without hover precision. Submenu items use the active section tone and the same transparent nav treatment. Later chapters have discreet home links. A persistent light/dark toggle sits with the nav. The nav is deliberately transparent with no visible panel, box, blur, or background; text stays black in light mode and white in dark mode, while nav z-index remains above the portrait and pointer-events stay active. Mobile navigation stays in flow below portrait. No primary top nav.

## 10. Landing Section

MONALIST upper left, VIDEO EDITOR / CONTENT CREATOR upper right. The hero uses a shared responsive seat line for both the large PORTFOLIO word and the seated portrait. Mona is lifted slightly higher so her seated contact point sits on the top edge of the letters, with her legs hanging down in front of the word rather than floating in front of it. This creates the editorial illusion of Mona sitting on PORTFOLIO without adding any platform object. PORTFOLIO is deliberately moved lower and constrained to fit within the available hero content width so the full word remains visible, including the first P and the final O, with safe side margins and no horizontal overflow. The title uses a dedicated wrapper and responsive clamp sizing rather than a single fragile vw value, and the final layout keeps the full word readable at all breakpoints. Bottom caption “A good story. A better cut.” sits beneath the typography and the scroll link remains inside the viewport. Full portrait uses object-fit:contain, no cropped fingers/shoes. Preserve original seated pose. The portrait follows the cursor only horizontally with a finite range; Y remains locked to the seat line. The typography remains monochrome, with the portion behind Mona visually inverted to the opposite theme tone only where the silhouette overlaps, without changing the whole word.

## 11. About Section

Dark chapter. Exact title “Hi, I'm Mona 👋”. Exact body “Video editor focused on short-form content for TikTok, Reels, and Shorts. I edit raw footage into hook-driven, story-first videos with strong pacing, captions, and sound design.” IntersectionObserver toggles 650ms, 18px reveal. Inactive text retains .65 opacity; entry replays. Emoji grayscale.

## 12. Dedicated Category Sections

03 / STORYTELLING, 04 / PRODUCT and 05 / LONG FORM are independent full-page sections, always rendered in sequence. Each filters MonalistProject.js by category. No category chooser, tabs, shared viewer, or selectedCategory state. Headings use explicit editorial line breaks.

## 13. Projects Section

Each project is a sharp-edged card: media, title, DESCRIPTION, SOFTWARE, TOOLS / EDITING SKILLS. Details remain visible immediately on all screen sizes; there is no mobile overlay, accordion, modal, or "VIEW DETAILS" toggle. Strip uses grid-auto-flow:column, equal widths and 24px gaps; scroll-snap-type:x mandatory; each card snaps start. Native horizontal trackpad/touch scrolling, mouse drag, arrow controls and Left/Right/Home/End keys. Vertical wheel events are not intercepted. ResizeObserver determines overflow; DRAG/SWIPE appears only when additional offscreen cards exist. Arrow controls scroll the strip, not a shared single-item viewer. Project details stay inline so the card can expand naturally with content and remain readable on phones, foldables, tablets, and desktop sizes.

## 14. Video Player Behavior

Real media players render directly in each project card with no custom cover or fake preview layer. YouTube uses a direct iframe immediately, without autoplay or hover-triggered playback. Instagram uses a direct embed immediately, without a cover-first gate. Local videoSrc keeps native controls and user-controlled playback only; the element remains mounted and resumes from user action rather than hover or scroll. Touch never autoplays on visibility; tap starts playback only when the user chooses. Reduced motion does not trigger any start logic. Media remains mounted while the user interacts and is not recreated on hover or leave. API/load errors retain external fallback links. Media ratios are 9/16 for Reels and 16/9 for long form; do not stretch one format into the other.

## 15. Buttons

>=44px touch area; transparent or black/white fill; square edges. Focus 2px currentColor, 5px offset. Native disabled strip arrows at boundaries. LINE clipboard action announces success/failure and keeps ID selectable.

## 16. Icons

Existing Lucide for generic arrow/play/mail/copy/message icons, alongside text platform names. Generic icons do not imitate brand marks.

## 17. Image Treatment

Original src/images/landing_section/my_landing_image.jpeg retained. Prefer my_landing_image_cutout.png after faithful alpha extraction; central asset selection supports original fallback. Default grayscale(1), desktop interaction reaches .2. No oversaturation, artificial outlines, or pose changes.

## 18. Animation System

Micro 200ms, UI 350ms, entrance 650ms; cubic-bezier(.22,1,.36,1). Portrait uses requestAnimationFrame interpolation without per-pixel React state. X +/-38px only; Y zero; no tilt/rotation. Leave/idle returns to neutral grayscale. RAF stops when settled; listeners clean up.

## 19. Scroll Snapping

html scroll-snap-type:y mandatory on desktop; sections min-height:100svh, scroll-snap-align:start, automatic height for taller content. Native scrolling, no wheel interception. <=900px or <=650px height switches to y proximity. Reduced motion proximity/instant anchors. No focus or scroll trap.

## 20. Hover States

Nav rule grows 18px; media visual scale 1.015; PLAYING appears only after a confirmed player event. Play label remains available on touch/keyboard. Monochrome transitions only.

## 21. Accessibility

One h1, named section h2s, project h3, skip link, main/nav/footer. Named carousel regions, labelled arrow buttons and standard keyboard navigation. VIEW DETAILS uses aria-expanded/controls. Native dialog has aria-modal, title, close button, Escape, focus trap, inert background and trigger-focus restoration. Portrait alt, iframe titles. Normal text contrast >=4.5:1; controls >=44px. No hover-only content.

## 22. Reduced Motion

Disable portrait tracking in JS/CSS; no entrance/cover movement; full text opacity. Auto scrolling, proximity snap. Handle live media-query changes.

## 23. Mobile Behavior

No cursor tracking. Hero expands when needed; full portrait; nav/menu below image. Projects have natural document height. On mobile, project details remain inline directly beneath the media and no detail overlay, accordion, or "VIEW DETAILS" control is used. Text wraps, grids min-width:0, constrained iframes, relaxed landscape snapping.

## 24. Project Data Architecture

Exact file src/data/MonalistProject.js uses JSDoc importing Project from ../types; allowJs/checkJs validates it. Fields id, category, platform, mediaType, title, videoUrl, videoSrc, embedUrl, poster, aspectRatio, externalUrl, videoId/shortcode, description, software, tools, optional year/duration. Category IDs are storytelling, product, and longform. Empty videoSrc is intentionally unavailable; never reference nonexistent MP4 files. Adding a data entry is sufficient to extend a strip. Empty Instagram poster gives neutral cover; never scrape. YouTube maxresdefault -> hqdefault -> neutral fallback. Five supplied links distributed 2/1/2. content.ts contains categories/navigation/contact details. No API keys or global state library.

## 25. Do / Don't Rules

Do keep UI monochrome, copy short, body intact, links correct, data separate, and test real viewport geometry. Don't fabricate statistics, scrape covers, add autoplay sound, or claim remote CI ran without evidence. Node 24 CI runs npm ci, lint, build. Hosting configured separately.
