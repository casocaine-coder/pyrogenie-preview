/* Passwortschutz für die Testversion (Sichtschutz, kein Server-Schutz). In der Claude-Vorschau aus. */
(function(){
  var d = document.documentElement;
  if (!d.classList.contains('pg-locked')) return;
  var H = 'aa193c8cace945a96af4523e34132bc73b953ec564201c5fc4ace0db6e1f0a6f';
  function sha256(s){
    function r(n,x){return (x>>>n)|(x<<(32-n));}
    var K=[],h=[],p=2,c=0;
    function f(x){return (x-(x|0))*4294967296|0;}
    while(c<64){var ok=true;for(var q=2;q*q<=p;q++)if(p%q===0){ok=false;break;}if(ok){if(c<8)h[c]=f(Math.pow(p,1/2));K[c++]=f(Math.pow(p,1/3));}p++;}
    var b=unescape(encodeURIComponent(s)),l=b.length*8,w=[],i;
    b+='\x80';while(b.length%64-56)b+='\x00';
    for(i=0;i<b.length;i++)w[i>>2]|=b.charCodeAt(i)<<((3-i)%4)*8;
    w[w.length]=(l/4294967296)|0;w[w.length]=l|0;
    for(var j=0;j<w.length;j+=16){
      var W=w.slice(j,j+16),a=h.slice(0);
      for(i=0;i<64;i++){
        if(i>15){var x=W[i-15],y=W[i-2];W[i]=(W[i-16]+(r(7,x)^r(18,x)^(x>>>3))+W[i-7]+(r(17,y)^r(19,y)^(y>>>10)))|0;}
        var t1=a[7]+(r(6,a[4])^r(11,a[4])^r(25,a[4]))+((a[4]&a[5])^(~a[4]&a[6]))+K[i]+W[i],
            t2=(r(2,a[0])^r(13,a[0])^r(22,a[0]))+((a[0]&a[1])^(a[0]&a[2])^(a[1]&a[2]));
        a=[(t1+t2)|0].concat(a);a[4]=(a[4]+t1)|0;a.pop();
      }
      for(i=0;i<8;i++)h[i]=(h[i]+a[i])|0;
    }
    var o='';for(i=0;i<8;i++)o+=('00000000'+(h[i]>>>0).toString(16)).slice(-8);return o;
  }
  var g=document.createElement('div');g.className='pg-gate';g.setAttribute('role','dialog');g.setAttribute('aria-modal','true');g.setAttribute('aria-label','Passwort eingeben');
  g.innerHTML='<form class="pg-gate__box" autocomplete="off"><img src="img/logo.png" alt="Pyrogenie" class="pg-gate__logo">'
    +'<p class="pg-gate__t">Testversion – bitte Passwort eingeben</p>'
    +'<input class="pg-gate__in" type="password" aria-label="Passwort" placeholder="Passwort" autocapitalize="characters" spellcheck="false">'
    +'<button class="pg-gate__b" type="submit">Öffnen</button><p class="pg-gate__err" aria-live="polite"></p></form>';
  var st=document.createElement('style');
  st.textContent='.pg-gate{position:fixed;inset:0;z-index:2147483647;background:#000;display:flex;align-items:center;justify-content:center;padding:24px;visibility:visible!important}'
    +'.pg-gate__box{width:min(360px,100%);display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;color:#fff;font-family:inherit}'
    +'.pg-gate__logo{width:120px;height:auto;margin-bottom:8px}'
    +'.pg-gate__t{margin:0;font-size:14px;letter-spacing:.08em;color:rgba(255,255,255,.75)}'
    +'.pg-gate__in{font-family:inherit;width:100%;height:48px;padding:0 14px;font-size:16px;color:#fff;background:#0d0d0d;border:1px solid rgba(200,149,58,.6);border-radius:0;outline:none;text-align:center;letter-spacing:.15em}'
    +'.pg-gate__in:focus{border-color:#c8953a;box-shadow:0 0 0 1px #c8953a}'
    +'.pg-gate__b{font-family:inherit;width:100%;height:48px;font-size:14px;letter-spacing:.18em;text-transform:uppercase;color:#000;background:#c8953a;border:0;cursor:pointer}'
    +'.pg-gate__b:hover{filter:brightness(1.1)}'
    +'.pg-gate__err{margin:0;min-height:1.2em;font-size:13px;color:#e8584a}'
    +'.pg-gate.shake .pg-gate__box{animation:pgshake .35s}@keyframes pgshake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}';
  document.head.appendChild(st);document.body.appendChild(g);
  var inp=g.querySelector('input'),err=g.querySelector('.pg-gate__err');
  setTimeout(function(){inp.focus();},50);
  g.querySelector('form').addEventListener('submit',function(e){
    e.preventDefault();
    if(sha256('pyrogenie-gate:'+inp.value.trim())===H){
      try{sessionStorage.setItem("pg-gate",H);}catch(x){}
      d.classList.remove('pg-locked');g.remove();
    } else {
      err.textContent='Falsches Passwort';inp.value='';g.classList.remove('shake');void g.offsetWidth;g.classList.add('shake');inp.focus();
    }
  });
})();
/* Oben links: Warenkorb und Profil (der Tag-Modus ist entfernt, die Seite ist immer dunkel).
   PG-Shop und PG-SFX haben getrennte Warenkörbe – SFX läuft später über eine eigene Domain. */
