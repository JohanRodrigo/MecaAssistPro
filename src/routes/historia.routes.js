import express from 'express';
import { getAllHistorial, createHistoria, updateHistoria, deleteHistoria } from '../controllers/historiaController.js';

const router = express.Router();

router.get('/historial', getAllHistorial);
router.post('/historial', createHistoria);
router.put('/historial/:id', updateHistoria);
router.delete('/historial/:id', deleteHistoria);

export default router;
