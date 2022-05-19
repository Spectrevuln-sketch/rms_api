var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode')
/* -------------------------- TODO REQUIRE A MODELS ------------------------- */
const { AdminData } = require('../models/AdminModels');
const { CustomerData } = require('../models/CustomerModels');
const { ArmadaModels } = require('../models/ArmadaModels');
const { SPModels } = require('../models/SPDataModels');
const { RoleData } = require('../models/RoleModels')
const { LogData } = require('../models/LogDataModels')
/* -------------------------------------------------------------------------- */
/* ----------------------- TODO PACKAGE AND CONFIGURE ----------------------- */
const { validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var fs = require('fs');


/* -------------------------------------------------------------------------- */

/* ----------------------------- TODO MIDDLEWARE ---------------------------- */
// var { GetCurrentUser } = require('../middleware/AdminData');
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                          TODO CONTROLLERS FUNCTION                         */
/* -------------------------------------------------------------------------- */

/* ---------------------------- AUTH  CONTROLLERS --------------------------- */

/** CREATE FIRST ADMIN */
exports.FistAdminRegister = async (req, res) => {
  const { admin_email, admin_name, admin_password } = req.body;
  const hashPassword = bcrypt.hashSync(admin_password, 20);
  let FirstAdmin = new AdminData({
    admin_email: admin_email,
    admin_name: admin_name,
    admin_password: hashPassword
  });
  const CreateFistAdmin = await FirstAdmin.save()
  if (CreateFistAdmin) {
    res.status(200).send({ message: `Berhasil Menambah Admin` });
  } else {
    res.status(403).send({ message: `Terjadi Kesalahan Kode` });
  }
}
/** END CREATE FIRST ADMIN */


/** STUB CREATE MASTER ADMIN */
exports.RegisterNewAdmin = async (req, res) => {
  const { admin_email, admin_name, admin_password, current_password, admin_role } = req.body;
  const hashPassword = bcrypt.hashSync(admin_password, 15);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array();
    res.status(404).send({ errMsg: alert });
  } else {
    if (current_password !== admin_password) {
      res.status(403).send({ message: `Password Tidak Sama Dengan Currren Password !` })
    } else {
      const LogDoc = new LogData({
        admin_log: req.body
      })
      await LogDoc.save().catch(err => console.log(err))

      let Admin = new AdminData({
        admin_name: admin_name,
        admin_email: admin_email,
        admin_role: admin_role,
        admin_password: hashPassword
      });

      const RegisterNewAdmin = await Admin.save()
      if (RegisterNewAdmin) {
        res.status(200).send({ message: `Anda Telah Berhasil Menambahkan Data !` });
      } else {
        res.status(403).send({ message: `Terjadi Error` });
      }
    }
  }
}
/** STUB END CREATE MASTER ADMIN */

/** LOGIN ADMIN */
exports.LoginAdmin = async (req, res) => {
  const { admin_email, admin_password } = req.body;
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array();
    res.status(404).send({ errMsg: alert });
  } else {
    const CheckAdmin = await AdminData.findOne({ admin_email }).populate('admin_role')
    if (CheckAdmin) {
      await bcrypt.compare(admin_password, CheckAdmin.admin_password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const AuthData = {
            admin_email: CheckAdmin.admin_email,
            admin_name: CheckAdmin.admin_name
          }
          var PrivateKey = fs.readFileSync('private.key');
          const GenerateToken = jwt.sign(AuthData, PrivateKey, { algorithm: 'HS256' })
          res.status(200).cookie("admin_token", GenerateToken, {
            httpOnly: true
          }).send({ message: `Selamat Bekerja ${CheckAdmin.admin_name} ` });
        } else {
          res.status(405).send({ message: `Password Salah !` });
        }
      })
    }
  }
}

/** END LOGIN ADMIN */


/** TODO ARE THE ADMIN LOGIN ? */
exports.isLogin = async (req, res) => {
  try {
    const token = req.cookies.admin_token
    console.log(token)
    if (token === undefined || !token) {
      res.json(false)
    } else {
      var PrivateKey = fs.readFileSync('private.key');
      jwt.verify(token, PrivateKey)
      res.send(true);
    }
  } catch (err) {
    if (err) {
      console.log(err)
      res.json(false)
    }
  }
}

/** END ARE THE ADMIN LOGIN ? */

/* -------------------------------------------------------------------------- */

/** Logout Akun */
exports.LogoutAccount = async (req, res) => {
  try {
    res.cookie("admin_token", "", {
      httpOnly: true,
      expires: new Date(0)
    }).send({ message: 'Success Logout' });
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: `Error With ${err}` })
  }
}
/** End Logout Akun */

/** Check Role */
exports.CheckRole = async (req, res) => {
  const token = req.cookies.admin_token;
  if (token !== undefined || token) {
    const payload = jwtDecode(token)
    console.log(payload)
    const CheckAdmin = await AdminData.findOne({ admin_email: payload.admin_email }).populate('admin_role')
    console.log(CheckAdmin)
    // const Role = await RoleData.findOne({ _id: CheckAdmin.admin_role })
    try {
      if (CheckAdmin.admin_role.role_name === 'master_admin') {
        return res.json(1)
      }
      if (CheckAdmin.admin_role.role_name === 'admin_darat') {
        return res.json(2)
      }
      if (CheckAdmin.admin_role.role_name === 'admin_laut') {
        return res.json(3)
      }
      if (CheckAdmin.admin_role.role_name === 'admin_udara') {
        return res.json(4)
      }
      if (CheckAdmin.admin_role.role_name === 'admin_sp') {
        return res.json(5)
      }
      if (CheckAdmin.admin_role.role_name === 'direktur') {
        return res.json(6)
      }
      if (CheckAdmin.admin_role.role_name === 'general manager') {
        return res.json(7)
      }
    } catch (err) {
      res.json(false)
    }

  } else {
    res.json(false)
  }
}
/** End Check Role */



/* -------------------------------------------------------------------------- */
/*                        STUB END CONTROLLERS FUNCTION                       */
/* -------------------------------------------------------------------------- */