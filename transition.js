/* Weicher Seitenwechsel: Seite blendet über Schwarz aus und die neue wieder ein.
   Gilt für den Zurück-Pfeil, das Zurück-Wischen und alle internen Links. */
(function(){
  var pt = document.getElementById('pt');
  if (!pt) return;
  var DUR = 180, leaving = false;
  function enter(){ leaving = false; requestAnimationFrame(function(){ requestAnimationFrame(function(){ pt.classList.add('off'); }); }); }
  function leave(go){
    if (leaving) return; leaving = true;
    pt.classList.remove('off');
    setTimeout(go, DUR);
    setTimeout(function(){ if (leaving) enter(); }, 2500);   // Sicherheitsnetz, falls nichts passiert
  }
  window.PT = { leave: leave };
  enter();
  window.addEventListener('pageshow', function(e){ if (e.persisted) { pt.classList.remove('off'); enter(); } });

  // Zurück-Pfeil
  var back = document.getElementById('back');
  if (back) back.addEventListener('click', function(e){
    e.preventDefault();
    var useHistory = false;
    try { var r = document.referrer ? new URL(document.referrer) : null; useHistory = !!(r && r.origin === location.origin && history.length > 1); } catch(_){}
    leave(function(){ if (useHistory) history.back(); else location.href = back.getAttribute('href'); });
  });

  // Interne Links (andere Seite dieser Website)
  document.addEventListener('click', function(e){
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.id === 'back' || a.target === '_blank') return;
    var url; try { url = new URL(a.href, location.href); } catch(_){ return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) return;          // nur Sprungmarke auf derselben Seite
    e.preventDefault();
    leave(function(){ location.href = a.href; });
  });
})();
