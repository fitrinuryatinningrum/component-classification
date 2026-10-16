/* =========================================================
   detail.js — Halaman detail satu komponen
   ========================================================= */

(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function byId(id) { return COMPONENTS.find(c => c.id === id); }

  function badgeArus(a) {
    const cls = a === "ac" ? "ac" : a === "dc" ? "dc" : "dual";
    return `<span class="badge ${cls}">${esc(ARUS[a])}</span>`;
  }

  function arusPenjelasan(a) {
    if (a === "ac") return "Komponen ini <b>hanya bekerja dengan arus bolak-balik (AC)</b>. Contohnya transformator, motor induksi, dan TRIAC. Memberi DC tetap padanya dapat membuat kumparan cepat panas lalu terbakar.";
    if (a === "dc") return "Komponen ini <b>hanya bekerja dengan arus searah (DC)</b>. Sumbernya battery, accumulator, atau adaptor. Pada tegangan AC, komponen ini tidak dapat dioperasikan langsung.";
    return "Komponen ini dapat bekerja pada <b>AC maupun DC</b>. Sifat kelistrikannya tidak bergantung pada arah arus, sehingga dipakai luas di kedua jenis instalasi.";
  }

  function render(c) {
    const idx = COMPONENTS.indexOf(c);
    const prev = COMPONENTS[(idx - 1 + COMPONENTS.length) % COMPONENTS.length];
    const next = COMPONENTS[(idx + 1) % COMPONENTS.length];

    const mirip = (c.mirip || []).map(byId).filter(Boolean);

    document.title = c.nama + " — Klasifikasi AC/DC";
    $("#crumbName").textContent = c.nama;

    $("#detailArea").innerHTML = `
      <section class="detail-hero" data-kat="${c.kategori}">
        <div class="big">${symbolSVG(c.id, "", c.nama)}</div>
        <div>
          <div class="badges" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">
            ${badgeArus(c.arus)}
            <span class="badge cat">${esc(KATEGORI[c.kategori])}</span>
            <span class="badge lv">Tingkat ${esc(TINGKAT[c.tingkat])}</span>
          </div>
          <h1 style="margin-bottom:6px">${esc(c.nama)}</h1>
          <p style="color:var(--txt-3);font-family:var(--mono);font-size:.85rem;margin:0 0 10px">
            ${esc((c.alias || []).join(" · ") || c.id)}
          </p>
          <p style="margin:0">${esc(c.fungsi)}</p>
        </div>
      </section>

      <dl class="spec" data-kat="${c.kategori}">
        <div><dt>Jenis Arus</dt><dd>${esc(ARUS[c.arus])}</dd></div>
        <div><dt>Kategori</dt><dd>${esc(KATEGORI[c.kategori])}</dd></div>
        <div><dt>Tegangan Kerja</dt><dd>${esc(c.tegangan)}</dd></div>
        <div><dt>Rating</dt><dd>${esc(c.rating)}</dd></div>
        <div><dt>Bentuk Fisik</dt><dd>${esc(c.bentuk)}</dd></div>
      </dl>

      <div class="note-box" style="margin-bottom:16px">
        <h3>🔌 Kenapa diklasifikasikan ${esc(ARUS[c.arus])}?</h3>
        <p>${arusPenjelasan(c.arus)}</p>
      </div>

      <div class="cols">
        <div class="info">
          <h3>⚙️ Prinsip Kerja</h3>
          <p>${esc(c.prinsip)}</p>
        </div>
        <div class="info">
          <h3>📌 Karakteristik Utama</h3>
          <ul>${(c.karakteristik || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
        <div class="info">
          <h3>🔧 Contoh Penerapan</h3>
          <ul>${(c.contoh || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
        <div class="info note">
          <h3 style="color:var(--warn)">⚠️ Catatan &amp; Jebakan Umum</h3>
          <p style="margin:0">${esc(c.catatan)}</p>
        </div>
      </div>

      ${mirip.length ? `
      <section class="section">
        <div class="section-head"><h2>Komponen Serupa</h2>
          <span class="hint">sering tertukar dengan ${esc(c.nama)}</span></div>
        <div class="grid">
          ${mirip.map(m => `
            <a class="card" data-kat="${m.kategori}" href="detail.html?id=${encodeURIComponent(m.id)}">
              <div class="top">
                <div class="symbox">${symbolSVG(m.id, "", m.nama)}</div>
                <div><h3>${esc(m.nama)}</h3>
                  <div class="alias">${esc((m.alias || [])[0] || "")}</div></div>
              </div>
              <p class="fungsi">${esc(m.fungsi)}</p>
              <div class="foot">${badgeArus(m.arus)}
                <span class="badge cat">${esc(KATEGORI[m.kategori])}</span></div>
            </a>`).join("")}
        </div>
      </section>` : ""}

      <div class="hero-actions" style="margin:8px 0 4px">
        <a class="btn primary" href="kuis.html?fokus=${encodeURIComponent(c.id)}">🎯 Uji dengan kuis ini</a>
        <a class="btn" href="index.html#daftar">← Kembali ke daftar</a>
        <a class="btn ghost" href="detail.html?id=${encodeURIComponent(
            COMPONENTS[Math.floor(Math.random() * COMPONENTS.length)].id)}">🎲 Komponen acak</a>
      </div>

      <nav class="pager">
        <a href="detail.html?id=${encodeURIComponent(prev.id)}">
          <span>← Sebelumnya</span><b>${esc(prev.nama)}</b></a>
        <a href="detail.html?id=${encodeURIComponent(next.id)}" style="text-align:right">
          <span>Berikutnya →</span><b>${esc(next.nama)}</b></a>
      </nav>
    `;
  }

  function renderMissing(id) {
    document.title = "Komponen tidak ditemukan — Klasifikasi AC/DC";
    $("#crumbName").textContent = "tidak ditemukan";
    $("#detailArea").innerHTML = `
      <div class="empty" style="padding:70px 20px">
        <div class="big">🤷</div>
        <h2>Komponen "${esc(id)}" tidak ditemukan</h2>
        <p>Mungkin tautannya sudah berubah. Lihat <a href="index.html#daftar">daftar lengkap</a>.</p>
      </div>`;
  }

  function showById(id) {
    const c = byId(id);
    if (c) render(c); else renderMissing(id);
  }

  function init() {
    const id = new URLSearchParams(location.search).get("id") || "resistor";
    showById(id);
  }

  // hook untuk router versi satu-file
  window.DETAIL = { show: showById, init: init };

  // pada versi satu-file, router yang memanggil show() — jangan auto-init
  if (!window.__SINGLE_FILE__) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})();