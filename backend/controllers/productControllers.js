const productService = require('../services/productService')

class ProductController {
    async getProducts(req, res){
        try {
            const products = await productService.
            getProducts();
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({nessage: 'Error al obetner los productos' });
        }
    }
}