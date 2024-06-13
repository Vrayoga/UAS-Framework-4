var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const Model_Pemesanan = require('../model/model_pemesanan.js');
const Model_Users = require('../model/Model_Users.js');
const Model_Service = require('../model/Model_Service.js');
const Model_Menu = require('../model/Model_Menu.js');

router.get('/checkout', async function (req, res, next) {
    try {
        let dataPemesanan = await Model_Pemesanan.getCheckedOut(); // Panggil fungsi untuk mendapatkan data pemesanan yang sudah di-checkout
        console.log("Data Pemesanan:", dataPemesanan); // Tambahkan console.log untuk menampilkan Data Pemesanan
        if (dataPemesanan.length > 0) {
            res.render('pemesanan/checkout', {
                data: dataPemesanan,
            });
        } else {
            req.flash('failure', 'Tidak ada pemesanan yang sudah di-checkout');
            res.redirect('/pemesanan');
        }
    } catch (error) {
        req.flash('error', 'Terjadi kesalahan saat mengambil data pemesanan');
        res.redirect('/pemesanan');
        console.error(error); // Tampilkan error di konsol
    }
});

router.post('/store', async function (req, res, next) {
    try {
        let { id_users, id_menu, jumlah } = req.body;
        let Data = {
            id_users, 
            id_menu,
            jumlah,
            status_pemesanan: "checkout" // Atur status pemesanan sebagai "checkout"
        };
        console.log(Data);
        await Model_Pemesanan.store(Data);
        req.flash('success', 'Berhasil menyimpan data pemesanan');
        res.redirect('/pemesanan');
    } catch {
        req.flash('error', 'Terjadi kesalahan saat menyimpan data pemesanan');
        res.redirect('/pemesanan');
    }
});

router.post('/update/(:id)', async function (req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_Pemesanan.getById(id);

        let {
            id_service
        } = req.body;
        let Data = {
            id_service,
            status_pemesanan: "done",
        };
        await Model_Pemesanan.update(id, Data);
        console.log(Data);
        req.flash('success', 'Berhasil mengubah data pemesanan');
        res.redirect('/pemesanan');
    } catch {
        req.flash('error', 'Terjadi kesalahan saat mengubah data pemesanan');
        res.redirect('/pemesanan');
    }
});

router.get('/delete/(:id)', async function (req, res) {
    try {
        let id = req.params.id;
        await Model_Pemesanan.delete(id);
        req.flash('success', 'Berhasil menghapus data pemesanan');
        res.redirect('/pemesanan');
    } catch {
        req.flash('error', 'Terjadi kesalahan saat menghapus data pemesanan');
        res.redirect('/pemesanan');
    }
});

module.exports = router;