(function(){
  var root = document.documentElement;
  root.classList.remove('light');
  try { localStorage.removeItem('pg-theme'); } catch(e){}

  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var SFX = /^(sfx|rental|mietgeraet|sfx-warenkorb|effekte)\.html$/.test(page);
  var CART = SFX ? {key:'pg-rental-anfrage', href:'sfx-warenkorb.html', label:'Mietanfrage'}
                 : {key:'pg-shop-cart',      href:'warenkorb.html',     label:'Warenkorb'};

  function count(){
    try { return (JSON.parse(localStorage.getItem(CART.key)) || []).reduce(function(a, x){ return a + (x.q || 1); }, 0); }
    catch(e){ return 0; }
  }
  var box = document.createElement('div');
  box.className = 'hdr-btns' + (document.getElementById('back') ? ' has-back' : '');
  box.innerHTML =
    '<a class="hdr-btn hdr-cart" href="' + CART.href + '" aria-label="' + CART.label + '">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2.2l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.2L21 8H6.1"/><circle cx="9.5" cy="20" r="1.3"/><circle cx="17.5" cy="20" r="1.3"/></svg>' +
      '<b class="hdr-badge" hidden>0</b></a>' +
    '<a class="hdr-btn hdr-profile" href="anmelden.html" aria-label="Profil / Anmelden">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="4"/><path d="M4 21c.8-4.2 4.1-6.5 8-6.5s7.2 2.3 8 6.5"/></svg></a>';
  document.body.appendChild(box);
  if (page === CART.href) box.querySelector('.hdr-cart').setAttribute('aria-current', 'page');
  if (page === 'anmelden.html') box.querySelector('.hdr-profile').setAttribute('aria-current', 'page');

  var badge = box.querySelector('.hdr-badge');
  function refresh(bump){
    var n = count(); badge.textContent = n > 99 ? '99+' : n; badge.hidden = !n;
    if (bump){ badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }
  }
  refresh();
  window.addEventListener('cartchange', function(){ refresh(true); });
  window.addEventListener('storage', function(e){ if (e.key === CART.key) refresh(); });
  window.addEventListener('pageshow', function(){ refresh(); });

  // beim Runterscrollen ausblenden (wie das Menü), oben wieder einblenden
  var tk = false;
  function vis(){ tk = false; box.classList.toggle('away', window.scrollY > 80); }
  window.addEventListener('scroll', function(){ if (!tk){ tk = true; requestAnimationFrame(vis); } }, {passive:true});
  vis();

  // stumme Hintergrund-Videos auf dem Handy sicher starten
  function kick(){ document.querySelectorAll('video[autoplay]').forEach(function(v){ v.muted = true; v.setAttribute('playsinline',''); var p = v.play(); if (p && p.catch) p.catch(function(){}); }); }
  kick(); window.addEventListener('load', kick);
  document.addEventListener('touchstart', kick, {once:true, passive:true});
  document.addEventListener('visibilitychange', function(){ if (!document.hidden) kick(); });
})();

