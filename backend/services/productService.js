const productModel = require('../models/productModels');

class ProductService {
    async getProducts() {
        return productModel.getAllProducts(); // No es necesario await aquí
    }

    async getProductById(id) {
        return productModel.getProductById(id); // No es necesario await aquí
    }

    async addProduct(data) {
        return productModel.createProduct(data); // No es necesario await aquí
    }

    async modifyProduct(id, data) {
        return productModel.updateProduct(id, data); // No es necesario await aquí
    }

    async removeProduct(id) {
        await productModel.deleteProduct(id);
        return { message: 'Producto eliminado' }; // Agregado un mensaje de éxito
    }
}

module.exports = new ProductService();
