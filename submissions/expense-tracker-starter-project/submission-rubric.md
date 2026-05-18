# Tujuan Submission
Submission (Proyek Akhir) ini bertujuan untuk:
1. Menguji kemampuan Anda dalam mengubah dan mengelola susunan Antarmuka Pengguna (HTML) menggunakan JavaScript, yang biasa disebut **Manipulasi DOM**.
2. Menguji kemampuan Anda dalam menyimpan data aplikasi secara lokal di browser menggunakan **Web Storage**, agar data tetap ada saat halaman dimuat ulang.

# Topik Submission
Anda diminta menyusun aplikasi pelacak keuangan pribadi bernama **Personal Finance & Expense Tracker App**. Aplikasi ini berfungsi untuk mencatat uang masuk maupun keluar, melihat sisa saldo, serta mencari riwayat transaksi.

---
## Submission: Expense Tracker App

Selamat!
Anda telah mencapai tahap akhir dari kelas *Front-End Web Pemula*. Sebagai ujian praktik, terapkan semua pemahaman Anda untuk melengkapi kode aplikasi **Expense Tracker**.

Kami sudah menyediakan *Starter Project*, yaitu tampilan web yang sudah jadi. Tugas Anda adalah menulis logika JavaScript-nya di berkas `main.js`, mengikuti panduan dan rubrik penilaian di bawah ini.

---
### Glosarium Istilah Teknis
Berikut penjelasan singkat beberapa istilah yang akan Anda temui selama pengerjaan:

* **DOM (Document Object Model):** Cara JavaScript "membaca" dan mengubah struktur halaman HTML. Dengan DOM, JavaScript bisa menambah, mengubah, atau menghapus elemen yang tampil di layar.
* **Event (Kejadian):** Sesuatu yang terjadi saat pengguna berinteraksi dengan halaman, misalnya mengklik tombol (`click`) atau mengirim formulir (`submit`).
* **Custom Event:** Sinyal buatan yang Anda buat sendiri di JavaScript untuk memberi tahu bagian kode lain bahwa ada sesuatu yang terjadi. Sinyal ini dikirim menggunakan perintah `dispatchEvent()`.
* **Atribut `data-testid`:** Label pengenal pada elemen HTML (contoh: `<div data-testid="transactionItem">`). Atribut ini memudahkan proses pengecekan struktur aplikasi Anda saat penilaian.
* **`JSON.stringify` & `JSON.parse`:** `localStorage` hanya bisa menyimpan teks biasa. Gunakan `JSON.stringify` untuk mengubah data (Array/Objek) menjadi teks sebelum disimpan, dan `JSON.parse` untuk mengembalikannya menjadi data asli saat dibaca kembali.

---

### Panduan Teknis
Perhatikan beberapa panduan berikut agar aplikasi Anda dapat berjalan dan dinilai dengan baik:

1. **Gunakan struktur data transaksi yang konsisten.** Setiap transaksi yang Anda simpan harus berupa objek dengan properti berikut:
```javascript
{
  id: string | number, // Tips: gunakan +new Date() untuk membuat ID unik secara otomatis
  title: string,
  amount: number, // Tips: simpan sebagai angka (Number), bukan teks. Jangan simpan "25000", tapi 25000.
  date: string,
  type: string // Tips: gunakan 'income' untuk pemasukan atau 'expense' untuk pengeluaran
}
```

2. **Sertakan atribut `data-testid` pada setiap kartu transaksi yang Anda buat.** Saat membuat elemen HTML via JavaScript, ikuti struktur templat berikut. Anda boleh menambahkan `class` atau `id` untuk keperluan styling, namun nilai atribut `data-testid` tidak boleh diubah:
```html
<div data-testid="transactionItem">
  <h3 data-testid="transactionItemTitle">Judul Transaksi 1</h3>
  <p data-testid="transactionItemAmount">Nominal: Rp10000</p>
  <p data-testid="transactionItemDate">Tanggal: 2030-12-01</p>
  <p data-testid="transactionItemType">Tipe: Pemasukan</p>
  <div>
    <button data-testid="transactionItemEditTypeButton">Ubah Tipe</button>
    <button data-testid="transactionItemDeleteButton">Hapus</button>
  </div>
</div>
```

3. **Gunakan `document.createElement()` saat menambahkan kartu transaksi ke halaman.** Hindari pola `element.innerHTML += "..."` karena cara ini akan menghapus semua *event listener* (seperti tombol Hapus) yang sudah terpasang pada kartu transaksi sebelumnya.

