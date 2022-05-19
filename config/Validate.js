const { check, validationResult } = require('express-validator');
/* --------------------------- TODO INCLUDE MODELS -------------------------- */
const { AdminData } = require('../models/AdminModels');


exports.Validate = (method) => {
  /* --------------------- TODO REGISTER ADMIN VALIDATION --------------------- */
  switch (method) {
    case 'admin_register': {
      return [
        check('admin_email')
          .notEmpty().withMessage('Email Harus Di Isi!')
          .isEmail().withMessage('Format Email Salah !')
          .custom(admin_email => {
            return AdminData.findOne({ admin_email })
              .then(have_data => {
                if (have_data) {
                  return Promise.reject('Email Sudah Ada Yang Menggunakan !')
                }
              })
          })
      ]
    }
  }
  /* -------------------------------------------------------------------------- */
  /* ----------------------- TODO LOGIN ADMIN VALIDATION ---------------------- */
  switch (method) {
    case 'admin_login': {
      return [
        check('admin_email')
          .notEmpty().withMessage('Email Harus Di Isi !')
          .isEmail().withMessage('Format Email Salah !'),
        check('admin_password')
          .notEmpty().withMessage('Password Harus Di isi !')
      ]
    }
  }
  /* -------------------------------------------------------------------------- */
  switch (method) {
    case 'create_sp': {
      return [
        check('no_sp')
          .notEmpty().withMessage('No SP Harus Di isi !')
          .isNumeric().withMessage('Data Sp Harus Berupa Angka !'),
        check('tanggal_sp')
          .notEmpty().withMessage('Tanggal Sp Harus Di isi !')
          .isDate().withMessage('Tanggal Sp Harus Berupa Tanggal'),
        check('pengiriman_via')
          .notEmpty().withMessage('Armada Harus Di Isi !')
      ]
    }
  }
  /* ------------------------- CREATE LAUT VALIDATION ------------------------- */
  switch (method) {
    case 'create_laut': {
      return [
        check('nama_pelayaran')
          .notEmpty().withMessage('Nama Pelayaran Harus Di Isi !'),
        check('ongkos_kirim')
          .notEmpty().withMessage('Ongkos Kirim Harus Di isi !'),
        check('nama_pelabuhan')
          .notEmpty().withMessage('Nama Pelabuhan Harus Di isi !'),
        check('eta')
          .notEmpty().withMessage('Eta Tidak Boleh Kosong !'),
        check('etd')
          .notEmpty().withMessage('Etd Tidak Boleh Kosong !'),
        check('nama_agen')
          .notEmpty().withMessage('Nama Agen Harus Di Isi !'),
        check('ongkos_dooring')
          .notEmpty().withMessage('Ongkos Dooring Harus Di Isi !'),
        check('tanggal_diterima')
          .notEmpty().withMessage('Tanggal Di Terima Harus Di Isi !'),
        check('nama_penerima')
          .notEmpty().withMessage('Nama Penerima Harus Di Isi !'),
        check('ongkos_bongkar')
          .notEmpty().withMessage('Ongkos Bongkar Harus Di isi !')
      ]
    }
  }
  /* -------------------------------------------------------------------------- */

  /* ------------------------- UPDATE LAUT VALIDATION ------------------------- */
  switch (method) {
    case 'update_laut': {
      return [
        check('nama_pelayaran')
          .notEmpty().withMessage('Nama Pelayaran Harus Di Isi !'),
        check('ongkos_kirim')
          .notEmpty().withMessage('Ongkos Kirim Harus Di Isi !'),
        check('nama_pelabuhan')
          .notEmpty().withMessage('Nama Pelabuhan Harus Disi !')
      ]
    }
  }
  /* -------------------------------------------------------------------------- */
}