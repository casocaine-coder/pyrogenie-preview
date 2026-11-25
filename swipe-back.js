/* Zurück per Wischen – nur mit „Barriere“, damit normales Scrollen nie aus Versehen zurückführt:
   - nur Finger (Handy/Tablet), und nur wenn der Wisch ganz am linken Bildschirmrand beginnt (wie bei iOS)
   - die Bewegung muss klar waagerecht sein und weit genug gehen
   - Trackpad-Wischen am Computer ist aus (die Browser haben dafür ihre eigene Zurück-Geste). */
window.SWIPE_BACK = null;
(function(){
  var back = document.getElementById('back');
  if (!back) return;
  var EDGE = 28, THRESH = 120, fired = false;
  window.SWIPE_BACK = function(){ go(); };
  function go(){ if (fired) return; fired = true; back.click(); setTimeout(function(){ fired = false; }, 900); }
  var sx = 0, sy = 0, active = false, ok = false;
  window.addEventListener('touchstart', function(e){
    active = e.touches.length === 1 && e.touches[0].clientX <= EDGE;
    if (!active) return;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; ok = true;
  }, {passive:true});
  window.addEventListener('touchmove', function(e){
    if (!active || !ok) return;
    var dx = e.touches[0].clientX - sx, dy = Math.abs(e.touches[0].clientY - sy);
    if (dy > 30 || dx < -10 || (dx > 15 && dy > dx * 0.4)) ok = false;   // sobald es nach Scrollen aussieht: abbrechen
  }, {passive:true});
  window.addEventListener('touchend', function(e){
    if (!active) return; active = false;
    var t = e.changedTouches[0] || {}, dx = t.clientX - sx, dy = Math.abs(t.clientY - sy);
    if (ok && dx >= THRESH && dy < dx * 0.4) go();
  }, {passive:true});
})();
