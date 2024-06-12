import { Router } from 'express';
import { getAllItems, createItem, updateItem, deleteItem } from '../controllers/seguimientoController.js';

const router = Router();

router.get('/seguimiento', getAllItems);
router.post('/seguimiento', createItem);
router.put('/seguimiento/:id', updateItem);
router.delete('/seguimiento/:id', deleteItem);

export default router;
