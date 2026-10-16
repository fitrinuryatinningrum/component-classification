/* =========================================================
   app.js — Beranda: pencarian, filter, tampilan grid/tabel
   ========================================================= */

(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------- state ---------- */
  const state = {
    q: "",
    arus: new Set(),      // ac | dc | dual
    kat: new Set(),       // kunci kategori
    tingkat: new Set(),   // dasar | lanjut
    view: "grid",
    sortKey: "nama",
    sortDir: 1
  };

  /* ---------- util ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function rusuk(s) {
    return (s || "").toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ").trim();
  }

  function haystack(c) {
    return rusuk([
      c.nama, (c.alias || []).join(" "), c.fungsi, c.prinsip, c.bentuk,
      (c.contoh || []).join(" "), KATEGORI[c.kategori], ARUS[c.arus],
      TINGKAT[c.tingkat], (c.karakteristik || []).join(" ")
    ].join(" "));
  }
  const HAY = new Map(COMPONENTS.map(c => [c.id, haystack(c)]));

  function byId(id) { return COMPONENTS.find(c => c.id === id); }

  function badgeArus(a) {
    const cls = a === "ac" ? "ac" : a === "dc" ? "dc" : "dual";
    return `<span class="badge ${cls}">${esc(ARUS[a])}</span>`;
  }

  /* ---------- filter ---------- */
  function filtered() {
    const terms = rusuk(state.q).split(" ").filter(Boolean);
    let out = COMPONENTS.filter(function (c) {
      if (state.arus.size && !state.arus.has(c.arus)) return false;
      if (state.kat.size && !state.kat.has(c.kategori)) return false;
      if (state.tingkat.size && !state.tingkat.has(c.tingkat)) return false;
      if (terms.length) {
        const h = HAY.get(c.id);
        for (let i = 0; i < terms.length; i++) if (h.indexOf(terms[i]) === -1) return false;
      }
      return true;
    });

    const k = state.sortKey, d = state.sortDir;
    const val = c => {
      if (k === "nama") return rusuk(c.nama);
      if (k === "kategori") return KATEGORI[c.kategori] + rusuk(c.nama);
      if (k === "arus") return c.arus + rusuk(c.nama);
      if (k === "tingkat") return c.tingkat + rusuk(c.nama);
      return rusuk(c.nama);
    };
    out.sort((a, b) => (val(a) < val(b) ? -1 : val(a) > val(b) ? 1 : 0) * d);
    return out;
  }

  /* ---------- render ---------- */
  function cardHTML(c) {
    return `<a class="card" data-kat="${c.kategori}" href="detail.html?id=${encodeURIComponent(c.id)}">
      <div class="top">
        <div class="symbox">${symbolSVG(c.id, "", c.nama)}</div>
        <div>
          <h3>${esc(c.nama)}</h3>
          <div class="alias">${esc((c.alias || []).slice(0, 2).join(" · "))}</div>
        </div>
      </div>
      <p class="fungsi">${esc(c.fungsi)}</p>
      <div class="foot">
        ${badgeArus(c.arus)}
        <span class="badge cat">${esc(KATEGORI[c.kategori])}</span>
        <span class="badge lv">${esc(TINGKAT[c.tingkat])}</span>
      </div>
    </a>`;
  }

  const COLS = [
    { k: "nama", t: "Komponen", s: true },
    { k: "arus", t: "Arus", s: false },
    { k: "kategori", t: "Kategori", s: false },
    { k: "fungsi", t: "Fungsi", s: false }
  ];

  function tableHTML(list) {
    const head = COLS.map(c => {
      const arw = state.sortKey === c.k ? `<span class="arw">${state.sortDir > 0 ? "▲" : "▼"}</span>` : "";
      return `<th data-sort="${c.k}">${c.t} ${arw}</th>`;
    }).join("");

    const rows = list.map(c => `<tr data-kat="${c.kategori}" data-go="detail.html?id=${encodeURIComponent(c.id)}">
      <td class="c-sym"><div class="symbox">${symbolSVG(c.id, "", c.nama)}</div></td>
      <td><b>${esc(c.nama)}</b><br><span class="alias">${esc((c.alias || [])[0] || "")}</span></td>
      <td>${badgeArus(c.arus)}</td>
      <td>${esc(KATEGORI[c.kategori])}</td>
      <td>${esc(c.fungsi)}</td>
    </tr>`).join("");

    return `<div class="tablewrap"><table><thead><tr>${head}<th>Simbol</th></tr></thead>
      <tbody>${rows}</tbody></table></div>`;
  }

  function render() {
    const list = filtered();
    const area = $("#listArea");

    $("#countLabel").textContent =
      `${list.length} dari ${COMPONENTS.length} komponen`;

    const act = [];
    if (state.q) act.push(`pencarian "${state.q}"`);
    state.arus.forEach(a => act.push(ARUS[a]));
    state.kat.forEach(k => act.push(KATEGORI[k]));
    state.tingkat.forEach(t => act.push(TINGKAT[t]));
    $("#activeFilterLabel").textContent = act.length ? "Filter aktif: " + act.join(" · ") : "";

    if (!list.length) {
      area.innerHTML = `<div class="empty">
        <div class="big">🔍</div>
        <h3>Tidak ada komponen yang cocok</h3>
        <p>Coba kata kunci lain, atau <a href="#" id="clearLink">hapus semua filter</a>.</p>
      </div>`;
      $("#clearLink").addEventListener("click", e => { e.preventDefault(); reset(); });
      return;
    }

    if (state.view === "grid") {
      area.innerHTML = `<div class="grid">${list.map(cardHTML).join("")}</div>`;
    } else {
      area.innerHTML = tableHTML(list);
      $$("#listArea thead th[data-sort]").forEach(th => {
        th.addEventListener("click", () => {
          const k = th.dataset.sort;
          state.sortDir = (state.sortKey === k) ? -state.sortDir : 1;
          state.sortKey = k;
          render();
        });
      });
      $$("#listArea tbody tr").forEach(tr => {
        tr.addEventListener("click", () => { location.href = tr.dataset.go; });
      });
    }
  }

  /* ---------- chips ---------- */
  function chip(label, kind, key, count) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "chip k-" + kind;
    el.dataset.kind = kind;
    el.dataset.key = key;
    el.innerHTML = `${esc(label)}${count != null ? `<span class="n">${count}</span>` : ""}`;
    return el;
  }

  function buildChips() {
    const aBox = $("#arusChips");
    [["ac", "AC"], ["dc", "DC"], ["dual", "AC & DC"]].forEach(([k, label]) => {
      const n = COMPONENTS.filter(c => c.arus === k).length;
      aBox.appendChild(chip(label, k === "dual" ? "dual" : k, k, n));
    });

    const kBox = $("#katChips");
    const tier = chip("Semua", "cat", "__all", COMPONENTS.length);
    kBox.appendChild(tier);
    Object.keys(KATEGORI).forEach(k => {
      const n = COMPONENTS.filter(c => c.kategori === k).length;
      kBox.appendChild(chip(KATEGORI[k], "cat", k, n));
    });

    const tBox = document.createElement("div");
    tBox.className = "chiprow";
    tBox.innerHTML = '<span class="lbl">Tingkat</span>';
    tBox.appendChild(chip("Dasar", "lv", "dasar", COMPONENTS.filter(c => c.tingkat === "dasar").length));
    tBox.appendChild(chip("Lanjut", "lv", "lanjut", COMPONENTS.filter(c => c.tingkat === "lanjut").length));
    $("#katChips").parentNode.appendChild(tBox);
    tBox.id = "tierChips";

    document.addEventListener("click", function (e) {
      const c = e.target.closest(".chip");
      if (!c) return;
      const { kind, key } = c.dataset;
      if (key === "__all") {
        state.kat.clear();
      } else if (kind === "cat") {
        state.kat.has(key) ? state.kat.delete(key) : state.kat.add(key);
      } else if (kind === "lv") {
        state.tingkat.has(key) ? state.tingkat.delete(key) : state.tingkat.add(key);
      } else {
        state.arus.has(key) ? state.arus.delete(key) : state.arus.add(key);
      }
      syncChips();
      render();
    });
  }

  function syncChips() {
    $$(".chip").forEach(c => {
      const { kind, key } = c.dataset;
      let on;
      if (key === "__all") on = state.kat.size === 0;
      else if (kind === "cat") on = state.kat.has(key);
      else if (kind === "lv") on = state.tingkat.has(key);
      else on = state.arus.has(key);
      c.classList.toggle("on", on);
    });
  }

  function reset() {
    state.q = ""; state.arus.clear(); state.kat.clear(); state.tingkat.clear();
    $("#q").value = "";
    syncChips();
    render();
  }

  /* ---------- legenda kategori ---------- */
  function buildLegend() {
    const box = $("#katLegend");
    if (!box) return;
    const desc = {
      pasif: ["Tidak memerlukan sumber daya untuk bekerja", ["Resistor, kapasitor, induktor, transformator", "Fungsi utamanya memfilter, menyimpan, atau mentransfer energi listrik", "Contoh: power supply, audio, filter sinyal"]],
      dioda: ["Mengalirkan arus satu arah", ["Dioda, Zener, LED, fotodioda, optocoupler", "Berperilaku seperti katup yang hanya mengizinkan arus satu arah", "Contoh: rectifier, indikator, sensor optik"]],
      transistor: ["Penguat & saklar", ["BJT, MOSFET, IGBT, SCR, TRIAC", "Menguatkan sinyal kecil atau berfungsi sebagai sakelar elektronik", "Contoh: audio amplifier, driver motor, regulator switching"]],
      ic: ["Proses & logika", ["Op-amp, timer, gerbang logika, mikrokontroler", "Menggabungkan banyak transistor menjadi satu fungsi utuh", "Contoh: alarm, remote, proyek Arduino"]],
      sensor: ["Mengubah besaran fisik menjadi sinyal", ["LDR, ultrasonik, PIR, thermocouple, hall", "Mendeteksi cahaya, jarak, gerak, suhu, atau magnet", "Contoh: burglar alarm, termometer digital, avr"]],
      daya: ["Mengatur & melindungi", ["Bridge rectifier, relay, saklar, sekering", "Menyalurkan, memisahkan, dan melindungi rangkaian", "Contoh: stopkontak, power supply, instalasi listrik"]],
      meka: ["Mengubah energi listrik menjadi gerak/bunyi", ["Motor, speaker, buzzer, solenoid", "Hasil akhirnya gerak mekanis atau suara", "Contoh: kipas, kulkas, alat musik"]],
      konektor: ["Menyambung &anutara", ["Header, jumper, BNC, terminal, antena", "Menjaga sambungan listrik dan gelombang tersambung", "Contoh: motherboard, kabel coaxial, instalasi"]]
    };
    box.innerHTML = Object.keys(KATEGORI).map(function (k) {
      const d = desc[k] || ["", []];
      const n = COMPONENTS.filter(c => c.kategori === k).length;
      return `<div class="li" data-kat="${k}" style="--c:var(--cat-color)">
        <b>${esc(KATEGORI[k])} <span class="n" style="font-size:.74rem;color:var(--txt-3)">(${n})</span></b>
        <span>${esc(d[0])}</span>
        <ul>${d[1].map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>`;
    }).join("");
  }

  /* ---------- init ---------- */
  function init() {
    // `const COMPONENTS` di top-level script tidak menjadi properti window,
// jadi harus dicek lewat identifier, bukan window.COMPONENTS
if (typeof COMPONENTS === "undefined") {
      document.body.insertAdjacentHTML("afterbegin",
        '<div style="padding:20px;color:#f87171">Dataset (data.js) gagal dimuat.</div>');
      return;
    }
    buildChips();
    buildLegend();
    syncChips();

    $("#statRow").children[0].querySelector("b").textContent = COMPONENTS.length;

    let t;
    $("#q").addEventListener("input", e => {
      clearTimeout(t);
      t = setTimeout(() => { state.q = e.target.value; render(); }, 110);
    });

    $("#vGrid").addEventListener("click", () => setView("grid"));
    $("#vTable").addEventListener("click", () => setView("table"));
    $("#resetAll").addEventListener("click", reset);

    function setView(v) {
      state.view = v;
      $("#vGrid").classList.toggle("on", v === "grid");
      $("#vTable").classList.toggle("on", v === "table");
      render();
    }

    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();