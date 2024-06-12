-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 12 Jun 2024 pada 04.59
-- Versi server: 8.0.30
-- Versi PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database_hokben_kw`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `contact`
--

CREATE TABLE `contact` (
  `id_contact` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `handphone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `kategori` enum('dine_in','take_away') NOT NULL,
  `deskripsi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int NOT NULL,
  `nama_kategori` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`) VALUES
(1, 'ramen'),
(2, 'nasi2');

-- --------------------------------------------------------

--
-- Struktur dari tabel `menu`
--

CREATE TABLE `menu` (
  `id_menu` int NOT NULL,
  `nama_menu` varchar(255) NOT NULL,
  `komposisi_menu` varchar(255) NOT NULL,
  `harga_menu` varchar(255) NOT NULL,
  `id_kategori` int NOT NULL,
  `gambar_menu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `menu`
--

INSERT INTO `menu` (`id_menu`, `nama_menu`, `komposisi_menu`, `harga_menu`, `id_kategori`, `gambar_menu`) VALUES
(2, 'Nasi Goreng2', 'nasi, ayam', '5000', 2, '1715801391091.jpeg'),
(3, 'tesing1', 'testing2', '150000', 1, '1717037340739.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `outlet`
--

CREATE TABLE `outlet` (
  `id_outlet` int NOT NULL,
  `nama_outlet` varchar(255) NOT NULL,
  `alamat_outlet` varchar(255) NOT NULL,
  `jam_buka` varchar(255) NOT NULL,
  `jam_tutup` varchar(100) NOT NULL,
  `status_outlet` enum('open','close') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `outlet`
--

INSERT INTO `outlet` (`id_outlet`, `nama_outlet`, `alamat_outlet`, `jam_buka`, `jam_tutup`, `status_outlet`) VALUES
(6, ' surabaya', ' jl meranggi', ' 17:00', ' 05.00', 'close'),
(7, 'HokBen Plaza Senayan', 'Plaza Senayan, Jl. Asia Afrika No.8, Gelora, Tanah Abang, Jakarta Pusat, DKI Jakarta 10270', '09.00', '20.00', 'open'),
(8, 'HokBen Grand Indonesia', 'Grand Indonesia West Mall, Lantai 3A Unit ED1 No. 12A, Jl. M.H. Thamrin No. 1, Kebon Melati, Tanah Abang, Jakarta Pusat, DKI Jakarta 10310', '15.00', '21.00', 'open'),
(9, ' HokBen Kelapa Gading Mall', ' Kelapa Gading Mall, Lantai 3 Unit 3A, Jl. Boulevard Raya Blok M, Kelapa Gading, Jakarta Utara, DKI Jakarta 14240', ' 15.00', ' 22.00', 'close');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id_pembayaran` int NOT NULL,
  `id_menu` int NOT NULL,
  `id_users` int NOT NULL,
  `status_pembayaran` enum('order','done') NOT NULL,
  `jumlah` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `service`
--

CREATE TABLE `service` (
  `id_service` int NOT NULL,
  `nama_service` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_users` int NOT NULL,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `no_telp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `level_users` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_users`, `nama`, `email`, `password`, `no_telp`, `alamat`, `level_users`) VALUES
(1, 'Shobri', 'shobri45@gmail.com', '$2b$10$VeLY6CG576HKJLVa4iUtAe5gaDnUpoNYhEbalRE7bUFvdWj2jpd56', '08995600397', 'Jl. kebebasan', '1'),
(2, 'admin', 'admin@gmail.com', '$2b$10$MQ5gxTbNmUnYDMDXgP2OxeX3m4l1W8XC2ipsK82ifDOY8Fpp8i5ty', '08995622143', 'Jl. sengsara', '2'),
(6, 'yoga', 'yogal228@gmail.com', '$2b$10$2vUJl.YFfPIz5qsQtIPEz.7gqPrYY5gOe2VOutp2.nRJLrZsBIyqS', '0982782672', 'sumenep', '1'),
(7, 'admin', 'admin23@gmail.com', '$2b$10$chx4/n1hZiCQ0o0pyOZnpunDeticK3ZauJ192BB9gwh3KwlLGydI.', '082389289284', 'usmeneo', '2');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id_contact`);

--
-- Indeks untuk tabel `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indeks untuk tabel `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`),
  ADD KEY `kategoriMenu` (`id_kategori`);

--
-- Indeks untuk tabel `outlet`
--
ALTER TABLE `outlet`
  ADD PRIMARY KEY (`id_outlet`);

--
-- Indeks untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id_pembayaran`),
  ADD KEY `menuPembayaran` (`id_menu`),
  ADD KEY `userPembayaran` (`id_users`);

--
-- Indeks untuk tabel `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id_service`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `contact`
--
ALTER TABLE `contact`
  MODIFY `id_contact` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `outlet`
--
ALTER TABLE `outlet`
  MODIFY `id_outlet` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id_pembayaran` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `service`
--
ALTER TABLE `service`
  MODIFY `id_service` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
