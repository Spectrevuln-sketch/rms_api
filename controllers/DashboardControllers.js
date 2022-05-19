/* -------------------------- TODO REQUIRE A MODELS ------------------------- */
const { AdminData } = require('../models/AdminModels');
const { CustomerData } = require('../models/CustomerModels');
const { ArmadaModels } = require('../models/ArmadaModels');
const { SPModels } = require('../models/SPDataModels');
const { SpkModels } = require('../models/SpkModels')
const { RoleData } = require('../models/RoleModels')

/* -------------------------------------------------------------------------- */
/* ----------------------- TODO PACKAGE AND CONFIGURE ----------------------- */
const { validationResult } = require('express-validator');
// const jwtDecode = require('jwt-decode');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

/* -------------------------------------------------------------------------- */

/* ----------------------------- TODO MIDDLEWARE ---------------------------- */
var { GetCurrentUser } = require('../middleware/AdminData');
const { LautModels } = require('../models/LautModels');
const { DaratModels } = require('../models/DaratModels');
const { UdaraModels } = require('../models/UdaraModels');
/* -------------------------------------------------------------------------- */


/* ------------------------ TODO DASHBOARD PAGE DATA Laut ------------------------ */
// exports.CreateLautData = async (req, res) => {
//   const token = req.cookies.admin_token
//   if (token === undefined || !token) {
//     res.status(403).send({ message: `You Do Not Allow` });
//   } else {
//     const { no_sp, nama_pelayaran, ongkos_kirim, nama_pelabuhan, eta, etd, nama_agen, ongkos_dooring, tanggal_diterima, nama_penerima, ongkos_bongkar } = req.body
//     const CurrentAdmin = await GetCurrentUser(token)
//     const CreateLautData = new LautModels({
//       no_sp, nama_pelayaran, ongkos_kirim, nama_pelabuhan, eta, etd, nama_agen, ongkos_dooring, tanggal_diterima, nama_penerima, ongkos_bongkar
//     })
//     await CreateLautData.save().then(result => {
//       SPModels.findOneAndUpdate({ _id: no_sp }, {
//         $addToSet: {
//           data_sp: result
//         }
//       }).then(results => {

//         res.status(200).send({ message: `Data Laut Berhasil Di Buat Dengan Kode ${results.no_sp} !` });
//       })
//     }).catch(err => {
//       res.status(400).send({ message: `Error Data: ${err}` })
//     })
//   }
// }
/* Update Laut Data */
exports.UpdateDataLaut = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const {
      sp_id,
      nama_pelayaran,
      ongkos_kirim,
      nama_pelabuhan,
      eta,
      etd,
      nama_agen,
      ongkos_dooring,
      tanggal_diterima,
      nama_penerima,
      ongkos_bongkar,
      history_tujuan,
    } = req.body
    const SpID = await SPModels.findOne({ no_sp: sp_id })
    var UpdateLautData = await LautModels.findOneAndUpdate({ no_sp: SpID._id }, {
      nama_pelayaran,
      ongkos_kirim,
      nama_pelabuhan,
      eta,
      etd,
      nama_agen,
      ongkos_dooring,
      tanggal_diterima,
      nama_penerima,
      ongkos_bongkar
    })
    if (UpdateLautData) {

      let DataSP = {
        ...UpdateLautData,
        identitas_armada: nama_pelayaran,
        ongkos_kirim: ongkos_kirim,
        tanggal_eta: eta,
        tanggal_etd: etd,
        agen_dooring: nama_agen,
        ongkos_dooring: ongkos_dooring,
        tanggal_diterima: tanggal_diterima,
        nama_penerima: nama_penerima,
        ongkos_bongkar: ongkos_bongkar,
        ongkos_kirim: ongkos_kirim
      }

      await SPModels.findOneAndUpdate({ _id: UpdateLautData.no_sp }, {
        $addToSet: {
          data_sp: DataSP
        },

      }).then(results => {

        res.status(200).send({ message: `Data Laut Berhasil Di Buat Dengan Kode ${results.no_sp} !` });
      }).catch(err => {
        res.status(400).send({ message: `Error Data : ${err}` });
      })


    } else {
      res.status(400).send({ message: `Error Data :  ${err}` });
    }
  }
}
/* End Update Laut Data */

