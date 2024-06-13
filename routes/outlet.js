const express = require("express");
const router = express.Router();
const Model_outlet = require('../model/Model_outlet.js');
const Model_Users = require('../model/Model_Users.js');
const Model_Pembayaran = require('../model/Model_Pembayaran.js');

router.get('/', async (req, res, next) => {
    try {
        let rows = await Model_outlet.getAll();
        res.render('outlet/index', { data: rows });
    } catch (error) {
        next(error);
    }
});

router.get('/create', (req, res) => {
    res.render('outlet/create');
});

router.post("/store", async (req, res, next) => {
    try {
        const outletData = req.body;
        await Model_outlet.Store(outletData);
        req.flash("success", "Berhasil menyimpan data outlet");
        res.redirect("/outlet");
    } catch (error) {
        console.log(error);
        req.flash("error", "Gagal menyimpan data outlet");
        res.redirect("/outlet");
    }
});

router.get("/edit/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        let rows = await Model_outlet.getId(id);
        if (rows.length > 0) {
            res.render("outlet/edit", {
                id: id,
                nama_outlet: rows[0].nama_outlet,
                alamat_outlet: rows[0].alamat_outlet,
                jam_buka: rows[0].jam_buka,
                jam_tutup: rows[0].jam_tutup,
                status_outlet: rows[0].status_outlet,
            });
        } else {
            req.flash("error", "Outlet not found");
            res.redirect("/outlet");
        }
    } catch (error) {
        next(error);
    }
});

router.post("/update/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const outletData = req.body;
        await Model_outlet.Update(id, outletData);
        req.flash("success", "Berhasil mengupdate data outlet");
        res.redirect("/outlet");
    } catch (error) {
        req.flash("error", "Gagal mengupdate data outlet");
        res.redirect("/outlet");
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Model_outlet.Delete(id);
        req.flash('success', 'Berhasil menghapus data outlet');
        res.redirect('/outlet');
    } catch (error) {
        req.flash("error", "Gagal menghapus data outlet");
        res.redirect("/outlet");
    }
});

router.get('/users', async function (req, res, next) {
    try {
        let id = req.session.userId;
        let id_kategori = req.params.id_kategori;
        let id_users = req.session.userId;
        let data = await Model_outlet.getAll();
        let Data = []
        let email = []
        let bayar = []

        if (id) {
            Data = await Model_Users.getId(id);
            email = (Data[0] && Data[0].email) ? Data[0].email : 'Guest';
            bayar = await Model_Pembayaran.getId(id);
        }

        res.render('outlet/users/index', {
            data: data,
            id_users: req.session.userId, // Assuming you store user id in session
            email: email,
            data_pembayaran: bayar,
            data_users: Data
        });
    } catch (error) {
        console.error("Error:", error);
        req.flash('invalid', 'Terjadi kesalahan saat memuat data pengguna');
        res.redirect('/login');
    }

});

module.exports = router;
