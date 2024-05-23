
// JavaScript untuk mengganti gambar tengah secara otomatis dengan efek transisi
const centerPhoto = document.getElementById('center-photo');
const images = [
    'images/sponsor1.png',
    'images/sponsor2.png',
    'images/sponsor5.png',
    'images/sponsor6.png',
    'images/sponsor7.png'
];

let currentIndex = 0;

function changeImage() {
    centerPhoto.style.opacity = 0; // Mengatur opacity menjadi 0

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        centerPhoto.src = images[currentIndex];
        centerPhoto.style.opacity = 1; // Mengatur opacity menjadi 1 setelah gambar diganti
    }, 500); // Mengatur waktu penundaan sebelum mengubah gambar (dalam milidetik)
}

setInterval(changeImage, 3000); // Ganti gambar setiap 3 detik
