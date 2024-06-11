var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const Model_Service = require('../model/Model_Service.js');
const Model_Users = require('../model/Model_Users.js')

router.get('/', async function (req, res, next) {
try {
    let id = req.session.userId;
    let Data = await Model_Users.getId(id);
    let rows = await Model_Service.getAll();
    if (Data.length > 0) {
    res.render('service/index', {
        data: rows,
    });
    }
} catch (err) {
    req.flash('invalid', 'Anda harus login');
    res.redirect('/login')
    console.log(err)
}
});

router.get('/create', async function (req, res, next) {
try {
    let level_users = req.session.level;
    let id = req.session.userId;
    let Data = await Model_Users.getId(id);
    if(Data[0].level_users == "2") {
    res.render('service/create', {
        nama_service: '',
    })
    }
    else if (Data[0].level_users == "1"){
        req.flash('failure', 'Anda bukan admin');
        res.redirect('/sevice')
    }
} catch (Data) {
    req.flash('invalid', 'Anda harus login');
    res.redirect('/login')
}
})

router.post('/store', async function (req, res, next) {
    try {
        let { nama_service } = req.body;
        let Data = {
            nama_service
        }
        await Model_Service.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/service');
    } catch {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/service')
    }
})

router.get('/edit/(:id)', async function (req, res, next) {
try{
    let id_users = req.session.userId;
    let id = req.params.id;
    let rows = await Model_Service.getId(id);
    let Data = await Model_Users.getId(id_users);
    if(Data[0].level_users == "2") {
    res.render('service/edit', {
        id: rows[0].id_service,
        nama_service: rows[0].nama_service,
    })
    }
    else if (Data[0].level_users == "1"){
        req.flash('failure', 'Anda bukan admin');
        res.redirect('/service')
    }
} catch(Data) {
    req.flash('invalid', 'Anda harus login');
    res.redirect('/login')
}
})



router.post('/update/(:id)', async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_service } = req.body;
        let Data = {
            nama_service: nama_service
        }
        await Model_Service.Update(id, Data);
        console.log(Data);
        req.flash('success', 'Berhasil mengubah data');
        res.redirect('/service')
    } catch {
        req.flash('error', 'terjadi kesalahan pada fungsi');
        res.render('/service');
    }
})

router.get('/delete/(:id)', async function (req, res) {
try{
    let id = req.params.id;
    let id_users = req.session.userId;
    let Data = await Model_Users.getId(id_users);
    if(Data[0].level_users == 2){
        await Model_Service.Delete(id);
        req.flash('success', 'Berhasil menghapus data');
        res.redirect('/service')
    }
    else if (Data[0].level_users == 1) {
        req.flash('failure', 'Anda bukan admin');
        res.redirect('/service')
    }
}catch{
    req.flash('invalid', 'Anda harus login');
    res.redirect('/login')
}
})


module.exports = router;