// En tu archivo de rutas para las operaciones CRUD de clientes
import { Router } from 'express';
import Cliente from '../models/cliente.model.js'; // Importa el modelo de cliente

const router = Router();

// Ruta para crear un nuevo cliente
router.post('/', async (req, res) => {
  try {
    // Crea una nueva instancia del modelo Cliente utilizando los datos del cuerpo de la solicitud
    const nuevoCliente = new Cliente(req.body);
    // Guarda el cliente en la base de datos
    const clienteGuardado = await nuevoCliente.save();
    // Envía la respuesta con el cliente guardado
    res.status(201).json(clienteGuardado);
  } catch (error) {
    // Si hay un error, envía una respuesta de error al cliente
    res.status(500).json({ error: error.message });
  }
});

// Otras rutas para las operaciones CRUD de clientes

export default router;
