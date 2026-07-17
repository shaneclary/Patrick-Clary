# Patrick Clary — A Living Tribute

A quiet digital archive honoring Patrick Clary, MD — physician, poet, and
companion to people in life's most meaningful moments.

It is meant to be the kind of place family, colleagues, and the palliative
care community can return to decades from now — to understand what Patrick
has accomplished, how he practices medicine, how he relates to people, and
what values shape his life's work.

## Viewing the site

Everything is plain HTML/CSS/JS with no build step. Open `index.html` in a
browser, or serve the folder:

```
python3 -m http.server
```

then visit `http://localhost:8000`. It deploys as-is to GitHub Pages,
Netlify, or Vercel — no configuration needed.

## Growing the archive (the family guide)

Almost everything you'll want to change lives in **`js/content.js`**:

- **Turn on story submissions** — set `storyEmail` to the address that should
  receive stories. The "Share a story" button appears automatically.
- **Add a story** — add a `{ text: "...", by: "..." }` block to the `stories`
  list. A few sentences reads best.
- **Add photographs** — drop image files into `images/`, then point a gallery
  entry at the file: `{ src: "images/filename.jpg", caption: "..." }`.
  Favor natural light, real moments — listening, walking, teaching, hands.

Larger text changes (the timeline, philosophy, nature sections) are written
directly in `index.html` — each section is clearly labeled.

## A note on the content

The timeline and writing sections are built from Patrick's published record:
his service as a conscientious-objector combat medic in Vietnam (1969–70),
his training as a poet under Roland Flint at Georgetown before Georgetown's
School of Medicine, his hospice work beginning in 1993, his presidency of the
New Hampshire Hospice and Palliative Care Organization, the 2003 Death Valley
Vision Fast, and *Dying for Beginners* (Lost Borders Press, 2006), alongside
his earlier collections *Notes for a Loveletter* and *Old Friends*.

No quotes have been invented in Patrick's voice. The "five tasks" section
paraphrases the frame of his poem "Five Tasks Taught by Hospice Nurses" —
when the family wants his exact lines on the page (with permission in hand),
replace the paraphrase in `index.html` with the real ones. They will always
be better.

## Design

- **Type**: Fraunces (display serif) and Inter, self-hosted in `fonts/` so the
  site never depends on an outside service.
- **Palette**: bone, warm white, weathered charcoal, olive, copper, forest
  green, dusty sage, soft sand. No saturated colors, no medical blue.
- **Motion**: contour rings that draw themselves on arrival, sections that
  fade in quietly. Everything respects `prefers-reduced-motion`.
- The page also prints cleanly — an archive should survive on paper.
