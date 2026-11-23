/* Alle Shows – gemeinsame Daten für die Show-Übersicht (shows.html) und die Detailseiten (moment.html).
   Pro Show:
     slug   – Name in der Adresse, z. B. moment.html#knokke-2026
     img    – Bild der Kachel in der Übersicht
     hero   – großes Bild oben auf der Detailseite
     sub    – kleine Zeile (Ort / Jahr)
     title  – große Zeile
     video  – Vorschaubild fürs Video, leer = großes Bild
     yt     – YouTube-Video-ID (aus youtu.be/ID)
     vimeo  – Vimeo-Video-ID (aus vimeo.com/ID)
     file   – eigene Videodatei
     ohne yt / vimeo / file wird keine Video-Kachel gezeigt
     gallery– Bilder vom Feuerwerk / Aufbau (auch Videos: {v:'datei.mp4'} oder YouTube: {yt:'ID'}), leer = Platzhalter
     text   – Info-Text, leer = Platzhaltertext aus dem Entwurf */
/* Galerie-Sammelbild: mehrere Fotos untereinander in einer Datei (spart Dateien) – G(datei, anzahl) */
function G(src, n){ var a = []; for (var i = 0; i < n; i++) a.push({s: src, i: i, n: n}); return a; }
var MOMENTS = [
  [ // Seite 1
    {slug:'knokke-2026', yt:'s8kIEouhBfY',          img:'show/knokke.jpg',          hero:'moment/knokke-2026.jpg',          sub:'Knokke-Heist 2026',                              title:'Internationaal Vuurwerkfestival',
      video:'moment/knokke-2026-video.jpg', gallery:G('moment/knokke-2026-galerie.jpg',8)},
    {slug:'compiegne-2025', yt:'eNSE4IMPTXg',       img:'show/compiegne.jpg',       hero:'moment/compiegne-2025.jpg',       sub:'Compiègne 2025',                                 title:'Les Masters de Feu',
      gallery:G('moment/compiegne-2025-galerie-1.jpg',8).concat(G('moment/compiegne-2025-galerie-2.jpg',8))},
    {slug:'cannes-2025', yt:'Wx1F7XxzHw8',          img:'show/cannes.jpg',          hero:'moment/cannes-2025.jpg',          sub:'Cannes 2025',                                    title:'Festival d’Art Pyrotechnique',
      gallery:G('moment/cannes-2025-galerie.jpg',6)},
    {slug:'diff-2024', vimeo:'969557873',            img:'show/diff.jpg',            hero:'moment/diff-2024.jpg',            sub:'Da Nang International Fireworks Festival 2024', title:'DIFF',
      gallery:G('moment/diff-2024-galerie-1.jpg',8).concat(G('moment/diff-2024-galerie-2.jpg',2))},
    {slug:'nationalgalerie-2024', img:'show/nationalgalerie.jpg', hero:'moment/nationalgalerie-2024.jpg', sub:'An der Neuen Nationalgalerie 2024',              title:'Feuerwerk Neue Nationalgalerie',
      gallery:G('moment/nationalgalerie-2024-galerie.jpg',5)},
    {slug:'san-sebastian-2024',   img:'show/sansebastian.jpg',    hero:'moment/san-sebastian-2024.jpg',   sub:'Donostia/San Sebastián Aste Nagusia 2024',       title:'San Sebastian'}
  ],
  [ // Seite 2
    {slug:'lfc-2023', vimeo:'883174018',                 img:'show/lfc.jpg',           hero:'moment/lfc-2023.jpg',                 sub:'Liuyang Feuerwerksfestival 2023', title:'LFC',
      gallery:G('moment/lfc-2023-galerie.jpg',8)},
    {slug:'fireworks-for-peace-2023', file:'moment/video/fireworks-for-peace-2023.mp4', img:'show/mildenberg.jpg',    hero:'moment/fireworks-for-peace-2023.jpg', sub:'Ziegelpark Mildenberg 2023',      title:'Fireworks for Peace'},
    {slug:'compiegne-2023', yt:'W5VrrUfOfs8',           img:'show/compiegne2023.jpg', hero:'moment/compiegne-2023.jpg',           sub:'Compiègne 2023',                  title:'Les Masters de Feu',
      gallery:[{yt:'fBUsAamJNzM'}]},
    {slug:'knokke-2022', yt:'jPGNsADdVoQ',              img:'show/knokke2022.jpg',    hero:'moment/knokke-2022.jpg',              sub:'Knokke-Heist 2022',               title:'Internationaal Vuurwerkfestival'},
    {slug:'show-p2-5',                img:'show/pink.jpg',          hero:'moment/show-p2-5.jpg',                sub:'',                                title:''},   // Text fehlt noch
    {slug:'nights-of-lights-2020', file:'moment/video/nights-of-lights-2020-clip.mp4',    img:'show/nightsoflights.jpg',hero:'moment/nights-of-lights-2020.jpg',    sub:'MercedesBenz Arena 2020',         title:'Nights of Lights'}
  ],
  [ // Seite 3
    {slug:'kater-blau-2020',          img:'show/katerblau.jpg',             hero:'moment/kater-blau-2020.jpg',          sub:'Matrix Party im Kater Blau 2020',           title:'Kater Blau'},
    {slug:'saint-brevin-2019', vimeo:'359290807',        img:'show/saintbrevin.jpg',           hero:'moment/saint-brevin-2019.jpg',        sub:'International Saint Brevin Les Pines 2019', title:'21. Festival Pyrotechnique',
      gallery:[{yt:'NnyYQV9H8LM'}]},
    {slug:'pyroforum-2019', yt:'cEOc6dL412k',           img:'show/pyroforum.jpg',             hero:'moment/pyroforum-2019.jpg',           sub:'Pyroforum Witten 2019',                     title:'Pyroforum'},
    {slug:'feuerwerkersinfonie-2019', yt:'wLnziOtDtH0', img:'show/feuerwerkersinfonie18.jpg', hero:'moment/feuerwerkersinfonie-2019.jpg', sub:'Potsdamer Feuerwerkersinfonie 2019',        title:'18. Feuerwerkersinfonie'},
    {slug:'feuerwerkersinfonie-2018', yt:'_t6FM0jko0Q', img:'show/feuerwerkersinfonie17.jpg', hero:'moment/feuerwerkersinfonie-2018.jpg', sub:'Potsdamer Feuerwerkersinfonie 2018',        title:'17. Feuerwerkersinfonie'},
    {slug:'hafenfest-2019',           img:'show/hafenfest.jpg',             hero:'moment/hafenfest-2019.jpg',           sub:'Tempelhowerhafen Fest 2019',                title:'Hafen Fest'}
  ],
  [ // Seite 4
    {slug:'geburtstagsfeuerwerk', vimeo:'262802477', img:'show/geburtstag.jpg', hero:'moment/geburtstagsfeuerwerk.jpg', sub:'Indoore Feuerwerk Uber Arena', title:'Geburtstagsfeuerwerk'},
    {slug:'arena',                img:'show/arena.jpg',      hero:'moment/arena.jpg',                sub:'Uber Arena – jede Season',     title:'Eisbären Einlaufshow'},
    {slug:'dueben-2018', vimeo:'302021482',          img:'show/dueben.jpg',     hero:'moment/dueben-2018.jpg',          sub:'Düben 2018',                   title:'Pyromusical in Düben'}
  ]
];
