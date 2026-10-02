/* lattice.js — the Homecoming lattice behind page headings (Adam 2026-10-02).
 *
 * Draws the 45° matrix from the Homecoming mural as thin white lines: verticals, horizontals,
 * forward (/) and back (\) diagonals. Lines are long and overlapping on the left and break
 * down into small right-angle triangles on the right. After load it plays once: a pulse
 * sweeps left to right, each line draws on behind a small sparkle, flares, then settles,
 * and a few blue Homecoming petals are released from the line tips and carried forward and down.
 * No loop. Static (fully drawn, no sparkle) under prefers-reduced-motion.
 *
 * Usage:  <div class="lattice" data-lattice></div> inside a positioned container,
 *         then Lattice.mountAll(LATTICE_SETTINGS). labs/lattice.html tunes the settings.
 */
(function (root) {
  'use strict';

  var DEFAULTS = {          // Adam's lab settings, 2026-10-02
    seed: 44,
    startX: 0,           // where the lattice begins (share of width), to keep the title area clear
    vertical: 13,        // lines per 1000px of width
    horizontal: 7,
    forward: 9,          // "/" diagonals
    back: 10,            // "\\" diagonals
    lenLeft: 1.75,       // line length on the left, as a multiple of the box height
    lenRight: 0.3,       // line length on the right
    taper: 1,            // how quickly lines shorten across the width (1 = even)
    bias: 0.15,          // 0 = lines spread evenly, 1 = crowded on the left
    triangles: 8,        // triangles per 1000px, on the right
    triStart: 0.19,      // where triangles begin (share of width)
    triMax: 101,         // triangle size where they begin (px)
    triMin: 10,          // triangle size at the right edge (px)
    triFill: 0,          // triangle fill opacity (0 = outline only)
    stroke: 1,           // line width (px)
    opacity: 0.06,        // resting opacity of the white lines
    flare: 0.17,          // opacity at the moment a line draws on
    sweep: 1.2,          // seconds for the pulse to cross the width
    draw: 0.6,           // seconds each line takes to draw on
    delay: 0.3,          // seconds after load before the sweep starts
    sparkle: 4,          // sparkle size (px); 0 = none
    color: '#FFFFFF',
    // petals: Homecoming's blue petals, released from line tips as they draw on, carried forward and down
    petals: 12,           // petals per 1000px of width (0 = none)
    petalMin: 14,        // petal length range (px)
    petalMax: 117,
    petalOpacity: 0.3,
    petalDelay: 0,       // extra seconds after a line releases a petal before it appears
    petalWait: 0,        // 0 = a petal appears the moment its line starts drawing; 1 = when the drawing tip reaches the release point
    release: 0.49,        // where along a line its petal leaves: 0 = as it starts drawing, 1 = when the tip finishes
    releaseSpread: 0.28, // ± variation around that point
    driftX: 170,         // how far the sweep carries them forward (px)
    driftY: 90,          // and down (px)
    float: 10.5,            // seconds each petal drifts
    spin: 30,            // degrees of tumble over the drift
    flutter: 4,         // side-to-side sway (px)
    linger: 0,           // opacity left at the end (0 = fades away)
    outline: 0.8,        // navy outline width (px); 0 = none
    petalColor: '#BFD8EC',
    petalTip: '#F6FAFD',
    petalLine: '#3E5A7A'
  };

  function rng(seed) {   // mulberry32: same seed, same lattice
    var a = seed >>> 0;
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  var NS = 'http://www.w3.org/2000/svg';
  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  // ---- geometry ----
  function build(W, H, o) {
    var R = rng(o.seed), segs = [], tris = [];
    var X0 = o.startX * W, SPAN = W - X0, k = SPAN / 1000;
    function spreadX() { return X0 + Math.pow(R(), 1 + o.bias * 2) * SPAN; }      // crowd toward the left
    function lenAt(x) { var t = Math.min(1, Math.max(0, (x - X0) / SPAN)); return H * (o.lenRight + (o.lenLeft - o.lenRight) * Math.pow(1 - t, o.taper)); }
    function add(x0, y0, x1, y1) {
      if (x1 < x0) { var tx = x0, ty = y0; x0 = x1; y0 = y1; x1 = tx; y1 = ty; }   // always draw left → right
      segs.push({ x0: x0, y0: y0, x1: x1, y1: y1 });
    }
    var i, x, y, L, d;
    for (i = 0; i < Math.round(o.vertical * k); i++) {
      x = spreadX(); L = lenAt(x); y = R() * (H + L) - L;
      add(x, y, x, y + L);
    }
    for (i = 0; i < Math.round(o.horizontal * k); i++) {
      x = spreadX() - H * 0.4; y = R() * H; L = lenAt(Math.max(X0, x)) * 1.6;
      add(x, y, x + L, y);
    }
    for (i = 0; i < Math.round(o.forward * k); i++) {       // "/" : up and to the right
      x = spreadX(); y = R() * H * 1.4 - H * 0.2; d = lenAt(x) / Math.SQRT2;
      add(x - d / 2, y + d / 2, x + d / 2, y - d / 2);
    }
    for (i = 0; i < Math.round(o.back * k); i++) {          // "\" : down and to the right
      x = spreadX(); y = R() * H * 1.4 - H * 0.2; d = lenAt(x) / Math.SQRT2;
      add(x - d / 2, y - d / 2, x + d / 2, y + d / 2);
    }
    // right-angle triangles, shrinking toward the right edge (the mural's breakdown into shards)
    for (i = 0; i < Math.round(o.triangles * k); i++) {
      var t = o.triStart + (1 - o.triStart) * Math.pow(R(), 0.8);
      x = X0 + t * SPAN; y = R() * H;
      var s = o.triMin + (o.triMax - o.triMin) * Math.pow(1 - (t - o.triStart) / (1 - o.triStart || 1), 1.3);
      var q = Math.floor(R() * 4), p;       // which corner holds the right angle
      if (q === 0) p = [[x, y], [x + s, y], [x, y + s]];
      else if (q === 1) p = [[x, y], [x + s, y], [x + s, y + s]];
      else if (q === 2) p = [[x, y + s], [x + s, y + s], [x + s, y]];
      else p = [[x, y], [x, y + s], [x + s, y + s]];
      tris.push({ pts: p, x: x });
    }
    return { segs: segs, tris: tris };
  }

  // ---- render + play ----
  function mount(host, opts) {
    var o = {}, k;
    for (k in DEFAULTS) o[k] = DEFAULTS[k];
    for (k in (opts || {})) o[k] = opts[k];
    var W = Math.max(1, host.clientWidth), H = Math.max(1, host.clientHeight);
    host.innerHTML = '';
    var svg = el('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, 'aria-hidden': 'true', focusable: 'false' }, host);
    svg.style.display = 'block'; svg.style.overflow = 'visible';
    var g = build(W, H, o);
    var reduce = o.static || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var anims = [];
    var glow = el('g', {}, null);

    function timing(x) { return (o.delay + Math.max(0, x) / W * o.sweep) * 1000; }

    g.tris.forEach(function (tri) {
      var poly = el('polygon', {
        points: tri.pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '),
        fill: o.color, 'fill-opacity': o.triFill, stroke: o.color, 'stroke-width': o.stroke,
        'stroke-opacity': o.opacity, 'stroke-linejoin': 'miter', 'vector-effect': 'non-scaling-stroke'
      }, svg);
      if (reduce) return;
      anims.push(poly.animate([{ opacity: 0 }, { opacity: 1, offset: 0.4 }, { opacity: 1 }],
        { duration: o.draw * 1000, delay: timing(tri.x), fill: 'backwards', easing: 'ease-out' }));
    });

    g.segs.forEach(function (s) {
      var len = Math.hypot(s.x1 - s.x0, s.y1 - s.y0);
      var line = el('line', {
        x1: s.x0.toFixed(1), y1: s.y0.toFixed(1), x2: s.x1.toFixed(1), y2: s.y1.toFixed(1),
        stroke: o.color, 'stroke-width': o.stroke, 'stroke-opacity': o.opacity, 'stroke-linecap': 'butt'
      }, svg);
      if (reduce) return;
      var at = timing(s.x0), dur = o.draw * 1000 * Math.max(0.5, Math.min(1.6, len / H));
      line.setAttribute('stroke-dasharray', len.toFixed(1));
      anims.push(line.animate(
        [{ strokeDashoffset: len, strokeOpacity: o.flare }, { strokeDashoffset: 0, strokeOpacity: o.flare, offset: 0.85 }, { strokeDashoffset: 0, strokeOpacity: o.opacity }],
        { duration: dur * 1.35, delay: at, fill: 'backwards', easing: 'cubic-bezier(0.3, 0.6, 0.3, 1)' }));
      if (o.sparkle > 0) {     // a four-point glint riding the leading tip of the line
        var r = o.sparkle, sp = el('g', { opacity: 0 }, glow);
        el('path', { d: 'M0,' + (-r) + ' L' + (r * 0.18) + ',0 L0,' + r + ' L' + (-r * 0.18) + ',0 Z', fill: o.color }, sp);
        el('path', { d: 'M' + (-r) + ',0 L0,' + (r * 0.18) + ' L' + r + ',0 L0,' + (-r * 0.18) + ' Z', fill: o.color }, sp);
        el('circle', { r: r * 0.22, fill: o.color }, sp);
        anims.push(sp.animate(
          [{ transform: 'translate(' + s.x0 + 'px,' + s.y0 + 'px) scale(0.4)', opacity: 0 },
           { transform: 'translate(' + (s.x0 + (s.x1 - s.x0) * 0.1) + 'px,' + (s.y0 + (s.y1 - s.y0) * 0.1) + 'px) scale(1)', opacity: 0.95, offset: 0.1 },
           { transform: 'translate(' + s.x1 + 'px,' + s.y1 + 'px) scale(0.8)', opacity: 0.85, offset: 0.85 },
           { transform: 'translate(' + s.x1 + 'px,' + s.y1 + 'px) scale(0.2)', opacity: 0 }],
          { duration: dur * 1.35, delay: at, fill: 'both', easing: 'cubic-bezier(0.3, 0.6, 0.3, 1)' }));
      }
    });
    // ---- petals ----
    if (!reduce && o.petals > 0 && g.segs.length) {
      var uid = 'pg' + Math.floor(Math.random() * 1e9);
      var defs = el('defs', {}, svg), grad = el('linearGradient', { id: uid, x1: '0', y1: '0', x2: '1', y2: '0' }, defs);
      el('stop', { offset: '0', 'stop-color': o.petalColor }, grad);
      el('stop', { offset: '0.75', 'stop-color': o.petalTip }, grad);
      el('stop', { offset: '1', 'stop-color': o.petalTip }, grad);
      var PR = rng(o.seed * 7 + 3), layer = el('g', {}, svg);
      // a curved, tapered petal, 1 unit long, base at the origin
      var PETAL = 'M0,0 C0.22,-0.30 0.62,-0.36 1,-0.06 C0.70,0.10 0.30,0.14 0,0 Z';
      var n = Math.round(o.petals * W / 1000);
      for (var pi = 0; pi < n; pi++) {
        // released where the drawing tip passes the release point, at a point inside the upper part of the box
        // (lines run past the edges; a petal born off-canvas would never be seen)
        var sg, f, px, py, tries = 0;
        do {
          sg = g.segs[Math.floor(PR() * g.segs.length)]; f = Math.max(0, Math.min(1, o.release + (PR() * 2 - 1) * o.releaseSpread));
          px = sg.x0 + (sg.x1 - sg.x0) * f; py = sg.y0 + (sg.y1 - sg.y0) * f;
        } while ((px < 0 || px > W * 0.85 || py < H * 0.05 || py > H * 0.6) && ++tries < 40);
        if (tries >= 40) continue;
        var segLen = Math.hypot(sg.x1 - sg.x0, sg.y1 - sg.y0), segDur = o.draw * 1000 * Math.max(0.5, Math.min(1.6, segLen / H)) * 1.35;
        var at2 = timing(sg.x0) + segDur * 0.85 * f * o.petalWait + o.petalDelay * 1000;   // with its line (0) … when the tip passes (1)
        var size = o.petalMin + (o.petalMax - o.petalMin) * PR();
        var r0 = -35 + PR() * 70, spin = (PR() < 0.5 ? -1 : 1) * o.spin * (0.5 + PR() * 0.8);
        var dx = o.driftX * (0.6 + PR() * 0.8), dy = o.driftY * (0.5 + PR() * 1.0), sway = o.flutter * (0.5 + PR());
        var pg = el('g', { opacity: 0 }, layer);
        el('path', { d: PETAL, transform: 'scale(' + size.toFixed(1) + ')', fill: 'url(#' + uid + ')',
          stroke: o.outline > 0 ? o.petalLine : 'none', 'stroke-width': (o.outline / size).toFixed(4), 'stroke-linejoin': 'round' }, pg);
        var kf = [], steps = 6;
        for (var st = 0; st <= steps; st++) {
          var t = st / steps, e = 1 - Math.pow(1 - t, 2.2);       // carried fast, then slowing
          var tx = px + dx * e, ty = py + dy * e + Math.sin(t * Math.PI * 2.5) * sway * t;
          var op = st === 0 ? 0 : (st === steps ? o.linger : o.petalOpacity * (st === steps - 1 ? 0.8 : 1));
          kf.push({ transform: 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) rotate(' + (r0 + spin * e).toFixed(1) + 'deg) scale(' + (st === 0 ? 0.3 : 1) + ')', opacity: op, offset: st === 1 ? 0.06 : t });
        }
        kf[1].offset = 0.06;
        anims.push(pg.animate(kf, { duration: o.float * 1000, delay: at2, fill: 'both', easing: 'linear' }));
      }
    }
    svg.appendChild(glow);   // sparkles on top of every line
    return {
      replay: function () { anims.forEach(function (a) { a.cancel(); a.play(); }); },
      setRate: function (r) { anims.forEach(function (a) { a.playbackRate = r; }); },
      count: g.segs.length + g.tris.length,
      petals: o.petals > 0 && !reduce ? Math.round(o.petals * W / 1000) : 0
    };
  }

  function mountAll(opts, selector) {
    var hosts = document.querySelectorAll(selector || '[data-lattice]'), out = [];
    for (var i = 0; i < hosts.length; i++) out.push(mount(hosts[i], opts));
    return out;
  }

  root.Lattice = { DEFAULTS: DEFAULTS, mount: mount, mountAll: mountAll, build: build };
})(window);
