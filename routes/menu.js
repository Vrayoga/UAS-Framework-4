var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const Model_Menu = require('../model/Model_Menu.js');
const Model_Users = require('../model/Model_Users.js')
const Model_Kategori = require('../model/Model_Kategori.js');
const Model_Pembayaran = require('../model/Model_Pembayaran.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/menu')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.get('/', async function (req, res, next) {
    try {
        let level_users = req.session.level;
        let id = req.session.userId;
        let Data = await Model_Users.getId(id);
        let rows = await Model_Menu.getAll();
        if (Data[0].level_users == "2") {
            res.render('menu/index', {
                data: rows,
            });
        } else if (Data[0].level_users == "1") {
            req.flash('failure', 'Anda bukan admin');
            console.log('anda harus login karena salah');
            res.redirect('/menu')
        }
    } catch {
        req.flash('invalid', 'Anda harus login');
        res.redirect('/login')
    }
});

router.get('/create', async function (req, res, next) {
    try {
        // let level_users = req.session.level;
        let id = req.session.userId;
        let Data = await Model_Users.getId(id);
        let rows = await Model_Kategori.getAll();
        if (Data[0].level_users == "2") {
            res.render('menu/create', {
                data: rows,
                id_user: req.session.userId,
            })
        } else if (Data[0].level_users == "1") {
            req.flash('failure', 'Anda bukan admin');
            res.redirect('/menu')
        }
    } catch {
        req.flash('invalid', 'Anda harus login');
        res.redirect('/login')
    }
})

router.post('/store', upload.single("gambar_menu"), async function (req, res, next) {
    try {
        let {
            nama_menu,
            komposisi_menu,
            harga_menu,
            id_kategori
        } = req.body;
        let Data = {
            nama_menu,
            komposisi_menu,
            harga_menu,
            id_kategori,
            gambar_menu: req.file.filename
        }
        await Model_Menu.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/menu');
    } catch {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/menu')
    }
})

router.get('/edit/(:id)', async function (req, res, next) {
    try {
        // let level_users = req.session.level;
        let id = req.params.id;
        let id_users = req.session.userId;
        let rows = await Model_Menu.getId(id);
        let Data = await Model_Users.getId(id_users);
        let rows_kategori = await Model_Kategori.getAll();
        if (Data[0].level_users == "2") {
            res.render('menu/edit', {
                data: rows[0],
                data_kategori: rows_kategori,
            })
        } else if (Data[0].level_users == "1") {
            req.flash('failure', 'Anda bukan admin');
            res.redirect('/barang')
        }
    } catch {
        req.flash('invalid', 'Anda harus login');
        res.redirect('/login')
    }
})



router.post('/update/(:id)', upload.single("gambar_menu"), async function (req, res, next) {
    // try {
    let id = req.params.id;
    let filebaru = req.file ? req.file.filename : null;
    let rows = await Model_Menu.getId(id);
    const namaFileLama = rows[0].gambar_menu;

    if (filebaru && namaFileLama) {
        const pathFileLama = path.join(__dirname, '../public/images/menu', namaFileLama);
        fs.unlinkSync(pathFileLama);
    }

    let {
        nama_menu,
        komposisi_menu,
        harga_menu,
        id_kategori
    } = req.body;
    let gambar_menu = filebaru || namaFileLama
    let Data = {
        nama_menu,
        komposisi_menu,
        harga_menu,
        id_kategori,
        gambar_menu
    }
    await Model_Menu.Update(id, Data);
    console.log(Data);
    req.flash('success', 'Berhasil mengubah data');
    res.redirect('/menu')
    // } catch {
    //     req.flash('error', 'terjadi kesalahan pada fungsi');
    //     res.redirect('/menu');
    // }
})

router.get('/delete/(:id)', async function (req, res) {
    try {
        let id = req.params.id;
        let id_users = req.session.userId;
        let Data = await Model_Users.getId(id_users);
        let rows = await Model_Menu.getId(id);
        if (Data[0].level_users == 2) {
            const namaFileLama = rows[0].gambar_menu;
            if (namaFileLama) {
                const pathFilelama = path.join(__dirname, '../public/images/menu', namaFileLama);
                fs.unlinkSync(pathFilelama);
            }
            await Model_Menu.Delete(id);
            req.flash('success', 'Berhasil menghapus data');
            res.redirect('/menu')

        } else if (Data[0].level_users == 1) {
            req.flash('failure', 'Anda bukan admin');
            res.redirect('/menu')
        }
    } catch {
        req.flash('invalid', 'Anda harus login');
        res.redirect('/login')
    }
})

router.get('/users', async function (req, res, next) {
    try {
        let level_users = req.session.level;
        let id = req.session.userId;
        let Data = await Model_Users.getId(id);
        let rows = await Model_Menu.getAll();
        let bayar = await Model_Pembayaran.getId(id);
        let kategori = await Model_Kategori.getAll();
        res.render('menu/users/index', {
            data: rows,
            email: Data[0].email,
            id_users: req.session.userId,
            data_pembayaran: bayar,
            data_kategori: kategori
        })
        console.log(bayar);
    } catch {
        req.flash('invalid', 'Anda harus login');
        // res.redirect('/login')
    }
});

router.get('/users/(:id)', async function (req, res, next) {
    try {
        // let level_users = req.session.level;
        let id = req.params.id;
        let id_users = req.session.userId;
        let rows = await Model_Menu.getbyId(id);
        let Data = await Model_Users.getId(id_users);
        if (Data[0].level_users == "1") {
            res.render('menu/users/detail', {
                data: rows[0],
                email: Data[0].email,
                id_users: req.session.userId
            })
        }
    } catch {
        // req.flash('invalid', 'Anda harus login');
        // res.redirect('/login')
    }
})

router.get('/users/kategori/:id_kategori', async function(req, res, next) {
    try {
        let id = req.session.userId;
        let id_kategori = req.params.id_kategori;
        let id_users = req.session.userId;
        let data = await Model_Menu.getId(id_kategori);
        let data_kategori = await Model_Kategori.getAll(); // Assuming you have a method to get all categories
        let Data = await Model_Users.getId(id_users);
        let bayar = await Model_Pembayaran.getId(id);
        res.render('menu/users', {
            data: data,
            data_kategori: data_kategori,
            id_users: req.session.userId, // Assuming you store user id in session
            email: Data[0].email,
            data_pembayaran: bayar,
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;