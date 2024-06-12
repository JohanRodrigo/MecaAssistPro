import { Router } from 'express';
import { registerA,loginA, logoutA, profileA, verifyTokenA, forgotPassword, resetPassword} from "../controllers/auth.controllerA.js";
import {authRequired} from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import {registerSchema, loginSchema} from "../schemas/auth.schema.js";
 
const router= Router()

router.post('/registerA', validateSchema(registerSchema), registerA);
router.post('/loginA', validateSchema(loginSchema), loginA);
router.post('/logoutA', logoutA);
router.get('/verifyA', verifyTokenA);
router.get('/profileA', authRequired, profileA);
router.post('/forgot-password', forgotPassword); // Nueva ruta
router.post('/reset-password', resetPassword); // Nueva ruta

export default router;