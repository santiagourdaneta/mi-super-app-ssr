// routes/itemRoutes.js
const express = require('express');
const RateLimit = require('express-rate-limit');
const router = express.Router();
const itemController = require('../controllers/itemController');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });


// Rate limiter for update-ajax requests: max 10 requests per 15 minutes per IP
const updateAjaxLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many update requests from this IP, please try again later.',
});

router.get('/', csrfProtection, (req, res) => {
    itemController.getAllItems(req, res, req.csrfToken());
});

router.get('/items/api/:id', csrfProtection, (req, res) => {
    itemController.getItemJson(req, res);
});

router.post('/items', csrfProtection, itemController.addItemAjax);

router.get('/items/edit/:id', csrfProtection, updateAjaxLimiter, (req, res) => {
    itemController.getEditItem(req, res, req.csrfToken());
});

router.post('/items/delete/:id', csrfProtection, updateAjaxLimiter, itemController.deleteItemAjax);

// Nueva ruta para actualizar un item sin recargar la página
router.post('/items/update-ajax/:id', csrfProtection, updateAjaxLimiter, itemController.updateItemAjax);


module.exports = router;





