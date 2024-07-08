const express = require('express');
const router = express.Router();
const { exportarAPDF, exportarAExcel, exportarACSV } = require('../controllers/exportController');

router.post('/exportar-pdf', exportarAPDF);
router.post('/exportar-excel', exportarAExcel);
router.post('/exportar-csv', exportarACSV);

module.exports = router;
