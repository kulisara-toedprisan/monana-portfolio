# Monalist UI System

## 1. Product direction

Monalist is a one-page creative developer portfolio presented as a tactile digital studio. The experience pairs editorial typography, a cool concrete canvas, warm signal orange, crisp black controls, and an original retro-computer hero object. It should feel playful and technically precise rather than like a generic SaaS template.

The supplied reference is used for high-level visual direction only: framed canvas, offset editorial headline, warm 3D centerpiece, pixel lettering, compact floating navigation, and restrained monochrome chrome. The implementation uses original copy, layout, art, branding, and components.

## 2. Experience principles

1. **One strong object:** each viewport gives the hero artwork enough room to read immediately.
2. **Editorial asymmetry:** copy and metadata align to a grid but do not become a conventional centered landing page.
3. **Tactile restraint:** bevels, shadows, scanlines, and motion support the concept without reducing legibility.
4. **Useful play:** decorative details respond subtly, while every control remains obvious and keyboard accessible.
5. **Mobile is recomposed:** small screens become a deliberate vertical poster, not a scaled-down desktop.

## 3. Brand and voice

- Name: **MONALIST**
- Descriptor: Independent creative developer / digital portfolio
- Hero promise: **DIGITAL WORK / WITH A PULSE**
- Voice: short, direct, optimistic, human
- Primary actions: **Explore work** and **Start a project**
- Avoid fabricated client logos, awards, growth claims, or testimonials.

## 4. Color system

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#11110f` | Primary text, black buttons |
| `--ink-soft` | `#3f403c` | Secondary copy |
| `--paper` | `#eeede8` | Page background |
| `--panel` | `#d7d8d4` | Hero canvas |
| `--panel-light` | `#e5e6e2` | Cards and inset surfaces |
| `--line` | `rgba(17,17,15,.16)` | Borders and rules |
| `--signal` | `#ff5a18` | Primary orange |
| `--signal-light` | `#ff8a24` | Orange highlights |
| `--cream` | `#fffaf0` | High-contrast light text |
| `--white` | `#ffffff` | Pixel title and focus contrast |

Orange is reserved for calls to action, active states, small markers, and artwork accents. Body copy never uses orange on light gray because contrast is insufficient.

## 5. Typography

No npm font package or external font request is required. The system stack keeps load behavior deterministic.

- Display sans: `Arial Narrow`, `Roboto Condensed`, `Arial`, sans-serif; uppercase, tight leading, slightly negative tracking.
- Body sans: `Inter`, `Avenir Next`, `Segoe UI`, `Helvetica Neue`, sans-serif.
- Mono/pixel accent: `Courier New`, `Lucida Console`, monospace; heavy weight and stepped shadow treatment rather than a downloadable novelty font.
- Fluid hero size: `clamp(2.55rem, 5.2vw, 5.9rem)`.
- Body: `clamp(.95rem, .25vw + .9rem, 1.08rem)` with at least 1.5 line-height.
- Minimum functional text: 14px; mobile body copy remains 15px or larger.

## 6. Spatial system

- Base spacing unit: 4px.
- Named steps: 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Page gutter: `clamp(12px, 4vw, 72px)`.
- Content max width: 1600px.
- Hero frame uses a 12-column grid on desktop and a single column below 768px.
- Corners: 6px for controls, 14px for cards, 22px for large surfaces.
- All tap targets are at least 44×44px.

## 7. Elevation and surface

- Outer frame: soft ambient shadow plus a one-pixel inner light.
- Buttons: restrained one-pixel border and 2–4px visual lift.
- Artwork: transparent cutout with a soft elliptical CSS shadow beneath it.
- Noise and scanline overlays are CSS gradients at low opacity; they never sit over paragraph text strongly enough to impair reading.

## 8. Page architecture

The site is a single document with anchor navigation; React Router is intentionally unnecessary.

1. Skip link
2. Header / floating navigation
3. Hero (`#home`)
4. Selected work (`#work`)
5. Capabilities (`#services`)
6. About / approach (`#about`)
7. Contact callout (`#contact`)
8. Footer

The header is sticky after entry. Desktop uses a centered floating navigation capsule, with brand left and contact action right. Mobile uses brand plus a real disclosure button and full-width menu panel.

## 9. Hero composition