/* Delete laut data */
exports.DeleteLautData = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { laut_id } = req.body
    await LautModels.findOneAndDelete({ _id: laut_id })
      .then(results => {
        SPModels.findByIdAndDelete({ _id: results.no_sp })
          .then(sp => {
            res.status(200).send({ message: `Data Berhasil Di Hapus ${sp.no_sp}` });
          }).catch(err => {
            res.status(400).send({ message: `Error Data : ${err}` });
          })
      }).catch(err => {
        res.status(400).send({ message: `Error Data :  ${err}` });
      })
  }
}
/* End Delete laut data */

/* Get All Laut Data */
exports.GetAllLautData = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    await LautModels.find({}).populate('no_sp').exec((err, results) => {
      if (err) return console.log(err)
      res.status(200).json(results);
    })
  }
}
/* End Get All Laut Data */
/* -------------------------------------------------------------------------- */

/* ----------------------------- DASHBOARD DARAT ---------------------------- */
/* Get All Darat Data */
exports.GetAllDaratData = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    await DaratModels.find({}).then(results => {
      res.status(200).json(results);
    }).catch(err => {
      res.status(404).send({ message: `Error Data ${err}` });
    })
  }
}
/* End Get All Darat Data */

// exports.CreateDaratData = async (req, res) => {
//   const token = req.cookies.admin_token
//   if (token === undefined || !token) {
//     res.status(403).send({ message: `You Do Not Allow` });
//   } else {
//     const { sp_id, identitas_armada, nomor_kontrak, ongkos_kirim_darat, tanggal_eta, tanggal_etd, agen_dooring, ongkos_dooring, tanggal_diterima, nama_penerima, ongkos_bongkar } = req.body

//     const SpID = await SPModels.findOne({ no_sp: sp_id })
//     const CreateDarat = new DaratModels({
//       no_sp: SpID._id,
//       identitas_armada,
//       nomor_kontrak,
//       ongkos_kirim_darat,
//       tanggal_eta,
//       tanggal_etd,
//       agen_dooring,
//       ongkos_dooring,
//       tanggal_diterima,
//       nama_penerima,
//       ongkos_bongkar
//     })
//     await CreateDarat.save().then(results => {
//       SPModels.findOneAndUpdate({ _id: results.no_sp }, {
//         $addToSet: {
//           data_sp: results
//         }
//       }).then(results => {

//         res.status(200).send({ message: `Data Laut Berhasil Di Buat Dengan Kode ${results.no_sp} !` });
//       })
//     }).catch(err => {
//       res.status(400).send({ message: `Error Data : ${err}` });
//     })
//   }
// }

/* Updated Darat Data */
exports.UpdateDaratData = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const {
      sp_id,
      identitas_armada,
      nomor_kontrak,
      ongkos_kirim_darat,
      tanggal_eta,
      tanggal_etd,
      agen_dooring,
      ongkos_dooring,
      tanggal_diterima,
      nama_penerima,
      ongkos_bongkar,
      history_tanggal,
      history_tujuan
    } = req.body
    const SpID = await SPModels.findOne({ no_sp: sp_id })
    await DaratModels.findOneAndUpdate({ no_sp: SpID._id }, {
      identitas_armada,
      nomor_kontrak,
      ongkos_kirim_darat,
      tanggal_eta,
      tanggal_etd,
      agen_dooring,
      ongkos_dooring,
      tanggal_diterima,
      nama_penerima,
      history_tujuan,
      history_tanggal,
      ongkos_bongkar
    }).then(results => {
      let DataSP = {
        ...results,
        identitas_armada: identitas_armada,
        nomor_kontrak: nomor_kontrak,
        ongkos_kirim_darat: ongkos_kirim_darat,
        tanggal_eta: tanggal_eta,
        tanggal_etd: tanggal_etd,
        agen_dooring: agen_dooring,
        ongkos_dooring: ongkos_dooring,
        tanggal_diterima: tanggal_diterima,
        nama_penerima: nama_penerima,
        ongkos_bongkar: ongkos_bongkar
      }

      SPModels.findOneAndUpdate({ _id: results.no_sp }, {
        $addToSet: {
          data_sp: DataSP
        }
      }).then(results => {
        console.log(results)
        res.status(200).send({ message: `Data Laut Berhasil Di Buat Dengan Kode ${results.no_sp} !` });
      }).catch(err => {
        res.status(400).send({ message: `Error Data : ${err}` });
      })

    }).catch(err => {

      res.status(400).send({ message: `Error Data :  ${err}` });
    })
  }
}
/* End Updated Darat Data */

