/* PG-SFX Rental – Karten, Anfrage-Liste und Anfrage-Formular (gemeinsam für rental.html und mietgeraet.html) */
var RENT_MAIL = '';   // Empfänger der Mietanfragen – hier die richtige E-Mail-Adresse eintragen
/* Herstellerlogos (einfarbig, werden je nach Modus hell/dunkel eingefärbt) */
var RENT_LOGOS = {'MAGIC FX':['magic-fx',1110,137],'Explo SFX':['explo-sfx',372,160],'Look Solutions':['look-solutions',345,160],'Spark Fabrica':['spark-fabrica',610,160],
  'Galaxis':['galaxis',176,64],'Showven':['showven',553,79],'Eurolite':['eurolite',100,25],'MDG':['mdg',477,160],'Antari':['antari',394,144]};
var RQ = (function(){
  var KEY = 'pg-rental-anfrage', bySlug = {};
  RENT_PRODUCTS.forEach(function(p){ bySlug[p.slug] = p; });
  function img(f){ return 'rental/img/' + f; }
  function bslug(b){ return b.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  // Logo optisch gleich groß: gleiche Fläche, Höhe begrenzt
  function logo(b, area, maxH){
    var L = RENT_LOGOS[b]; if (!L) return '';
    var r = L[1] / L[2], h = Math.min(maxH, Math.sqrt(area / r)), w = h * r;
    return '<img class="logo" src="rental/logo/' + L[0] + '.png" alt="' + b + '" style="width:' + w.toFixed(0) + 'px;height:' + h.toFixed(0) + 'px">';
  }
  // Hauptbild: festgelegt (m) oder das erste freigestellte; Fotos/Szenen (p) nur, wenn es nichts anderes gibt
  function light(p){ if (p.m != null) return p.img[p.m]; for (var i = 0; i < p.img.length; i++) if (!p.img[i].p) return p.img[i]; return p.img[0]; }
  // Optisch gleich groß: jedes Gerät bekommt ungefähr dieselbe Fläche in seiner Box, mittig, ohne an den Rand zu stoßen
  function fit(im, box, area, cap){
    if (im.p || !im.w) return 'width:100%;height:100%';
    cap = cap || .86; var r = im.w / im.h, h = Math.sqrt(area * box / r), w = r * h / box;
    if (w > cap){ w = cap; h = w * box / r; } if (h > cap){ h = cap; w = r * h / box; }
    return 'width:' + (w * 100).toFixed(1) + '%;height:' + (h * 100).toFixed(1) + '%';
  }
  function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch(_){ return mem; } }
  var mem = [];
  function save(l){ mem = l; try { localStorage.setItem(KEY, JSON.stringify(l)); } catch(_){} }
  function has(slug){ return load().some(function(x){ return x.s === slug; }); }

  function card(p){
    var m = light(p), alt = document.documentElement.classList.contains('mobile') ? null : p.img.filter(function(x){ return x !== m && !x.p && !m.p; })[0], inList = has(p.slug);   // Handy: kein Hover → kein zweites Bild laden
    return '<div class="rc' + (m.p ? ' rc--photo' : '') + '">' +
      '<a class="rc__link" href="mietgeraet.html#' + p.slug + '" aria-label="' + p.brand + ' ' + p.name + '"></a>' +
      '<div class="rc__img"><img class="' + (alt ? 'has-alt' : '') + '" src="' + img(m.f) + '" style="' + fit(m, 1, .4) + '" alt="' + p.brand + ' ' + p.name + '" loading="lazy" decoding="async">' +
      (alt ? '<img class="alt" src="' + img(alt.f) + '" style="' + fit(alt, 1, .4) + '" alt="" loading="lazy" decoding="async">' : '') + '</div>' +
      '<div class="rc__body"><span class="rc__brand zara">' + p.brand + '</span><span class="rc__name">' + p.name + '</span>' +
      (p.code ? '<span class="rc__code zara">' + p.code + '</span>' : '') +
      '<div class="rc__foot"><span class="rc__price zara">Preis auf Anfrage</span>' +
      '<button class="rc__add' + (inList ? ' in' : '') + '" type="button" data-add="' + p.slug + '" aria-label="' + p.name + ' zur Anfrage hinzufügen">' +
      '<svg viewBox="0 0 14 14"><path d="M7 1v12M1 7h12"/></svg></button></div></div></div>';
  }

  /* ---------- Anfrage-Liste (der Warenkorb von PG-SFX; Übersicht auf sfx-warenkorb.html) ---------- */
  function changed(){ document.querySelectorAll('.rc__add').forEach(function(b){ b.classList.toggle('in', has(b.dataset.add)); }); window.dispatchEvent(new Event('cartchange')); }
  function list(){ var l = load(), k = l.filter(function(x){ return bySlug[x.s]; }); if (k.length !== l.length) save(k); return k.map(function(x){ return {s:x.s, q:x.q, d:x.d, p:bySlug[x.s]}; }); }
  function setQty(i, q){ var l = load(); if (!l[i]) return; l[i].q = Math.max(1, Math.min(99, q)); save(l); changed(); }
  function setDur(i, d){ var l = load(); if (!l[i]) return; l[i].d = d; save(l); changed(); }
  function removeAt(i){ var l = load(); l.splice(i, 1); save(l); changed(); }
  function clear(){ save([]); changed(); }
  function mail(f){
    var l = list(); if (!l.length) return;
    var lines = ['Hallo PG-SFX-Team,', '', 'ich möchte folgende Geräte mieten:', ''];
    l.forEach(function(x){ var p = x.p; lines.push('• ' + x.q + '× ' + p.brand + ' ' + p.name + (p.code ? ' (' + p.code + ')' : '') + (x.d ? ' – ' + x.d : '')); });
    lines.push('', 'Zeitraum: ' + (f.von.value || '?') + ' bis ' + (f.bis.value || '?'));
    if (f.ort.value) lines.push('Ort / Event: ' + f.ort.value);
    if (f.name && f.name.value) lines.push('Name: ' + f.name.value);
    if (f.tel && f.tel.value) lines.push('Telefon: ' + f.tel.value);
    if (f.msg.value) lines.push('', f.msg.value);
    location.href = 'mailto:' + RENT_MAIL + '?subject=' + encodeURIComponent('Mietanfrage PG-SFX Rental') + '&body=' + encodeURIComponent(lines.join('\n'));
  }
  function add(slug, q, d){
    var l = load(), hit = null;
    l.forEach(function(x){ if (x.s === slug && (x.d || '') === (d || '')) hit = x; });
    if (hit) hit.q = Math.min(99, hit.q + (q || 1)); else l.push({s: slug, q: q || 1, d: d || ''});
    save(l); changed();
  }
  function remove(slug){ save(load().filter(function(x){ return x.s !== slug; })); changed(); }
  document.addEventListener('click', function(e){
    var b = e.target.closest('.rc__add'); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    if (b.classList.contains('in')) remove(b.dataset.add); else add(b.dataset.add, 1, '');
  }, true);
  return {img: img, light: light, fit: fit, card: card, add: add, logo: logo, bslug: bslug, list: list, setQty: setQty, setDur: setDur, removeAt: removeAt, clear: clear, mail: mail};
})();
