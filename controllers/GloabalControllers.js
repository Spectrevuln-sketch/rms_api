/* -------------------------- TODO REQUIRE A MODELS ------------------------- */
const { AdminData } = require('../models/AdminModels');
const { ArmadaModels } = require('../models/ArmadaModels');
const { SPModels } = require('../models/SPDataModels');
const { CustomerData } = require('../models/CustomerModels')
const { LautModels } = require('../models/LautModels')
const { UdaraModels } = require('../models/UdaraModels')
/* -------------------------------------------------------------------------- */
/* ----------------------- TODO PACKAGE AND CONFIGURE ----------------------- */
const { validationResult } = require('express-validator');

var bcrypt = require('bcryptjs');
var fs = require('fs');
var jwt = require('jsonwebtoken');
const { DaratModels } = require('../models/DaratModels');
const jwt_decode = require('jwt-decode');

/* -------------------------------------------------------------------------- */
/*                         GLOBAL CONTROLLERS FUNCTION                        */
/* -------------------------------------------------------------------------- */
/** GEt All Current Akun Login */
exports.CurrentAkun = async (req, res) => {
    var token = req.cookies.admin_token
    if (token || token !== undefined) {

        const payload = jwt_decode(token)
        await AdminData.findOne({ admin_email: payload.admin_email })
            .then(results => {
                res.status(200).json(results)
            })
            .catch(err => {
                res.status(500).send({ message: `Error Data : ${err}` })
            })
    } else {
        res.status(400).send({ message: `Token Tidak Di Temukan` });
    }

}
/** End GEt All Current Akun Login */

/** Get All Armada */
exports.GetAllArmada = async (req, res) => {
    var token = req.cookies.admin_token
    if (token || token !== undefined) {
        await ArmadaModels.find({})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).send({ message: `Error Data : ${err} ` })
            })
    }
}
/** End Get All Armada */
/** Get All Customer */
exports.GetAllCustomer = async (req, res) => {
    const token = req.cookies.admin_token
    if (token === undefined || !token) {
        res.status(403).send({ message: `You Do Not Allow` });
    } else {
        await CustomerData.find({})
            .then(results => {
                res.status(200).json(results)
            })
            .catch(err => {
                res.status(500).send({ message: `Error Data : ${err} ` })
            })
    }
}
/** End Get All Customer */


/** Get SP Darat */
exports.GetDaratSP = async (req, res) => {
    const token = req.cookies.admin_token
    if (token === undefined || !token) {
        res.status(403).send({ message: `You Do Not Allow` });
    } else {
        const ArmadaDarat = await ArmadaModels.findOne({ via: 'darat' }).catch(err => console.log(err))
        if (ArmadaDarat) {
            await DaratModels.find({})
                .populate({
                    path: 'no_sp',
                    populate: {
                        path: 'customer_id'
                    }
                })
                .then(results => {
                    const resObject = results.map(darat_data => {

                        return Object.assign(
                            {},
                            {
                                _id: darat_data._id,
                                no_sp: darat_data.no_sp !== null ? darat_data.no_sp.no_sp : '',
                                tanggal_sp: darat_data.no_sp !== null ? darat_data.no_sp.tanggal_sp : '',
                                customer: darat_data.no_sp !== null ? darat_data.no_sp.customer_id.customer_name : '',
                                identitas_armada: darat_data.identitas_armada,
                                nomor_kontrak: darat_data.nomor_kontrak,
                                ongkos_kirim_darat: darat_data.ongkos_kirim_darat,
                                tanggal_eta: darat_data.tanggal_eta,
                                tanggal_etd: darat_data.tanggal_etd,
                                agen_dooring: darat_data.agen_dooring,
                                ongkos_dooring: darat_data.ongkos_dooring,
                                tanggal_diterima: darat_data.tanggal_diterima,
                                nama_penerima: darat_data.nama_penerima,
                                ongkos_bongkar: darat_data.ongkos_bongkar,
                                data_dibuat: darat_data.created_at,
                                data_diupdate: darat_data.updated_at
                            }
                        )

                    })
                    res.status(200).json(resObject)
                }).catch(err => {
                    res.status(500).send({ message: `Error Data : ${err} ` })
                })
        }

    }
}
/** End Get SP Darat */

