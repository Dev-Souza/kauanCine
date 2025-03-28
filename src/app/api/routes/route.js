import express from 'express'
import {create} from '../controllers/UserController';

const router = express.Router();

// ROTAS DE USERS
router.post('/users', create);


export default router;