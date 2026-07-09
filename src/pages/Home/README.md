# Lumina Home Page — AAA Minecraft Redesign

## What changed

**New files** (drop into your project at the matching path):

```
src/hooks/useInView.js
src/components/Reveal.jsx
src/components/PixelButton.jsx
src/components/AnimatedCounter.jsx
src/components/HeroBackgroundSlideshow.jsx
src/components/QuickStats.jsx
src/components/QuestBook.jsx
src/components/WhyJoinLumina.jsx
src/components/GalleryPreview.jsx
src/components/JourneyTimeline.jsx
src/components/CallToAction.jsx
src/components/icons/MinecraftIcons.jsx
```

**Replaced files:**

```
src/components/Hero.jsx   → cinematic hero: slideshow bg, mascot portal centerpiece, 2 CTAs, quick links
src/pages/Home.jsx        → full page: Hero → Quick Stats → Quest Book (About) → Why Join → Gallery → Journey → CTA
```

I reordered the sections slightly from your brief's suggestion — stats first to build instant credibility, then the
story, then proof (gallery), then history — but every section you asked for is there. Swap the order in `Home.jsx`
in about thirty seconds if you'd rather match the original sequence exactly.

`FallingStraw`, `CherryBlossoms`, and `LuminaMascot` are untouched and still imported as-is.

---

## 1. Tailwind config — add these tokens

I didn't have your `tailwind.config.js`, so rather than guess and risk clobbering it, everything above is written
against a small set of new tokens layered **alongside** your existing `minecraft-*` classes (which I kept using
directly since they're already in your codebase). Add this to your `theme.extend`:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        'mc-stone': '#1a1a1e',
        'mc-slate': '#24242b',
        'mc-emerald': '#45c97a',
        'mc-diamond': '#4fd1ff',
        'mc-gold': '#ffcb45',
        'mc-cherry': '#ffb0c8',
        'mc-cyan': '#6df3ff',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      keyframes: {
        'mc-ripple': {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '0.6' },
          '100%': { transform: 'translate(-50%, -50%) scale(18)', opacity: '0' },
        },
        'mc-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'mc-spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'mc-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        'mc-pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'mc-ripple': 'mc-ripple 0.6s ease-out forwards',
        'mc-float': 'mc-float 4s ease-in-out infinite',
        'mc-spin-slow': 'mc-spin-slow 12s linear infinite',
        'mc-zoom': 'mc-zoom 18s ease-in-out alternate infinite',
        'mc-pulse-glow': 'mc-pulse-glow 3s ease-in-out infinite',
      },
    },
  },
}
```

Every one of these animates only `transform` and `opacity` — nothing that triggers layout or paint-heavy work.

## 2. Add the pixel display font

Add one line to your main CSS file (e.g. `src/index.css`), above your `@tailwind` directives:

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
```

If you'd rather self-host it (recommended for the 100 Best Practices / Performance targets — Google Fonts adds a
render-blocking request), download the woff2 from Google Fonts and use `@font-face` + `font-display: swap` instead.

`font-pixel` is used sparingly — headings and eyebrow labels only — body copy stays on your existing readable font,
per the brief's "Main title: Minecraft font / Secondary: modern readable font" instruction.

## 3. Preload the hero background

For best LCP, add this to `index.html` `<head>`, matching the first slide in `HERO_BACKGROUNDS`:

```html
<link rel="preload" as="image" href="/bg3.jpeg" fetchpriority="high" />
```

## 4. Assets you'll want to add

- `HERO_BACKGROUNDS` in `Hero.jsx` currently rotates your existing `/bg3.jpeg` and `/abg.jpeg`. Add 3 more scenes
  (Cherry Blossom Kingdom, Floating Islands, Crystal Cave, etc.) as compressed WebP and push them into that array
  for the full 5-image cinematic rotation the brief describes.
- `GalleryPreview.jsx` reuses the same two images as placeholders — swap in real build/event screenshots.
- Keep every hero/gallery image **compressed WebP**, ideally under ~300KB, to hit the 95+ performance target with a
  full-bleed background.

## 5. Routes referenced

New links point to `/join`, `/gallery`, and reuse your existing `/members`, `/events`, `/about`. Add `/join` and
`/gallery` to your router if they don't exist yet, or repoint the `to` props in `Hero.jsx`, `CallToAction.jsx`, and
`GalleryPreview.jsx` to routes you already have.

## Performance & accessibility notes

- **No animation library** — reveals use a single shared `IntersectionObserver`-based hook (`useInView`), counters
  use one `requestAnimationFrame` loop each (cancelled on unmount), the slideshow uses one `setInterval` (cleared on
  unmount). Nothing runs unbounded.
- **Only `transform`/`opacity` animate** — never `top/left/width/height/margin/padding/box-shadow/filter`, per your
  rules. Border-color transitions on hover are the one exception (cheap, paint-only, no layout impact).
- **`prefers-reduced-motion` respected** everywhere via Tailwind's `motion-reduce:` variant — ambient effects
  (embers, float, spin, pulse, zoom) turn off, reveals appear instantly instead of animating.
- **Lazy loading**: everything below the hero in `Home.jsx` is `React.lazy` + `Suspense`. Gallery images use
  `loading="lazy"` and `decoding="async"`, with `aspect-video` reserved to avoid CLS.
- **`React.memo`** on `HeroBackgroundSlideshow` since its props (`images`) never change after mount.
- **Icons are inline SVG**, not an icon font or library — 8×8 pixel-grid Minecraft-style icons built from `<rect>`,
  colored via `currentColor`, so no extra network request per icon.
- **Accessibility**: semantic headings with `id`s tied to `aria-labelledby`, `focus-visible` outlines on every
  interactive element, decorative elements marked `aria-hidden`, alt text on all images.