/** Get SP Laut */
exports.GetLautSP = async (req, res) => {
    const token = req.cookies.admin_token
    if (token === undefined || !token || token === null) {
        res.status(403).send({ message: `You Do Not Allow` });
    } else {
        const ArmadaLaut = await ArmadaModels.findOne({ via: 'laut' }).catch(err => console.log(err))
        if (ArmadaLaut) {
            await LautModels.find({})
                .populate({
                    path: 'no_sp',
                    populate: {
                        path: 'customer_id'
                    }
                })
                .then(results => {
                    let resObjLaut = results.map(data_laut => {
                        return Object.assign(
                            {},
                            {
                                _id: data_laut._id,
                                no_sp: data_laut.no_sp ? data_laut.no_sp.no_sp : '',
                                tanggal_sp: data_laut.no_sp ? data_laut.no_sp.tanggal_sp : '',
                                customer: data_laut.no_sp ? data_laut.no_sp.customer_id.customer_name : '',
                                nama_pelayaran: data_laut.nama_pelayaran,
                                ongkos_kirim: data_laut.ongkos_kirim,
                                nama_pelabuhan: data_laut.nama_pelabuhan,
                                tanggal_eta: data_laut.eta,
                                tanggal_etd: data_laut.etd,
                                nama_agen: data_laut.nama_agen,

                            }
                        )
                    })
                    res.status(200).json(resObjLaut)
                }).catch(err => {
                    res.status(500).send({ message: `Error Data : ${err} ` })
                })
        }

    }
}
/** End Get SP Laut */

/** Get SP Udara */
exports.GetUdaraSP = async (req, res) => {
    const token = req.cookies.admin_token
    if (token === undefined || !token) {
        res.status(403).send({ message: `You Do Not Allow` });
    } else {
        const ArmadaUdara = await ArmadaModels.findOne({ via: 'udara' }).catch(err => console.log(err))
        if (ArmadaUdara) {
            await UdaraModels.find({})
                .populate({
                    path: 'no_sp',
                    populate: {
                        path: 'customer_id'
                    }
                })
                .then(results => {
                    let resObjUdara = results.map(data_udara => {
                        return Object.assign(
                            {},
                            {
                                _id: data_udara._id,
                                no_sp: data_udara.no_sp ? data_udara.no_sp.no_sp : '',
                                tanggal_sp: data_udara.no_sp ? data_udara.no_sp.tanggal_sp : '',
                                customer: data_udara.no_sp ? data_udara.no_sp.customer_id.customer_name : '',
                                nama_vendor: data_udara.nama_vendor,
                                nomor_smu: data_udara.ongkos_kirim,
                                nama_bandara: data_udara.nama_bandara,
                                tanggal_eta: data_udara.tanggal_eta,
                                tanggal_etd: data_udara.tanggal_etd,
                                nama_agen: data_udara.nama_agen
                            }
                        )
                    })
                    res.status(200).json(resObjUdara)
                }).catch(err => {
                    res.status(500).send({ message: `Error Data : ${err} ` })
                })
        }

    }
}
/** End Get SP Udara */


/** Get All Data Laut */
exports.GetAllDataLaut = async (req, res) => {
    const token = req.cookies.admin_token
    if (token === undefined || !token) {
        res.status(403).send({ message: `You Do Not Allow` });
    } else {

    }
}
/** End Get All Data Laut */



/** End Get All Data SP New Function */
exports.GetAllSpNew = async (req, res) => {
    const token = req.cookies.admin_token
    if (token === undefined || !token) {
        res.status(403).send({ message: `You Do Not Allow` });
    } else {
        await SPModels.find({})
            .populate('pengiriman_via')
            .populate('customer_id')
            .populate('data_sp')
            .then(results => {
                let resObjSpNew = results.map(data_sp => {
                    return Object.assign(
                        {},
                        {
                            no_sp: data_sp.no_sp,
                            tanggal_sp: data_sp.tanggal_sp,
                            customer: data_sp.customer_id.customer_name,
                            via: data_sp.pengiriman_via.via,
                            data_sp: data_sp.data_sp
                        }
                    )
                })
                res.status(200).json(resObjSpNew)
            }).catch(err => {
                res.status(500).send({ message: `Error Data :  ${err}` })
            })
    }
}
/** End Get All Data SP New Function */


/** Get Current SP Data */
exports.GetCurrentSP = async (req, res) => {
    const { no_sp } = req.params
    if (no_sp) {
        const FindCurrentSP = await SPModels.findOne({ no_sp: no_sp })
            .populate('pengiriman_via')
            .populate('customer_id')
        if (FindCurrentSP) {

            res.status(200).json(FindCurrentSP);
        } else {
            res.status(400).send({ message: `Data Tidak Ditemukan` });
        }
    }
}
/** Get Current SP Data */


/* -------------------------------------------------------------------------- */
/*                       END GLOBAL CONTROLLERS FUNCTION                      */
/* -------------------------------------------------------------------------- */