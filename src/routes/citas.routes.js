// routes/citasRoutes.js
import { Router } from 'express';
import { getCitas, createCita, updateCita, deleteCita, registerCita, getCitasByEmail } from '../controllers/citasController.js';

const router = Router();

router.get('/citas', getCitas);
router.post('/citas', createCita);
router.put('/citas/:id', updateCita);
router.delete('/citas/:id', deleteCita);
router.post('/citas', registerCita);
router.get('/citas/email/:email', getCitasByEmail);

export default router;