4. **Tulis JavaScript tanpa library eksternal.** Submission ini menilai kemampuan JavaScript murni Anda, sehingga penggunaan library seperti jQuery, React, atau Vue tidak diperbolehkan.

---

### Tips Portofolio: Jadikan Tampilan Aplikasimu Unik!

Submission ini bukan sekadar ujian. Ini juga bagian dari **portofolio** yang bisa Anda bagikan ke LinkedIn, Instagram, atau platform lainnya. Kami sangat mendorong Anda untuk menyesuaikan tampilan (CSS) agar berbeda dari teman-teman sekelas.

#### Yang Bebas Anda Ubah
- Warna, tipografi (font), ukuran teks, border, shadow, dan spacing
- Background, gradient, atau pola dekoratif
- Layout kartu dan posisi elemen visual
- Animasi hover, transisi, dan efek interaktif pada CSS
- Teks label tombol dan placeholder form (misal: "Simpan" → "Catat Sekarang")
- Menambahkan elemen HTML baru (ikon, badge, ilustrasi) selama tidak menghapus elemen yang sudah ada

#### Yang Jangan Diubah (agar aplikasi tetap bisa dinilai)
- **Nilai atribut `data-testid`**: jangan diubah, dihapus, atau dipindah. Atribut ini digunakan sistem penilaian untuk memverifikasi struktur aplikasi Anda.
- **Nilai atribut `id`** pada elemen yang direferensikan JavaScript (seperti `incomeList`, `expenseList`, `transactionForm`, dll.)
- **Elemen HTML yang sudah ada di starter project**: Anda boleh menambahkan elemen baru di sekitarnya, tapi jangan menghapusnya.

#### Referensi Inspirasi Desain
Berikut beberapa sumber terpercaya untuk menemukan ide tampilan yang modern dan menarik:

