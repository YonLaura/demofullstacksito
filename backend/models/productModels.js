const db = require('../config/db');

class ProductModel {
    async getAllProducts(){
        const result = await db.query('SELECT * FROM productos');
        return result.rows;
    }

    async getProductById(id){
        const result = await db.query('SELECT * FROM productos WHERE id = $1', [id]);
        return result.rows[0];  // Corregido el error de sintaxis
    }

    async createProduct([nombre, precio, descripcion]) {
        const result = await db.query(  // Corregido el error tipográfico en 'query'
            'INSERT INTO producto (nombre, precio, descripcion) VALUES ($1, $2, $3) RETURNING *',  // Corregido 'description' a 'descripcion'
            [nombre, precio, descripcion]
        );
        return result.rows[0];
    }

    async updateProduct(id, [nombre, precio, descripcion]){
        const result = await db.query(
            'UPDATE producto SET nombre = $1, precio = $2, descripcion = $3 WHERE id = $4 RETURNING *',  // Corregido 'descripcio' a 'descripcion'
            [nombre, precio, descripcion, id]
        );
        return result.rows[0];
    }

    async deleteProduct(id){
        await db.query('DELETE FROM producto WHERE id = $1', [id]);
    }
}

module.exports = new ProductModel();
