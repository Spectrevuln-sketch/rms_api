const mongoose = require('mongoose');
const { RoleData } = require('./RoleModels');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

var AdminSchema = new Schema({
  admin_name: {
    type: String
  },
  admin_email: {
    type: String
  },
  admin_role: {
    type: Schema.Types.ObjectId,
    ref: "roles"
  },
  admin_image: {
    type: String,
  },
  admin_password: {
    type: String
  },
  // Field Untuk Aplikasi HAIRS
  admin_nik: {
    type: String
  },
  admin_alamat: {
    type: String
  },
  admin_tlp: {
    type: String
  },
  jabatan: {
    type: String
  }


})

const AdminData = mongoose.model("admin_dbs", AdminSchema);


/*  Generate fist Admin Master */
let admin_email = 'master_admin@ridhologistics.com'
AdminData.findOne({ admin_email }).then(results => {

  if (!results || results === null || results === undefined||results.length>0) {
    RoleData.findOne({ role_name: 'master_admin' }).then(results => {

      console.log(results)
      let Password = '123456Ab'
      const hashPassword = bcrypt.hashSync(Password, 15);
      const AddMaster = new AdminData({
        admin_email: 'master_admin@ridhologistics.com',
        admin_name: 'Master',
        admin_role: results._id,
        admin_password: hashPassword
      })
      AddMaster.save().catch(err => {
        console.log(err)
      })

    }).catch(err => {
      console.log(err)
    })
    /*  End Generate fist Admin Master */
  }
})



module.exports = { AdminData }

