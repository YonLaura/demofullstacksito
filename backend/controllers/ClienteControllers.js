const clienteService = require('../services/ClienteService');

class ClienteController {
   
    async getClientes(req, res) {
        try {
            const clientes = await clienteService.getClientes();
            res.json(clientes);
        } catch (error) {
            console.error("ERROR EN getClientes:", error);
            res.status(500).json({ message: 'Error al obtener los clientes' });
        }
    }

    async getClientePorDNI(req, res) {
        try {
            const { dni } = req.params;
            const cliente = await clienteService.getClientePorDNI(dni);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }
            res.json(cliente);
        } catch (error) {
            console.error("ERROR EN getClientePorDNI:", error);
            res.status(500).json({ message: 'Error al obtener el cliente por DNI' });
        }
    }

    async createCliente(req, res) {
        try {
            const { dni, nombre, apellido_paterno, apellido_materno, fecha_nacimiento } = req.body;
            const newCliente = await clienteService.addCliente({ dni, nombre, apellido_paterno, apellido_materno, fecha_nacimiento });
            res.status(201).json(newCliente);
        } catch (error) {
            console.error("ERROR EN createCliente:", error);
            res.status(500).json({ message: 'Error al crear el cliente' });
        }
    }

    async updateCliente(req, res) {
        try {
            const { id } = req.params;
            const { dni, nombre, apellido_paterno, apellido_materno, fecha_nacimiento } = req.body;

            const clienteExistente = await clienteService.getClienteById(id);
            if (!clienteExistente) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }

            const updatedCliente = await clienteService.modifyCliente(id, { dni, nombre, apellido_paterno, apellido_materno, fecha_nacimiento });
            res.json(updatedCliente);
        } catch (error) {
            console.error("ERROR EN updateCliente:", error);
            res.status(500).json({ message: 'Error al actualizar el cliente' });
        }
    }

    async deleteCliente(req, res) {
        try {
            const { id } = req.params;

            const clienteExistente = await clienteService.getClienteById(id);
            if (!clienteExistente) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }

            await clienteService.removeCliente(id);
            res.sendStatus(204); 
        } catch (error) {
            console.error("ERROR EN deleteCliente:", error);
            res.status(500).json({ message: 'Error al eliminar el cliente' });
        }
    }
}

module.exports = new ClienteController();
a