
const fs = require('fs').promises;
const path = require('path');

class CartManager {
    constructor() {
        this.filePath = path.join(__dirname, '../data/carts.json');
    }

    async getCarts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === id) || null;
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = { id: Date.now(), products: [] };
        carts.push(newCart);
        await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async addProductToCart(cartId, productId) {
        let carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cartId);

        if (cartIndex === -1) return null;

        const cart = carts[cartIndex];
        const existingProduct = cart.products.find(p => p.product === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        carts[cartIndex] = cart;
        await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));

        return cart;
    }
}

module.exports = CartManager;
