/* Nach-oben-Pfeil: erscheint oben rechts, sobald man nach unten gescrollt hat */
(function(){
  var css = document.createElement('style');
  css.textContent =
    '.totop{position:fixed;z-index:20;right:clamp(14px,2.6vw,44px);top:clamp(16px,2.8vw,40px);width:46px;height:34px;padding:0;border:0;background:none;cursor:pointer;' +
    'display:grid;place-items:center;filter:drop-shadow(0 1px 6px rgba(0,0,0,.7));opacity:0;transform:translateY(-10px);pointer-events:none;' +
    'transition:opacity .3s,transform .3s}' +
    '.totop.show{opacity:1;transform:none;pointer-events:auto}' +
    '.totop svg{width:40px;height:16px;stroke:#c8953a;stroke-width:5;fill:none;stroke-linecap:round;stroke-linejoin:round;transition:stroke .2s}' +
    '.totop:hover{transform:translateY(-5px)}.totop:hover svg{stroke:#e2b867}' +
    '.totop:focus-visible{outline:2px solid #c8953a;outline-offset:4px;border-radius:6px}';
  document.head.appendChild(css);
  var b = document.createElement('button');
  b.className = 'totop'; b.type = 'button'; b.setAttribute('aria-label', 'Nach oben');
  b.innerHTML = '<svg viewBox="0 0 60 20"><path d="M4 16 L30 4 L56 16"/></svg>';
  document.body.appendChild(b);
  b.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });
  var hero = document.querySelector('.hero'), ticking = false;
  function check(){ ticking = false;
    var limit = hero ? hero.offsetHeight * 0.8 : window.innerHeight * 0.8;
    b.classList.toggle('show', window.scrollY > limit); }
  window.addEventListener('scroll', function(){ if (!ticking){ ticking = true; requestAnimationFrame(check); } }, {passive:true});
  check();
})();
