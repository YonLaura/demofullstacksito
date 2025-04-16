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


    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await productService.getProductById(id);
            if(!product) {
                return res.status(404).json({message: 'Producto no encontrado'});
            }
            res.json(product);
        }catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el producto'})
        }
    }


    async createProduct (req, res) {
        try {
            const { nombre, precio, descripcion } = req.body;
            const newProduct = await productService.addProduct({nombre, precio, descripcion});
            res.status(201).json(newProduct); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ nessage: 'Error al crear el producto'});
        }
    }


    async updateProduct(req, res) {
        const { id } = req.params;
        try {
            const { nombre, precio, descripcion } = req.body;
            if (!nombre || precio === undefined || !descripcion) {
                return res.status(400).json({ message: 'Todos los campos son requeridos' });
            }

            const updatedProduct = await productService.modifyProduct(id, { nombre, precio, descripcion });
            
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar el producto' });
        }
    }

    
    async deleteProduct(req, res) {
        try{
            const {id} = req.params;
            await productService.removeProduct(id);
            res.sendStatus(204);
        }catch (error) {
            console.error(error);
            res.statys(500).json ({ message: 'Error al eliminar el producto' });
        }
    }
}