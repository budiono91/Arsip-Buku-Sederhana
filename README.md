# Arsip-Buku-Sederhana

📚 Arsip Buku Sederhana
adalah aplikasi berbasis web sederhana namun fungsional untuk membantu pengguna mengelola daftar buku mereka. Pengguna dapat mencatat buku yang sedang dibaca, buku yang sudah selesai, mencari koleksi, hingga melihat statistik bacaan secara real-time.

✨ Fitur Utama
Aplikasi ini dilengkapi dengan berbagai fitur modern:

Manajemen Data Lengkap: Tambah, Edit, dan Hapus data buku (Judul, Penulis, Tahun).

Dual-Rack System: Memisahkan buku ke dalam rak "Belum Selesai Dibaca" dan "Selesai Dibaca".

Statistik Real-time: Dashboard kecil yang menampilkan total koleksi dan progres bacaan.

Pencarian Cepat: Filter judul buku secara instan saat mengetik (Real-time Search).

Pengurutan (Sorting): Urutkan koleksi berdasarkan tahun terbit (terbaru atau terlama).

Penyimpanan Lokal (Web Storage): Semua data tersimpan aman di browser Anda, tidak akan hilang meski halaman di-refresh.

Desain Responsif: Tampilan yang nyaman diakses baik melalui desktop maupun smartphone.

🚀 Cara Menjalankan Proyek
Clone atau Download repositori ini ke komputer Anda.

Pastikan semua file (index.html, main.js) berada dalam satu folder yang sama.

Buka file index.html menggunakan browser favorit Anda (Chrome, Firefox, Edge, atau Safari).

Selesai! Anda bisa langsung mulai mengelola koleksi buku Anda.

🛠️ Teknologi yang Digunakan
Aplikasi ini dibangun menggunakan teknologi native web tanpa library eksternal untuk performa yang ringan:

HTML5: Untuk struktur konten dan aksesibilitas.

CSS3: Menggunakan CSS Variables, Flexbox, dan Grid untuk tampilan modern.

JavaScript (Vanilla): Untuk logika manipulasi DOM, pengolahan array, dan API Web Storage.

📂 Struktur File
Plaintext

.
├── index.html    # Struktur halaman dan styling (CSS)
└── main.js       # Logika aplikasi dan manajemen data
📝 Catatan Penggunaan
Status Baca: Saat menambah buku, centang "Selesai dibaca" untuk memasukkannya langsung ke rak buku yang sudah tamat.

Mode Edit: Klik tombol "Edit" untuk mengubah detail buku. Form akan otomatis terisi dan judul form berubah menjadi "Edit Buku".

Pencarian: Cukup ketik judul pada kolom cari, daftar buku akan otomatis menyaring sendiri tanpa perlu menekan tombol Enter.
