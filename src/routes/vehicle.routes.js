import { Router } from 'express';
import { getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicle.controller.js';
import { fillUserData } from '../Middlewares/vehicle.middleware.js';


const router = Router();

// Rutas para manipular vehículos
router.get('/vehicles/all', fillUserData, getAllVehicles); // Obtener todos los vehículos
router.get('/vehicles/:id', fillUserData, getVehicleById); // Obtener un vehículo por su ID
router.post('/vehicles', fillUserData, createVehicle); // Crear un nuevo vehículo
router.put('/vehicles/:id', fillUserData, updateVehicle); // Actualizar un vehículo existente
router.delete('/vehicles/:id', fillUserData, deleteVehicle); // Eliminar un vehículo existente


export default router;