| Sumber | Fokus | Tautan |
| --- | --- | --- |
| **Dribbble** | Showcase desain UI/UX dari desainer dunia | [dribbble.com](https://dribbble.com) |
| **Behance** | Portofolio dan studi kasus desain produk | [behance.net](https://www.behance.net) |
| **Figma Community** | Template dan Design System siap pakai | [figma.com/community](https://www.figma.com/community) |
| **Material Design 3** | Panduan desain sistem dari Google, lengkap dengan palet warna dan komponen | [m3.material.io](https://m3.material.io) |
| **Ant Design** | Sistem desain enterprise yang menampilkan komponen finansial | [ant.design](https://ant.design) |
| **Mobbin** | Koleksi screenshot desain aplikasi nyata (termasuk aplikasi keuangan) | [mobbin.com](https://mobbin.com) |
| **Awwwards** | Kumpulan website terbaik dunia yang memenangkan penghargaan desain | [awwwards.com](https://www.awwwards.com) |

> **Saran:** Coba cari kata kunci *"finance app UI"* atau *"expense tracker design"* di Dribbble atau Mobbin untuk menemukan inspirasi yang langsung relevan dengan topik submission ini.

---
### Kriteria Penilaian
Setiap kriteria dinilai dari `0` hingga `4 poin`. Agar dinyatakan **Lulus**, setiap kriteria harus mencapai minimal **2 poin (level Basic)**.

---

### Kriteria 1: Memanipulasi DOM untuk Form dan Daftar Transaksi
Kriteria ini menilai kemampuan Anda menampilkan data transaksi di layar dan memastikan data yang masuk dari pengguna sudah valid.

- **Reject (0 pts):**
  - Aplikasi tidak bisa dibuka atau langsung error saat dijalankan.
  - Atribut `data-testid` pada berkas HTML bawaan dihapus atau diubah nilainya.
  - Teks sapaan pada elemen `.tracker-header__greeting` masih menampilkan teks bawaan (`Siswa Front-End`) dan belum diganti dengan nama serta username Dicoding Anda. Contoh format yang diharapkan: **Budi (bdi002)**.

- **Basic (2 pts):**
  - Aplikasi berhasil menampilkan transaksi yang dimasukkan pengguna. Transaksi pemasukan masuk ke daftar `incomeList`, dan transaksi pengeluaran masuk ke daftar `expenseList`.

- **Skilled (3 pts):**
  - Memenuhi semua pencapaian di level *Basic*.
  - Ada validasi input form: muncul peringatan (`alert()`) jika judul transaksi kosong **atau** nominal uang kurang dari 1 Rupiah. Data tidak tersimpan jika salah satu syarat tidak terpenuhi.

- **Advanced (4 pts):**
  - Memenuhi semua pencapaian di level *Skilled*.
  - Panel Dasbor menampilkan ringkasan keuangan (total saldo, total pemasukan, total pengeluaran) yang otomatis diperbarui setiap kali data transaksi berubah.

---

### Kriteria 2: Mengelola Penyimpanan Data (Web Storage API)
Kriteria ini menilai kemampuan Anda menyimpan data transaksi di browser sehingga tidak hilang saat halaman di-refresh.

- **Reject (0 pts):**
  - Semua data transaksi hilang setiap kali halaman di-refresh, menandakan `localStorage` belum digunakan.

- **Basic (2 pts):**
  - Data transaksi disimpan ke `localStorage` menggunakan `JSON.stringify()`, dan dimuat kembali saat halaman dibuka menggunakan `JSON.parse()`.
  - Tombol "Hapus" berfungsi: transaksi yang dihapus langsung hilang dari layar dan dari `localStorage`.

- **Skilled (3 pts):**
  - Memenuhi semua pencapaian di level *Basic*.
  - Tombol "Edit" berfungsi: saat ditekan, formulir (`#transactionForm`) secara otomatis terisi dengan data transaksi yang dipilih. Pengguna dapat mengubah data lalu menyimpan perubahan. Formulir kembali ke mode "Tambah" setelah pembaruan selesai.

- **Advanced (4 pts):**
  - Memenuhi semua pencapaian di level *Skilled*.
  - Pembaruan tampilan dilakukan melalui *Custom Event*. Setiap kali data berubah (tambah/hapus/edit), sebuah sinyal dikirim lewat `dispatchEvent()`, dan satu *listener* merespons sinyal itu untuk memperbarui seluruh tampilan.

---

### Kriteria 3: Fitur Interaktif (Pindah Kategori dan Pencarian)
Kriteria ini menilai kemampuan Anda membangun fitur yang memudahkan pengguna mengelola dan mencari transaksi.

- **Reject (0 pts):**
  - Tombol "Ubah Tipe" tidak berfungsi, atau halaman error saat pengguna menggunakan fitur pencarian.

- **Basic (2 pts):**
  - Tombol "Ubah Tipe" berfungsi: transaksi bertipe *Pemasukan* berpindah ke daftar *Pengeluaran* saat tombol ditekan, dan berlaku sebaliknya.

- **Skilled (3 pts):**
  - Memenuhi semua pencapaian di level *Basic*.
  - Kolom pencarian berfungsi: daftar transaksi langsung menyesuaikan saat pengguna mengetik kata kunci, hanya menampilkan transaksi yang judulnya cocok.

- **Advanced (4 pts):**
  - Memenuhi semua pencapaian di level *Skilled*.
  - Saat kolom pencarian dikosongkan, seluruh daftar transaksi muncul kembali secara otomatis.

---

## Cara Menghitung Nilai Akhir
Nilai akhir dihitung dari rata-rata poin semua kriteria:

**Nilai Akhir = Total Poin / Jumlah Kriteria**

Contoh: jika Anda mendapat poin `2 + 3 + 3 = 8` dari 3 kriteria, maka Nilai Akhir = `8 / 3 ≈ 2.67` → **⭐⭐⭐ Bintang 3**.

| Nilai Akhir | Bintang | Level | Keterangan |
| --- | --- | --- | --- |
| `< 1` | 🔴 Ditolak | - | Aplikasi belum memenuhi standar minimum. Perlu diperbaiki sebelum dikumpulkan. |
| `1 - < 2` | ⭐⭐ Bintang 2 | Below Basic | Ada usaha, namun beberapa fungsi dasar belum bekerja dengan benar. |
| `2 - < 3` | ⭐⭐⭐ Bintang 3 | Basic | Semua fungsi dasar berjalan dengan baik. Selamat, Anda lulus! |
| `3 - < 4` | ⭐⭐⭐⭐ Bintang 4 | Skilled | Fungsi dasar plus validasi form dan pencarian sudah berjalan dengan baik. |
| `4` | ⭐⭐⭐⭐⭐ Bintang 5 | Advanced | Semua fitur berjalan dengan sangat baik, termasuk Custom Event dan saldo dinamis. |
