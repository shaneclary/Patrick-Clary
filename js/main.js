/* ============================================================
   Patrick Clary — A Living Tribute
   Restrained interactions only: rings that draw themselves,
   sections that arrive quietly, nothing that distracts.
   ============================================================ */

(function () {
  'use strict';

  var content = window.SITE_CONTENT || {};
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- prologue: concentric contour rings ----------
     Irregular concentric rings — topographic contours, tree
     rings, ripples on water. Drawn slowly on first load.       */

  function ringPath(cx, cy, r, seed) {
    var pts = [];
    var N = 220;
    for (var i = 0; i <= N; i++) {
      var t = (i / N) * Math.PI * 2;
      var wobble =
        Math.sin(t * 3 + seed * 1.7) * 0.040 +
        Math.sin(t * 7 + seed * 3.1) * 0.018 +
        Math.sin(t * 13 + seed * 5.3) * 0.009;
      var rr = r * (1 + wobble);
      var x = cx + Math.cos(t) * rr;
      var y = cy + Math.sin(t) * rr * 0.97;
      pts.push(x.toFixed(1) + ',' + y.toFixed(1));
    }
    return 'M' + pts.join('L') + 'Z';
  }

  function drawRings() {
    var svg = document.getElementById('rings');
    if (!svg) return;
    var NS = 'http://www.w3.org/2000/svg';
    var ringCount = 11;
    var inner = 120;
    var step = 36;

    for (var i = 0; i < ringCount; i++) {
      var path = document.createElementNS(NS, 'path');
      path.setAttribute('d', ringPath(500, 500, inner + i * step, i + 1));
      path.setAttribute('pathLength', '1');
      var fade = 1 - i / (ringCount + 2);
      path.style.opacity = (0.05 + fade * 0.16).toFixed(3);
      if (!reducedMotion) {
        path.style.strokeDasharray = '1';
        path.style.strokeDashoffset = '1';
        path.style.animation =
          'draw ' + (2.6 + i * 0.35) + 's cubic-bezier(0.4, 0, 0.2, 1) ' +
          (0.25 + i * 0.22) + 's forwards';
      }
      svg.appendChild(path);
    }
  }

  /* ---------- scroll reveals ---------- */

  function initReveals() {
    var items = document.querySelectorAll('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- navigation: appears after the prologue ---------- */

  function initNav() {
    var nav = document.getElementById('site-nav');
    var prologue = document.querySelector('.prologue');
    if (!nav || !prologue) return;
    if (!('IntersectionObserver' in window)) {
      nav.classList.add('is-visible');
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        nav.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0.25 });
    observer.observe(prologue);
  }

  /* ---------- stories ---------- */

  function initStories() {
    var list = document.getElementById('stories-list');
    var cta = document.getElementById('stories-cta');
    if (!list) return;

    var stories = content.stories || [];
    stories.forEach(function (s) {
      if (!s || !s.text) return;
      var card = document.createElement('article');
      card.className = 'story reveal';
      var text = document.createElement('p');
      text.className = 'story__text';
      text.textContent = s.text;
      card.appendChild(text);
      if (s.by) {
        var by = document.createElement('p');
        by.className = 'story__by';
        by.textContent = s.by;
        card.appendChild(by);
      }
      list.appendChild(card);
    });

    var emptySlots = content.emptyStorySlots != null ? content.emptyStorySlots : 3;
    for (var i = 0; i < emptySlots; i++) {
      var slot = document.createElement('div');
      slot.className = 'story story--empty reveal';
      var p = document.createElement('p');
      p.textContent = 'This space is held for your story.';
      slot.appendChild(p);
      list.appendChild(slot);
    }

    if (cta) {
      if (content.storyEmail) {
        var a = document.createElement('a');
        a.className = 'button';
        a.href = 'mailto:' + content.storyEmail +
          '?subject=' + encodeURIComponent('A story about Patrick');
        a.textContent = 'Share a story';
        cta.appendChild(a);
      } else {
        var soon = document.createElement('p');
        soon.className = 'stories__soon';
        soon.textContent = 'The family is gathering stories — a way to share yours is coming soon.';
        cta.appendChild(soon);
      }
    }
  }

  /* ---------- gallery ---------- */

  function initGallery() {
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;
    var frames = content.gallery || [];
    var NS = 'http://www.w3.org/2000/svg';

    frames.forEach(function (f) {
      var frame = document.createElement('figure');
      frame.className = 'frame reveal';

      var media = document.createElement('div');
      media.className = 'frame__media';

      if (f && f.src) {
        var img = document.createElement('img');
        img.src = f.src;
        img.alt = f.caption || 'Photograph of Patrick Clary';
        img.loading = 'lazy';
        media.appendChild(img);
      } else {
        // quiet placeholder: small concentric rings
        var svg = document.createElementNS(NS, 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('aria-hidden', 'true');
        var g = document.createElementNS(NS, 'g');
        g.setAttribute('fill', 'none');
        g.setAttribute('stroke', 'currentColor');
        g.setAttribute('stroke-width', '1');
        [10, 22, 34].forEach(function (r) {
          var c = document.createElementNS(NS, 'circle');
          c.setAttribute('cx', '50');
          c.setAttribute('cy', '50');
          c.setAttribute('r', String(r));
          g.appendChild(c);
        });
        svg.appendChild(g);
        media.appendChild(svg);
      }
      frame.appendChild(media);

      if (f && f.caption) {
        var cap = document.createElement('figcaption');
        cap.className = 'frame__caption';
        cap.textContent = f.caption;
        frame.appendChild(cap);
      }
      grid.appendChild(frame);
    });
  }

  /* ---------- boot ---------- */

  drawRings();
  initStories();
  initGallery();
  initReveals();
  initNav();
})();
