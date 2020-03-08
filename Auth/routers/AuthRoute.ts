import express from 'express';
import cors from 'cors';

import  AuthController from '../controllers/AuthController';
import { corsOptions } from '../../middlewares/cors';

const router = express.Router();

router.use(cors(corsOptions));
router.post('/login', AuthController.loginUser);

module.exports = router;