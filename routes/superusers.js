var express = require('express');
const Model_Users = require('../model/Model_Users');
const Model_Menu = require('../model/Model_Menu');
const Model_Pembayaran = require ('../model/Model_Pembayaran');
var router = express.Router();

/* GET users listing. */
// router.get('/', async function(req, res, next) {
//   try {
//     let id = req.session.userId;
//     let Data = await Model_Users.getId(id);
//     let Menus = await Model_Menu.getAll();
//     if (Data.length > 0) {
//       //Tambahkan Kondisi pengecekan level
//       if(Data[0].level_users !=2) {
//         res.render('/logout')
//       }else {
//         //diganti untuk alur nya
//         res.render('users/super', {
//           title : 'Users Home',
//           email: Data[0].email,
//           Menu : Menus.length
//         });
//       }
//       //Akhir kondisi
//     }else {
//       res.status(401).json({ error: 'user tidak ditemukan'});
//       console.log(Data);
//     }
//   }catch (error){
//     res.status(501).json('Butuh Akses Login');
//   }
// });

router.get('/', async function(req, res, next) {
  try {
    let id = req.session.userId;
    let Data = await Model_Users.getId(id);
    let Menus = await Model_Menu.getAll();
    let pembayarans = await Model_Pembayaran.getAll();
    console.log('pembayaran :', pembayarans)
    console.log('Menus:', Menus);

    if (Data.length > 0) {
      if (Data[0].level_users != 2) {
        res.redirect('/logout');
      } else {
        res.render('users/super', {
          title: 'Users Home',
          email: Data[0].email,
          menuCount: Menus.length,
          pembayaranCount: pembayarans.length
        });
      }
    } else {
      res.status(401).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(501).json('Login access required');
  }
});

module.exports = router;