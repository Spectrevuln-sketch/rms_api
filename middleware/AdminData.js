// const { AdminData } = require('../models/AdminModels');
// const jwtDecode = require('jwt-decode');





// /** TODO Current Admin DATA FUNCTION */
// exports.GetCurrentUser = async (token) => {
//   const { admin_email } = jwtDecode(token)
//   await AdminData.findOne({ admin_email })
//     .then(result => {
//       return result
//     }).catch(err => {
//       return console.log(err)
//     })

// }
// /** TODO END Current Admin DATA FUNCTION */