/* Delete Data Darat */
exports.DeleteDaratData = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { darat_id } = req.body
    await DaratModels.findByIdAndDelete({ _id: darat_id }).then(results => {
      SPModels.findByIdAndDelete({ _id: results.no_sp })
        .then(sp => {
          res.status(200).send({ message: `Data Berhasil Di Hapus ${sp.no_sp}` });
        }).catch(err => {
          res.status(400).send({ message: `Error Data : ${err}` });
        })
    }).catch(err => {
      res.status(400).send({ message: `Error Data : ${err}` });
    })

  }
}
/* End Delete Data Darat */


/** Get Current Darat Data */
exports.GetCurrentDarat = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { sp_id } = req.params
    let DataSP = await SPModels.findOne({ no_sp: sp_id })
    await DaratModels.findOne({ no_sp: DataSP._id })
      .then(results => {
        res.status(200).json(results);
      }).catch(err => {
        res.status(400).send({ message: `internal Server Error ${err.response.message}` });
      })
  }
}
/** End Get Current Darat Data */



/* -------------------------------------------------------------------------- */

/* ----------------------------- DASHBOARD UDARA ---------------------------- */
/* Get All data udara */
exports.GetAllDataUdara = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    await UdaraModels.find({}).then(results => {
      res.status(200).json(results);
    }).catch(err => {
      res.status(400).send({ message: `Error Data : ${err}` });
    })
  }
}
/* End Get All data udara */

// /* Create Data Udara */
// exports.CreatedDataUdara = async (req, res) => {
//   const token = req.cookies.admin_token
//   if (token === undefined || !token) {
//     res.status(403).send({ message: `You Do Not Allow` });
//   } else {
//     const {
//       no_sp,
//       nama_vendor,
//       nomor_smu,
//       ongkos_kirim,
//       nama_bandara,
//       tanggal_eta,
//       tanggal_etd,
//       nama_agen
//     } = req.body;
//     const CreateNewUdara = new UdaraModels({
//       no_sp,
//       nama_vendor,
//       nomor_smu,
//       ongkos_kirim,
//       nama_bandara,
//       tanggal_eta,
//       tanggal_etd,
//       nama_agen
//     })
//     await CreateNewUdara.save().then(results => {
//       SPModels.findOneAndUpdate({ _id: no_sp }, {
//         $addToSet: {
//           data_sp: result
//         }
//       }).then(results => {

//         res.status(200).send({ message: `Data Laut Berhasil Di Buat Dengan Kode ${results.no_sp} !` });
//       })
//     }).catch(err => {
//       res.status(400).send({ message: `Error Data :  ${err}` });
//     })
//   }
// }
// /* End Create Data Udara */


/* Updated Data Udara */
exports.UpdateDataUdara = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const {
      sp_id,
      nama_vendor,
      nomor_smu,
      ongkos_kirim,
      nama_bandara,
      tanggal_eta,
      tanggal_etd,
      nama_agen,
      history_tujuan,
      history_tanggal
    } = req.body;
    const SpID = await SPModels.findOne({ no_sp: sp_id })
    const UpdateUdara = await UdaraModels.findOneAndUpdate({ no_sp: SpID._id }, {
      nama_vendor,
      nomor_smu,
      ongkos_kirim,
      nama_bandara,
      tanggal_eta,
      tanggal_etd,
      nama_agen
    })
    if (UpdateUdara) {

      let DataSP = {
        ...UpdateUdara,
        sp_id,
        nama_vendor,
        nomor_smu,
        ongkos_kirim,
        nama_bandara,
        tanggal_eta,
        tanggal_etd,
        nama_agen,
        history_tujuan,
        history_tanggal
      }

      await SPModels.findOneAndUpdate({ _id: UpdateUdara.no_sp }, {
        $addToSet: {
          data_sp: DataSP
        }
      }).then(results => {

        res.status(200).send({ message: `Data Laut Berhasil Di Buat Dengan Kode ${results.no_sp} !` });
      }).catch(err => {
        res.status(400).send({ message: `Error Data : ${err}` });
      })

    } else {
      res.status(400).send({ message: `Error Data :  ${err}` })
    }

  }
}
/* End Updated Data Udara */
/* Delete Data Udara */
exports.DeleteDataUdara = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { id_udara } = req.body
    await UdaraModels.findByIdAndDelete({ _id: id_udara }).then(results => {
      SPModels.findByIdAndDelete({ _id: results.no_sp })
        .then(sp => {
          res.status(200).send({ message: `Data Berhasil Di Hapus ${sp.no_sp}` });
        }).catch(err => {
          res.status(400).send({ message: `Error Data : ${err}` });
        })
    }).catch(err => {
      res.status(400).send({ message: `Error Data : ${err}` });
    })
  }
}
/* End Delete Data Udara */

