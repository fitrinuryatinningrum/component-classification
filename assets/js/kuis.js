/* =========================================================
   kuis.js — Mesin kuis klasifikasi (5 tipe soal)
   ========================================================= */

(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const LS = "klasifikasi-kuis-v1";
  const TIME_LIMIT = 20;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function byId(id) { return COMPONENTS.find(c => c.id === id); }
  function shuffle(a) {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  }
  function sample(arr, n) { return shuffle(arr).slice(0, n); }

  /* ---------------- state ---------------- */
  const cfg = {
    jumlah: 10,
    tingkat: "",     // "" = semua
    arus: "",        // "" = semua
    kat: "",         // "" = semua
    urut: "acak",
    timer: true,
    review: true,
    fokus: ""
  };

  let quiz = null;
  let tick = null;

  /* ---------------- penyimpanan ---------------- */
  function save(extra) {
    try {
      const data = Object.assign({}, localStorage.getItem(LS) ? JSON.parse(localStorage.getItem(LS)) : {}, extra || {});
      localStorage.setItem(LS, JSON.stringify(data));
    } catch (e) { /* storage penuh / diblokir — abaikan */ }
  }
  function load() {
    try { return JSON.parse(localStorage.getItem(LS) || "{}"); } catch (e) { return {}; }
  }

  /* ---------------- penyusun soal ---------------- */
  const TYPES = ["simbol-nama", "simbol-arus", "simbol-kategori", "fungsi-simbol", "penerapan"];
  const TYPE_LABEL = {
    "simbol-nama": "Tipe 1 · Simbol → Nama Komponen",
    "simbol-arus": "Tipe 2 · Simbol → Jenis Arus",
    "simbol-kategori": "Tipe 3 · Simbol → Kategori Fungsi",
    "fungsi-simbol": "Tipe 4 · Fungsi → Simbol",
    "penerapan": "Tipe 5 · Komponen → Contoh Penerapan"
  };

  /* komponen yang akan dijadikan OBJEK soal */
  function poolFor(opts) {
    let pool = COMPONENTS.slice();
    if (opts.fokus) return pool.filter(c => c.id === opts.fokus);
    if (opts.kat) pool = pool.filter(c => c.kategori === opts.kat);
    if (opts.arus) pool = pool.filter(c => c.arus === opts.arus);
    if (opts.tingkat) pool = pool.filter(c => c.tingkat === opts.tingkat);
    return pool;
  }

  /* komponen yang dipakai sebagai OPSI PALSU (bisa seluruh database) */
  function distractorPool(opts) {
    if (opts.fokus) return COMPONENTS.slice();
    return poolFor(opts);
  }

  function textOpt(label, correct) { return { label: label, correct: correct }; }
  function symOpt(id, correct) { return { svg: id, correct: correct, alt: (byId(id) || {}).nama }; }

  function makeQuestion(comp, type, pool) {
    const siblings = pool.filter(c => c.id !== comp.id && c.kategori === comp.kategori);
    const others = (siblings.length >= 3 ? siblings : pool.filter(c => c.id !== comp.id));

    switch (type) {
      case "simbol-arus": {
        const vals = ["ac", "dc", "dual"];
        return {
          type: type,
          comp: comp,
          soal: "Simbol di bawah termasuk komponen dengan jenis arus <b>APA</b>?",
          opsi: shuffle(vals.map(v => textOpt(ARUS[v], v === comp.arus)))
        };
      }
      case "simbol-kategori": {
        const katKeys = Object.keys(KATEGORI).filter(k => k !== comp.kategori);
        const opts = shuffle([KATEGORI[comp.kategori]].concat(sample(katKeys, 3).map(k => KATEGORI[k])))
          .map(l => textOpt(l, l === KATEGORI[comp.kategori]));
        return {
          type: type, comp: comp,
          soal: "Simbol di bawah termasuk kategori fungsi <b>APA</b>?",
          opsi: opts
        };
      }
      case "fungsi-simbol": {
        const picks = [comp].concat(sample(others, 3));
        return {
          type: type, comp: comp,
          soal: `Fungsi berikut dimiliki komponen dengan simbol <b>APA</b>?<br>
                 <span style="color:var(--txt-2);font-size:.95rem">“${esc(comp.fungsi)}”</span>`,
          opsi: shuffle(picks.map(c => symOpt(c.id, c.id === comp.id)))
        };
      }
      case "penerapan": {
        const pool2 = (others.length >= 3 ? others : COMPONENTS.filter(c => c.id !== comp.id));
        const picks = [comp].concat(sample(pool2, 3));
        return {
          type: type, comp: comp,
          soal: `Komponen <b>${esc(comp.nama)}</b>${comp.alias && comp.alias[0] ? " (" + esc(comp.alias[0]) + ")" : ""} memiliki contoh penerapan:`,
          opsi: shuffle(picks.map(c => textOpt(c.contoh[0], c.id === comp.id)))
        };
      }
      default: { // simbol-nama
        const picks = [comp].concat(sample(others, 3));
        return {
          type: "simbol-nama", comp: comp,
          soal: "Simbol di bawah disebut <b>APA</b>?",
          opsi: shuffle(picks.map(c => textOpt(c.nama, c.id === comp.id)))
        };
      }
    }
  }

  function buildQuiz(opts) {
    const pool = poolFor(opts);
    const dist = distractorPool(opts);
    if (pool.length < 1) return null;
    if (!opts.fokus && pool.length < 4) return null;

    let n = opts.fokus ? 10 : Math.min(opts.jumlah, pool.length);

    let picked;
    if (opts.fokus) {
      // mode fokus: 10 soal tentang SATU komponen, bergantian 5 tipe
      picked = new Array(n).fill(pool[0]);
    } else if (opts.urut === "berurutan") {
      picked = pool.slice(0, n);
    } else {
      picked = sample(pool, n);
    }

    // sebarkan tipe soal agar semua tipe terpakai
    const types = [];
    for (let i = 0; i < n; i++) types.push(TYPES[i % TYPES.length]);
    if (opts.urut === "acak" && !opts.fokus) types.sort(() => Math.random() - 0.5);

    return {
      soal: picked.map((c, i) => makeQuestion(c, types[i], dist)),
      skor: 0, i: 0, benar: 0, salah: [],
      jawaban: {}, timer: opts.timer, review: opts.review,
      waktu: Date.now()
    };
  }

  /* ---------------- tampilan ---------------- */
  function show(which) {
    ["setup", "play", "done"].forEach(id => $("#" + id).classList.toggle("hidden", id !== which));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startQuiz(opts) {
    const q = buildQuiz(opts);
    if (!q) {
      $("#setupWarn").textContent =
        "Filter yang dipilih hanya menghasilkan " + poolFor(opts).length +
        " komponen — minimal 4 komponen diperlukan agar pilihan jawaban bermakna. Longgarkan filter Anda.";
      return;
    }
    $("#setupWarn").textContent = "";
    quiz = q;
    // fokus tidak ikut disimpan, agar kuis tidak terkunci di sesi berikutnya
    save({ cfg: { jumlah: opts.jumlah, tingkat: opts.tingkat, arus: opts.arus, kat: opts.kat, urut: opts.urut, timer: opts.timer, review: opts.review } });
    $("#btnUlangSalah").classList.add("hidden");
    show("play");
    renderQuestion();
  }

  function renderQuestion() {
    const Q = quiz.soal[quiz.i];
    const total = quiz.soal.length;

    $("#qNomor").textContent = `Soal ${quiz.i + 1} / ${total}`;
    $("#qScore").textContent = quiz.benar;
    $("#qProgress").style.width = ((quiz.i) / total * 100) + "%";

    const cards = Q.opsi.map((o, i) => {
      const key = String.fromCharCode(65 + i);
      const body = o.svg
        ? `${symbolSVG(o.svg, "", o.alt)}<span>${esc(o.alt)}</span>`
        : `<span>${esc(o.label)}</span>`;
      return `<button class="ans" type="button" data-i="${i}">
        <span class="key">${key}</span>${body}<span class="mark"></span>
      </button>`;
    }).join("");

    $("#qCard").innerHTML = `
      <div class="qtype">${esc(TYPE_LABEL[Q.type])}</div>
      <div class="qtext">${Q.soal}</div>
      <div class="qsym">${symbolSVG(Q.comp.id, "", Q.comp.nama)}</div>
      <div class="answers">${cards}</div>
      <div id="fbSlot"></div>
    `;

    $$("#qCard .ans").forEach(b => {
      b.addEventListener("click", () => answer(parseInt(b.dataset.i, 10)));
    });
    startTimer();
  }

  /* pintasan papan ketik: A/B/C/D untuk menjawab, Enter untuk lanjut */
  document.addEventListener("keydown", function (e) {
    if (e.target.matches("input, textarea, select")) return;
    if ($("#play").classList.contains("hidden")) return;

    if (e.key === "Enter") {
      if (!$("#btnNext").classList.contains("hidden")) { e.preventDefault(); next(); }
      return;
    }
    const btns = $$("#qCard .ans:not(:disabled)");
    const n = e.key.toUpperCase().charCodeAt(0) - 65;
    if (n >= 0 && n < btns.length && /^[a-dA-D]$/.test(e.key)) {
      e.preventDefault();
      btns[n].click();
    }
  });

  function startTimer() {
    clearInterval(tick);
    const box = $("#qTimer");
    if (!quiz.timer) { box.textContent = ""; return; }
    let left = TIME_LIMIT;
    box.textContent = "⏱ " + left + "s";
    tick = setInterval(function () {
      left--;
      box.textContent = "⏱ " + Math.max(left, 0) + "s";
      if (left <= 0) { clearInterval(tick); answer(-1); }
    }, 1000);
  }

  function answer(pick) {
    clearInterval(tick);
    const Q = quiz.soal[quiz.i];
    const benarIdx = Q.opsi.findIndex(o => o.correct);
    const benar = pick === benarIdx;
    const timeout = pick === -1;

    if (benar) quiz.benar++;
    else quiz.salah.push({ id: Q.comp.id, type: Q.type, pilih: timeout ? "waktu habis" : (Q.opsi[pick] ? (Q.opsi[pick].alt || Q.opsi[pick].label) : "-") });

    quiz.jawaban[Q.comp.id + "|" + Q.type] = benar;

    $$("#qCard .ans").forEach((b, i) => {
      b.disabled = true;
      if (i === benarIdx) { b.classList.add("correct"); b.querySelector(".mark").textContent = "✓"; }
      else if (i === pick) { b.classList.add("wrong"); b.querySelector(".mark").textContent = "✗"; }
    });

    $("#qScore").textContent = quiz.benar;

    const c = Q.comp;
    $("#fbSlot").innerHTML = `
      <div class="fback ${benar ? "ok" : "no"} clearfix">
        ${symbolSVG(c.id, "mini", c.nama)}
        <b>${benar ? "✅ Benar!" : timeout ? "⏱ Waktu habis." : "❌ Belum tepat."}
           — ${esc(c.nama)}</b>
        <div style="font-size:.9rem;color:var(--txt-2)">
          ${badgeRow(c)}
          <p style="margin:8px 0 0"><b style="color:var(--txt)">Fungsi:</b> ${esc(c.fungsi)}</p>
        </div>
        <p style="margin:10px 0 0">
          <a href="detail.html?id=${encodeURIComponent(c.id)}">Pelajari selengkapnya →</a>
        </p>
      </div>`;

    $("#qProgress").style.width = ((quiz.i + 1) / quiz.soal.length * 100) + "%";
    $("#btnNext").classList.remove("hidden");
    $("#btnNext").textContent = quiz.i === quiz.soal.length - 1 ? "Lihat Hasil →" : "Soal Berikutnya →";
  }

  function badgeRow(c) {
    const cls = c.arus === "ac" ? "ac" : c.arus === "dc" ? "dc" : "dual";
    return `<span class="badge ${cls}">${esc(ARUS[c.arus])}</span>
            <span class="badge cat">${esc(KATEGORI[c.kategori])}</span>
            <span class="badge lv">${esc(TINGKAT[c.tingkat])}</span>`;
  }

  function next() {
    if (quiz.i < quiz.soal.length - 1) { quiz.i++; renderQuestion(); }
    else finish();
  }

  /* ---------------- hasil ---------------- */
  function finish() {
    clearInterval(tick);
    const total = quiz.soal.length;
    const benar = quiz.benar;
    const pct = Math.round(benar / total * 100);
    const nilai = Math.round((benar / total) * 100);
    const predikat = nilai >= 90 ? "Luar biasa!" : nilai >= 75 ? "Bagus sekali!" :
                     nilai >= 60 ? "Cukup baik." : nilai >= 40 ? "Perlu diulang." : "Belum paham — coba lagi.";

    const warna = nilai >= 75 ? "var(--ok)" : nilai >= 50 ? "var(--acc)" : "var(--bad)";
    const terbaik = load().terbaik || 0;
    const rekor = nilai > terbaik;
    if (rekor) save({ terbaik: nilai });

    $("#resultPanel").innerHTML = `
      <div class="score-ring" style="--pct:${pct}%;color:${warna}"><b>${nilai}</b></div>
      <h2 style="color:${warna}">${esc(predikat)}</h2>
      <p style="color:var(--txt-2)">Kamu menjawab <b style="color:var(--ok)">${benar} benar</b>
        dari <b>${total}</b> soal${rekor ? ' · <b style="color:var(--dual)">Rekor baru!</b>' : ' · Rekor: ' + terbaik}</p>
      <div class="hero-actions" style="justify-content:center;margin-top:20px">
        <button class="btn primary" id="btnMulai2" type="button">Main Lagi</button>
        <button class="btn ${quiz.salah.length ? "" : "hidden"}" id="btnUlang2" type="button">↻ Ulangi ${quiz.salah.length} soal yang salah</button>
        <a class="btn ghost" href="index.html#daftar">Pelajari komponen</a>
      </div>`;

    // review
    let review = "";
    if (quiz.review) {
      const heads = {
        "simbol-nama": "Simbol → Nama", "simbol-arus": "Simbol → Arus",
        "simbol-kategori": "Simbol → Kategori", "fungsi-simbol": "Fungsi → Simbol",
        "penerapan": "Contoh penerapan"
      };
      const nama = id => (byId(id) || {}).nama || id;
      review = quiz.salah.length
        ? `<h3 style="margin-top:6px">Soal yang perlu diulang (${quiz.salah.length})</h3>
           ${quiz.salah.map((s, i) => `
             <a class="paket" data-kat="${(byId(s.id) || {}).kategori || ""}"
                href="detail.html?id=${encodeURIComponent(s.id)}">
               <div class="symbox">${symbolSVG(s.id, "", nama(s.id))}</div>
               <div style="flex:1">
                 <b>${esc(nama(s.id))}</b>
                 <div style="font-size:.83rem;color:var(--txt-3)">${esc(heads[s.type] || s.type)}</div>
                 <div style="font-size:.85rem;color:var(--bad)">Jawaban Anda: ${esc(s.pilih)}</div>
               </div>
             </a>`).join("")}`
        : `<div class="panel" style="text-align:center;margin-top:20px">
             <h3 style="color:var(--ok)">🏆 Semua jawaban benar!</h3>
             <p style="color:var(--txt-2);margin:0">Tidak ada soal yang perlu diulang. Naikkan level kesulitan untuk tantangan berikutnya.</p>
           </div>`;

      $("#reviewBox").innerHTML = review;
    } else {
      $("#reviewBox").innerHTML = "";
    }

    $("#btnUlangSalah").classList.toggle("hidden", quiz.salah.length === 0);
    $("#btnUlang2").addEventListener("click", repeatWrong);
    $("#btnMulai2").addEventListener("click", () => startQuiz(currentOpts()));
    show("done");
  }

  function repeatWrong() {
    // soal salah, dengan opsi palsu diacak ulang dari seluruh database
    const soal = quiz.salah.map(s => makeQuestion(byId(s.id), s.type, COMPONENTS));
    quiz = {
      soal: soal, skor: 0, i: 0, benar: 0, salah: [],
      timer: false, review: quiz.review, waktu: Date.now()
    };
    $("#btnUlangSalah").classList.add("hidden");
    show("play");
    renderQuestion();
  }

  /* ---------------- form setup ---------------- */
  let currentOpts = () => ({
    jumlah: cfg.jumlah, tingkat: cfg.tingkat, arus: cfg.arus, kat: cfg.kat,
    urut: cfg.urut, timer: cfg.timer, review: cfg.review, fokus: cfg.fokus
  });

  function radioRow(box, name, items, checked, onchange) {
    box.innerHTML = items.map((it, i) => `
      <label class="opt">
        <input type="radio" name="${name}" value="${esc(it.v)}" ${checked === it.v ? "checked" : ""}>
        <span>${esc(it.t)}</span>
        ${it.n != null ? `<span class="cnt">${it.n}</span>` : ""}
      </label>`).join("");
    $$("input", box).forEach(r => r.addEventListener("change", onchange));
  }

  function buildForm() {
    const saved = load().cfg || {};
    const fokusAktif = cfg.fokus;   // dari URL, jangan ditimpa config tersimpan
    Object.assign(cfg, saved);
    cfg.fokus = fokusAktif;

    radioRow($("#optJumlah"), "jumlah",
      [{ v: "10", t: "10 soal", n: "~2 menit" }, { v: "20", t: "20 soal", n: "~4 menit" },
       { v: "50", t: "50 soal", n: "~9 menit" }, { v: "999", t: "Semua", n: COMPONENTS.length }],
      String(cfg.jumlah), e => cfg.jumlah = +e.target.value);

    radioRow($("#optTingkat"), "tingkat",
      [{ v: "", t: "Semua tingkat" }, { v: "dasar", t: "Dasar", n: COMPONENTS.filter(c => c.tingkat === "dasar").length },
       { v: "lanjut", t: "Lanjut", n: COMPONENTS.filter(c => c.tingkat === "lanjut").length }],
      cfg.tingkat, e => cfg.tingkat = e.target.value);

    radioRow($("#optArus"), "arus",
      [{ v: "", t: "Semua jenis arus" }, { v: "ac", t: "AC", n: COMPONENTS.filter(c => c.arus === "ac").length },
       { v: "dc", t: "DC", n: COMPONENTS.filter(c => c.arus === "dc").length },
       { v: "dual", t: "AC & DC", n: COMPONENTS.filter(c => c.arus === "dual").length }],
      cfg.arus, e => cfg.arus = e.target.value);

    radioRow($("#optKat"), "kat",
      [{ v: "", t: "Semua kategori" }].concat(Object.keys(KATEGORI).map(k => ({
        v: k, t: KATEGORI[k], n: COMPONENTS.filter(c => c.kategori === k).length
      }))),
      cfg.kat, e => cfg.kat = e.target.value);

    $$("input[name=urut]").forEach(r => {
      r.checked = r.value === cfg.urut;
      r.addEventListener("change", e => cfg.urut = e.target.value);
    });
    $("#optTimer").checked = cfg.timer;
    $("#optTimer").addEventListener("change", e => cfg.timer = e.target.checked);
    $("#optReview").checked = cfg.review;
    $("#optReview").addEventListener("change", e => cfg.review = e.target.checked);
  }

  /* ---------------- init ---------------- */
  let inited = false;

  /* set / lepas kunci komponen untuk mode fokus */
  function setFokus(id) {
    const c = id && byId(id);
    cfg.fokus = c ? id : "";
    const box = $("#lockBox");
    if (!c) { box.style.display = "none"; return; }
    box.style.display = "";
    $("#lockText").innerHTML =
      `Kuis ini dikunci pada komponen <b>${esc(c.nama)}</b>. ` +
      `Tersedia 10 soal dengan 5 tipe pertanyaan berbeda tentang simbol, jenis arus (${esc(ARUS[c.arus])}), ` +
      `dan kategorinya (${esc(KATEGORI[c.kategori])}).`;
  }

  function init() {
    if (inited) return;
    inited = true;
    setFokus(new URLSearchParams(location.search).get("fokus") || "");
    buildForm();
    $("#btnMulai").addEventListener("click", () => startQuiz(currentOpts()));
    $("#btnAcak").addEventListener("click", () => {
      const c = COMPONENTS[Math.floor(Math.random() * COMPONENTS.length)];
      location.href = "detail.html?id=" + encodeURIComponent(c.id);
    });
    $("#btnUlangSalah").addEventListener("click", repeatWrong);
    $("#btnNext").addEventListener("click", next);
    $("#btnQuit").addEventListener("click", () => { clearInterval(tick); show("setup"); });

    const hist = load().terbaik;
    if (hist) {
      $("#setupWarn").style.color = "var(--txt-3)";
      $("#setupWarn").textContent = `Skor terbaik Anda: ${hist}/100`;
    }
  }

  // hook untuk router versi satu-file
  window.KUIS = { init: init, setFokus: setFokus, show: show };

  // pada versi satu-file, router yang memanggil init() — jangan auto-init
  if (!window.__SINGLE_FILE__) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})();