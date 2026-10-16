/* Dataset komponen — Klasifikasi AC / DC */
/* 94 komponen elektronik; nilai id sama dengan kunci simbol pada diagram */
const KATEGORI = {
  pasif: 'Komponen Pasif',
  dioda: 'Dioda & Optoelektronik',
  transistor: 'Transistor',
  ic: 'IC & Logika Digital',
  sensor: 'Sensor',
  daya: 'Daya & Kontrol',
  meka: 'Elektromekanis',
  konektor: 'Konektor & Antena'
};

const ARUS = { ac: 'AC', dc: 'DC', dual: 'AC & DC' };

const TINGKAT = { dasar: 'Dasar', lanjut: 'Lanjut' };

const COMPONENTS = [
  {
    id: 'resistor',
    nama: 'Resistor',
    alias: [
      'R',
      'Ohm',
      'Resistor tetap'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Badan silinder keramik atau film tipis dengan dua kawat terminal.',
    fungsi: 'Mengatur besar kecil arus listrik pada suatu rangkaian elektronik.',
    prinsip: 'Bahan dalam resistor menghambat aliran elektron sehingga muncul penurunan tegangan. Besarnya arus berbanding lurus dengan tegangan yang diberikan.',
    karakteristik: [
      'Nilainya dalam satuan ohm dengan toleransi ±1% sampai ±20%.',
      'Rating daya menentukan batas panas yang boleh diterima.',
      'Nilai ditandai kode warna atau angka pada badannya.'
    ],
    tegangan: '0 - 600 V',
    rating: '1/8 W - 5 W',
    contoh: [
      'Pembatas arus LED di layar TV',
      'Pembagi tegangan pada regulator 7805',
      'Pengatur kecepatan kipas angin listrik'
    ],
    catatan: 'Jangan pakai resistor sebagai pemutus arus besar; gunakan sekering.',
    mirip: [
      'potentiometer',
      'trimmer',
      'thermistor'
    ],
  },
  {
    id: 'potentiometer',
    nama: 'potentiometer',
    alias: [
      'Pot',
      'Volume'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Badan memutar bertiga terminal dengan poros dan cincin slip.',
    fungsi: 'Mengatur nilai tahanan secara manual saat perangkat masih dipakai.',
    prinsip: 'Kontak geser mengubah panjang jalur resistif yang dilalui arus. Tegangan dapat diambil dari ujung atas, ujung bawah, atau penyapu.',
    karakteristik: [
      'Nilai tetap yang dapat diubah saat diputar atau digeser.',
      'Memiliki tiga terminal, yaitu dua ujung dan satu penyapu.',
      'Sifatnya linear atau logaritmik sesuai kebutuhan aplikasi.'
    ],
    tegangan: '0 - 600 V',
    rating: '1/8 W - 5 W',
    contoh: [
      'Pengatur volume radio dan TV',
      'Pengatur kecepatan kipas ceiling fan',
      'Joystick pada kendali mobil remote'
    ],
    catatan: 'Putar perlahan agar kontak metalik tidak cepat aus.',
    mirip: [
      'trimmer',
      'resistor',
      'resistor-array'
    ],
  },
  {
    id: 'trimmer',
    nama: 'Trimmer Resistor',
    alias: [
      'Trimmer',
      'Preset'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'lanjut',
    bentuk: 'Kubus keramik kecil dengan sekrup penyetel di bagian atas.',
    fungsi: 'Menyesuaikan tahanan kecil untuk kalibrasi rangkaian secara permanen.',
    prinsip: 'Sekrup penyetel menggeser kontak pada jalur resistif yang sempit. Nilainya diubah hanya saat produksi atau servis.',
    karakteristik: [
      'Nilai relatif kecil, umumnya 1 kΩ sampai 1 MΩ.',
      'Menyediakan satu putaran penuh untuk mencapai nilai akhir.',
      'Dikalibrasi di pabrik lalu dikunci dengan lapisan epoksi.'
    ],
    tegangan: '0 - 300 V',
    rating: '1/8 W - 1/2 W',
    contoh: [
      'Kalibrasi sensitivitas radio transistor',
      'Penyesuaian frekuensi kristal osilator',
      'Setting kontras gambar monitor'
    ],
    catatan: 'Tidak cocok untuk pengaturan yang sering diubah pengguna.',
    mirip: [
      'potentiometer',
      'resistor',
      'capacitor-trimmer'
    ],
  },
  {
    id: 'resistor-array',
    nama: 'Resistor Array',
    alias: [
      'Jaringan resistor',
      'SIP resistor'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'lanjut',
    bentuk: 'Paket cip satu baris dengan beberapa tahanan di dalamnya.',
    fungsi: 'Menyediakan beberapa nilai tahanan dalam satu paket cip.',
    prinsip: 'Beberapa elemen resistif disusun dalam satu paket cip.',
    karakteristik: [
      'Memuat beberapa tahanan sekaligus dalam satu paket cip.',
      'Menghemat tempat dan waktu saat perakitan.',
      'Ada versi yang sudah dilengkapi pin pull-up.'
    ],
    tegangan: '0 - 100 V',
    rating: '1/8 W - 1/4 W per elemen',
    contoh: [
      'Pull-up jalur I2C pada modul Arduino',
      'Rangkaian DAC sederhana dari resistor',
      'Pembagi tegangan multi kanal sensor'
    ],
    catatan: 'Perhatikan pin yang terhubung bersama saat membaca datasheet.',
    mirip: [
      'resistor',
      'trimmer',
      'eeprom'
    ],
  },
  {
    id: 'resistor-fusible',
    nama: 'Resistor Fusible',
    alias: [
      'Fusible resistor',
      'Safety resistor'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'lanjut',
    bentuk: 'Badan keramik silinder dengan dua kawat terminal.',
    fungsi: 'Membatasi arus dan memutus jalur saat terlalu panas.',
    prinsip: 'Bahan resistif meleleh dan memutus sambungan saat suhu terlalu tinggi. Nilai tahanannya tetap normal pada suhu kerja.',
    karakteristik: [
      'Bertahan terhadap satu kali kondisi panas berlebih.',
      'Setelah pemanasan serius, komponen menjadi putus permanen.',
      'Nilainya tetap normal selama suhu kerja tidak berlebihan.'
    ],
    tegangan: '0 - 500 V',
    rating: '0,5 W - 5 W',
    contoh: [
      'Proteksi primer pada trafo SMPS',
      'Pengaman modul daya',
      'Skema optocoupler di catu daya'
    ],
    catatan: 'Arahkan panas menjauhi komponen sensitif di sekitarnya.',
    mirip: [
      'fuse',
      'resistor',
      'varistor'
    ],
  },
  {
    id: 'ldr',
    nama: 'LDR (Light Dependent Resistor)',
    alias: [
      'Fotoresistor',
      'CDS'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Cakram keramik bening dengan pola zig-zag metalik.',
    fungsi: 'Mengubah kekuatan cahaya menjadi perubahan nilai tahanan.',
    prinsip: 'Cahaya membebaskan pembawa muatan pada bahan semikonduktor. Bertambahnya pembawa muatan membuat tahanan menurun.',
    karakteristik: [
      'Tahanannya turun drastis ketika mendapat cahaya terang.',
      'Responnya lambat, baru stabil setelah puluhan detik.',
      'Dipasang pada bagian gelap agar nilainya tidak terpengaruh.'
    ],
    tegangan: '0 - 200 V',
    rating: '0,05 W - 0,25 W',
    contoh: [
      'Lampu penerangan jalan otomatis',
      'Penghitung kertas pada printer',
      'Sistem penyiram tanaman otomatis'
    ],
    catatan: 'Hindari pemasangan tepat di bawah lampu, nilainya jadi tidak stabil.',
    mirip: [
      'thermistor',
      'fotodioda',
      'phototransistor'
    ],
  },
  {
    id: 'varistor',
    nama: 'Varistor (MOV)',
    alias: [
      'MOV',
      'VDR'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'lanjut',
    bentuk: 'Piringan keramik atau silinder dua terminal.',
    fungsi: 'Menyerap lonjakan tegangan sementara sebagai pelindung.',
    prinsip: 'Bahan varistor bersifat nonlinier sehingga tahanannya turun drastis saat tegangan naik. Energi lonjakan berubah menjadi panas.',
    karakteristik: [
      'Tahanannya turun tajam saat tegangan melebihi ambang.',
      'Merespons sangat cepat dalam hitungan mikrodetik.',
      'Umumnya dipasang paralel dengan beban yang dilindungi.'
    ],
    tegangan: '0 - 600 V',
    rating: '14 J - 600 J',
    contoh: [
      'Pelindung stopkontak rumah',
      'Proteksi pada TV dan kulkas',
      'Penyerap lonjakan pada power supply'
    ],
    catatan: 'MOV akan short saat rusak dan bisa memicu api, lindungi juga dengan sekering.',
    mirip: [
      'dioda-tvs',
      'resistor-fusible',
      'fuse'
    ],
  },
  {
    id: 'ptc',
    nama: 'PTC Thermistor',
    alias: [
      'PTC',
      'Resistor panas'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'lanjut',
    bentuk: 'Piringan atau bead keramik dengan dua kawat.',
    fungsi: 'Membatasi arus sesaat pada motor induksi yang mulai berputar.',
    prinsip: 'Koefisien suhu positif membuat tahanan meningkat saat suhu naik. Alur awal dibatasi lalu normal setelah motor berjalan.',
    karakteristik: [
      'Tahanannya naik saat suhu komponen meningkat.',
      'Dipasang seri pada motor atau beban yang dilindungi.',
      'Nilainya kembali normal setelah komponen mendingin.'
    ],
    tegangan: '0 - 250 V',
    rating: '0,5 W - 5 W',
    contoh: [
      'Limiter start kipas angin listrik',
      'Proteksi pada motor pompa air',
      'Pembatas arus lampu LED strip'
    ],
    catatan: 'Dipilih berdasarkan tahanan pada suhu ruang dan arus start motor.',
    mirip: [
      'thermistor',
      'resistor-fusible',
      'ldr'
    ],
  },
  {
    id: 'thermistor',
    nama: 'NTC Thermistor',
    alias: [
      'NTC',
      'Thermistor'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Bead atau piringan kecil berbungkus kaca atau epoksi.',
    fungsi: 'Mengubah perubahan suhu menjadi perubahan nilai tahanan.',
    prinsip: 'Koefisien suhu negatif membuat tahanan menurun ketika suhu naik. Perubahan ini dipakai sebagai penanda suhu.',
    karakteristik: [
      'Tahanannya menurun setiap suhu meningkat.',
      'Responnya cepat terhadap perubahan suhu lingkungan.',
      'Perlu resistor tetap seri agar pembacaannya stabil.'
    ],
    tegangan: '0 - 250 V',
    rating: '0,05 W - 1 W',
    contoh: [
      'Sensor suhu pada kulkas',
      'Proteksi motor bor listrik',
      'Kompensasi suhu pada catu daya'
    ],
    catatan: 'Jangan menganggap NTC sebagai sensor digital; keluarannya masih berupa tegangan.',
    mirip: [
      'ptc',
      'ldr',
      'resistor'
    ],
  },
  {
    id: 'capacitor',
    nama: 'Kapasitor',
    alias: [
      'C',
      'Condenser'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Cakram, silinder, atau keping keramik tanpa polaritas.',
    fungsi: 'Menyimpan muatan listrik dan menyaring derau pada rangkaian.',
    prinsip: 'Tegangan bolak-balik membuat muatan berganti di kedua keping sehingga arus mengalir pada jalur.',
    karakteristik: [
      'Tidak memiliki polaritas sehingga bebas dipasang.',
      'Nilai umumnya nanofarad sampai mikrofarad.',
      'Impedansinya turun pada frekuensi tinggi.'
    ],
    tegangan: '0,5 - 1000 V DC',
    rating: '10 pF - 100 µF',
    contoh: [
      'Filter derau pada power supply 5 V',
      'Decoupling di dekat pin mikrokontroler',
      'Resonansi pada osilator kristal'
    ],
    catatan: 'Lepaskan muatan kapasitor sebelum menyentuhnya, jangan langsung dibongkar.',
    mirip: [
      'inductor',
      'capacitor-pol',
      'tantalum'
    ],
  },
  {
    id: 'capacitor-pol',
    nama: 'Kapasitor Elektrolit',
    alias: [
      'Elco',
      'Capacitor polar'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Silinder aluminium bertutup dengan dua kaki di bagian bawah.',
    fungsi: 'Menyimpan muatan besar dengan nilai besar pada tegangan kerja tinggi.',
    prinsip: 'Dielektrik cair membuat ukuran komponen tetap kecil untuk kapasitansi besar. Karena punya polaritas, arah pemasangan wajib benar.',
    karakteristik: [
      'Memiliki tanda polaritas plus dan minus yang wajib.',
      'Nilainya besar, bisa mencapai ribuan mikrofarad.',
      'Arus bocornya kecil sehingga cocok untuk penyaring.'
    ],
    tegangan: '1 - 630 V DC',
    rating: '1 µF - 47.000 µF',
    contoh: [
      'Reservoir pada charger HP',
      'Penyaring rectified pada TV',
      'Perata tegangan setelah di bridge'
    ],
    catatan: 'Pemasangan terbalik membuat kapasitor mengembung dan bisa meledak.',
    mirip: [
      'tantalum',
      'capacitor',
      'supercap'
    ],
  },
  {
    id: 'capacitor-trimmer',
    nama: 'Kapasitor Trimmer',
    alias: [
      'Trimmer capacitor',
      'Tuning capacitor'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'lanjut',
    bentuk: 'Komponen keramik kecil berwarna dengan sekrup kalibrasi.',
    fungsi: 'Mengubah nilai kapasitansi untuk menala frekuensi kerja.',
    prinsip: 'Memutar sekrup mengubah jarak antara keping sehingga nilai kapasitansi berubah. Perubahan ini menggeser frekuensi resonansi.',
    karakteristik: [
      'Rentang perubahan nilainya relatif kecil.',
      'Dikunci dengan epoksi agar hasil kalibrasi tidak bergeser.',
      'Dipasang seri pada osilator untuk menala frekuensi.'
    ],
    tegangan: '0 - 1000 V',
    rating: '2 pF - 500 pF',
    contoh: [
      'Oscilator tuner radio FM',
      'Kalibrasi osilator warna TV',
      'Penalaan loop antena'
    ],
    catatan: 'Perubahan sudut sekrup sangat halus, jadi gunakan obeng kecil saat menyetel.',
    mirip: [
      'trimmer',
      'capacitor',
      'capacitor-motor'
    ],
  },
  {
    id: 'capacitor-motor',
    nama: 'Kapasitor Motor Run',
    alias: [
      'Capacitor start-run',
      'Capacitor AC motor'
    ],
    kategori: 'pasif',
    arus: 'ac',
    tingkat: 'lanjut',
    bentuk: 'Kotak plastik silinder besar dengan dua terminal.',
    fungsi: 'Memberikan pergeseran fasa pada motor induksi satu fasa.',
    prinsip: 'Kapasitor menimbulkan pergeseran fasa antara dua lilitan motor. Perbedaan fasa itu menghasilkan medan putar sehingga motor berputar.',
    karakteristik: [
      'Dirancang khusus untuk arus bolak-balik pada tegangan AC.',
      'Nilainya besar dan toleransinya cukup ketat.',
      'Memakai bahan polypropylene yang tahan panas.'
    ],
    tegangan: '110 - 500 V AC',
    rating: '1 - 45 µF',
    contoh: [
      'Motor kipas langit-langit',
      'Pompa air rumah tangga',
      'Kipas angin listrik'
    ],
    catatan: 'Jangan mengganti dengan kapasitor elektrolit karena tidak tahan sambungan AC.',
    mirip: [
      'capacitor',
      'capacitor-trimmer',
      'inductor'
    ],
  },
  {
    id: 'supercap',
    nama: 'Supercapacitor',
    alias: [
      'Super capacitor',
      'Ultracapacitor'
    ],
    kategori: 'pasif',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Silinder besar mirip baterai dengan dua terminal.',
    fungsi: 'Menyimpan energi sementara dengan kapasitas sangat besar.',
    prinsip: 'Lapisan ganda elektrolit memisahkan ion di dua elektroda. Energi disimpan di lapisan tipis sehingga sangat cepat diisi.',
    karakteristik: [
      'Kapasitasnya bisa mencapai ribuan farad.',
      'Pengisian dan pengosongan jauh lebih cepat dari baterai.',
      'Tegangan kerja per sel hanya sekitar 2,7 V.'
    ],
    tegangan: '1,5 - 5,5 V DC',
    rating: '0,1 F - 3.000 F',
    contoh: [
      'Cadangan daya sesaat pada server',
      'Penyimpan energi pada rem regeneratif',
      'Modul start cepat pada bus listrik'
    ],
    catatan: 'Wajib memakai modul pengatur tegangan bila dipakai di atas 2,7 V.',
    mirip: [
      'battery',
      'capacitor-pol',
      'tantalum'
    ],
  },
  {
    id: 'tantalum',
    nama: 'Kapasitor Tantalum',
    alias: [
      'Capacitor tantalum',
      'Solid electrolytic'
    ],
    kategori: 'pasif',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Bentuk tetesan lilin kuning atau merah dengan kaki di bawah.',
    fungsi: 'Menyaring derau pada catu daya dengan hambatan seri sangat kecil.',
    prinsip: 'Lapisan oksida tantalum menjadi dielektrik yang sangat tipis. Ketebalan tipis ini memberi kapasitansi besar dalam ukuran kecil.',
    karakteristik: [
      'Sangat polar sehingga arah pemasangan wajib benar.',
      'Hambatan serinya rendah dibanding elektrolit biasa.',
      'Sensitif terhadap lonjakan tegangan yang tiba-tiba.'
    ],
    tegangan: '6 - 100 V DC',
    rating: '0,1 µF - 1.000 µF',
    contoh: [
      'Filter pada modul mikrokontroler',
      'Regulator LM317 di adaptor',
      'Penghilang deruan pada catu daya'
    ],
    catatan: 'Korslet pada tegangan penuh dapat membuat komponen terbakar dan meledak.',
    mirip: [
      'capacitor-pol',
      'supercap',
      'capacitor'
    ],
  },
  {
    id: 'inductor',
    nama: 'Induktor',
    alias: [
      'Coil',
      'Kumparan'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Kumparan kawat yang dililitkan pada inti ferit atau udara.',
    fungsi: 'Menyimpan energi dalam medan magnet dan menyaring derau.',
    prinsip: 'Perubahan arus listrik menimbulkan medan magnet yang menentang perubahannya. Tegangan induksi ini juga berfungsi menyaring frekuensi tinggi.',
    karakteristik: [
      'Nilai induktansinya dinyatakan dalam satuan henri.',
      'Arus DC butuh waktu untuk naik sampai nilai stabil.',
      'Rentang nilainya sangat luas dari mikrohenri sampai henri.'
    ],
    tegangan: '0 - 600 V',
    rating: '1 µH - 50 H',
    contoh: [
      'Choke pada power supply komputer',
      'Filter EMI di charger laptop',
      'Osilator pada catu daya switching'
    ],
    catatan: 'Jangan pakai induktor besar pada jalur sinyal yang hanya membawa DC.',
    mirip: [
      'choke',
      'transformer',
      'capacitor'
    ],
  },
  {
    id: 'choke',
    nama: 'Choke / RF Choke',
    alias: [
      'Ferrite bead',
      'Inductor EMI'
    ],
    kategori: 'pasif',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Manik ferit kecil berbentuk silinder berlubang.',
    fungsi: 'Menekan derau frekuensi tinggi tanpa menghambat arus tetap.',
    prinsip: 'Impedansi induktor meningkat seiring naiknya frekuensi sinyal. Listrik DC tetap mengalir dengan hambatan sangat kecil.',
    karakteristik: [
      'Impedansinya tinggi pada frekuensi orde MHz.',
      'Hambatan yang ditambahkan pada arus DC sangat kecil.',
      'Ukurannya kecil sehingga mudah disisipkan di jalur PCB.'
    ],
    tegangan: '0 - 300 V',
    rating: '10 µH - 1 mH',
    contoh: [
      'Filter EMI pada kabel USB',
      'Peredam derau di PCB Arduino',
      'Pemisah jalur audio pada amplifier'
    ],
    catatan: 'Kurang efektif untuk meredam derau frekuensi rendah.',
    mirip: [
      'inductor',
      'resistor',
      'capacitor'
    ],
  },
  {
    id: 'transformer',
    nama: 'Transformator',
    alias: [
      'Trafo',
      'Trafo listrik'
    ],
    kategori: 'pasif',
    arus: 'ac',
    tingkat: 'dasar',
    bentuk: 'Dua kumparan kawat pada inti besi berpelat.',
    fungsi: 'Mengubah besar kecilnya tegangan bolak-balik antar kumparan.',
    prinsip: 'Perubahan fluks magnetik pada inti menimbulkan tegangan induksi di kumparan kedua. Rasio jumlah lilitan menentukan rasio tegangan.',
    karakteristik: [
      'Hanya bekerja pada arus bolak-balik saja.',
      'Rasio tegangan sebanding dengan perbandingan lilitan.',
      'Panas dan short bila lilitan sekundernya hubung singkat.'
    ],
    tegangan: '0 - 500 V AC',
    rating: '0,5 VA - 5.000 VA',
    contoh: [
      'Trafo adaptor charger laptop',
      'Trafo inverter rumah tangga',
      'Trafo catu daya pada TV'
    ],
    catatan: 'Uji resistansi lilitan sekunder lebih dulu, jangan pakai jika outputnya short.',
    mirip: [
      'transformer-toroid',
      'transformer-iso',
      'transformer-smp'
    ],
  },
  {
    id: 'transformer-toroid',
    nama: 'Transformator Toroidal',
    alias: [
      'Toroid',
      'Trafo cincin'
    ],
    kategori: 'pasif',
    arus: 'ac',
    tingkat: 'dasar',
    bentuk: 'Kumparan yang melilit pada cincin ferit tertutup.',
    fungsi: 'Mengubah tegangan dengan induktansi bocor sangat rendah.',
    prinsip: 'Inti ferit tertutup penuh membatasi medan magnet yang bocor. Akibatnya efisiensi dan isolation antar kumparan lebih baik.',
    karakteristik: [
      'Dengung suara lebih kecil dibanding trafo tipe EI.',
      'Rugi besi lebih rendah sehingga lebih dingin.',
      'Pemasangan kawat harus merata agar inti tidak jenuh.'
    ],
    tegangan: '0 - 500 V AC',
    rating: '5 VA - 2.000 VA',
    contoh: [
      'Trafo power supply audio',
      'Trafo catu daya low noise',
      'Trafo untuk perangkat stereo'
    ],
    catatan: 'Pastikan jumlah lilitanprimer dan sekunder seimbang agar inti tidak panas.',
    mirip: [
      'transformer',
      'transformer-iso',
      'inductor'
    ],
  },
  {
    id: 'transformer-iso',
    nama: 'Transformator Isolasi',
    alias: [
      'Trafo isolasi',
      'Isolation transformer'
    ],
    kategori: 'pasif',
    arus: 'ac',
    tingkat: 'lanjut',
    bentuk: 'Trafo dengan rasio lilitan 1 : 1 dan sekat pengaman.',
    fungsi: 'Memisahkan bagian bertegangan dari bagian yang disentuh pengguna.',
    prinsip: 'Kedua sisinya terpisah galvanis karena tidak ada sambungan konduktif. Tegangan kedua tetap sama besar seperti primer.',
    karakteristik: [
      'Rasio lilitan 1 : 1 sehingga tegangan tidak berubah.',
      'Tidak ada sambungan langsung antara kedua sisinya.',
      'Memiliki pelindung panas dan sekering internal.'
    ],
    tegangan: '0 - 500 V AC',
    rating: '50 VA - 5.000 VA',
    contoh: [
      'Alat ukur osiloskop',
      'Perbaikan power supply TV',
      'Trafo adaptor laboratrium elektronik'
    ],
    catatan: 'Trafo isolasi menyekat ground, sehingga perakitan perlu dihitung ulang.',
    mirip: [
      'transformer',
      'transformer-toroid',
      'transformer-smp'
    ],
  },
  {
    id: 'transformer-smp',
    nama: 'Transformator Switching (SMPS)',
    alias: [
      'Trafo SMPS',
      'Trafo switching'
    ],
    kategori: 'pasif',
    arus: 'ac',
    tingkat: 'lanjut',
    bentuk: 'Trafo kecil berinti ferit dengan lilitan terisolasi rapat.',
    fungsi: 'Mentransfer energi pada frekuensi tinggi untuk catu daya switching.',
    prinsip: 'Saklar elektronik menggeser tegangan pada frekuensi puluhan kiloHertz. Energi dipindahkan lewat induksi magnetik inti ferit yang kecil.',
    karakteristik: [
      'Ukurannya kecil karena bekerja pada frekuensi tinggi.',
      'Rugi kecil sehingga efisiensi bisa di atas 80 persen.',
      'Memerlukan dioda penalap dan filter yang baik.'
    ],
    tegangan: '0 - 600 V AC',
    rating: '5 W - 300 W',
    contoh: [
      'Adaptor charger laptop',
      'Catu daya TV LED',
      'Catu daya di dalam modem internet'
    ],
    catatan: 'Jangan buka sebelum tahu cara kerja thyristor pada catu daya.',
    mirip: [
      'transformer',
      'transformer-toroid',
      'inductor'
    ],
  },
  {
    id: 'crystal',
    nama: 'Kristal Piezoelektrik',
    alias: [
      'Quartz crystal',
      'Osilator kristal'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'lanjut',
    bentuk: 'Logam silinder kecil berongga dengan dua kaki pipih.',
    fungsi: 'Memberikan frekuensi osilasi yang sangat stabil pada jam digital.',
    prinsip: 'Kristal bergetar pada frekuensi resonate alaminya saat diberi listrik. Rangkaian osilator menjaga getaran itu bekerja terus-menerus.',
    karakteristik: [
      'Frekuensi umumnya 32,768 kHz atau 1 sampai 20 MHz.',
      'Sangat stabil terhadap perubahan suhu lingkungan.',
      'Impedansinya menurun drastis saat beresonansi.'
    ],
    tegangan: '0 - 3,3 V',
    rating: '0,1 µW - 10 mW',
    contoh: [
      'Jam digital pada DTB piala dunia',
      'Penghitung frekuensi tachometer motor',
      'Modul RTC pada papan Arduino'
    ],
    catatan: 'Kristal tidak berosilasi sendiri, selalu perlu IC osilator.',
    mirip: [
      'inductor',
      'capacitor-trimmer',
      'mcu'
    ],
  },
  {
    id: 'fuse',
    nama: 'Sekering (Fuse)',
    alias: [
      'Fuse',
      'Pengaman'
    ],
    kategori: 'pasif',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Tabung kaca atau keramik dengan dua terminal dan kawat.',
    fungsi: 'Memutus rangkaian secara otomatis saat arus terlalu besar.',
    prinsip: 'Kawat atau lempeng di dalamnya memerah lalu mencair saat dipanaskan. Arus terhenti dan kawat terbakar putus.',
    karakteristik: [
      'Rating arus dan tegangan biasanya tercetak di badannya.',
      'Sekering yang putus hanya boleh diganti dengan nilai sama.',
      'Kawat di dalamnya sengaja dibuat tipis agar mudah mencair.'
    ],
    tegangan: '0 - 660 V',
    rating: '0,1 A - 200 A',
    contoh: [
      'Tabung pengaman pada meteran listrik',
      'Sekering motor pompa air',
      'Pengaman power supply komputer'
    ],
    catatan: 'Jangan pernah jumper atau ganti dengan kawat tembaga.',
    mirip: [
      'resistor-fusible',
      'varistor',
      'battery'
    ],
  },
  {
    id: 'battery',
    nama: 'Baterai / Sel Baterai',
    alias: [
      'Cell',
      'Aki'
    ],
    kategori: 'pasif',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Silinder atau kotak berisi elektroda dengan terminal dua kutub.',
    fungsi: 'Menyimpan energi kimia lalu mengubahnya menjadi energi listrik.',
    prinsip: 'Reaksi kimia pada dua elektroda menghasilkan aliran elektron melalui beban. Tegangan yang keluar tetap selama bahan masih tersedia.',
    karakteristik: [
      'Tegangannya relatif tetap selama bahan aktif masih ada.',
      'Kapasitasnya dinyatakan dalam satuan mAh atau Ah.',
      'Nilai tegangan turun perlahan seiring pemakaian berulang.'
    ],
    tegangan: '1,2 - 48 V DC',
    rating: '500 mAh - 200 Ah',
    contoh: [
      'Baterai proyektor layar movie',
      'Baterai cadangan pada gate motor',
      'Baterai alkaline pada remote TV'
    ],
    catatan: 'Perhatikan polaritasnya dan jangan mengisi baterai dengan arus terlalu besar.',
    mirip: [
      'supercap',
      'fuse',
      'regulator-7805'
    ],
  },
  {
    id: 'dioda',
    nama: 'Dioda',
    alias: [
      'Diode',
      'Rectifier diode'
    ],
    kategori: 'dioda',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Badan hitam silinder atau keping dengan garis katoda.',
    fungsi: 'Melewatkan arus satu arah dan memblokir arah sebaliknya.',
    prinsip: 'Sambungan semikonduktor PN hanya mengizinkan elektron bergerak satu arah. Tegangan maju membuat dioda menghantar, sedangkan tegangan mundur memblokir.',
    karakteristik: [
      'Ada tanda garis yang menandai arah katoda.',
      'Tegangan jatuh maju sekitar 0,7 V pada dioda silikon.',
      'Tahanannya pada arah mundur sangat besar sekali.'
    ],
    tegangan: '0 - 1000 V',
    rating: '1 A - 10 A',
    contoh: [
      'Penyearah pada catu daya sederhana',
      'Perlindungan polaritas pada modul',
      'Proteksi tegangan balik baterai'
    ],
    catatan: 'Jangan pakai dioda 1N4007 untuk tegangan di atas ratingnya.',
    mirip: [
      'dioda-zener',
      'dioda-schottky',
      'led'
    ],
  },
  {
    id: 'dioda-zener',
    nama: 'Dioda Zener',
    alias: [
      'Zener diode',
      'Dioda referensi'
    ],
    kategori: 'dioda',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Badan silinder berkaki dua seperti dioda biasa.',
    fungsi: 'Menjaga tegangan tetap pada nilai tertentu saat dialiri.',
    prinsip: 'Dioda zener dipakai pada arah mundur, bukan arah maju. Saat tegangan mencapai nilai nominalnya, lapisan semikonduktor membatasi arus yang lewat.',
    karakteristik: [
      'Tegangan breakdown-nya tetap pada nilai nominal.',
      'Dirancang bekerja pada arah mundur, bukan maju.',
      'Perlu resistor seri untuk membatasi arus zenernya.'
    ],
    tegangan: '2,4 - 200 V DC',
    rating: '0,5 W - 1,5 W',
    contoh: [
      'Referensi tegangan pada regulator 7805',
      'Perlindungan gerbang MOSFET',
      'Stabilizer tegangan sederhana'
    ],
    catatan: 'Pastikan ada resistor seri agar arus zener tidak berlebihan.',
    mirip: [
      'dioda',
      'dioda-tvs',
      'varistor'
    ],
  },
  {
    id: 'dioda-schottky',
    nama: 'Dioda Schottky',
    alias: [
      'Schottky diode',
      'Dioda cepat'
    ],
    kategori: 'dioda',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Keping logam dengan dua kaki dan tanda katoda.',
    fungsi: 'Menyearahkan arus dengan kehilangan tegangan lebih kecil.',
    prinsip: 'Sambungan antara logam dan semikonduktor menghasilkan voltase maju yang rendah. Akibatnya disipasi panas pada penyearah berkurang.',
    karakteristik: [
      'Tegangan jatuh maju hanya sekitar 0,2 sampai 0,4 V.',
      'Sangat cepat dalam beralih arah arus listrik.',
      'Arus bocornya besar sehingga perlu dioda lain sebagai penghalang.'
    ],
    tegangan: '0 - 200 V DC',
    rating: '0,1 A - 40 A',
    contoh: [
      'Penyearah pada power supply komputer',
      'Dioda bebas-flywheel pada motor DC',
      'Penyearah pada adaptor laptop'
    ],
    catatan: 'Arus bocornya besar, jangan dipakai sebagai penyearah mains tanpa transistor.',
    mirip: [
      'dioda',
      'dioda-zener',
      'dioda-tvs'
    ],
  },
  {
    id: 'dioda-tvs',
    nama: 'Dioda TVS (Transient Voltage Suppressor)',
    alias: [
      'TVS diode',
      'Dioda pelindung'
    ],
    kategori: 'dioda',
    arus: 'dual',
    tingkat: 'lanjut',
    bentuk: 'Keping plastik besar dengan dua kaki tebal.',
    fungsi: 'Meredam lonjakan tegangan sesaat pada jalur sinyal atau daya.',
    prinsip: 'Saat tegangan melewati ambang, dioda ini menghantar arus besar. Tegangan pada jalur yang dilindungi dibatasi di nilai tetap.',
    karakteristik: [
      'Responnya sangat cepat, hanya beberapa nanodetik.',
      'Mampu menahan arus puncak yang besar untuk sesaat.',
      'Tegangan kerusakannya dibatasi pada nilai tertentu.'
    ],
    tegangan: '0 - 600 V DC',
    rating: '400 W - 15.000 W',
    contoh: [
      'Pelindung port USB pada komputer',
      'Proteksi jalur data pada modul Arduino',
      'Pengaman pada modem internet'
    ],
    catatan: 'TVS bersifat satu kali withstand, bukan pengganti sekering.',
    mirip: [
      'varistor',
      'dioda-zener',
      'dioda'
    ],
  },
  {
    id: 'dioda-varactor',
    nama: 'Dioda Varactor',
    alias: [
      'Varactor diode',
      'Dioda varaktor'
    ],
    kategori: 'dioda',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Keping silikon kecil dengan kapasitansi yang bisa diubah.',
    fungsi: 'Menyediakan kapasitansi yang berubah terhadap tegangan kendali.',
    prinsip: 'Tegangan mundur mengubah lebar lapisan pengosong pada sambungan. Perubahan lebar ini mengubah nilai kapasitansinya.',
    karakteristik: [
      'Kapasitansinya kecil, orde beberapa pikofarad.',
      'Nilai kapasitansinya berubah perlahan saat dinaikkan.',
      'Dipakai bersama kapasitor tetap pada osilator.'
    ],
    tegangan: '0 - 100 V DC',
    rating: '1 pF - 100 pF',
    contoh: [
      'Tuning osilator radio FM',
      'Sirkuit matching pada amplifier',
      'Rangkaian penggeser fasa'
    ],
    catatan: 'Dioda ini dipakai pada arah mundur dan sering disERI kapasitor tetap.',
    mirip: [
      'capacitor-trimmer',
      'dioda',
      'capacitor'
    ],
  },
  {
    id: 'led',
    nama: 'LED (Light Emitting Diode)',
    alias: [
      'LED',
      'Lampu indikator'
    ],
    kategori: 'dioda',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Keping plastik bening atau berwarna dengan dua kaki.',
    fungsi: 'Mengubah energi listrik menjadi cahaya yang dapat dilihat.',
    prinsip: 'Elektron dan hole yang berlawan muatan bertemu pada lapisan aktif. Energi yang dilepaskan dipancarkan sebagai cahaya.',
    karakteristik: [
      'Hanya boleh dipasang seri dengan resistor pembatas.',
      'Tegangan majunya sekitar 1,8 sampai 3,3 V.',
      'Warnanya menentukan jenis warna cahaya yang dipancarkan.'
    ],
    tegangan: '1,8 - 3,6 V DC',
    rating: '10 mA - 20 mA',
    contoh: [
      'Lampu indikator pada TV',
      'Lampu status pada power supply komputer',
      'Lampu sein motor'
    ],
    catatan: 'Jangan hubungkan langsung ke tegangan 5 V tanpa resistor.',
    mirip: [
      'dioda',
      'led-7seg',
      'dioda-zener'
    ],
  },
  {
    id: 'led-7seg',
    nama: 'Display 7 Segment',
    alias: [
      'Seven segment',
      'LED display'
    ],
    kategori: 'dioda',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Satu digit berbentuk angka delapan dari seven segment LED.',
    fungsi: 'Menampilkan angka desimal pada perangkat elektronik.',
    prinsip: 'Setiap segmen berisi LED dan katoda bersama. Menyala atau matinya tiap segmen membentuk huruf atau angka.',
    karakteristik: [
      'Terdiri dari tujuh segmen dan satu titik desimal.',
      'Sebagian besar memakai empat digit dalam satu modul.',
      'Setiap segmennya berupa LED dengan arus terbatas.'
    ],
    tegangan: '3 - 5 V DC',
    rating: '5 mA - 20 mA per segmen',
    contoh: [
      'Angka arah pada panel lift',
      'Papan skor pertandingan olahraga',
      'Timer digital pada dapur'
    ],
    catatan: 'Pasang resistor atau driver, jangan terhubung langsung ke pin mikrokontroler.',
    mirip: [
      'led',
      'lcd',
      'mcu'
    ],
  },
  {
    id: 'fotodioda',
    nama: 'Fotodioda',
    alias: [
      'Photodiode',
      'Dioda foto'
    ],
    kategori: 'dioda',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Keping silikon bening dengan jendela optik dan dua kaki.',
    fungsi: 'Mengubah cahaya menjadi arus listrik atau tegangan.',
    prinsip: 'Foton yang mengenai lapisan aktif membebaskan pasangan elektron dan hole. Arus ini mengalir pada arah kebalikan seperti dioda biasa.',
    karakteristik: [
      'Dapat dipasang pada mode reverse bias atau nol bias.',
      'Arus gelapnya sangat kecil saat tidak ada cahaya.',
      'Sensitivitasnya meningkat bila permukaannya dikasih lens.'
    ],
    tegangan: '0 - 60 V DC',
    rating: '1 µA - 50 mA',
    contoh: [
      'Sensor optik pada mouse komputer',
      'Pembaca kartu KTP elektronik',
      'Sensor kamera pada ponsel'
    ],
    catatan: 'Jangan salah pasang polaritas saat mode reverse bias.',
    mirip: [
      'phototransistor',
      'ldr',
      'solar-cell'
    ],
  },
  {
    id: 'lcd',
    nama: 'LCD 16x2 (Liquid Crystal Display)',
    alias: [
      'LCD',
      'Display karakter'
    ],
    kategori: 'dioda',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Modul kaca bening dengan baris karakter dan pin di bagian bawah.',
    fungsi: 'Menampilkan teks atau angka pada layar kristal cair.',
    prinsip: 'Lapisan kristal cair mengubah arah cahaya latar sesuai tegangan kendali. Perbedaan suhu dan komposisi lapisan menentukan gelap atau terlitnya piksel.',
    karakteristik: [
      'Memiliki enam belas kolom dan dua baris karakter.',
      'Memerlukan potensiometer untuk mengatur kontras layar.',
      'Memakai driver penguat baris di dalam modulnya.'
    ],
    tegangan: '4,5 - 5,5 V DC',
    rating: '10 mA - 25 mA',
    contoh: [
      'Panel informasi di kios',
      'Display suhu dan jam digital',
      'Antarmuka menu alat'
    ],
    catatan: 'Jangan lupa menarik pin kontras ke ground agar teks terlihat.',
    mirip: [
      'led-7seg',
      'mcu',
      'shift-595'
    ],
  },
  {
    id: 'optocoupler',
    nama: 'Optocoupler / Isolator Optik',
    alias: [
      'Optocoupler',
      'PC817'
    ],
    kategori: 'dioda',
    arus: 'dual',
    tingkat: 'lanjut',
    bentuk: 'Cip plastik bening berisi LED dan fototransistor terpisah.',
    fungsi: 'Menghubungkan dua rangkaian listrik tanpa sambungan konduktif langsung.',
    prinsip: 'LED di sisi masukan memancarkan cahaya ke fototransistor di sisi keluaran. Cahaya itu memindahkan sinyal tanpa menyentuh kedua sisi secara listrik.',
    karakteristik: [
      'Mengisolasi tegangan hingga ribuan volt antar sisinya.',
      'Responnya cukup lambat, berorde mikrodetik.',
      'Ada versi phototransistor dan photodarlington.'
    ],
    tegangan: '0 - 1000 V DC',
    rating: '10 mA - 500 mA',
    contoh: [
      'Isolasi driver motor di power supply',
      'Antarmuka sensor pada modul Arduino',
      'Isolasi sinyal pada panel mesin'
    ],
    catatan: 'LED di dalamnya perlu resistor seri, keluarannya juga butuh resistor pull-up.',
    mirip: [
      'phototransistor',
      'optotriac',
      'transformer-iso'
    ],
  },
  {
    id: 'optotriac',
    nama: 'Optotriac (MOC3021)',
    alias: [
      'Optotriac',
      'Phototriac'
    ],
    kategori: 'dioda',
    arus: 'ac',
    tingkat: 'lanjut',
    bentuk: 'Cip bening dengan LED di satu sisi dan TRIAC di sisi lain.',
    fungsi: 'Mengendalikan beban listrik AC lewat sinyal optik tanpa kontak.',
    prinsip: 'Cahaya dari LED memicu TRIAC di sisi keluaran. TRIAC itu lalu menghantarkan arus pada kedua arah untuk memotong fase gelombang AC.',
    karakteristik: [
      'Dapat memutus arus pada kedua arah bipolar sekaligus.',
      'Arus picu gate yang dibutuhkan cukup besar.',
      'Dipakai sebagai pemicu pada saklar TRIAC dimmer.'
    ],
    tegangan: '0 - 600 V AC',
    rating: '10 mA - 300 mA',
    contoh: [
      'Dimmer lampu pijar di rumah',
      'Pengendali kipas langit-langit',
      'Saklar elektronik pada stopkontak'
    ],
    catatan: 'TRIAC hanya menghantarkan pada separuh gelombang, perhatikan saat pemicunya.',
    mirip: [
      'optocoupler',
      'triac',
      'relay'
    ],
  },
  {
    id: 'solar-cell',
    nama: 'Solar Cell',
    alias: [
      'Sel surya',
      'Photovoltaic'
    ],
    kategori: 'dioda',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Keping silikon gelap berlapis anti pantulan.',
    fungsi: 'Mengubah energi cahaya matahari langsung menjadi listrik DC.',
    prinsip: 'Foton matahari membebaskan elektron pada lapisan semikonduktor. Penghambatan oleh lapisan penumpuk menghasilkan arus searah.',
    karakteristik: [
      'Tegangan open circuit sekitar 0,5 V untuk sel tunggal.',
      'Outputnya berubah mengikuti intensitas cahaya matahari.',
      'Perlu dioda schottky sebagai pelindung dari pembalikan.'
    ],
    tegangan: '0 - 48 V DC',
    rating: '1 W - 400 W per panel',
    contoh: [
      'Panel surya atap rumah',
      'Lampu penerangan jalan tenaga surya',
      'Pompa air untuk ladang jagung'
    ],
    catatan: 'Keluarannya berubah-ubah mengikuti cuaca, gunakan regulator agar aman.',
    mirip: [
      'fotodioda',
      'battery',
      'dioda'
    ],
  },
  {
    id: 'bjt-npn',
    nama: 'Transistor BJT NPN',
    alias: [
      'NPN',
      'BC547'
    ],
    kategori: 'transistor',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Cip plastik kecil hitam dengan tiga kaki.',
    fungsi: 'Menguatkan arus kecil menjadi arus besar pada simpul emitter.',
    prinsip: 'Tegangan antara basis dan kolektor mengubah aliran elektron pada lapisan basis. Arus emitter menjadi jauh lebih besar daripada arus basis.',
    karakteristik: [
      'Memiliki tiga terminal, yaitu basis, kolektor, dan emitter.',
      'Arus basis kecil cukup mengendalikan arus besar.',
      'Penguatannya bisa mencapai ratusan kali pada daerah aktif.'
    ],
    tegangan: '0 - 300 V',
    rating: '10 mA - 10 A',
    contoh: [
      'Penguat audio pada radio transistor',
      'Saklar elektronik pada kipas angin',
      'Driver motor pada mobil remote'
    ],
    catatan: 'Jangan memberi tegangan melebihi rating atau transistor cepat terbakar.',
    mirip: [
      'bjt-pnp',
      'mosfet-n',
      'darlington'
    ],
  },
  {
    id: 'bjt-pnp',
    nama: 'Transistor BJT PNP',
    alias: [
      'PNP',
      'BC557'
    ],
    kategori: 'transistor',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Cip plastik kecil hitam dengan tiga kaki, arah kaki berbeda.',
    fungsi: 'Menguatkan arus pada sisi sumber tegangan atau sisi negatif.',
    prinsip: 'Polaritas transistor dibalik dibanding NPN. Arus mengalir dari emitter ke kolektor ketika basis diberi tegangan lebih negatif.',
    karakteristik: [
      'Tegangan basis harus lebih negatif daripada emitter.',
      'Umumnya dipakai pada saklar di sisi sumber tegangan.',
      'Tegangan emitor-emitter saat aktif hanya sekitar 0,2 V.'
    ],
    tegangan: '0 - 300 V',
    rating: '10 mA - 10 A',
    contoh: [
      'Saklar pada catu daya positif',
      'Penguat audio pada amplifier kecil',
      'Kontrol kipas langit-langit'
    ],
    catatan: 'Urutan pin PNP terbalik dari NPN, cek datasheet sebelum menyolder.',
    mirip: [
      'bjt-npn',
      'mosfet-p',
      'darlington'
    ],
  },
  {
    id: 'phototransistor',
    nama: 'Fototransistor',
    alias: [
      'Phototransistor',
      'Sensor foto'
    ],
    kategori: 'transistor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip bening dengan jendela optik dan dua atau tiga kaki.',
    fungsi: 'Mengubah kekuatan cahaya menjadi arus listrik yang jauh lebih besar.',
    prinsip: 'Cahaya yang mengenai lapisan basis membebaskan pembawa muatan. Arus kecil itu dikuatkan oleh transistor di dalamnya.',
    karakteristik: [
      'Penguatannya bisa mencapai ratusan kali.',
      'Sering dipakai sebagai saklar pada relung gelap.',
      'Terdapat dua versi yaitu dua kaki dan tiga kaki.'
    ],
    tegangan: '0 - 300 V',
    rating: '0,1 mA - 100 mA',
    contoh: [
      'Sensor infra merah pada remote TV',
      'Pendeteksi benda pada mesin fotokopi',
      'Sensor otomatis pada tangki air'
    ],
    catatan: 'Sangat peka terhadap cahaya, lindungi dengan pipa hitam saat diperlukan.',
    mirip: [
      'fotodioda',
      'ldr',
      'optocoupler'
    ],
  },
  {
    id: 'darlington',
    nama: 'Transistor Darlington',
    alias: [
      'Darlington pair',
      'BD139'
    ],
    kategori: 'transistor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip hitam dengan tiga kaki seperti transistor biasa.',
    fungsi: 'Menguatkan arus basis yang sangat kecil agar arus besar bisa dialirkan.',
    prinsip: 'Emitter transistor pertama terhubung ke basis transistor kedua. Arus emitter pertama menjadi arus basis transistor kedua.',
    karakteristik: [
      'Penguatan arusnya bisa lebih dari seribu kali.',
      'Tegangan jatuh totalnya sekitar 1,2 sampai 1,4 V.',
      'Ada versi yang sudah jadi satu cip utuh.'
    ],
    tegangan: '0 - 300 V',
    rating: '0,5 A - 20 A',
    contoh: [
      'Driver relay pada sistem alarm',
      'Kontrol motor langkah pada printer 3D',
      'Penguat arus pada modul Arduino'
    ],
    catatan: 'Jatuh tegangannya besar, pasang pendingin pada transistor ini.',
    mirip: [
      'bjt-npn',
      'bjt-pnp',
      'mosfet-n'
    ],
  },
  {
    id: 'jfet',
    nama: 'Transistor JFET',
    alias: [
      'JFET',
      '2N5457'
    ],
    kategori: 'transistor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Badan logam atau plastik kecil dengan tiga kaki.',
    fungsi: 'Menguatkan sinyal kecil dengan impedansi masukan yang sangat tinggi.',
    prinsip: 'Tegangan gerbang mundur mengubah lebar kanal antara drainase dan sumber. Perubahan lebar itu menentukan besar kecilnya arus drainase.',
    karakteristik: [
      'Arus gerbangnya sangat kecil, hanya orde nanoampere.',
      'Impedansi masukannya sangat tinggi sehingga mudah dikendalikan.',
      'Juga dipakai sebagai saklar analog pada mixer radio.'
    ],
    tegangan: '0 - 300 V',
    rating: '1 mA - 500 mA',
    contoh: [
      'Penguat pitan depan pada radio FM',
      'Osilator kristal pada jam digital',
      'Meter elektronik'
    ],
    catatan: 'Mudah rusak karena listrik statis, lindungi saat penyimpanan.',
    mirip: [
      'mosfet-n',
      'bjt-npn',
      'dioda-varactor'
    ],
  },
  {
    id: 'mosfet-n',
    nama: 'MOSFET N-Channel',
    alias: [
      'NMOS',
      'IRFZ44'
    ],
    kategori: 'transistor',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Cip plastik hitam dengan tiga kaki dan tabur pendingin.',
    fungsi: 'Berfungsi sebagai saklar elektronik untuk arus besar dengan sedikit kehilangan daya.',
    prinsip: 'Tegangan gerbang membentuk lapisan konduktor di bawah lapisan oksida. Saluran ini menghubungkan drainase dan sumber saat gerbang diberi tegangan cukup.',
    karakteristik: [
      'Hambatan saat aktif sangat kecil sehingga dayanya besar.',
      'Arus gerbangnya hampir nol sehingga mudah dikendalikan.',
      'Tegangan ambang gerbangnya masih memerlukan driver khusus.'
    ],
    tegangan: '20 - 600 V',
    rating: '1 A - 150 A',
    contoh: [
      'Saklar pada motor kipas angin listrik',
      'Penguat daya pada radio FM',
      'Saklar pada modul charger HP'
    ],
    catatan: 'Jangan lupa pasang diode flyback pada beban induktif.',
    mirip: [
      'mosfet-p',
      'igbt',
      'bjt-npn'
    ],
  },
  {
    id: 'mosfet-p',
    nama: 'MOSFET P-Channel',
    alias: [
      'PMOS',
      'IRF9540'
    ],
    kategori: 'transistor',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Cip plastik hitam dengan tiga kaki dan tab pendingin.',
    fungsi: 'Saklar pada sisi positif yang dikendalikan dari arah atas rangkaian.',
    prinsip: 'Tegangan gerbang membentuk lapisan konduktor pada kanal. Arus mengalir dari sumber ke drainase saat gerbang diberi tegangan lebih negatif.',
    karakteristik: [
      'Pembawa muutannya adalah hole yang bermuatan positif.',
      'Ruginya lebih besar dibanding MOSFET N pada rating sama.',
      'Sering dipasang pada saklar sisi atas sebuah rangkaian.'
    ],
    tegangan: '20 - 100 V',
    rating: '1 A - 100 A',
    contoh: [
      'Saklar sisi positif pada modul Arduino',
      'Proteksi polaritas daya aki',
      'Saklar bagian atas pada amplifier'
    ],
    catatan: 'Arus gerbangnya cukup besar, tambahkan driver bila perlu.',
    mirip: [
      'mosfet-n',
      'igbt',
      'bjt-pnp'
    ],
  },
  {
    id: 'igbt',
    nama: 'IGBT',
    alias: [
      'IGBT',
      'Insulated Gate Bipolar Transistor'
    ],
    kategori: 'transistor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Modul besar berpendingin atau cip bertegang tinggi.',
    fungsi: 'Saklar daya untuk tegangan dan arus besar pada aplikasi industri.',
    prinsip: 'Gerbang terisolasi membentuk kanal MOSFET dan transistor bipolar bekerja sama. Struktur gabungan ini memberi tegangan tahan tinggi sekaligus kecepatan switching.',
    karakteristik: [
      'Dapat menahan tegangan hingga ratusan volt DC.',
      'Sangat cepat dalam switching tetapi ada rugi saat menyala.',
      'Gerbangnya terisolasi sehingga tidak perlu jalur pemicu tambahan.'
    ],
    tegangan: '300 - 1700 V DC',
    rating: '20 A - 750 A',
    contoh: [
      'Penggerak motor pada inverter rumah tangga',
      'Tegangan DC ke AC pada panel surya',
      'Saklar pada mesin industri'
    ],
    catatan: 'Butuh IC penggerak gerbang khusus, jangan disambung langsung ke Arduino.',
    mirip: [
      'mosfet-n',
      'scr',
      'triac'
    ],
  },
  {
    id: 'scr',
    nama: 'SCR (Silicon Controlled Rectifier)',
    alias: [
      'Thyristor',
      'SCR'
    ],
    kategori: 'transistor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip besar bergelombang dengan tiga kaki.',
    fungsi: 'Mengalirkan arus besar satu arah dan tetap on sampai arusnya kecil.',
    prinsip: 'Sinyal pada gerbang memicu sambungan agar SCR mulai menghantar. Setelah aktif, SCR terus menghantar sampai arus turun di bawah nilai tahan.',
    karakteristik: [
      'Hanya menghantarkan arus pada satu arah saja.',
      'Tidak bisa dimatikan lewat gerbang, harus lewat arus.',
      'Setelah aktif, SCR bertahan sampai arusnya turun kecil.'
    ],
    tegangan: '100 - 3000 V DC',
    rating: '5 A - 2000 A',
    contoh: [
      'Saklar pada pemanas listrik',
      'Pengendali motor pada mixer semen',
      'Dimmer lampu penerangan jalan'
    ],
    catatan: 'Pastikan ada jalur untuk memutus arus, kalau tidak SCR akan tersangkut aktif.',
    mirip: [
      'triac',
      'igbt',
      'diac'
    ],
  },
  {
    id: 'triac',
    nama: 'TRIAC',
    alias: [
      'Triac',
      'AC switch'
    ],
    kategori: 'transistor',
    arus: 'ac',
    tingkat: 'lanjut',
    bentuk: 'Cip plastik dengan tiga kaki seperti transistor.',
    fungsi: 'Mengendalikan beban AC pada kedua arah aliran arus.',
    prinsip: 'Pulsa pada gerbang memicu TRIAC agar menghantar pada paruh gelombang. TRIAC tetap menghantar sampai arus melewati titik nol berikutnya.',
    karakteristik: [
      'Dapat memicu dan memutus arus pada kedua arah.',
      'Dipasang paralel dengan beban pada jalur keluar.',
      'Memerlukan resistor pada kaki gerbangnya agar stabil.'
    ],
    tegangan: '100 - 800 V AC',
    rating: '1 A - 500 A',
    contoh: [
      'Dimmer lampu di kamar tidur',
      'Saklar kecepatan kipas ceiling fan',
      'Saklar pengeras suara'
    ],
    catatan: 'Pilih TRIAC dengan arus di atas beban dan beri resistor pada gerbang.',
    mirip: [
      'scr',
      'diac',
      'optotriac'
    ],
  },
  {
    id: 'diac',
    nama: 'DIAC',
    alias: [
      'Diac',
      'Dioda AC'
    ],
    kategori: 'transistor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Keping plastik kecil dengan dua kaki.',
    fungsi: 'Membantu pemicuan TRIAC pada saat tegangan ambang terlampaui.',
    prinsip: 'DIAC menghantar pada kedua arah setelah tegangan mencapai nilai ambang. Arus saat memicu ini membuat TRIAC menyala pada sudut fasa yang dikehendaki.',
    karakteristik: [
      'Aliran pada kedua arah sama pada ambang tegangan tertentu.',
      'Nilai tegangan pemicunya sekitar 30 sampai 40 V.',
      'Hanya berfungsi sebentar saat diberi arus picu.'
    ],
    tegangan: '0 - 400 V',
    rating: '1 A - 10 A',
    contoh: [
      'Rangkaian dimmer pada TRIAC',
      'Pengendali sudut fase pada motor',
      'Saklar pengatur lampu'
    ],
    catatan: 'DIAC hanya menjadi pemicu, tugas utamanya tetap pada TRIAC.',
    mirip: [
      'triac',
      'dioda',
      'scr'
    ],
  },
  {
    id: 'unijunction',
    nama: 'UJT (Unijunction Transistor)',
    alias: [
      'UJT',
      '2N2647'
    ],
    kategori: 'transistor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip kecil berbentuk cakram dengan tiga kaki.',
    fungsi: 'Membentuk osilator relaksasi sederhana untuk menghasilkan denyut.',
    prinsip: 'Arus pada emiter naik sampai tegangan puncak emiter terlampaui. Tegangan pada kapasitor di basis lalu turun cepat sehingga terbentuk denyut.',
    karakteristik: [
      'Memiliki tiga kaki, yaitu emiter, basis satu, dan basis dua.',
      'Tegangan puncak emiternya ditentukan pembagi tegangan.',
      'Dipakai bersama satu resistor dan satu kapasitor.'
    ],
    tegangan: '0 - 60 V',
    rating: '50 mA - 2 A',
    contoh: [
      'Osilator pada jam digital murah',
      'Rangkaian penunda waktu pada alarm',
      'Penghitung laju denyut nadi'
    ],
    catatan: 'Hanya punya satu sambungan, jadi tidak sama dengan BJT pada umumnya.',
    mirip: [
      'scr',
      'diac',
      'lm555'
    ],
  },
  {
    id: 'opamp',
    nama: 'Op-Amp (LM741)',
    alias: [
      'Op amp',
      'LM741'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Cip hitam bersepuluh melalui delapan kaki.',
    fungsi: 'Menguatkan selisih dua tegangan masukan yang sangat kecil.',
    prinsip: 'Umpan balik negatif menentukan besarnya penguatan amplifier. Sinyal keluaran sengaja dikembalikan ke masukan agar nilainya bisa diatur.',
    karakteristik: [
      'Memiliki dua masukan, yaitu inverting dan non inverting.',
      'Penguatannya sangat besar bila tanpa umpan balik.',
      'Terdapat osilator internal untuk memangkas osilasi.'
    ],
    tegangan: '3 - 36 V',
    rating: '10 mA - 80 mA',
    contoh: [
      'Penguat audio pada radio FM',
      'Rangkaian sensor suhu pada termostat digital',
      'Penguat sinyal kecil pada osiloskop'
    ],
    catatan: 'Perlu catu daya ganda untuk memproses sinyal di sekitar titik nol.',
    mirip: [
      'lm393',
      'dac',
      'lm386'
    ],
  },
  {
    id: 'regulator-7805',
    nama: 'Regulator 7805',
    alias: [
      '7805',
      'Regulator 5 volt'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Cip logam tipe TO-220 dengan tiga kaki berlubang.',
    fungsi: 'Menjaga tegangan keluaran tetap 5 V dari masukan yang lebih tinggi.',
    prinsip: 'Di dalam cip ada penguat dan sumber tegangan acuan. Umpan balik internal menjaga selisih tegangan tetap sehingga keluaran stabil.',
    karakteristik: [
      'Toleransi keluarannya cukup baik untuk rangkaian digital.',
      'Memerlukan kapasitor pada kaki masukan dan kaki keluaran.',
      'Kenaikan suhunya kecil pada pemakaian arus normal.'
    ],
    tegangan: '7 - 35 V DC',
    rating: '1 A - 1,5 A',
    contoh: [
      'Catu daya 5 V pada modul Arduino',
      'Catu daya untuk radio transistor',
      'Catu daya perakitan rumahan'
    ],
    catatan: 'Wajib dipasang kapasitor masuk dan keluar agar tidak bergetar.',
    mirip: [
      'lm317',
      'battery',
      'capacitor-pol'
    ],
  },
  {
    id: 'lm317',
    nama: 'Regulator LM317',
    alias: [
      'LM317',
      'Adjustable regulator'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip logam dengan tiga kaki dan pendingin.',
    fungsi: 'Mengatur tegangan keluaran sesuai nilai yang dikehendaki pengguna.',
    prinsip: 'Selisih tegangan antara kaki keluaran dan adjust dijaga tetap oleh sumber acuan. Dua resistor luar menentukan besar tegangan keluaran.',
    karakteristik: [
      'Tegangan keluar diatur lewat perbandingan dua resistor.',
      'Jangkauan tegangan keluarannya cukup luas dan dapat disetel.',
      'Selisih tegangan yang hilang berubah menjadi panas.'
    ],
    tegangan: '3 - 40 V DC',
    rating: '0,5 A - 1,5 A',
    contoh: [
      'Catu daya 12 V untuk modul radio',
      'Catu daya atur pada perakitan rumahan',
      'Pengatur tegangan amplifier'
    ],
    catatan: 'Pasang pendingin karena selisih tegangan berubah menjadi panas.',
    mirip: [
      'regulator-7805',
      'capacitor-pol',
      'mosfet-n'
    ],
  },
  {
    id: 'lm555',
    nama: 'Timer NE555',
    alias: [
      'NE555',
      'Timer 555'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Cip hitam bersepuluh melalui delapan kaki timer.',
    fungsi: 'Membuat denyut dan waktu tunda memakai resistor dan kapasitor luar.',
    prinsip: 'Kapasitor diisi melalui resistor lalu tegangannya dibandingkan dengan ambang. Saat ambang terlampaui, output berbalik dan denyut berulang.',
    karakteristik: [
      'Bisa bekerja sebagai osilator lepas kekangan atau monostable.',
      'Frekuensi dan lebar denyut diatur oleh komponen luar.',
      'Keluarannya kuat sampai arus sekitar 200 mA.'
    ],
    tegangan: '2 - 18 V',
    rating: '10 mA - 200 mA',
    contoh: [
      'Pencahayaan kedip pada spion motor',
      'Sirene alarm sederhana',
      'Penghitung waktu pada mesin foto copy'
    ],
    catatan: 'Periode denyut dihitung dari resistor dan kapasitor yang dipasang.',
    mirip: [
      'unijunction',
      'opamp',
      'mcu'
    ],
  },
  {
    id: 'lm386',
    nama: 'Penguat Audio LM386',
    alias: [
      'LM386',
      'Audio amplifier'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Kotak plastik kecil bersepuluh, delapan kaki.',
    fungsi: 'Menguatkan sinyal audio lemah agar cukup untuk menggerakkan speaker.',
    prinsip: 'Penguat internal menguatkan selisih tegangan masukan. Umpan balik dan kapasitor luar menentukan besar kecilnya penguatan.',
    karakteristik: [
      'Penguatannya dapat diatur dari 20 kali sampai 200 kali.',
      'Catu dayanya sederhana, cukup dari baterai atau regulator.',
      'Keluarannya dapat disambungkan langsung ke speaker.'
    ],
    tegangan: '4 - 12 V',
    rating: '10 mA - 200 mA',
    contoh: [
      'Amplifier kecil untuk speaker pita',
      'Penguat suara pada radio transistor',
      'Modul amplifier pada papan Arduino'
    ],
    catatan: 'Padukan kapasitor kopling pada masukan supaya suara tidak cacat.',
    mirip: [
      'opamp',
      'speaker',
      'mcu'
    ],
  },
  {
    id: 'lm393',
    nama: 'Comparator LM393',
    alias: [
      'LM393',
      'Comparator'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip hitam dengan kaki comparator dan dua unit.',
    fungsi: 'Membandingkan dua tegangan dan memberi keluaran tinggi atau rendah.',
    prinsip: 'Perbandingan dua tegangan masukan menentukan arah transistor keluaran. Umpan balik dari kolektor menjaga level keluaran tetap tegas.',
    karakteristik: [
      'Keluaran berupa transistor open collector yang perlu pull-up.',
      'Tersedia dua unit comparator dalam satu paket cip.',
      'Tegangan masukannya dapat mendekati titik nol volt.'
    ],
    tegangan: '2 - 36 V',
    rating: '0,1 mA - 100 mA',
    contoh: [
      'Rancangan pengaman baterai otomatis',
      'Sensor level air pada tandon',
      'Modul pemicu sensor'
    ],
    catatan: 'Keluaran open collector wajib diberi resistor pull-up ke sumber.',
    mirip: [
      'opamp',
      'dac',
      'mcu'
    ],
  },
  {
    id: 'gate-and',
    nama: 'Gerbang AND 7408',
    alias: [
      '7408',
      'AND gate'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Cip DIP 14 kaki berisi gerbang AND dua masukan.',
    fungsi: 'Menghasilkan keluaran logika 1 hanya bila semua masukannya bernilai 1.',
    prinsip: 'Transistor pada tiap gerbang menentukan keadaan keluaran sesuai masukan. Tegangan keluarannya hanya tinggi bila semua masukan aktif.',
    karakteristik: [
      'Berisi empat gerbang AND dua masukan dalam satu cip.',
      'Memakai logika positif TTL dengan catu daya 5 volt.',
      'Setiap gerbang punya keluaran pada kaki terpisah.'
    ],
    tegangan: '4,5 - 5,5 V DC',
    rating: '10 mA - 50 mA',
    contoh: [
      'Kode pengaman pintu digital',
      'Sirkuit kontrol motor sederhana',
      'Pencacah digital pada jam'
    ],
    catatan: 'Jangan campur cip TTL 5 V dengan logika CMOS yang levelnya berbeda.',
    mirip: [
      'gate-or',
      'gate-nand',
      'gate-not'
    ],
  },
  {
    id: 'gate-or',
    nama: 'Gerbang OR 7432',
    alias: [
      '7432',
      'OR gate'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Cip DIP 14 kaki, tiap cip punya empat gerbang OR.',
    fungsi: 'Menghasilkan keluaran logika 1 bila salah satu masukannya bernilai 1.',
    prinsip: 'Jalur transistor tiap gerbang disusun paralel. Bila salah satu masukan aktif, keluaran ikut menjadi tinggi.',
    karakteristik: [
      'Berisi empat gerbang OR dua masukan dalam satu cip.',
      'Masing-masing gerbang punya dua kaki masukan.',
      'Cocok untuk menyatukan beberapa kondisi jadi satu perintah.'
    ],
    tegangan: '4,5 - 5,5 V DC',
    rating: '10 mA - 50 mA',
    contoh: [
      'Alarm saat salah satu sensor aktif',
      'Kontrol lampu tanda lalu lintas jalan',
      'Pemicu alarm pada lemari pendingin'
    ],
    catatan: 'Keluarannya berlawanan dengan gerbang AND, pastikan tidak tertukar saat merakit.',
    mirip: [
      'gate-and',
      'gate-nor',
      'gate-not'
    ],
  },
  {
    id: 'gate-not',
    nama: 'Gerbang NOT (Inverter) 7404',
    alias: [
      '7404',
      'NOT gate',
      'Inverter'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Cip DIP 14 kaki berisi enam gerbang satu masukan.',
    fungsi: 'Membalik logika masukan, yaitu mengubah 1 menjadi 0 dan 0 menjadi 1.',
    prinsip: 'Satu tahap transistor membalik arah tegangan masukan. Keluaran berlawanan fase dengan masukan.',
    karakteristik: [
      'Berisi enam gerbang NOT dalam satu paket cip.',
      'Masing-masing gerbang hanya punya satu kaki masukan.',
      'Keluarannya selalu berlawanan logika dengan masukannya.'
    ],
    tegangan: '4,5 - 5,5 V DC',
    rating: '10 mA - 50 mA',
    contoh: [
      'Pembuat logika negasi pada alarm',
      'Rangkaian penguat level sensor',
      'Koreksi polaritas sinyal digital'
    ],
    catatan: 'Inverter bukan buffer, keluarannya berlawanan polaritas dengan masukan.',
    mirip: [
      'gate-and',
      'buffer',
      'gate-nand'
    ],
  },
  {
    id: 'gate-nand',
    nama: 'Gerbang NAND 7400',
    alias: [
      '7400',
      'NAND gate'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip DIP 14 kaki dengan empat gerbang NAND.',
    fungsi: 'Menghasilkan keluaran 0 hanya bila kedua masukannya bernilai 1.',
    prinsip: 'Gerbang NAND adalah gerbang AND yang disambung dengan inverter. Keluaran akhir dibalik dari hasil AND.',
    karakteristik: [
      'Berisi empat gerbang NAND dua masukan dalam satu cip.',
      'Sering dipakai sebagai gerbang universal saat merakit logika.',
      'Ditambah inverter, gerbang ini bisa jadi AND maupun OR.'
    ],
    tegangan: '4,5 - 5,5 V DC',
    rating: '10 mA - 50 mA',
    contoh: [
      'Rancangan pengaman pintu dua faktor',
      'Kode pengenal pada kunci elektronik',
      'Klasifikasi tugas pada mesin absensi'
    ],
    catatan: 'NAND bisa dijadikan semua gerbang dasar dengan menambahkan inverter.',
    mirip: [
      'gate-and',
      'gate-nor',
      'gate-or'
    ],
  },
  {
    id: 'gate-nor',
    nama: 'Gerbang NOR 7402',
    alias: [
      '7402',
      'NOR gate'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Kotak DIP 14 kaki berisi gerbang NOR dua masukan.',
    fungsi: 'Menghasilkan keluaran 1 hanya bila semua masukannya bernilai 0.',
    prinsip: 'Gerbang NOR adalah gerbang OR yang disambung dengan inverter. Keluaran akhir dibalik dari hasil OR.',
    karakteristik: [
      'Berisi empat gerbang NOR dua masukan dalam satu cip.',
      'Tiap gerbang punya dua kaki masukan dan satu kaki keluaran.',
      'Keluarannya tinggi hanya bila semua masukan bernilai 0.'
    ],
    tegangan: '4,5 - 5,5 V DC',
    rating: '10 mA - 50 mA',
    contoh: [
      'Pengecek kondisi pada mesin vending',
      'Pemindai jalur pada papan sirkuit cetak',
      'Kontrol lampu penerangan teras'
    ],
    catatan: 'Jangan tertukar saat memilih gerbang, NOR hanya menyala saat semua masukan 0.',
    mirip: [
      'gate-or',
      'gate-nand',
      'gate-not'
    ],
  },
  {
    id: 'gate-xor',
    nama: 'Gerbang XOR 7486',
    alias: [
      '7486',
      'XOR gate'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip DIP 14 kaki, empat gerbang XOR dua masukan.',
    fungsi: 'Menghasilkan keluaran 1 bila kedua masukannya berbeda.',
    prinsip: 'Dua jalur transistor menentukan keluaran saat masuksannya berbeda. Bila masuksannya sama, keluaran tetap rendah.',
    karakteristik: [
      'Berisi empat gerbang XOR dua masukan dalam satu cip.',
      'Dipakai untuk memeriksa kesamaan dua nilai data.',
      'Keluarannya tinggi bila kedua masukan berbeda nilainya.'
    ],
    tegangan: '4,5 - 5,5 V DC',
    rating: '10 mA - 50 mA',
    contoh: [
      'Deteksi perubahan nilai pada sensor',
      'Pemeriksaan paritas saat pengiriman data',
      'Pengecek kesamaan kode pada remote TV'
    ],
    catatan: 'Tidak bisa dibuat hanya dari satu jenis gerbang lain tanpa bantuan cip.',
    mirip: [
      'gate-and',
      'gate-or',
      'gate-not'
    ],
  },
  {
    id: 'buffer',
    nama: 'Buffer Logika 74HC244',
    alias: [
      '74HC244',
      'Buffer'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip DIP 20 kaki dengan delapan kaki buffer.',
    fungsi: 'Menyalin level logika tanpa mengubahnya dan menambah kekuatan arus.',
    prinsip: 'Tiap buffer menyalin level logika masukan ke keluaran. Dengan begitu sinyal tetap benar meski bebannya berat.',
    karakteristik: [
      'Berisi delapan buffer tiga keadaan dalam satu cip.',
      'Dapat dipakai untuk menaikkan atau menurunkan beban.',
      'Memiliki pin enable yang bisa melepas seluruh keluaran.'
    ],
    tegangan: '2 - 6 V DC',
    rating: '10 mA - 25 mA',
    contoh: [
      'Penguat beban untuk deretan LED',
      'Perantara antara remote TV dan rangkaian penguat',
      'Pendorong display tujuh segmen'
    ],
    catatan: 'Kaki enable membuat keluaran masuk impedansi tinggi, bukan terputus total.',
    mirip: [
      'gate-not',
      'mcu',
      'shift-595'
    ],
  },
  {
    id: 'flipflop-d',
    nama: 'Flip-Flop D 7474',
    alias: [
      '7474',
      'D flip-flop'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip DIP 14 kaki berisi dua flip-flop D.',
    fungsi: 'Menyimpan satu bit data dan memindahkannya saat tepi clock.',
    prinsip: 'Sinyal pada masukan D dicatat saat tepi clock. Data lama akan tertimpa setiap ada tepi clock berikutnya.',
    karakteristik: [
      'Setiap unit punya masukan D, clock, dan keluaran Q.',
      'Memiliki keluaran komplemen untuk tahap berikutnya.',
      'Isi memorinya hanya satu bit pada satu waktu.'
    ],
    tegangan: '4,5 - 5,5 V DC',
    rating: '10 mA - 50 mA',
    contoh: [
      'Penyimpan status pada mesin ATM',
      'Rangkaian pembagi frekuensi pada jam digital',
      'Antrian data pada port serial'
    ],
    catatan: 'Perhatikan jenis pemicuan clock, ada yang rising edge dan ada yang falling edge.',
    mirip: [
      'counter-4020',
      'buffer',
      'mcu'
    ],
  },
  {
    id: 'counter-4020',
    nama: 'Counter 4020',
    alias: [
      'CD4020',
      'Counter ripple'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip DIP 16 kaki dengan empat belas keluaran hitungan.',
    fungsi: 'Menghitung jumlah pulsa clock dan menampilkan hasil dalam bentuk biner.',
    prinsip: 'Setiap pulsa clock membalik keadaan flip-flop di dalamnya. Rangkaian berantai itu mengubah jumlah pulsa menjadi angka basis dua.',
    karakteristik: [
      'Memiliki empat belas keluaran biner untuk hitungan.',
      'Dapat di-reset sehingga hitungan dimulai dari nol.',
      'Dipakai juga sebagai pembagi frekuensi pada osilator.'
    ],
    tegangan: '3 - 18 V DC',
    rating: '1 mA - 50 mA',
    contoh: [
      'Penghitung putaran mesin foto copy',
      'Pembagi frekuensi pada panel display',
      'Penghitung pulsa pada tachometer motor'
    ],
    catatan: 'Keluaran biner perlu diterjemahkan menjadi angka desimal agar mudah dibaca.',
    mirip: [
      'flipflop-d',
      'mcu',
      'crystal'
    ],
  },
  {
    id: 'eeprom',
    nama: 'EEPROM 24C02',
    alias: [
      '24C02',
      'EEPROM I2C'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip kecil bersepuluh melalui delapan kaki.',
    fungsi: 'Menyimpan data kecil secara permanen dan dapat dibaca ulang.',
    prinsip: 'Sel memori menyimpan muatan pada sel gerbang mengambang. Data tetap ada meski catu daya diputus, sampai ditulis ulang.',
    karakteristik: [
      'Kapasitasnya 2 Kbit atau setara 256 byte.',
      'Berkomunikasi lewat protokol I2C dengan dua kabel.',
      'Jumlah siklus tulisnya terbatas, sekitar sejuta kali.'
    ],
    tegangan: '1,8 - 5,5 V DC',
    rating: '1 mA - 5 mA',
    contoh: [
      'Simpan kata sandi alat musik',
      'Menyimpan setelan kalibrasi TV',
      'Menyimpan konfigurasi pada modul Arduino'
    ],
    catatan: 'Data bertahan tanpa catu daya, tetapi jumlah siklus tulisnya terbatas.',
    mirip: [
      'mcu',
      'counter-4020',
      'resistor-array'
    ],
  },
  {
    id: 'shift-595',
    nama: 'Shift Register 74HC595',
    alias: [
      '74HC595',
      'Shift register'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip bersepuluh melalui enam belas kaki.',
    fungsi: 'Memperluas jumlah pin keluaran mikrokontroler menjadi delapan output.',
    prinsip: 'Data dikirim bergantian ke dalam cip lalu disimpan di register geser. Seluruh delapan pin keluaran berubah sekaligus saat pin pengunci ditekan.',
    karakteristik: [
      'Delapan pin keluaran dengan pin pengunci latch.',
      'Cukup tiga pin mikrokontroler untuk delapan output.',
      'Tiap pin keluarannya dapat disambungkan ke beban kecil.'
    ],
    tegangan: '2 - 6 V DC',
    rating: '5 mA - 25 mA',
    contoh: [
      'Menjalankan deretan LED pada papan reklame',
      'Memperluas pin pada modul Arduino',
      'Menjalankan banyak LED dengan pin terbatas'
    ],
    catatan: 'Kaki MR dipakai untuk mengembalikan seluruh keluaran ke keadaan awal.',
    mirip: [
      'buffer',
      'mcu',
      'led-7seg'
    ],
  },
  {
    id: 'mcu',
    nama: 'Mikrokontroler (Arduino/STM32)',
    alias: [
      'MCU',
      'Arduino Uno'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Papan kecil berlapis tembaga dengan cip utama dan konektor USB.',
    fungsi: 'Mengolah data sensor lalu memberi perintah ke aktuator sesuai program.',
    prinsip: 'Prosesor di dalam cip menjalankan instruksi dari memori. Pin masukan dan keluaran digunakan untuk membaca sensor serta menyalakan beban.',
    karakteristik: [
      'Memiliki satu unit pemrosesan dan memori dalam satu cip.',
      'Tersedia banyak pin digital, analog, dan komunikasi.',
      'Dapat diprogram ulang melalui kabel USB.'
    ],
    tegangan: '1,8 - 5,5 V DC',
    rating: '10 mA - 100 mA',
    contoh: [
      'Panel kendali mesin penyaring air',
      'Sistem alarm rumah',
      'Pengendali lampu taman'
    ],
    catatan: 'Jangan memberi tegangan lebih dari 5 V pada pin Arduino Uno.',
    mirip: [
      'eeprom',
      'shift-595',
      'opamp'
    ],
  },
  {
    id: 'dac',
    nama: 'Konverter DAC',
    alias: [
      'DAC',
      'MCP4725'
    ],
    kategori: 'ic',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip kecil bersepuluh dengan kaki data dan clock.',
    fungsi: 'Mengubah sinyal digital menjadi tegangan analog.',
    prinsip: 'Kode digital menentukan arah saklar pada susunan resistor. Tegangan yang dihasilkan besarnya sebanding dengan nilai kode.',
    karakteristik: [
      'Keluarnya berupa tegangan analog pada satu kaki.',
      'Resolusinya umumnya 8 bit sampai 12 bit.',
      'Butuh antarmuka I2C atau SPI dari pengendalinya.'
    ],
    tegangan: '2,7 - 5,5 V DC',
    rating: '1 mA - 20 mA',
    contoh: [
      'Pengatur volume pada amplifier digital',
      'Pengendali kecepatan motor melalui op-amp',
      'Membentuk gelombang sinus untuk penguat'
    ],
    catatan: 'Resolusi step kasar, tambahkan op-amp agar tegangan keluaran halus.',
    mirip: [
      'eeprom',
      'opamp',
      'mcu'
    ],
  },
  {
    id: 'ultrasonic',
    nama: 'Sensor Ultrasonik HC-SR04',
    alias: [
      'HC-SR04',
      'Sensor jarak'
    ],
    kategori: 'sensor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Modul PCB dengan dua transducer dan empat kaki.',
    fungsi: 'Mengukur jarak objek tanpa perlu menyentuh objek tersebut.',
    prinsip: 'Modul memancarkan gelombang ultrasonik lalu mengukur waktu pantulannya. Jarak dihitung dari waktu tempuh dibagi dua dan dikali kecepatan suara.',
    karakteristik: [
      'Jarak ukurnya sekitar 2 sampai 400 sentimeter.',
      'Memiliki pin trigger dan pin echo yang terpisah.',
      'Akurasinya turun bila permukaan target tidak rata.'
    ],
    tegangan: '5 V DC',
    rating: '10 mA - 40 mA',
    contoh: [
      'Sensor parkir mundur mobil',
      'Pengukur tinggi orang untuk mesin ATM',
      'Pompa air otomatis pada tangki'
    ],
    catatan: 'Hasil ukur bisa meleset pada permukaan miring atau berpori.',
    mirip: [
      'pir',
      'sensor-dht',
      'hall'
    ],
  },
  {
    id: 'pir',
    nama: 'Sensor Gerak PIR (HC-SR501)',
    alias: [
      'PIR',
      'Sensor gerak'
    ],
    kategori: 'sensor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Modul kecil berkuping dengan jendela penangkap panas.',
    fungsi: 'Mendeteksi gerak manusia dari perubahan radiasi infra merah.',
    prinsip: 'Sensor pyroelektrik menghasilkan arus setiap suhu di sekitarnya berubah. Radiasi panas tubuh manusia itulah yang dideteksi cip.',
    karakteristik: [
      'Jangkauan deteksinya sekitar 3 sampai 7 meter.',
      'Sudut deteksi dapat diatur memakai potensiometer.',
      'Memiliki dua potensiometer untuk jarak dan sensitivitas.'
    ],
    tegangan: '5 - 20 V DC',
    rating: '0,1 mA - 20 mA',
    contoh: [
      'Lampu penerangan teras yang menyala otomatis',
      'Alarm gerak pada gudang',
      'Pintu otomatis pada tempat umum'
    ],
    catatan: 'Modul ini punya jeda waktu, jadi perlu menunggu stabil setelah dinyalakan.',
    mirip: [
      'ultrasonic',
      'sensor-dht',
      'hall'
    ],
  },
  {
    id: 'thermocouple',
    nama: 'Thermocouple',
    alias: [
      'Termokopel',
      'Type K thermocouple'
    ],
    kategori: 'sensor',
    arus: 'ac',
    tingkat: 'lanjut',
    bentuk: 'Dua kawat logam berbeda yang menyambung di ujung yang dipanaskan.',
    fungsi: 'Mengukur suhu tinggi dengan menghasilkan tegangan kecil yang sebanding.',
    prinsip: 'Sambungan dua logam berbeda menghasilkan tegangan saat dipanaskan. Besar tegangan itu naik perlahan seiring suhu junction.',
    karakteristik: [
      'Keluarnya berupa tegangan milivolt yang sangat kecil.',
      'Tahan terhadap suhu hingga ratusan derajat Celsius.',
      'Ada banyak tipe, mulai tipe K sampai tipe T.'
    ],
    tegangan: '0 - 60 mV',
    rating: '0,1 mA - 20 mA',
    contoh: [
      'Pengukur suhu tungku pada industri food processing',
      'Sensor suhu mesin pembakaran',
      'Pengukur suhu pemanas listrik'
    ],
    catatan: 'Keluarnya sangat kecil, jadi perlu penguat op-amp agar mudah dibaca.',
    mirip: [
      'thermistor',
      'opamp',
      'dac'
    ],
  },
  {
    id: 'hall',
    nama: 'Sensor Hall Effect',
    alias: [
      'Hall sensor',
      'Hall effect'
    ],
    kategori: 'sensor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Cip kecil tiga kaki dengan sisi datar.',
    fungsi: 'Mendeteksi medan magnet tanpa perlu menyentuh sumbernya.',
    prinsip: 'Medan magnet membuat tegangan muncul pada lapisan semikonduktor di dalam cip. Tegangan itu sebanding dengan besar kecilnya medan magnet yang masuk.',
    karakteristik: [
      'Keluaran berupa tegangan atau arus yang berubah mendadak.',
      'Terdapat versi saklar tanpa jalur linier.',
      'Tidak terpengaruh cahaya, jadi andal di ruang gelap.'
    ],
    tegangan: '3 - 5,5 V DC',
    rating: '5 mA - 20 mA',
    contoh: [
      'Sensor posisi rotor pada motor BLDC',
      'Sensor magnetic pada speedometer motor',
      'Deteksi magnet pada kunci immobilizer'
    ],
    catatan: 'Sensor tidak terpengaruh oleh cahaya, jadi tetap andal dalam ruang gelap.',
    mirip: [
      'ultrasonic',
      'pir',
      'sensor-dht'
    ],
  },
  {
    id: 'sensor-gas',
    nama: 'Sensor Gas MQ-2',
    alias: [
      'MQ-2',
      'Sensor gas'
    ],
    kategori: 'sensor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Tabung keramik bertenaga dengan dua elektroda dan dua kaki.',
    fungsi: 'Mendeteksi keberadaan gas LPG dan asap dalam udara.',
    prinsip: 'Gas yang melewati lapisan pemanas bereaksi dengan material di dalamnya. Tahanan pada elektroda sensing berubah karena adanya gas tersebut.',
    karakteristik: [
      'Tahanannya berubah bila ada gas yang dideteksi.',
      'Memerlukan pemanasan singkat sebelum terukur.',
      'Nilainya berubah sesuai konsentrasi gas di sekitarnya.'
    ],
    tegangan: '4 - 5,5 V DC',
    rating: '20 mA - 150 mA',
    contoh: [
      'Alarm gas di dapur dan kamar',
      'Monitoring kualitas udara di sekolah',
      'Deteksi asap pada panel kendali'
    ],
    catatan: 'Sensor ini hanya memberi indikasi, bukan ukuran kadar gas yang presisi.',
    mirip: [
      'sensor-dht',
      'hall',
      'pir'
    ],
  },
  {
    id: 'sensor-dht',
    nama: 'Sensor Suhu & Kelembapan DHT22',
    alias: [
      'DHT22',
      'AM2302'
    ],
    kategori: 'sensor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Kotak plastik bertiga kaki dengan selaput filter di atasnya.',
    fungsi: 'Mengukur suhu udara dan kelembapan lalu mengirimkannya sebagai data digital.',
    prinsip: 'Sensor kapasitif mengukur kelembapan dan semikonduktor mengukur suhu. Data dikirim berupa denyut pada satu jalur.',
    karakteristik: [
      'Keluarnya berupa data digital pada satu pin data.',
      'Pembacaannya cukup lambat, sekitar satu kali dua detik.',
      'Terlindung selaput filter agar tidak terkena air.'
    ],
    tegangan: '3,3 - 5,5 V DC',
    rating: '0,1 mA - 2,5 mA',
    contoh: [
      'Pemantau suhu dan kelembapan gudang',
      'Kontrol kipas dan penyiram tanaman',
      'Peringatan panas pada panel IoT'
    ],
    catatan: 'Pasang resistor pull-up pada pin data dan beri catu daya stabil 3,3 sampai 5 V.',
    mirip: [
      'thermistor',
      'sensor-gas',
      'pir'
    ],
  },
  {
    id: 'bridge',
    nama: 'Bridge Rectifier',
    alias: [
      'Bridge diode',
      'Jembatan'
    ],
    kategori: 'daya',
    arus: 'ac',
    tingkat: 'dasar',
    bentuk: 'Keping hitam dengan empat dioda di dalamnya dan dua kaki.',
    fungsi: 'Menyearahkan arus bolak-balik menjadi arus searah.',
    prinsip: 'Empat dioda disusun jembatan sehingga kedua paruh gelombang diteruskan. Hasilnya tegangan DC penuh.',
    karakteristik: [
      'Tegangan keluarannya lebih stabil dari penyearah setengah gelombang.',
      'Selalu ada dua dioda yang menghantarkan pada setiap saat.',
      'Rugi dayanya lebih besar karena ada dua dioda di jalur.'
    ],
    tegangan: '0 - 1000 V',
    rating: '1 A - 50 A',
    contoh: [
      'Catu daya TV dan radio transistor',
      'Catu daya charger HP sederhana',
      'Power supply komputer'
    ],
    catatan: 'Selalu ada dua dioda yang menghantarkan, sehingga panas yang hilang lebih besar.',
    mirip: [
      'dioda',
      'regulator-7805',
      'transformer'
    ],
  },
  {
    id: 'saklar',
    nama: 'Saklar (SPST)',
    alias: [
      'Switch',
      'Saklar satu'
    ],
    kategori: 'daya',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Kotak plastik dengan tuas kecil dan dua terminal.',
    fungsi: 'Memutus atau menyambung aliran listrik secara manual.',
    prinsip: 'Kontak logam dalam saklar saling bersentuhan saat ditekan. Tekanan tuas membuat kedua kontak menyambung dan arus mengalir.',
    karakteristik: [
      'Hanya satu jalur, jadi terhubung atau terputus.',
      'Hanya berada pada dua keadaan, yaitu hidup atau mati.',
      'Kontaknya aus setelah dipakai ribuan kali.'
    ],
    tegangan: '0 - 250 V',
    rating: '0,5 A - 20 A',
    contoh: [
      'Saklar lampu di kamar tidur',
      'Saklar pengatur kipas langit-langit',
      'Saklar daya pada power supply komputer'
    ],
    catatan: 'Pastikan rating arus saklar lebih besar dari arus beban.',
    mirip: [
      'saklar-tangent',
      'tombol',
      'relay'
    ],
  },
  {
    id: 'saklar-tangent',
    nama: 'Saklar Tangent (SPDT)',
    alias: [
      'SPDT',
      'Saklar arah'
    ],
    kategori: 'daya',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Kotak plastik bertiga terminal dengan tuas dapat dibalik.',
    fungsi: 'Memilih salah satu dari dua jalur secara bergantian.',
    prinsip: 'Tuas menghubungkan terminal umum ke salah satu dari dua terminal keluaran. Posisi tuas menentukan jalur yang aktif.',
    karakteristik: [
      'Memiliki satu terminal umum dan dua terminal keluaran.',
      'Dapat dipakai untuk membalik arah putaran motor.',
      'Sering dipakai pada motor induksi satu fasa.'
    ],
    tegangan: '0 - 250 V',
    rating: '0,5 A - 20 A',
    contoh: [
      'Saklar arah putaran kipas angin',
      'Saklar pilih arah motor pengering pakaian',
      'Saklar dua arah pada panel amplifier'
    ],
    catatan: 'Perhatikan terminal mana yang jadi titik common sebelum menyambung kabel.',
    mirip: [
      'saklar',
      'tombol',
      'relay'
    ],
  },
  {
    id: 'tombol',
    nama: 'Push Button',
    alias: [
      'Tombol tekan',
      'Push button'
    ],
    kategori: 'daya',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Tutup plastik kecil berbentuk silinder dengan dua kaki.',
    fungsi: 'Menyambung atau memutus rangkaian sesaat saat ditekan.',
    prinsip: 'Kontak dalam tombol saling bersentuhan hanya selagi ditekan. Lepas tombol, kontak kembali terpisah dan arus terhenti.',
    karakteristik: [
      'Biasanya momenter dan kembali sendiri setelah dilepas.',
      'Terdapat versi dengan kunci baut pengunci.',
      'Menghasilkan getaran singkat saat kontak bersentuhan.'
    ],
    tegangan: '0 - 250 V',
    rating: '0,5 A - 16 A',
    contoh: [
      'Pemicu menu kalkulator',
      'Tombol start pada mesin ATM',
      'Tombol reset pada power supply komputer'
    ],
    catatan: 'Tambahkan resistor pull-up atau pull-down agar masukan mikrokontroler tidak mengambang.',
    mirip: [
      'saklar',
      'dipswitch',
      'relay'
    ],
  },
  {
    id: 'dipswitch',
    nama: 'DIP Switch',
    alias: [
      'DIP switch',
      'Saklar geser'
    ],
    kategori: 'daya',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Kotak hitam dengan beberapa tuas kecil berjajar.',
    fungsi: 'Memberikan beberapa pilihan konfigurasi tanpa perlu melepas cip.',
    prinsip: 'Setiap tuas geser menyambung atau memutus satu jalur kecil. Mikrokontroler membaca posisi tiap tuas saat menyala.',
    karakteristik: [
      'Tiap posisi tuas menentukan keadaan on atau off satu jalur.',
      'Jumlah tuasnya bisa empat sampai delapan buah.',
      'Memakai jenis Normally Open seperti saklar kecil.'
    ],
    tegangan: '0 - 250 V',
    rating: '10 mA - 1 A',
    contoh: [
      'Pilih alamat jaringan pada amplifier',
      'Pengaturan mode kerja papan IoT',
      'Pemilihan kanal pada modulator radio'
    ],
    catatan: 'Hindari menyalakan daya saat DIP sedang digeser, pin bisa ikut berubah.',
    mirip: [
      'tombol',
      'saklar',
      'mcu'
    ],
  },
  {
    id: 'relay',
    nama: 'Relay',
    alias: [
      'Relay elektromekanik',
      'Contactor'
    ],
    kategori: 'daya',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Kotak plastik bening atau gelap dengan kumparan di dalamnya.',
    fungsi: 'Mengendalikan rangkaian bertegangan besar dari sinyal kecil.',
    prinsip: 'Arus kecil pada kumparan menghasilkan medan magnet. Medan itu menarik armature sehingga kontak bergeser dan menyambung jalur besar.',
    karakteristik: [
      'Kontaknya terisolasi dari kumparan pemicunya.',
      'Bisa berupa Normally Open maupun Normally Closed.',
      'Kumparannya biasanya bertegangan 5, 12, atau 24 V.'
    ],
    tegangan: '5 - 250 V',
    rating: '5 A - 40 A',
    contoh: [
      'Kontrol kipas dan lampu dari panel IoT',
      'Penggerak gerbang otomatis',
      'Saklar pompa air pada sistem rumah'
    ],
    catatan: 'Wajib pasang dioda silang pada kumparan agar umur relay lebih panjang.',
    mirip: [
      'optocoupler',
      'solenoid',
      'saklar'
    ],
  },
  {
    id: 'fan',
    nama: 'Kipas Pendingin (DC Fan)',
    alias: [
      'Fan',
      'Kipas'
    ],
    kategori: 'daya',
    arus: 'dual',
    tingkat: 'lanjut',
    bentuk: 'Kotak persegi dengan bilah berputar dan dua atau tiga kaki.',
    fungsi: 'Mendinginkan perangkat dengan menghembuskan udara.',
    prinsip: 'Bilah berputar mendorong udara dari satu sisi ke sisi lain. Putaran cepat menghasilkan aliran udara yang lebih besar.',
    karakteristik: [
      'Umumnya punya tiga atau empat kecepatan putar.',
      'Banyak yang punya sensor putaran di hubungannya.',
      'Hanya berputar satu arah, jadi perlu dioda flyback saat dikendalikan transistor.'
    ],
    tegangan: '5 - 24 V DC',
    rating: '0,05 A - 2 A',
    contoh: [
      'Kipas pendingin CPU di komputer',
      'Kipas ventilasi di lemari server',
      'Kipas pendingin pada power supply TV'
    ],
    catatan: 'Jangan hubungkan langsung ke pin mikrokontroler, arusnya terlalu besar.',
    mirip: [
      'motor-dc',
      'saklar',
      'bridge'
    ],
  },
  {
    id: 'solenoid',
    nama: 'Solenoid',
    alias: [
      'Solenoid',
      'Kumparan solenoid'
    ],
    kategori: 'meka',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Kumparan kawat pada tabung besi dengan movable inti.',
    fungsi: 'Mengubah energi listrik menjadi gerakan mekanis linier.',
    prinsip: 'Arus pada kumparan menimbulkan medan magnet. Medan itu menarik inti besi ke dalam kumparan sehingga terjadi gerakan.',
    karakteristik: [
      'Daya tariknya besar pada awal gerak lalu menurun.',
      'Membutuhkan sumber daya cukup besar agar tetap kuat.',
      'Tidak cocok untuk gerak yang sangat halus.'
    ],
    tegangan: '5 - 240 V DC',
    rating: '0,2 A - 10 A',
    contoh: [
      'Penggerak katup pada mesin dispenser',
      'Pengunci pintu garasi',
      'Palu kecil pada mesin absen'
    ],
    catatan: 'Kumparannya memanas saat dinyalakan lama, jadi beri rating arus dengan margin.',
    mirip: [
      'relay',
      'motor-dc',
      'piezo'
    ],
  },
  {
    id: 'piezo',
    nama: 'Piezo Buzzer / Piezo Kristal',
    alias: [
      'Buzzer piezo',
      'Piezo crystal'
    ],
    kategori: 'meka',
    arus: 'dual',
    tingkat: 'lanjut',
    bentuk: 'Piring keramik tipis berlapis dua elektroda dengan lubang.',
    fungsi: 'Menghasilkan bunyi atau getaran dari sinyal listrik.',
    prinsip: 'Listrik pada dua elektroda membuat piring keramik menjadi pipih. Perubahan bentuk itu menimbulkan getaran yang terdengar sebagai bunyi.',
    karakteristik: [
      'Bunyinya nyaring namun nadanya selalu satu nada.',
      'Impedansinya tinggi sehingga arus yang dipakai kecil.',
      'Memerlukan sumber listrik bolak-balik agar berbunyi.'
    ],
    tegangan: '3 - 250 V',
    rating: '1 mA - 30 mA',
    contoh: [
      'Bunyi alarm pintu',
      'Nada pemanggil mesin teller',
      'Sensor timeout pada jam digital'
    ],
    catatan: 'Piezo hanya menghasilkan satu nada, jadi tidak cocok untuk musik.',
    mirip: [
      'buzzer',
      'solenoid',
      'speaker'
    ],
  },
  {
    id: 'motor-dc',
    nama: 'Motor DC',
    alias: [
      'DC motor',
      'Motor searah'
    ],
    kategori: 'meka',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Tabung logam dengan poros keluar di tengah dan dua terminal.',
    fungsi: 'Mengubah energi listrik menjadi putaran poros.',
    prinsip: 'Arus pada kumparan menimbulkan medan magnet yang berlawanan arah antara dua sisi kumparan. Medan bersama ini berputar bersama rotor dan menghasilkan torsi.',
    karakteristik: [
      'Kecepatan putaran dapat diatur dengan tegangan.',
      'Arah putaran berlawanan bila polaritasnya ditukar.',
      'Perlu dioda flyback saat dikendalikan saklar elektronik.'
    ],
    tegangan: '3 - 300 V DC',
    rating: '5 - 500 W',
    contoh: [
      'Motor penggerak kipas langit-langit',
      'Motor pengering pakaian',
      'Motor kecil pada robot line follower'
    ],
    catatan: 'Motor DC tidak bisa dinyalakan terus-menerus tanpa beban, panas cepat naik.',
    mirip: [
      'motor-stepper',
      'fan',
      'solenoid'
    ],
  },
  {
    id: 'motor-ac',
    nama: 'Motor AC (Induksi)',
    alias: [
      'Motor induksi',
      'AC motor'
    ],
    kategori: 'meka',
    arus: 'ac',
    tingkat: 'dasar',
    bentuk: 'Rumah logam besar dengan poros keluar di salah satu sisi.',
    fungsi: 'Mengubah energi listrik bolak-balik menjadi putaran poros.',
    prinsip: 'Medan magnet berputar dari stator menarik rotor sehingga ikut berputar. Perubahan kecepatan induksi ini menghasilkan torsi.',
    karakteristik: [
      'Kecepatan putaran relatif konstan pada beban normal.',
      'Butuh kapasitor atau pengatur start pada jenis satu fasa.',
      'Kecepatan sinkronnya sekitar 1500 rpm pada 50 Hz.'
    ],
    tegangan: '110 - 400 V AC',
    rating: '0,25 - 500 HP',
    contoh: [
      'Motor pompa air rumah tangga',
      'Motor blower pada cooker hood',
      'Motor pengering di rumah'
    ],
    catatan: 'Tegangan kerja harus cocok dengan jaringan listrik di tempat itu.',
    mirip: [
      'motor-dc',
      'capacitor-motor',
      'fan'
    ],
  },
  {
    id: 'motor-stepper',
    nama: 'Motor Stepper',
    alias: [
      'Stepper motor',
      'Motor langkah'
    ],
    kategori: 'meka',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Silinder logam bertingkat dengan poros di tengahnya.',
    fungsi: 'Memutar poros dalam langkah kecil yang diatur secara digital.',
    prinsip: 'Setiap denyut pada kumparan memindahkan rotor satu langkah tetap. Jumlah denyut menentukan sudut putaran.',
    karakteristik: [
      'Sudut per langkahnya umumnya 1,8 derajat.',
      'Torsinya besar walau putaran berlangsung pelan.',
      'Posisi rotornya dapat dikunci tanpa catu daya.'
    ],
    tegangan: '5 - 48 V DC',
    rating: '0,5 - 15 W',
    contoh: [
      'Poros printer 3D dan mesin CNC mini',
      'Sumbu motor pada robot line follower',
      'Gerbang pembuka pintu gulir otomatis'
    ],
    catatan: 'Gunakan driver board yang sesuai, motor stepper tidak bisa dikendalikan langsung dari Arduino.',
    mirip: [
      'motor-dc',
      'mcu',
      'fan'
    ],
  },
  {
    id: 'speaker',
    nama: 'Speaker / Loudspeaker',
    alias: [
      'Speaker',
      'Pengeras suara'
    ],
    kategori: 'meka',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Kotak atau kerucut dengan membran besar dan dua terminal.',
    fungsi: 'Mengubah sinyal listrik menjadi gelombang suara.',
    prinsip: 'Getaran listrik pada kumparan menggerakkan membran di dekatnya. Getaran membran inilah yang terdengar sebagai suara.',
    karakteristik: [
      'Impedansinya tetap, umumnya 4, 8, atau 16 ohm.',
      'Semakin besar diameternya, suara bass makin dalam.',
      'Memiliki dua terminal, yaitu positif dan negatif.'
    ],
    tegangan: '5 - 250 V',
    rating: '0,5 - 100 W',
    contoh: [
      'Speaker TV di ruang tamu',
      'Speaker pada radio transistor',
      'Speaker aktif di sistem audio rumah'
    ],
    catatan: 'Impedansi speaker harus cocok dengan amplifier, jangan disambung sembarangan.',
    mirip: [
      'buzzer',
      'piezo',
      'lm386'
    ],
  },
  {
    id: 'buzzer',
    nama: 'Buzzer Aktif / Pasif',
    alias: [
      'Buzzer',
      'Bel listrik'
    ],
    kategori: 'meka',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Bulat hitam dengan dua kaki atau pin di bawahnya.',
    fungsi: 'Menghasilkan bunyi peringatan saat diberi listrik.',
    prinsip: 'Pada buzzer aktif ada osilator internal yang menghasilkan bunyi. Buzzer pasif justru perlu sinyal getar dari luar agar berbunyi.',
    karakteristik: [
      'Bunyinya nyaring meski hanya diberi tegangan DC.',
      'Buzzer aktif sudah punya osilator di dalamnya.',
      'Buzzer pasif perlu sinyal listrik dari luar.'
    ],
    tegangan: '3 - 24 V',
    rating: '10 mA - 50 mA',
    contoh: [
      'Peringatan pada mesin teller bank',
      'Bunyi tombol pada kalkulator',
      'Indikator suara pada panel lift'
    ],
    catatan: 'Beda buzzer aktif dan pasif sangat penting, yang aktif tidak bisa dikendalikan frekuensinya.',
    mirip: [
      'piezo',
      'speaker',
      'relay'
    ],
  },
  {
    id: 'ground',
    nama: 'Ground / Pentanahan',
    alias: [
      'GND',
      'Earth',
      'Massa'
    ],
    kategori: 'meka',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Titik acuan pada papan, terminal logam, atau elektroda tanah.',
    fungsi: 'Menjadi titik acuan tegangan dan jalur kembali arus listrik.',
    prinsip: 'Bagian-bagian dirangkai pada satu titik sehingga potensialnya sama. Tegangan antar titik baru bisa diukur dengan benar bila acuan ini satu.',
    karakteristik: [
      'Idealnya potensialnya nol volt dan tidak bertegangan.',
      'Ada ground sinyal, ground daya, dan ground pelindung.',
      'Dihubungkan ke tanah lewat elektroda atau jalur tembaga.'
    ],
    tegangan: '0 V acuan',
    rating: 'Tanpa batas daya',
    contoh: [
      'Sambungan ground pada instalasi listrik rumah',
      'Titik minus pada catu daya adaptor',
      'Elektroda tanah pada tiang antena'
    ],
    catatan: 'Kesalahan pentanahan bisa menyebabkan sengatan listrik dan gangguan derau.',
    mirip: [
      'terminal',
      'transformer-iso',
      'antena'
    ],
  },
  {
    id: 'header',
    nama: 'Header Pin',
    alias: [
      'Header',
      'Female header'
    ],
    kategori: 'konektor',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Deretan socket logam bertumpuk pada papan kecil.',
    fungsi: 'Menyediakan jalur sambungan antar papan dan kabel.',
    prinsip: 'Setiap pin logam saling terhubung dengan jalur di papan. Kabel jumper dipasang pada socket itu untuk meneruskan sinyal.',
    karakteristik: [
      'Tersedia dalam jumlah pin 2, 3, 4, 6, dan 8.',
      'Typenya ada male dan female sesuai kebutuhan.',
      'Dipasang tegak lurus pada permukaan papan sirkuit.'
    ],
    tegangan: '0 - 50 V DC',
    rating: '0,5 A - 3 A per pin',
    contoh: [
      'Sambungan sensor ke papan Arduino',
      'Jalur data modul SD card',
      'Konektor daya motor kecil'
    ],
    catatan: 'Jangan menyambungkan header ke daya besar, pinnya cepat meleleh.',
    mirip: [
      'jumper',
      'terminal',
      'banana'
    ],
  },
  {
    id: 'jumper',
    nama: 'Kabel Jumper',
    alias: [
      'Jumper wire',
      'Kabel bridge'
    ],
    kategori: 'konektor',
    arus: 'dc',
    tingkat: 'dasar',
    bentuk: 'Kabel pendek warna-warni dengan pin logam di kedua ujung.',
    fungsi: 'Menghubungkan dua titik pada papan rangkaian sementara.',
    prinsip: 'Kabel konduktor ini menyambungkan kedua header secara langsung. Listrik dialirkan lewat kawat tembaga di dalamnya.',
    karakteristik: [
      'Panjangnya umumnya 10 sampai 20 sentimeter.',
      'Warnanya menandai jenis jalurnya, merah untuk daya.',
      'Kontinuitasnya harus diuji sebelum digunakan.'
    ],
    tegangan: '0 - 60 V DC',
    rating: '0,3 A - 3 A',
    contoh: [
      'Menghubungkan modul sensor ke papan Arduino',
      'Memasang jumper boot pada papan mikrokontroler',
      'Men jumper speaker pada modul amplifier'
    ],
    catatan: 'Warna kabel menandakan jalur data dan jalur daya agar tidak tertukar saat merakit papan.',
    mirip: [
      'header',
      'terminal',
      'banana'
    ],
  },
  {
    id: 'banana',
    nama: 'Plug Banana',
    alias: [
      'Banana plug',
      'Jack banana'
    ],
    kategori: 'konektor',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Pin logam beralur seperti buah pisang dengan sarung plastik.',
    fungsi: 'Menghubungkan kabel uji atau catu daya ke soket dengan cepat.',
    prinsip: 'Pin logam masuk ke lubang soket lalu dikunci oleh tab pengunci. Kontak logamnya menghubungkan kabel dengan jalur di perangkat.',
    karakteristik: [
      'Diameter pinnya umumnya 4 mm untuk tipe standar.',
      'Ada versi male dan female dengan warna berbeda.',
      'Dapat dilepas dengan memutar badan plastiknya.'
    ],
    tegangan: '0 - 300 V',
    rating: '1 A - 30 A',
    contoh: [
      'Kabel pengukur multimeter digital',
      'Kabel catu daya untuk modul uji',
      'Kabel aki pada tes baterai mobil'
    ],
    catatan: 'Pastikan warna merah dan hitam tidak tertukar saat menyambung catu daya.',
    mirip: [
      'terminal',
      'jumper',
      'header'
    ],
  },
  {
    id: 'bnc',
    nama: 'Konektor BNC',
    alias: [
      'BNC',
      'Konektor koaksial'
    ],
    kategori: 'konektor',
    arus: 'dc',
    tingkat: 'lanjut',
    bentuk: 'Silinder logam berulir dengan pengunci bayonet.',
    fungsi: 'Menghubungkan kabel koaksial pada perangkat elektronik.',
    prinsip: 'Pin tengah menghubungkan jalur sinyal, sedangkan selubung logam menjadi ground. Perisai kabel menjaga sinyal tetap bersih.',
    karakteristik: [
      'Didesain untuk frekuensi tinggi hingga orde GHz.',
      'Pengunci bayonet mencegah konektor lepas sendiri.',
      'Menggunakan perisai ground untuk menahan derau.'
    ],
    tegangan: '0 - 300 V DC',
    rating: '0,5 A - 5 A',
    contoh: [
      'Kabel antena pada modem internet',
      'Kabel kamera keamanan',
      'Kabel pengukur osiloskop'
    ],
    catatan: 'Pastikan soket dan kabel sama-sama BNC, jangan dipaksa dicocokkan.',
    mirip: [
      'antena',
      'jumper',
      'header'
    ],
  },
  {
    id: 'terminal',
    nama: 'Terminal Blok',
    alias: [
      'Terminal',
      'Terminal strip'
    ],
    kategori: 'konektor',
    arus: 'dual',
    tingkat: 'dasar',
    bentuk: 'Blok plastik berderet sekrup dengan lubang kawat.',
    fungsi: 'Menghubungkan dan menyalurkan daya atau sinyal antar kawat.',
    prinsip: 'Sekrup menekan kawat ke plat logam di dalam blok. Jalur logam itu meneruskan arus dari satu terminal ke terminal lain.',
    karakteristik: [
      'Tiap terminalnya punya sekrup pengunci kawat.',
      'Bisa disambung bertingkat sesuai kebutuhan.',
      'Ruang kawatnya muat untuk kawat ukuran sedang.'
    ],
    tegangan: '0 - 500 V',
    rating: '1 A - 40 A',
    contoh: [
      'Sambungan kawat pada panel instalasi listrik',
      'Terminal power pada amplifier rumahan',
      'Penghubung kabel speaker'
    ],
    catatan: 'Kencangkan sekrup secukupnya, jangan berlebihan karena plat bisa retak.',
    mirip: [
      'banana',
      'header',
      'ground'
    ],
  },
  {
    id: 'antena',
    nama: 'Antena',
    alias: [
      'Antena',
      'Tiang antena'
    ],
    kategori: 'konektor',
    arus: 'dual',
    tingkat: 'lanjut',
    bentuk: 'Batang logam atau kawat yang dipasang tinggi.',
    fungsi: 'Menangkap dan memancarkan gelombang radio ke udara.',
    prinsip: 'Gelombang elektromagnetik menimbulkan arus listrik kecil pada kawat antena. Arus kecil inilah yang diperkuat menjadi sinyal radio.',
    karakteristik: [
      'Panjang dan bentuknya menentukan frekuensi yang diterima.',
      'Semakin panjang antenanya, semakin rendah frekuensinya.',
      'Dipasang sejauh mungkin dari bangunan bertembok beton.'
    ],
    tegangan: '0 - 300 V',
    rating: '0,1 A - 5 A',
    contoh: [
      'Antena pemancar radio amatir',
      'Antena WiFi di atap rumah',
      'Antena TV di atap rumah'
    ],
    catatan: 'Jangan pasang antena tanpa grounding yang baik, karena polarisasinya menjadi tidak beraturan.',
    mirip: [
      'bnc',
      'ground',
      'jumper'
    ],
  },
];

/* Ekspor untuk Node.js, sekaligus tetap jalan sebagai variabel global di browser */
if (typeof module !== "undefined" && module.exports) { module.exports = { KATEGORI, ARUS, TINGKAT, COMPONENTS }; }

/* sanity: */
if (typeof window !== "undefined") {
  console.assert(COMPONENTS.length === 94, "harus 94 komponen");
}
