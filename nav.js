(function () {
  var nav = document.querySelector('nav[aria-label="Primary navigation"]');
  if (!nav) return;

  // ── Active link style ──────────────────────────────────────────────────────
  // Injected here so it works without editing every page's inline CSS.
  var style = document.createElement('style');
  style.textContent =
    'nav ul a.active { color: var(--accent); }' +
    'nav ul a.active:hover { color: var(--accent); opacity: 0.8; }';
  document.head.appendChild(style);

  nav.innerHTML =
    '<a href="index.html" class="wordmark" aria-label="Adam Stephenson \u2014 home">Adam Stephenson</a>' +
    '<ul role="list">' +
      '<li><a href="murals.html">Murals</a></li>' +
      '<li><a href="digital.html">Digital &amp; Design</a></li>' +
      '<li><a href="fineart.html">Figurative</a></li>' +
      '<li><a href="about.html">About</a></li>' +
      '<li><a href="commission.html">Commission</a></li>' +
      '<li><a href="contact.html">Contact</a></li>' +
    '</ul>' +
    '<button class="nav-toggle" aria-label="Open menu" aria-expanded="false">' +
      '<span></span><span></span><span></span>' +
    '</button>';

  // ── Active page highlight ──────────────────────────────────────────────────
  // Map every page filename to whichever nav link should be highlighted.
  // Case-study pages surface under "Murals".
  var activeMap = {
    'murals.html':              'murals.html',
    'digital.html':             'digital.html',
    'fineart.html':             'fineart.html',
    'about.html':               'about.html',
    'commission.html':          'commission.html',
    'contact.html':             'contact.html',
    'case-homecoming.html':          'murals.html',
    'case-fiddlers-spirit.html':     'murals.html',
    'case-scottie.html':             'murals.html',
    'case-appalachian-sunsets.html': 'murals.html',
    'case-upton.html':               'murals.html',
    'case-true-strength.html':       'murals.html'
  };

  var filename = window.location.pathname.split('/').pop() || 'index.html';
  var activeHref = activeMap[filename];
  if (activeHref) {
    var activeLink = nav.querySelector('a[href="' + activeHref + '"]');
    if (activeLink) {
      activeLink.classList.add('active');
      activeLink.setAttribute('aria-current', 'page');
    }
  }

  // ── Hamburger toggle ───────────────────────────────────────────────────────
  var toggle = nav.querySelector('.nav-toggle');
  var list   = nav.querySelector('ul');
  if (!toggle || !list) return;

  toggle.addEventListener('click', function () {
    var open = list.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  list.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      list.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    });
  });
})();
