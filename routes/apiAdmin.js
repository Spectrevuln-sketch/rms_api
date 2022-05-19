var express = require('express');
var router = express.Router();
var AuthControllers = require('../controllers/AuthControllers');
var DashboardControllers = require('../controllers/DashboardControllers');
var GlobalControllers = require('../controllers/GloabalControllers')
var cors = require('cors');
var CorsConfig = require('../config/CorsConfig');
var { Validate } = require('../config/Validate');

/* -------------------------------------------------------------------------- */
/*                                TODO AUTH API                               */
/* -------------------------------------------------------------------------- */

/* --------------------------- CREATE FIRST ADMIN --------------------------- */
router.post('/create-admin', AuthControllers.FistAdminRegister);
/* -------------------------------------------------------------------------- */

/* ----------------------------- REGISTER ADMIN ----------------------------- */
router.post('/register-admin', cors(CorsConfig.option), Validate('admin_register'), AuthControllers.RegisterNewAdmin);
/* -------------------------------------------------------------------------- */

/* ---------------------------- AUTH LOGIN ADMIN ---------------------------- */
router.post('/auth-login-admin', cors(CorsConfig.option), Validate('admin_login'), AuthControllers.LoginAdmin);
/* -------------------------------------------------------------------------- */

/* ------------------------------- IS LOGIN ? ------------------------------- */
router.get('/islogin', cors(CorsConfig.option), AuthControllers.isLogin)
/* -------------------------------------------------------------------------- */
/* ------------------------------- LOGOUT AKUN ------------------------------ */
router.get('/logout-akun', cors(CorsConfig.option), AuthControllers.LogoutAccount)
/* -------------------------------------------------------------------------- */

/** Check Role Data */
router.get('/check-role', cors(CorsConfig.option), AuthControllers.CheckRole)
/** End Check Role Data */


/* -------------------------------------------------------------------------- */
/*                                END AUTH API                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                DASHBOARD API                               */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                             ADMIN LAUT RESTAPI                             */
/* -------------------------------------------------------------------------- */
/* Create Laut Data */
// router.post('/create-laut-data', cors(CorsConfig.option), DashboardControllers.CreateLautData)
/* End Create Laut Data */

/* Update Laut Data */
router.post('/update-laut-data', cors(CorsConfig.option), DashboardControllers.UpdateDataLaut)
/* End Update Laut Data */
/* Delete Laut Data */
router.delete('/delete-laut-data', cors(CorsConfig.option), DashboardControllers.DeleteLautData)
/* End Delete Laut Data */

/* GET ALL DATA LAUT */
router.get('/get-all-laut', cors(CorsConfig.option), DashboardControllers.GetAllLautData)
/* END GET ALL DATA LAUT */

/* -------------------------------------------------------------------------- */
/*                           END ADMIN LAUT RESTAPI                           */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             ADMIN UDARA RESTAPI                            */
/* -------------------------------------------------------------------------- */

/* Create Udara Data */
// router.post('/create-udara-data', cors(CorsConfig.option), DashboardControllers.CreatedDataUdara)
/* End Create Udara Data */

/* Update Udara Data */
router.post('/update-udara-data', cors(CorsConfig.option), DashboardControllers.UpdateDataUdara)
/* End Update Udara Data */

/* Delete Data Udara */
router.delete('/delete-udara-data', cors(CorsConfig.option), DashboardControllers.DeleteDataUdara)
/* End Delete Data Udara */

/* Get All Data Udara */
router.get('/get-all-data-udara', cors(CorsConfig.option), DashboardControllers.GetAllDataUdara)
/* End Get All Data Udara */




/* -------------------------------------------------------------------------- */
/*                           END ADMIN UDARA RESTAPI                          */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             ADMIN DARAT RESTAPI                            */
/* -------------------------------------------------------------------------- */
/* Create All Data Darat */
// router.post('/create-darat-data', cors(CorsConfig.option), DashboardControllers.CreateDaratData)
/* End Create All Data Darat */
/* Update Data Darat */
router.post('/update-darat-data', cors(CorsConfig.option), DashboardControllers.UpdateDaratData)
/* End Update Data Darat */
/* Delete Darat Data */
router.delete('/delete-darat-data', cors(CorsConfig.option), DashboardControllers.DeleteDaratData)
/* End Delete Darat Data */
/* Get All Data Darat */
router.get('/get-all-data-darat', cors(CorsConfig.option), DashboardControllers.GetAllDaratData)
/* End Get All Data Darat */
/** Get Darat Current Data */
router.get('/get-current-darat/:sp_id', cors(CorsConfig.option), DashboardControllers.GetCurrentDarat)
/** End Get Darat Current Data */
/* -------------------------------------------------------------------------- */
/*                           END ADMIN DARAT RESTAPI                          */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                            MASTER ADMINISTRATOR                            */
/* -------------------------------------------------------------------------- */
/* Create New Admin Login And Data */
router.post('/create-data-admin', cors(CorsConfig.option), DashboardControllers.CreateNewAdmin)
/* End Create New Admin Login And Data */