/* ---------- Ladebildschirm ausblenden: wenn die Seite geladen ist und der Schriftzug mindestens einmal ganz rum ist ---------- */
(function(){
  var root = document.documentElement, L = document.getElementById('loader');
  if (!L || !root.classList.contains('loading')) return;
  var TURN = 1600, t0 = performance.now(), gone = false;
  function hide(){
    if (gone) return; gone = true;
    var e = performance.now() - t0, wait = Math.max(TURN, Math.ceil(e / TURN) * TURN) - e;   // Drehung zu Ende laufen lassen
    setTimeout(function(){
      L.classList.add('done');
      try { sessionStorage.setItem('pg-intro', '1'); } catch(_){}
      setTimeout(function(){ root.classList.remove('loading'); }, 650);
    }, wait);
  }
  if (document.readyState === 'complete') hide(); else window.addEventListener('load', hide);
  setTimeout(hide, 6000);   // spätestens nach 6 Sekunden
})();
/* Handy: Tippen auf die abgedunkelte Fläche neben dem Menü schließt es */
document.addEventListener('click', function(e){
  if (!document.documentElement.classList.contains('mobile')) return;
  var nav = document.getElementById('nav');
  if (nav && e.target === nav && nav.classList.contains('open')){
    nav.classList.remove('open'); var b = document.getElementById('menuBtn'); if (b) b.setAttribute('aria-expanded', 'false');
  }
});

/* Handy: kürzerer Platzhalter im Shop-Suchfeld, damit er nicht abgeschnitten wird */
(function(){
  if (!document.documentElement.classList.contains('mobile')) return;
  var s = document.querySelector('#search[placeholder="Artikelnummer oder Effekt suchen"]');
  if (s) s.placeholder = "Suchen";
})();


/* Liquid Glass: die Spiegelung am Rand von Kacheln und Knöpfen folgt dem Cursor */
(function(){
  if (!window.matchMedia || !matchMedia('(hover:hover)').matches) return;
  var BTN = '.btn,.pill,.loadmore,.fbtn,.fchip,.chip,.sim__arr,.more__arr,.igc__open,.info__btn,.cart__more,.flt__reset,.vat__sw';
  var HOST = '.card,.moment,.person,.p,.rc,.sim__p,.fx,.ref,.reel__poster,.player__btn,.win--pair,.tile,.cat';
  var FRAME = '.card__img,.moment__img,.person__img,.p__img,.rc__img,.sim__img,.fx__media';
  var raf = 0, ev = null, last = null;
  function reset(el){ if (el){ el.style.removeProperty('--gx'); el.style.removeProperty('--gy'); } }
  function upd(){
    raf = 0; var e = ev, t = e.target; if (!t.closest) return;
    var el = t.closest(BTN);
    if (!el){ var h = t.closest(HOST); el = h ? (h.querySelector(FRAME) || h) : null; }
    if (el !== last){ reset(last); last = el; }
    if (!el) return;
    var r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
    el.style.setProperty('--gx', Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100)).toFixed(1) + '%');
    el.style.setProperty('--gy', Math.max(0, Math.min(100, (e.clientY - r.top) / r.height * 100)).toFixed(1) + '%');
  }
  document.addEventListener('pointermove', function(e){ ev = e; if (!raf) raf = requestAnimationFrame(upd); }, {passive:true});
  document.addEventListener('pointerleave', function(){ reset(last); last = null; });
})();
