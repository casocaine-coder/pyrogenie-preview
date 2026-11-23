/* Warenkorb des Pyrogenie-Shops (getrennt vom PG-SFX-Rental) */
var SHOP_MAIL = '';   // Empfänger der Bestellanfragen – hier die richtige E-Mail-Adresse eintragen
var CART = (function(){
  var KEY = 'pg-shop-cart', mem = [], byCode = {}, catBy = {};
  SHOP_PRODUCTS.forEach(function(p){ byCode[p.code] = p; });
  SHOP_CATS.forEach(function(c){ catBy[c.slug] = c; });
  function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch(_){ return mem; } }
  function save(l){ mem = l; try { localStorage.setItem(KEY, JSON.stringify(l)); } catch(_){} window.dispatchEvent(new Event('cartchange')); }
  function add(code, q, d){          // d = Mietdauer (nur bei Mietartikeln wie den Zündsystemen)
    var l = load(), hit = null; l.forEach(function(x){ if (x.c === code && (x.d || '') === (d || '')) hit = x; });
    if (hit) hit.q = Math.min(999, hit.q + (q || 1)); else { var it = {c: code, q: q || 1}; if (d) it.d = d; l.push(it); }
    save(l);
  }
  function list(){ var l = load(), k = l.filter(function(x){ return byCode[x.c]; }); if (k.length !== l.length){ mem = k; try { localStorage.setItem(KEY, JSON.stringify(k)); } catch(_){} } return k.map(function(x){ var p = byCode[x.c]; return {c:x.c, q:x.q, d:x.d || '', p:p, cat:(catBy[p.cat] || {}).name || ''}; }); }
  function setQty(i, q){ var l = load(); if (!l[i]) return; l[i].q = Math.max(1, Math.min(999, q)); save(l); }
  function setDur(i, d){ var l = load(); if (!l[i]) return; l[i].d = d; save(l); }
  function removeAt(i){ var l = load(); l.splice(i, 1); save(l); }
  function mail(f){
    var l = list(); if (!l.length) return;
    var buy = l.filter(function(x){ return !x.p.rent; }), rent = l.filter(function(x){ return x.p.rent; });
    var lines = ['Hallo Pyrogenie-Team,', ''];
    if (buy.length){ lines.push('ich möchte folgende Artikel bestellen:', ''); buy.forEach(function(x){ lines.push('• ' + x.q + '× ' + x.c + (x.p.name && x.p.name !== x.c ? ' ' + x.p.name : '') + (x.cat ? ' (' + x.cat + ')' : '')); }); lines.push(''); }
    if (rent.length){ lines.push((buy.length ? 'Außerdem möchte ich' : 'ich möchte') + ' folgende Geräte mieten:', ''); rent.forEach(function(x){ lines.push('• ' + x.q + '× ' + x.c + (x.p.brand ? ' (' + x.p.brand + ')' : '') + ' – Mietdauer: ' + (x.d || '1 Tag')); }); }
    if (f.name.value) lines.push('', 'Name: ' + f.name.value);
    if (f.tel.value) lines.push('Telefon: ' + f.tel.value);
    if (f.msg.value) lines.push('', f.msg.value);
    location.href = 'mailto:' + SHOP_MAIL + '?subject=' + encodeURIComponent('Bestellanfrage Pyrogenie Shop') + '&body=' + encodeURIComponent(lines.join('\n'));
  }
  return {add: add, list: list, setQty: setQty, setDur: setDur, removeAt: removeAt, mail: mail};
})();
