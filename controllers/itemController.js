// controllers/itemController.js
const db = require('../database');

// Obtiene un ítem por su ID y lo envía como JSON
exports.getItemJson = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al buscar el item.' });
        }
        if (!row) {
            return res.status(404).json({ success: false, message: 'Item no encontrado.' });
        }
        res.json({ success: true, item: row, csrfToken: req.csrfToken() });
    });
};

// Muestra la lista de items
exports.getAllItems = (req, res, csrfToken) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
            return res.status(500).send('Error al obtener los items.');
        }
        res.render('index', { items: rows, csrfToken });
    });
};

// Muestra el formulario para editar un item
exports.getEditItem = (req, res, csrfToken) => {
    const { id } = req.params;
    db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).send('Error al buscar el item.');
        }
        if (!row) {
            return res.status(404).send('Item no encontrado.');
        }
        res.render('edit', { item: row, csrfToken });
    });
};

// Agrega un nuevo item (para AJAX)
exports.addItemAjax = (req, res) => {
    const { name, description } = req.body;
    db.run(`INSERT INTO items (name, description) VALUES (?, ?)`, [name, description], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al agregar el item.' });
        }
        res.status(201).json({ success: true, id: this.lastID, name, description });
    });
};

// Actualiza un item (para AJAX)
exports.updateItemAjax = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.run(`UPDATE items SET name = ?, description = ? WHERE id = ?`, [name, description, id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al actualizar el item.' });
        }
        res.json({ success: true, message: 'Item actualizado con éxito.' });
    });
};

// Elimina un item (para AJAX)
exports.deleteItemAjax = (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM items WHERE id = ?`, [id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al eliminar el item.' });
        }
        res.json({ success: true, id });
    });
};