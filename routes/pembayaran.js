var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const Model_Pembayaran = require('../model/Model_Pembayaran.js');
const Model_Users = require('../model/Model_Users.js')
const Model_Service = require('../model/Model_Service.js');
const Model_Menu = require('../model/Model_Menu.js');

router.get('/pemesanan', async (req, res, next) => {
    try {
        let rows = await Model_Pembayaran.getAll();
        res.render('pemesanan', { data: rows });
    } catch (error) {
        next(error);
    }
});


router.get('/checkout/:id', async function (req, res, next) {
    try {
        let id = req.params.id; // Ambil ID dari URL
        let level_users = req.session.level;
        let Data = await Model_Pembayaran.getId(id); // Panggil fungsi untuk mendapatkan data berdasarkan ID
        let data_s = await Model_Service.getAll();
        console.log("Data:", Data); // Tambahkan console.log untuk menampilkan Data
        if (Data.length > 0) { // Periksa apakah ada data dan level_users adalah "1"
            res.render('pembayaran/checkout', {
                data: Data,
                email: Data[0].email,
                id_users: Data[0].id_users,
                data_service: data_s
            });
        } else {
            req.flash('failure', 'Anda harus admin');
            res.redirect('/service');
            console.log(Data[0].level_users);
        }
    } catch (error) {
        req.flash('error', 'Terjadi kesalahan saat mengambil data');
        res.redirect('/menu/users');
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
            status_pembayaran: "order",
            status_pemesanan: "diterima"
        }
        console.log(Data);
        await Model_Pembayaran.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/menu/users');
    } catch {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/menu/users')
    }
})

router.post('/update/(:id)', async function (req, res, next) {
    try {
    let id = req.params.id;
    let rows = await Model_Menu.getId(id);

    let { id_service, metode_pembayaran } = req.body;
    let Data = {
        id_service,
        metode_pembayaran,
        status_pembayaran: "done",
    }
    await Model_Pembayaran.Update(id, Data);
    console.log(Data);
    req.flash('success', 'Berhasil mengubah data');
    res.redirect('/menu/users')
    } catch {
        req.flash('error', 'terjadi kesalahan pada fungsi');
        res.redirect('/menu/users');
    }
})

router.post('/update', async (req, res) => {
    const { id_pembayaran, jumlah } = req.body;

    try {
        const result = await Model_Pembayaran.Updatejumlah(id_pembayaran, { jumlah });
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating jumlah:', error);
        res.json({ success: false, message: 'Gagal memperbarui jumlah' });
    }
});

// routes/pembayaran.js
router.post('/deleteAll', async function (req, res, next) {
    try {
        await Model_Pembayaran.deleteAll();
        req.flash('success', 'Berhasil menghapus semua data pembayaran');
        res.redirect('/pembayaran/pemesanan');
    } catch (error) {
        req.flash('error', 'Terjadi kesalahan saat menghapus semua data pembayaran');
        res.redirect('/pembayaran/pemesanan');
    }
});

// router.post('/status/dimasak', async function(req,res){
//     await Model_Pembayaran.
// })

router.get('/delete/(:id)', async function (req, res) {
    let id = req.params.id;
    await Model_Pembayaran.Delete(id);
    req.flash('success', 'Berhasil Menghapus data!');
    res.redirect('/pembayaran/pemesanan');
})

router.get('/delete/order/(:id)', async function (req, res) {
    let id = req.params.id;
    await Model_Pembayaran.Delete(id);
    req.flash('success', 'Berhasil Menghapus data!');
    res.redirect('/menu/users');
})


module.exports = router;