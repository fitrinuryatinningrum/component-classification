/* =========================================================
   build-single-file.js
   Menggabungkan seluruh proyek menjadi SATU file HTML
   (CSS + JS + router hash) tanpa mengubah file sumber.

   Jalankan:  node build-single-file.js
   Hasil   :  Klasifikasi-Komponen-AC-DC.html
   ========================================================= */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const OUT = path.join(ROOT, "Klasifikasi-Komponen-AC-DC.html");

const read = f => fs.readFileSync(path.join(ROOT, f), "utf8");

/* ---------- 1. potongan dari tiap halaman ---------- */
function between(html, start, end) {
  const i = html.indexOf(start);
  const j = html.indexOf(end, i);
  if (i < 0 || j < 0) throw new Error("potongan tidak ditemukan: " + start);
  return html.slice(i, j + end.length);
}

const idx = read("index.html");
const det = read("detail.html");
const kui = read("kuis.html");

const topbar = between(idx, '<header class="topbar">', "</header>");
const footer = between(idx, "<footer>", "</footer>");

// beranda: <main> + semua isi setelahnya sampai <footer>
const homeMain = between(idx, '<main class="wrap">', "</main>");
const homeRest = idx.slice(idx.indexOf('<div class="filters"'), idx.indexOf("<footer>")).trim();

const detMain = between(det, '<main class="wrap">', "</main>");
const kuiMain = between(kui, '<main class="wrap">', "</main>");

// <main> -> <div> supaya tidak ada tiga <main> dalam satu dokumen
const asDiv = s => s.replace(/<main class="wrap">/g, '<div class="wrap">').replace(/<\/main>/g, "</div>");

/* ---------- 2. router ---------- */
const router = `
/* ===================== ROUTER SATU-FILE =====================
   #/            beranda
   #/daftar      beranda + scroll ke daftar
   #/panduan     beranda + scroll ke panduan
   #/k=<id>      detail komponen
   #/kuis        kuis
   #/kuis/fokus=<id>
   ========================================================== */
(function () {
  var PAGES = { home: "page-home", detail: "page-detail", quiz: "page-quiz" };
  var NAV = { home: "Beranda", detail: "Komponen", quiz: "Kuis" };

  function showPage(name) {
    Object.keys(PAGES).forEach(function (k) {
      var el = document.getElementById(PAGES[k]);
      if (el) el.classList.toggle("on", k === name);
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.classList.toggle("on", a.dataset.nav === (name === "detail" ? "detail" : name));
    });
  }

  function route() {
    var h = location.hash || "#/";

    if (h.indexOf("#/k=") === 0) {
      showPage("detail");
      DETAIL.show(decodeURIComponent(h.slice(4)));
      window.scrollTo(0, 0);
      return;
    }

    if (h.indexOf("#/kuis") === 0) {
      showPage("quiz");
      KUIS.init();
      if (h.indexOf("#/kuis/fokus=") === 0) KUIS.setFokus(decodeURIComponent(h.slice(13)));
      else KUIS.setFokus("");
      window.scrollTo(0, 0);
      return;
    }

    // beranda
    showPage("home");
    if (h.indexOf("#/daftar") === 0) {
      var d = document.getElementById("daftar");
      if (d) setTimeout(function () { d.scrollIntoView({ behavior: "smooth" }); }, 60);
    } else if (h.indexOf("#/panduan") === 0) {
      var p = document.getElementById("panduan");
      if (p) setTimeout(function () { p.scrollIntoView({ behavior: "smooth" }); }, 60);
    } else {
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener("hashchange", route);
  document.addEventListener("DOMContentLoaded", function () {
    KUIS.init();
    if (!location.hash) location.replace("#/");
    route();
  });
})();
`;

/* ---------- 3._asset inline ---------- */
const css = read("assets/css/style.css");
const js = [
  read("assets/js/symbols.js"),
  read("assets/js/data.js"),
  read("assets/js/app.js"),
  read("assets/js/detail.js"),
  read("assets/js/kuis.js"),
  router
].join("\n\n");

/* ---------- 4. susun dokumen ---------- */
let html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Klasifikasi Komponen AC & DC — Sistem Interaktif</title>
<meta name="description" content="Sistem interaktif untuk mengklasifikasikan 94 komponen elektronik berdasarkan jenis arus (AC/DC) dan fungsinya. Kuis 5 tipe soal.">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>\u26a1</text></svg>">
<style>
${css}
/* kontainer halaman untuk router */
.page { display: none; }
.page.on { display: block; }
.page-foot { margin-top: 40px; }
</style>
</head>
<body>

${topbar}

<div id="page-home" class="page on">
${asDiv(homeMain)}
${homeRest}
</div>

<div id="page-detail" class="page">
${asDiv(detMain)}
</div>

<div id="page-quiz" class="page">
${asDiv(kuiMain)}
</div>

${footer}

<script>
window.__SINGLE_FILE__ = true;
${js}
</script>
</body>
</html>`;

/* ---------- 5. tulis ulang tautan agar pakai router ---------- */
const LINKS = [
  ['kuis.html?fokus=', '#/kuis/fokus='],
  ['detail.html?id=', '#/k='],
  ['kuis.html', '#/kuis'],
  ['index.html#daftar', '#/daftar'],
  ['index.html#panduan', '#/panduan'],
  ['index.html', '#/']
];
LINKS.forEach(([a, b]) => { html = html.split(a).join(b); });

/* tandai menu aktif untuk router */
html = html
  .replace(/<a href="#\/" class="on">Beranda<\/a>/, '<a href="#/" data-nav="home">Beranda</a>')
  .replace(/<a href="#\/daftar" class="on">Komponen<\/a>/, '<a href="#/daftar" data-nav="detail">Komponen</a>')
  .replace(/<a href="#\/daftar">Komponen<\/a>/, '<a href="#/daftar" data-nav="detail">Komponen</a>')
  .replace(/<a href="#\/kuis" class="on">Kuis<\/a>/, '<a href="#/kuis" data-nav="quiz">Kuis</a>')
  .replace(/<a href="#\/kuis">Kuis<\/a>/, '<a href="#/kuis" data-nav="quiz">Kuis</a>');

fs.writeFileSync(OUT, html, "utf8");

console.log("Selesai  : " + path.basename(OUT));
console.log("Ukuran   : " + (fs.statSync(OUT).size / 1024).toFixed(1) + " KB");
console.log("Baris    : " + html.split("\n").length);
const sisa = ["index.html", "detail.html", "kuis.html", "assets/"]
  .filter(x => html.indexOf(x) !== -1);
console.log("Sisa rujukan file luar: " + (sisa.length ? sisa.join(", ") : "tidak ada (fully inline)"));