- Desktop: headline occupies columns 1–5, artwork spans columns 4–10, status metadata occupies columns 10–12.
- A large white `MONA / LIST` pixel wordmark anchors the lower half behind/around the central artwork.
- Supporting copy and paired CTAs sit below the headline.
- A compact availability badge and project count live on the right.
- Decorative code card, cursor, and orbit dots are presentation-only and hidden from assistive technology.
- Mobile order: eyebrow → headline → supporting copy → CTAs → artwork → availability metrics. Pixel lettering becomes a subtle background layer rather than forcing horizontal overflow.

## 10. Components

- `LogoMark`: four-cell orange monogram plus text label.
- `SiteHeader`: landmark, anchor navigation, active/hover states, mobile disclosure.
- `Button`: primary orange, secondary translucent, and dark variants; supports icon and anchor semantics.
- `SectionHeading`: numbered eyebrow, title, short introduction.
- `ProjectCard`: index, category, title, description, tags, graphic preview, and accessible link.
- `CapabilityCard`: icon, title, concise scope, numbered marker.
- `Metric`: large value, label, optional status dot.
- `MarqueeBand`: CSS-only repeated capability line; pauses on hover/focus and reduced motion.
- `ContactPanel`: high-contrast closing action and mail link.
- `SocialLinks`: labeled text/icons with visible focus.

## 11. Artwork direction

The hero asset is an original transparent-background stylized 3D render: a playful warm-orange retro desktop computer with keyboard, small smiling cursor character, soft off-white keys, and polished clay/plastic materials. Camera angle is three-quarter frontal, silhouette is clean, and no logos, readable text, watermark, or background are included. It is exported as a web-consumable PNG and given meaningful alt text because it reinforces the creative-technology concept.

Project card artwork is code-native CSS composition (gradients, grids, shapes) so it remains crisp, responsive, and lightweight.

## 12. Interaction and motion

- Entry: elements fade/translate 12–24px with staggered CSS delays.
- Hero object: 5–7 second gentle float and 12 second decorative orbit.
- Buttons: 150ms color/transform response, no large jump.
- Cards: preview transforms by at most 8px and border contrast increases.
- Navigation: anchor scrolling uses native `scroll-behavior: smooth`.
- `prefers-reduced-motion: reduce` disables smooth scroll, marquee, float, orbit, and entry transforms; content remains fully visible.

## 13. Responsive behavior

| Width | Required behavior |
| --- | --- |
| 320 / 375 / 390 / 430 | 12–16px outer gutter; single-column poster; menu disclosure; full-width or two-up CTAs where space allows; no text below 14px; artwork contained at 100%; decorative overflow clipped only inside hero. |
| 768 / 820 | Two-column project grid; hero remains primarily stacked with artwork and metrics sharing a lower row; navigation may remain collapsed to protect space. |
| 1024 | Desktop navigation appears; 12-column hero; copy/art balance becomes horizontal; cards in two columns. |
| 1280 / 1440 | Full intended composition, generous but bounded negative space; 3-column capability grid. |
| 1920+ | Content stays within 1600px; type and artwork cap their scale; outer margins grow rather than producing sparse internal gaps. |

No section may cause page-level horizontal scrolling. Use `min-width: 0`, fluid grids, `overflow-wrap`, and bounded absolute decoration.

## 14. Accessibility contract

- Semantic landmarks: header/nav/main/section/footer.
- One `h1`; section titles are `h2`; card titles are `h3`.
- Skip link becomes visible on focus.
- Focus ring: 3px `--signal` with 3px offset on light surfaces; cream ring on orange/dark surfaces.
- Mobile menu button exposes `aria-expanded` and `aria-controls`.
- Decorative elements use `aria-hidden="true"`; meaningful image has concise alt text.
- Links state their destination; icon-only controls require accessible labels.
- Contrast target: WCAG AA for all functional text and controls.
- Navigation and menu remain usable with keyboard alone; Escape closes the mobile menu.
- Reduced-motion preference is honored comprehensively.

## 15. Implementation constraints

- React 19 + strongly typed TypeScript.
- Vite 8 build system.
- Custom CSS architecture under `src/styles/`.
- Lucide React is the only icon library.
- No routing, animation, UI framework, smooth-scroll, or CSS utility dependency.
- Content data receives explicit TypeScript interfaces.

## 16. Acceptance criteria

- Visual system and implemented tokens match this document.
- All requested viewport widths have no horizontal page overflow or collisions.
- Header, menu, anchors, cards, and contact controls are keyboard operable.
- Production build and lint pass with no implementation errors.
- The hero remains legible without animation and with the artwork unavailable.
