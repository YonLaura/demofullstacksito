const db = require('../config/db');

class ProductModel {
    async getAllProducts(){
        const result = await db.query('SELECT * FROM products')
        return result.rows;
    }

    async getProductById(id){
        const result = await db.query('SELECT FROM * producto WHERE id = $1', [id]);
        return result-rows[0];
    }

    async createProduct([nombre, precio, description]) {
        const result = await db.querry(
            'INSERT INTO producto (nombre, precio, description)VALUES($1, $2, $3)RETURNING *',
            [nombre, precio, description]
        );
        return result.rows[0];
    }

    async updateProduct (id, [nombre, precio, description]){
        const result = await db.query(
            'UPDATE producto SET nombre =$1, precio = $2, descripcio= $3 WHERE id= $4 RETURNING *',
            [nomnbre, precio, description, id]
        );
        return result.rows[0];
    }

    async deleteProduct (id){
        await db.query('delete from producto where id = $1',[id]);
    }
}

module.exports = new ProductModel();