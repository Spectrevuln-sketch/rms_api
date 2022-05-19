const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MasterRole = [
  { role_name: "direktur" },
  { role_name: "general manager" },
  { role_name: "master_admin" },
  { role_name: "admin_darat" },
  { role_name: "admin_laut" },
  { role_name: "admin_udara" },
  { role_name: "admin_sp" }
]

var RoleSchema = new Schema({
  role_name: {
    type: String
  }
})

const RoleData = mongoose.model("roles", RoleSchema);

for (let i = 0; i < MasterRole.length; i++) {
  const DataRoles = MasterRole[i];
  RoleData.findOne({ role_name: DataRoles.role_name })
    .then(results => {
      if (results === null) {

        let CreateNewRole = new RoleData({
          role_name: DataRoles.role_name
        })
        CreateNewRole.save()
      }
    }).catch(err => {
      console.log(err)
    })
}



module.exports = { RoleData }

