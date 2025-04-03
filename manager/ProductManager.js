

const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor() {
        this.filePath = path.join(__dirname, '../data/products.json');
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(product => product.id === id) || null;
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newProduct = { id: Date.now(), ...product };
        products.push(newProduct);
        await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        let products = await this.getProducts();
        products = products.map(product => product.id === id ? { ...product, ...updatedFields } : product);
        await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        products = products.filter(product => product.id !== id);
        await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;