/* -------------------------------------------------------------------------- */





/* ------------------------ DASHBOARD STANDART ADMIN ------------------------ */
/* Create New Sp */
exports.CreateSp = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const {
      tujuan,
      no_sp,
      tanggal_sp,
      pengiriman_via,
      customer_id,
      jumlah_barang,
      satuan,
      kg,
      packing,
      pickup,
      tanggal_pickup,
      ops,
      jenis_layanan,
      dead_line,
      nama_barang,
      do_balik
    } = req.body

    const CreateSP = new SPModels({
      no_sp,
      tujuan,
      tanggal_sp,
      pengiriman_via,
      customer_id,
      jumlah_barang,
      satuan,
      kg,
      packing,
      pickup,
      tanggal_pickup,
      ops,
      jenis_layanan,
      dead_line,
      nama_barang,
      do_balik
    })
    const NewSP = await CreateSP.save().catch(err => { res.status(404).send({ message: `Error Data: ${err}` }) })
    if (NewSP) {
      const ArmadaData = await ArmadaModels.findOne({ _id: NewSP.pengiriman_via })

      if (ArmadaData) {

        if (ArmadaData.via === 'darat') {
          const AddNewDarat = new DaratModels({
            no_sp: NewSP._id
          })
          await AddNewDarat.save()
            .then(results => {
              res.status(200).send({ message: `Success Membuat Data SP ${results.no_sp}` })
            }).catch(err => {
              res.status(404).send({ message: `Error Data : ${err}` })
            })
        }
        if (ArmadaData.via === 'laut') {
          const AddNewLaut = new LautModels({
            no_sp: NewSP._id
          })
          await AddNewLaut.save()
            .then(results => {
              res.status(200).send({ message: `Success Membuat Data SP ${results.no_sp}` })
            }).catch(err => {
              res.status(404).send({ message: `Error Data : ${err}` })
            })
        }
        if (ArmadaData.via === 'udara') {
          const AddUdara = new UdaraModels({
            no_sp: NewSP._id
          })
          await AddUdara.save()
            .then(results => {
              res.status(200).send({ message: `Success Membuat Data SP ${results.no_sp}` })
            }).catch(err => {
              res.status(404).send({ message: `Error Data : ${err}` })
            })
        }

      } else {
        res.status(200).send({ message: `Data Tidak Di Temukan !` })
      }

    }

  }
}
/* End Create New Sp */

/* Added New Customers Data */
exports.CreateNewCustomers = async (req, res) => {
  console.log(req.body)
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { customer_name, customer_alamat, customer_notlp } = req.body;
    const Customer = new CustomerData({
      customer_name,
      customer_alamat: customer_alamat ? customer_alamat : "",
      customer_notlp: customer_notlp ? customer_notlp : ""
    })
    await Customer.save().then(result => {
      res.status(200).send({ message: `Berhasil Membuat Customer Baru !` });
    }).catch(err => {
      res.status(403).send({ message: `Error Data: ${err.response.message}` });
    })
  }
}

/* End Added New Customers Data */


/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                           DASHBOARD ADMINISTRATOR                          */
/* -------------------------------------------------------------------------- */
/* Create  Admin */
exports.CreateNewAdmin = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { admin_name, admin_email, admin_role, admin_password, admin_nik, admin_alamat, admin_tlp, admin_image, jabatan } = req.body
    const NewAdmin = new AdminData({
      admin_name, admin_email, admin_role, admin_password, admin_nik, admin_alamat, admin_tlp, jabatan, admin_image
    })
    await NewAdmin.save().then(results => {
      res.status(200).json(results);
    }).catch(err => {
      res.status(400).send({ message: `Error Data : ${err}` });
    })
  }
}

/* End Create Admin */

/* Update Role */
exports.UpdateRole = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { admin_id, role_id } = req.body
    const UpdateRole = await AdminData.findOneAndUpdate({ _id: admin_id }, {
      admin_role: role_id
    })
    if (UpdateRole) {
      res.status(200).send({ message: `Berhasil Update Role Admin` })
    } else {
      res.status(400).send({ message: `Error Data : ${UpdateRole}` });
    }
  }
}
/* End Update Role */

/* Get All Roles Data */
exports.GetAllRoles = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    await AdminData.find({})
      .then(results => {
        res.status(200).json(results);
      })
      .catch(err => {
        res.status(400).json(err);
      })
  }
}
/* End Get All Roles Data */

