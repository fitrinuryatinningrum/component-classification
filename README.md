<div align="center">

# ⚡ Sistem Klasifikasi Komponen Elektronik AC & DC

**Belajar interaktif klasifikasi komponen elektronik berdasarkan jenis arus & kategori fungsi.**
94 komponen · 94 simbol vektor · 5 tipe soal kuis · tanpa install, tanpa internet.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-58A6FF?style=flat-square)

[🌐 Buka langsung (versi 1 file)](Klasifikasi-Komponen-AC-DC.html) · [📖 Dokumentasi](#-dokumentasi)

</div>

---

## 📸 Preview

> Placeholder — ganti dengan screenshot atau GIF halaman beranda.
> Letakkan file di `assets/preview.png` (atau `assets/preview.gif` untuk animasi),
> lalu hapus baris ini.

<!-- GANTI DENGAN SCREENSHOT ANDA -->
<!-- <img src="assets/preview.png" alt="Preview Sistem Klasifikasi Komponen AC & DC" width="100%"> -->

---

## ✨ Highlights

| Angka | Keterangan |
|:-----:|------------|
| **94** | Komponen elektronik lengkap dengan spesifikasi & prinsip kerja |
| **94** | Simbol vektor SVG — tanpa file gambar, ikut menyesuaikan tema |
| **3** | Kelas arus: `AC` · `DC` · `AC & DC` |
| **8** | Kategori fungsi: pasif, dioda, transistor, IC, sensor, daya, meka, konektor |
| **5** | Tipe soal kuis interaktif dengan umpan balik per soal |
| **2** | Versi file: satu file (siap kirim) & terpisah (mudah diedit) |

---

## 📖 Dokumentasi

- [🚀 Cara memakai](#-cara-memakai)
- [🧭 Peta halaman](#-peta-halaman)
- [📁 Struktur folder](#-struktur-folder)
- [🧭 Halaman](#-halaman)
- [🗂️ Model klasifikasi](#%EF%B8%8F-model-klasifikasi)
- [✏️ Menambah / mengubah komponen](#%EF%B8%8F-menambah--mengubah-komponen)
- [⌨️ Kata kunci pencarian](#%EF%B8%8F-ringkasan-pencarian-kata-kunci-yang-berguna)
- [🔧 Troubleshooting](#-troubleshooting)

---

## 🚀 Cara memakai

Ada **dua versi**. Pilih salah satu — keduanya punya fitur dan tampilan persis sama.

### Versi A — Satu file (paling gampang dikirim)

```
Klasifikasi-Komponen-AC-DC.html
```

Klik dua kali. Semua CSS, JS, dan 94 data komponen sudah menyatu di dalam satu file.
Bisa langsung dikirim lewat email, ditaruh di flashdisk, atau diunggah ke hosting statis mana pun.
Butuh satu file saja, tanpa folder.

### Versi B — Terpisah (lebih mudah diedit)

```
klik dua kali  →  index.html
```

Kalau Anda ingin mengubah isi, versi terpisah lebih nyaman karena setiap bagian punya file sendiri.
Tidak perlu server, tidak perlu install, tidak perlu koneksi internet.

Kalau browser menolak membuka lewat `file://`, jalankan server lokal:

```powershell
cd $env:USERPROFILE\elektro-klasifikasi
python -m http.server 8080
# lalu buka http://localhost:8080
```

### Membuat ulang versi satu file

Setelah mengubah `assets/`, `index.html`, atau `kuis.html`:

```powershell
node build-single-file.js
```

Skrip itu menggabungkan semuanya ke `Klasifikasi-Komponen-AC-DC.html`. Versi 3-file tidak ikut berubah.

## 🧭 Peta halaman

| Alamat | Halaman |
|---|---|
| `index.html` / `#/` | Beranda: panduan klasifikasi + daftar/filter/search |
| `detail.html?id=resistor` / `#/k=resistor` | Detail satu komponen |
| `kuis.html` / `#/kuis` | Mode kuis interaktif |
| `kuis.html?fokus=resistor` / `#/kuis/fokus=resistor` | Kuis terkunci ke satu komponen |

Pada **versi satu file**, perpindahan halaman memakai *hash router* (`#/`, `#/k=triac`, `#/kuis`)
sehingga tetap bisa dibuka langsung dari `file://` tanpa server.

## 📁 Struktur folder

```
elektro-klasifikasi/
├── Klasifikasi-Komponen-AC-DC.html   ← VERSI SATU FILE (siap kirim)
├── build-single-file.js              ← skrip penggabung (node build-single-file.js)
├── index.html            Beranda: panduan klasifikasi + daftar/filter/search
├── detail.html           Detail komponen        (detail.html?id=resistor)
├── kuis.html             Mode kuis interaktif    (kuis.html?fokus=resistor)
├── assets/
│   ├── css/style.css
│   └── js/
│       ├── symbols.js    94 simbol elektronika (SVG vektor, tanpa file gambar)
│       ├── data.js       Dataset 94 komponen
│       ├── app.js        Logika beranda (filter, search, grid/tabel)
│       ├── detail.js     Logika halaman detail
│       └── kuis.js       Mesin kuis + skor + review
└── README.md
```

## 🧭 Halaman

### 1. Beranda (`index.html`)
- **Panduan klasifikasi** — 3 kelas arus (AC / DC / AC & DC) + 8 kategori fungsi, lengkap dengan
  contoh komponen dan refresher penjelasan tiap kategori.
- **Live search** — cari berdasarkan nama, alias, fungsi, prinsip kerja, atau contoh penerapan.
- **Filter kombinasi** — jenis arus × kategori × tingkat kesulitan.
- **Dua tampilan** — Grid kartu atau Tabel yang bisa diurutkan (klik judul kolom).

### 2. Detail (`detail.html?id=<id>`)
- Simbol besar + badge klasifikasi (arus / kategori / tingkat)
- Tabel spesifikasi: tegangan kerja, rating, bentuk fisik
- Penjelasan **kenapa** komponen itu diklasifikasikan AC / DC / AC & DC
- Prinsip kerja, 3 karakteristik utama, 3 contoh penerapan, catatan jebakan umum
- Komponen serupa, navigasi sebelumnya/berikutnya, tombol komponen acak
- Pintasan: **"Uji dengan kuis ini"** → membuka kuis yang dikunci pada komponen tersebut

### 3. Kuis (`kuis.html`)

| Tipe | Bentuk soal | Yang diuji |
|---|---|---|
| 1 | simbol → 4 nama | Hafalan simbol |
| 2 | simbol → AC / DC / AC & DC | Klasifikasi arus |
| 3 | simbol → 4 kategori | Kategori fungsi |
| 4 | fungsi → 4 simbol (arah terbalik) | Pemahaman fungsi |
| 5 | komponen → contoh penerapan | Pemahaman penerapan nyata |

**Opsi:** 10 / 20 / 50 / semua soal · filter tingkat · filter arus · filter kategori · urutan acak atau berurutan ·
timer 20 detik per soal · tampilkan/sembunyikan kunci jawaban.

**Umpan balik:** setiap jawaban langsung diberi tanda ✓/✗, warna hijau/merah, plus penjelasan fungsi dan
badge klasifikasinya. Di akhir ada nilai, predikat, rekor terbaik (disimpan di `localStorage`), dan daftar
soal yang salah untuk diulang.

**Pintasan papan ketak:** `A` `B` `C` `D` menjawab, `Enter` lanjut ke soal berikutnya.

## 🗂️ Model klasifikasi

Tiap komponen punya tiga label:

| Field | Nilai | Arti |
|---|---|---|
| `arus` | `ac` | Hanya dapat dioperasikan dengan arus bolak-balik |
| | `dc` | Hanya dapat dioperasikan dengan arus searah |
| | `dual` | Dapat dioperasikan dengan keduanya (kelompok terbesar) |
| `kategori` | `pasif`, `dioda`, `transistor`, `ic`, `sensor`, `daya`, `meka`, `konektor` | Fungsi/teknologi |
| `tingkat` | `dasar`, `lanjut` | Tingkat kesulitan |

Label arus menunjukkan **jenis suplai yang aman**, bukan asal-usul arus. Contohnya dioda tetap bekerja pada
AC maupun DC, tetapi memiliki rating tegangan breakdown yang berbeda untuk kedua aplikasi tersebut.

## ✏️ Menambah / mengubah komponen

Semua isi database ada di satu file: **`assets/js/data.js`**. Setiap objek mengikuti skema:

```js
{
  id: "resistor",              // harus sama dengan kunci simbol di symbols.js
  nama: "Resistor",
  alias: ["R", "Ohm"],
  kategori: "pasif",
  arus: "dual",                // ac | dc | dual
  tingkat: "dasar",            // dasar | lanjut
  bentuk: "Silinder keramik atau film tipis ...",
  fungsi: "Mengatur besar kecilnya arus listrik ...",
  prinsip: "Berdasarkan hukum Ohm ...",
  karakteristik: ["...", "...", "..."],
  tegangan: "0 - 600 V",
  rating: "1/8 W - 5 W",
  contoh: ["...", "...", "..."],
  catatan: "Jangan dipakai sebagai pemutus arus besar ...",
  mirip: ["dioda", "capacitor-pol"]
}
```

Kalau `id` belum punya simbol, tambahkan dulu di `assets/js/symbols.js` — setiap simbol ditulis sebagai
array `path`/`circle`/`text` dalam `viewBox` sederhana (80×40 untuk komponen 2 terminal, 80×50–104×64
untuk IC), dan warnanya mengikuti `currentColor` sehingga otomatis menyesuaikan tema dan warna status kuis.

## ⌨️ Ringkasan pencarian kata kunci yang berguna

`trafo` (transformator) · `zener` · `regulator` · `power supply` · `rectifier` · `driver motor` ·
`alarm` · `kipas` · `charger` · `inverter`

## 🔧 Troubleshooting

| Gejala | Penyebab & solusi |
|---|---|
| "Dataset (data.js) gagal dimuat." | Buka lewat `file://` sudah cukup. Jika masih gagal, jalankan server lokal. |
| Simbol tampil kotak/kosong | `id` komponen tidak ada di `symbols.js` — tambahkan atau ganti `id`. |
| Filter kategori kosong | Kombinasi filter terlalu sempit — klik **Reset**. |
| Kuis tidak bisa dimulai | Minimal 4 komponen harus cocok dengan filter yang dipilih. |

---

## 📬 Kontribusi

Proyek ini terbuka untuk dipelajari dan dikembangkan. Kalau kamu menemukan bug,
atau punya ide fitur baru, silakan buka **Issue** atau kirim **Pull Request**.

Kalau ada pertanyaan soal dasar-dasar Listrik AC/DC, elektro, atau ingin berdiskusi
tentang materi kuliah, reach out via 👇

[![GitHub](https://img.shields.io/badge/GitHub-fitrinuryatinningrum-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/fitrinuryatinningrum)
[![Email](https://img.shields.io/badge/Email-fitrinuryatinningrum@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:fitrinuryatinningrum@gmail.com)

> ⚠️ Ganti `fitrinuryatinningrum` dan `fitrinuryatinningrum@gmail.com` di bagian ini sebelum push.

---

<div align="center">

**Dibuat dengan ⚡ oleh `fitrinuryatinningrum`** · Elektronika · Kontrol · Embedded · IoT

⭐ Star repository ini kalau membantu belajarmu!

</div>