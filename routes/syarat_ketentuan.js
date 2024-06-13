var express = require('express');
var router = express.Router();

const Model_Users = require('../model/Model_Users.js');

router.get('/', async function (req, res, next) {
    try {
        let id = req.session.userId;
        let Data = await Model_Users.getId(id);
        res.render('syarat_ketentuan', {
            email: Data[0].email
        });
    } catch (error) {
        console.error("Error:", error);
        req.flash('invalid', 'Terjadi kesalahan saat memuat data pengguna');
        res.redirect('/login');
    }
});

module.exports = router;