/* -------------------------------------------------------------------------- */
/*                         END DASHBOARD ADMINISTRATOR                        */
/* -------------------------------------------------------------------------- */


/* ----------------------------- GLOBAL Function ---------------------------- */

/* Get All Data Customer */
exports.GetAllCustomers = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    await CustomerData.find({}).then(results => {
      res.status(200).send(results);
    }).catch(err => {
      res.status(400).send({ message: `Error Data : ${err}` });
    })
  }
}
/* End Get All Data Customer */

/** Get All Data SP */
exports.GetAllDataSP = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {

    await SPModels.find({})
      .populate('pengiriman_via')
      .populate('customer_id')
      .exec((err, result) => {
        if (err) console.log(err)
        else {

          res.status(200).json(result);
        }
      })
  }
}
/** End Get All Data SP */


/* Get All Data Armada */
exports.GetAllDataArmada = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    await ArmadaModels.find({}).then(result => {
      res.status(200).json(result)
    }).catch(err => {
      res.status(403).send({ message: `Error Data:  ${err}` });
    })
  }
}
/* End Get All Data Armada */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                                DASHBOARD GM                                */
/* -------------------------------------------------------------------------- */
/** Get All Spk */
exports.GetAllSpk = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    await SpkModels.find({})
      .populate({
        path: 'no_sp',
        populate: {
          path: 'pengiriman_via',
          path: 'customer_id'
        }
      })
      .populate({
        path: 'jenis_armada',
        populate: {
          path: 'via'
        }
      })
      .then(results => {
        console.log(results)
        // const AllDataSpk = results.map(data=>{
        //   Object.assign(
        //     {},
        //     {
        //       no_sp: data.no_sp.no_sp,
        //       pengiriman: data.pengiriman,
        //       pengambilan: data.pengambilan,
        //       no_sj: data.no_sj,
        //       koli_jenis: data.koli_jenis,
        //       kg: data.kg,
        //       jenis_layanan: data.jenis_layanan,
        //       due_date: data.due_date,
        //       jenis_armada: data.jenis_armada,
        //       dikirim_melalui: data.dikirim_melalui,

        //     }
        //   )
        // })
        res.status(200).json(results)

      }).catch(err => {
        console.log(err)
      })
  }
}
/**End  Get All Spk */

/** Update Spk */
exports.UpdateSpk = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { spk_id } = req.params
    const { no_sp, no_spk, pengiriman, Pengambilan, no_sj, koli_jenis, kg, jenis_layanan, due_date, jenis_armada, dikirim_melalui, biaya_kirim } = req.body
    await SpkModels.findOneAndUpdate({ _id: spk_id }, {
      no_sp,
      no_spk,
      pengiriman,
      Pengambilan,
      no_sj,
      koli_jenis,
      kg,
      jenis_layanan,
      due_date,
      jenis_armada,
      dikirim_melalui,
      biaya_kirim
    }).then(results => {
      res.status(200).send({ message: `Data Spk ${results.no_spk} Berhasil Di Update ` })
    }).catch(err => {
      res.status(400).send({ message: `Gagal Mengupdate Spk ${err.response.message}` });
    })
  }
}
/** End Update Spk */
/** Creata Spk Dan Sp */
exports.CreateSpkDanSp = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { no_sp } = req.params
    const {
      pengiriman,
      pengembalian,
      no_spk,
      no_sj,
      layanan,
      due_date,
      via,
      biaya_kirim,
      dikirim_melalui,
      kg,
      koli
    } = req.body
    const SPData = await SPModels.findOne({ no_sp })


    const CreateSpk = new SpkModels({
      no_spk,
      no_sp: SPData._id,
      pengiriman,
      pengambilan: pengembalian,
      no_sj,
      jenis_layanan: layanan,
      due_date,
      jenis_armada: via,
      dikirim_melalui,
      biaya_kirim,
      kg,
      koli_jenis: koli
    })

    await CreateSpk.save()
      .then(results => {
        console.log(res)
        res.status(200).send({ message: `Spk Berhasil Di Tambah !` })
      }).catch(err => {
        console.log(err)
        res.status(500).send({ message: `Error Internal Data ${err}` })
      })
  }
}
/** End Creata Spk Dan Sp */

