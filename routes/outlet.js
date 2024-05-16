const express = require("express");
const router = express.Router();
const Model_outlet = require('../model/model_outlet.js');

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

module.exports = router;
