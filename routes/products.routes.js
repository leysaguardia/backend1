
const express = require('express');
const router = express.Router();
const ProductManager = require('../manager/ProductManager.js');

const productManager = new ProductManager();

router.get('/', async (req, res) => {
    res.json(await productManager.getProducts());
});

router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(Number(req.params.pid));
    product ? res.json(product) : res.status(404).send('Producto no encontrado');
});

router.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
    await productManager.updateProduct(Number(req.params.pid), req.body);
    res.send('Producto actualizado');
});

router.delete('/:pid', async (req, res) => {
    await productManager.deleteProduct(Number(req.params.pid));
    res.send('Producto eliminado');
});

module.exports = router;