/** Delete Data Spk */
exports.DeleteDataSpk = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { spk_id } = req.query
    await SpkModels.findByIdAndDelete({ _id: spk_id })
      .then(results => {
        res.status(200).send({ message: `Data Berhasil Di Delete ${results.no_spk}` })
      }).catch(err => {
        res.status(400).send({ message: `Gagal Delete Data !` });
      })

  }
}
/** End Delete Data Spk */

/* -------------------------------------------------------------------------- */
/*                              END DASHBOARD GM                              */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                               MONITORING DATA                              */
/* -------------------------------------------------------------------------- */
/** Get All Monitoring Data */
exports.GetAllDataMonitoring = async (req, res) => {
  await SPModels.find({})
    .sort({ field: 'desc' })
    .populate('pengiriman_via')
    .populate('customer_id')
    .then(results => {
      res.status(200).json(results);
    })
}
/** End Get All Monitoring Data */
/** Delete Sp  Data */
exports.DeleteSp = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { sp_id } = req.params
    await SPModels.findByIdAndDelete({ _id: sp_id })
      .then(results => {
        res.status(200).send({ message: `SP Berhasil Di Hapus` })
      }).catch(err => {
        console.log(err)
      })
  }
}
/** End Delete Sp  Data */


/** Delete Customer */
exports.DeleteCustomer = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { id_cust } = req.params
    await CustomerData.findByIdAndDelete({ _id: id_cust })
      .then(results => {
        res.status(200).send({ message: `Customer Berhasil Di Hapus` })
      }).catch(err => {
        console.log(err)
      })
  }
}
/** End Delete Customer */

/** Get All Roles Data */
exports.GetRoleData = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    await RoleData.find({})
      .then(results => {
        res.status(200).json(results)
      }).catch(err => {
        console.log(err)
      })
  }
}
/** End Get All Roles Data */

/** Get Current Data SP */
exports.GetDataSP = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { sp_id } = req.params
    await SPModels.findOne({ no_sp: sp_id })
      .then(data => {
        res.status(200).json(data)
      }).catch(err => {
        res.status(400).send({ message: `Data Tidak Di Temukan` })
      })
  }
}
/** End Get Current Data SP */


/**Added New History */
exports.AddNewHistory = async (req, res) => {
  const token = req.cookies.admin_token
  if (token === undefined || !token) {
    res.status(403).send({ message: `You Do Not Allow` });
  } else {
    const { sp_id, tanggal, deskripsi } = req.body
    const history_tujuan = {
      _id: uuidv4(),
      tanggal: tanggal,
      deskripsi: deskripsi
    }
    await SPModels.findOneAndUpdate({ no_sp: sp_id }, {
      $push: {
        history_tujuan: history_tujuan
      }
    }).then(data => {
      res.status(200).send({ message: `Berhasil Menambah Status` })
    }).catch(err => {
      res.status(400).send({ message: `Tidak Dapat Menyimpan Data` })
    })
  }
}
/**End Added New History */

/** Delete Current History */
exports.DeleteDataHistory = async (req, res) => {
  const { sp_id, history_id } = req.params
  await SPModels.findOneAndUpdate({ no_sp: sp_id }, {
    $pull: {
      history_tujuan: {
        _id: history_id
      }
    }
  }).then(data => {
    res.status(200).send({ message: `Data Berhasil Di hapus !` })
  }).catch(err => {
    console.log(err)
  })
  console.log(req.params)
}
/** End Delete Current History */

/** DElete All History */
exports.DeleteAllHistory = async (req, res) => {
  const { sp_id } = req.params
  await SPModels.findOneAndUpdate({ no_sp: sp_id }, {
    $pullAll: history_tujuan


  }).then(data => {
    res.status(200).send({ message: `Berhasil Delete Semu History` })
  }).catch(err => {
    if (err.response !== undefined) {

      res.status(500).send({ message: `Terjadi Kesalahan ! ${err.response.data.message}` })
    }
  })
}
/** End DElete All History */

/** Get Current Laut */
exports.GetCurrentLaut = async (req, res) => {
  const { sp_id } = req.params
  const SpData = await SPModels.findOne({ no_sp: sp_id })
  if (SpData) {
    await LautModels.findOne({ no_sp: SpData._id })
      .then(data => {
        res.status(200).json(data)
      }).catch(err => {
        throw console.log(err)
      })
  } else {
    res.status(404).send({ message: `Sp Tidak Di Temukan` })
  }
}
/** End Get Current Laut */

/* -------------------------------------------------------------------------- */
/*                            END MMONITORING DATA                            */
/* -------------------------------------------------------------------------- */