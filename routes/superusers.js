var express = require('express');
const Model_Users = require('../model/Model_Users');
const Model_Menu = require('../model/Model_Menu');
const Model_Pembayaran = require('../model/Model_Pembayaran');
const Model_kategori = require('../model/Model_Kategori');
const Model_outlet = require('../model/Model_outlet');
const Model_contact = require('../model/Model_Contact');

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
    
    // Filter pembayaran for those with status_pembayaran = 'done'
    let pembayaranDone = pembayarans.filter(pembayaran => pembayaran.status_pembayaran === 'done');
    let pembayaranNo = pembayarans.filter(pembayaran => pembayaran.status_pembayaran === 'belum dibayar');

    console.log('pembayaran :', pembayaranDone);
    console.log('Menus:', Menus);

    if (Data.length > 0) {
      if (Data[0].level_users != 2) {
        res.redirect('/logout');
      } else {
        const models = [
          Model_kategori,
          Model_outlet,
          Model_contact
        ];
        const totalTables = models.length;

        res.render('users/super', {
          title: 'Users Home',
          email: Data[0].email,
          menuCount: Menus.length,
          pembayaranCount: pembayaranDone.length,
          belumCount: pembayaranNo.length,
          totalTables: totalTables
        });
      }
    } else {
      res.status(401).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json('Login access required');
  }
});

module.exports = router;