/* Role Update */
router.post('/update-role-admin', cors(CorsConfig.option), DashboardControllers.UpdateRole)
/* End Role Update */

/* Get All Roles */
router.get('/get-all-roles', cors(CorsConfig.option), DashboardControllers.GetAllRoles)
/* End Get All Roles */
/* -------------------------------------------------------------------------- */
/*                          END MASTER ADMINISTRATOR                          */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                                  ADMIN SP                                  */
/* -------------------------------------------------------------------------- */
/** Create SP  */
router.post('/create-sp', cors(CorsConfig.option), DashboardControllers.CreateSp)
/** End  Create SP  */

/** Craete Customer */
router.post('/create-customer', cors(CorsConfig.option), DashboardControllers.CreateNewCustomers)
/** End  Craete Customer */


/* -------------------------------------------------------------------------- */
/*                                END ADMIN SP                                */
/* -------------------------------------------------------------------------- */




/* -----------------------------GLOBAL RESTAPI ---------------------------- */
/** Get SP Darat */
router.get('/get-darat-sp', cors(CorsConfig.option), GlobalControllers.GetDaratSP)
/** End Get SP Darat */

/** get sp laut */
router.get('/get-laut-sp', cors(CorsConfig.option), GlobalControllers.GetLautSP)
/** End get sp laut */

/** get sp udara */
router.get('/get-udara-sp', cors(CorsConfig.option), GlobalControllers.GetUdaraSP)
/** End get sp udara */


/** get all customer data */
router.get('/get-all-data-customer', cors(CorsConfig.option), GlobalControllers.GetAllCustomer)
/** End get all customer data */

/* Get All Data All SP */
router.get('/get-all-data-sp', cors(CorsConfig.option), DashboardControllers.GetAllDataSP);
/* End Get All Data All SP */

/** Get Data Current Akun */
router.get('/current-akun', cors(CorsConfig.option), GlobalControllers.CurrentAkun)
/** End Get Data Current Akun */
/** Get All Armada */
router.get('/get-all-armada', cors(CorsConfig.option), GlobalControllers.GetAllArmada)
/** End Get All Armada */


/** Get All SP NEW Router  */
router.get('/get-all-sp', cors(CorsConfig.option), GlobalControllers.GetAllSpNew)
/** End Get All SP NEW Router  */

/** Get Current Data  */
router.get('/current-pengiriman/:no_sp', cors(CorsConfig.option), GlobalControllers.GetCurrentSP)
/** End Get Current Data  */

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                DASHBOARD GM                                */
/* -------------------------------------------------------------------------- */
/** Get All Data Spk */
router.get('/get-all-data-spk', cors(CorsConfig.option), DashboardControllers.GetAllSpk)
/** End Get All Data Spk */

/** Create Data Spk */
router.post('/create-spk/:no_sp', cors(CorsConfig.option), DashboardControllers.CreateSpkDanSp)
/** End  Create Data Spk */

/** Delete Data Spk */
router.delete('/delete-spk', cors(CorsConfig.option), DashboardControllers.DeleteDataSpk)
/** End Delete Data Spk */
/** Get All Data Sp */
router.get('/get-all-sp', cors(CorsConfig.option), DashboardControllers.GetAllDataSP)
/** End All Data Sp */

/* -------------------------------------------------------------------------- */
/*                              END DASHBOARD GM                              */
/* -------------------------------------------------------------------------- */
router.get('/get-detail-sp', cors(CorsConfig.option), DashboardControllers.GetAllDataMonitoring)
router.delete('/delete-sp/:sp_id', cors(CorsConfig.option), DashboardControllers.DeleteSp)
router.delete('/delete-customer/:id_cust', cors(CorsConfig.option), DashboardControllers.DeleteCustomer)
router.get('/get-user-role', cors(CorsConfig.option), DashboardControllers.GetRoleData)
router.get('/get-current-sp/:sp_id', cors(CorsConfig.option), DashboardControllers.GetDataSP)
router.post('/add-new-history', cors(CorsConfig.option), DashboardControllers.AddNewHistory)

router.delete('/delete-history/:sp_id/:history_id', cors(CorsConfig.option), DashboardControllers.DeleteDataHistory)
router.delete('/delete-all-history/:sp_id', cors(CorsConfig.option), DashboardControllers.DeleteAllHistory)
router.get('/get-current-laut/:sp_id', cors(CorsConfig.option), DashboardControllers.GetCurrentLaut)
/* -------------------------------------------------------------------------- */
/*                              END DASHBOARD API                             */
/* -------------------------------------------------------------------------- */






module.exports = router;
