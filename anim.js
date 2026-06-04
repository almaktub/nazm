/* ── Reading progress bar ──────────────────────────── */
(function(){
  var bar = document.getElementById('progress-bar');
  if (!bar) return;
  function update(){
    var el = document.documentElement;
    var scrolled = el.scrollTop || document.body.scrollTop;
    var total    = (el.scrollHeight || document.body.scrollHeight) - el.clientHeight;
    bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── Theme toggle ─────────────────────────────────── */
/*
   Default = DARK.  Adding class "light" switches to light.
   Button initial state: "☀️ Light" (offering light mode).
   After clicking: "🌙 Dark" (offering dark mode).
*/
function toggleDark(){
  var isLight = document.body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  var btn = document.getElementById('darkBtn');
  if (!btn) return;
  btn.querySelector('.icon').textContent     = isLight ? '🌙' : '☀️';
  document.getElementById('darkLabel').textContent = isLight ? 'Dark' : 'Light';
}

(function(){
  var saved = localStorage.getItem('theme');
  var btn   = document.getElementById('darkBtn');
  if (saved === 'light') {
    document.body.classList.add('light');
    if (btn) {
      btn.querySelector('.icon').textContent     = '🌙';
      document.getElementById('darkLabel').textContent = 'Dark';
    }
  }
  /* default dark: button already reads "☀️ Light" from the HTML */
})();

/* ── Scroll reveal ─────────────────────────────────── */
(function(){
  /* Left/right slide for compare panels */
  document.querySelectorAll('.compare-card.east').forEach(function(el){
    el.classList.add('anim-left');
  });
  document.querySelectorAll('.compare-card.west').forEach(function(el){
    el.classList.add('anim-right');
  });

  /* Scale pop for pull quotes */
  document.querySelectorAll('.pull-quote').forEach(function(el){
    el.classList.add('anim-scale');
  });

  /* Fade-up for everything else worth animating */
  var fadeTargets = [
    '.verse-farsi', '.verse-translation',
    '.info-box', '.callout',
    'h2', '.page-header h1', '.page-header .subtitle',
    '.intro-banner', '.type-card',
  ];
  document.querySelectorAll(fadeTargets.join(',')).forEach(function(el){
    if (!el.classList.contains('anim-left') &&
        !el.classList.contains('anim-right') &&
        !el.classList.contains('anim-scale')) {
      el.classList.add('anim-fade');
    }
  });

  /* Stagger type-cards */
  document.querySelectorAll('.type-card').forEach(function(el, i){
    var delay = (i % 4) * 80;
    el.style.transitionDelay = delay + 'ms';
  });

  /* Stagger nav-cards on home */
  document.querySelectorAll('.nav-card').forEach(function(el, i){
    el.classList.add('anim-fade');
    el.style.transitionDelay = (i * 55) + 'ms';
  });

  /* Intersection Observer — trigger .visible */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });

  var sel = '.anim-fade, .anim-left, .anim-right, .anim-scale';
  document.querySelectorAll(sel).forEach(function(el){ io.observe(el); });
})();
