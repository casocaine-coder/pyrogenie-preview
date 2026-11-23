/* Nach rechts wischen = zurück zur vorherigen Seite.
   Finger (Handy/Tablet) und Zwei-Finger-Wischen auf dem Trackpad.
   In seitlichen Leisten blättert Wischen zuerst die Leiste – erst ganz links führt es zurück. */
window.SWIPE_BACK = null;
(function(){
  var back = document.getElementById('back');
  if (!back) return;
  var THRESH = 110, fired = false;
  function show(){}
  function hide(){}
  window.SWIPE_BACK = function(){ go(); };
  function go(){ if (fired) return; fired = true; back.click(); setTimeout(function(){ fired = false; }, 900); }

  // Darf an dieser Stelle zurück-gewischt werden?
  // In seitlich scrollbaren Leisten (Show-Kacheln, Shop-Filter, Kategorien) hat die Leiste Vorrang –
  // zurück geht es erst, wenn sie schon ganz links steht.
  var lastScroll = 0;
  document.addEventListener('scroll', function(e){ if (e.target !== document) lastScroll = Date.now(); }, {passive:true, capture:true});
  function scroller(t){
    while (t && t !== document.body && t.nodeType === 1){
      if (t.scrollWidth > t.clientWidth + 2){ var o = getComputedStyle(t).overflowX; if (o === 'auto' || o === 'scroll') return t; }
      t = t.parentElement;
    }
    return null;
  }
  function allowed(target){
    if (target && target.closest && target.closest('#momente')) return false;   // Kachel-Bereich: nie zurückwischen
    var sc = scroller(target);
    if (!sc) return true;
    return sc.scrollLeft <= 2 && Date.now() - lastScroll > 250;
  }
  // --- Finger ---
  var sx = 0, sy = 0, active = false, horiz = null, okTarget = true;
  window.addEventListener('touchstart', function(e){
    if (e.touches.length !== 1) { active = false; return; }
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; active = true; horiz = null; okTarget = allowed(e.target);
  }, {passive:true});
  window.addEventListener('touchmove', function(e){
    if (!active || !okTarget) return;
    var dx = e.touches[0].clientX - sx, dy = e.touches[0].clientY - sy;
    if (horiz === null && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) horiz = Math.abs(dx) > Math.abs(dy) * 1.4 && dx > 0;
    if (horiz) show(dx);
  }, {passive:true});
  window.addEventListener('touchend', function(e){
    if (!active) return; active = false;
    var dx = (e.changedTouches[0] || {}).clientX - sx;
    if (horiz && okTarget && dx >= THRESH) go(); else hide();
  }, {passive:true});

  // --- Trackpad: Zwei-Finger-Wischen nach rechts ---
  var acc = 0, idle, loadedAt = Date.now(), lastWheel = 0;
  window.addEventListener('wheel', function(e){
    var now = Date.now(), gap = now - lastWheel; lastWheel = now;
    if (now - loadedAt < 900) return;                 // Schwung vom vorherigen Wischen ignorieren
    if (fired) return;
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) * 1.4) { return; }
    if (e.target.closest && e.target.closest('#momente,.moments,.cats,.bar,.cats__grid')) { acc = 0; return; }
    if (!allowed(e.target)) { acc = 0; hide(); return; }
    acc = e.deltaX > 0 ? acc + e.deltaX : Math.max(0, acc + e.deltaX);
    show(acc * 0.6);
    if (acc * 0.6 >= THRESH) { acc = 0; go(); return; }
    clearTimeout(idle); idle = setTimeout(function(){ acc = 0; if (!fired) hide(); }, 180);
  }, {passive:true});
})();
