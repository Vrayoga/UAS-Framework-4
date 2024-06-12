var express = require('express');
var router = express.Router();

const Model_Contact = require('../model/Model_Contact.js');
const Model_Users = require('../model/Model_Users.js');

router.get('/', async function (req, res, next) {
    try {
        let rows = await Model_Contact.getAll();
        res.render('contact', {
            dataContact: rows
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        req.flash('error', 'Error fetching contacts');
        res.redirect('/');
    }
});

router.get('/create', function (req, res, next) {
    res.render('contact/create', {
        nama: '',
        handphone: '',
        email: '',
        kategori: '',
        deskripsi: ''
    });
});

router.post('/store', async function (req, res, next) {
    try {
        let { nama, handphone, email, kategori, deskripsi } = req.body;
        console.log('Form Data:', req.body); // Log the form data to check if it is being received correctly
        let Data = { nama, handphone, email, kategori, deskripsi };
        await Model_Contact.Store(Data);
        req.flash('success', 'Berhasil Menyimpan Data!');
        res.redirect("/contact");
    } catch (error) {
        console.error('Error storing contact:', error); // Log any errors to help with debugging
        req.flash('error', "Terjadi kesalahan pada Menyimpan Data!");
        res.redirect("/login");
    }
});



router.get('/delete/:id', async function (req, res, next) {
    let id = req.params.id;
    await Model_Contact.Delete(id);
    req.flash('success', 'Berhasil Menghapus data!');
    res.redirect('/contact');
});

router.get('/users', async function (req, res, next) {
    try {
        let id = req.session.userId;
        let Data = await Model_Users.getId(id);
        let rows = await Model_Contact.getAll();
        res.render('contact/users/index', {
            data: rows,
            email: Data[0].email
        });
    } catch (error) {
        console.error("Error:", error);
        req.flash('invalid', 'Terjadi kesalahan saat memuat data pengguna');
        res.redirect('/login');
    }
});


module.exports = router;
