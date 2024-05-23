var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

var Model_Users = require('../model/Model_Users')

/* GET home page. */
router.get('/', async function(req, res, next) {
  let rows = await Model_Users.getAll();
  res.render('auth/dashboard', {
    title: 'Dashboard', // Menggunakan email pengguna
    data : rows // Menggunakan data dari Model_Konser
  });
});

router.get('/register', function(req, res, next) {
  res.render('auth/register');
});

router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.post('/saveusers', async(req, res) => {
  let { Nama, Email, Password, No_telp, Alamat } = req.body;
  let enkripsi = await bcrypt.hash(Password, 10);
  let Data = {
    Nama, 
    Email,
    Password : enkripsi,
    No_telp,
    Alamat,
    level_users : 1
  };
  await Model_Users.Store(Data);
  req.flash('success', 'Berhasil Login');
  res.redirect('/login');
});

router.post('/log', async (req,res) => {
  let {email, password } = req.body;
  try {
    let Data = await Model_Users.Login(email);
    if(Data.length > 0) {
      req.session.userId = Data[0].id_users;
      let enkripsi = Data[0].password;
      let cek = await bcrypt.compare(password, enkripsi);
      if(cek) {
        //tambahkan kondisi pengecekan level pada user yang login
        if(Data[0].level_users == 1){
          req.flash('success','Berhasil login');
          res.redirect('/users');
        }else if(Data[0].level_users == 2){
          req.flash('success', 'Berhasil login');
          res.redirect('/superusers');
        }else{
          res.redirect('/login');
        }
      } else {
        console.log('Email atau password salah');
        req.flash('failure', 'Email atau password salah');
        res.redirect('/login');
      }
    } else {
      console.log('Akun tidak ditemukan');
      console.log(req.body, email);
      req.flash('failure', 'Akun tidak ditemukan');
      res.redirect('/login');
    }
  } catch (err) {
    res.redirect('/login');
    req.flash('failure', 'Error pada fungsi');
    console.log('error kodenya');
  }
})

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.error(err);
    }else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
