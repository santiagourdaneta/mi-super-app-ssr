// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

router.get('/', csrfProtection, (req, res) => {
    itemController.getAllItems(req, res, req.csrfToken());
});

router.get('/items/api/:id', csrfProtection, (req, res) => {
    itemController.getItemJson(req, res);
});

router.post('/items', csrfProtection, itemController.addItemAjax);

router.get('/items/edit/:id', csrfProtection, (req, res) => {
    itemController.getEditItem(req, res, req.csrfToken());
});

router.post('/items/delete/:id', csrfProtection, itemController.deleteItemAjax);

// Nueva ruta para actualizar un item sin recargar la página
router.post('/items/update-ajax/:id', csrfProtection, itemController.updateItemAjax);


module.exports = router;





