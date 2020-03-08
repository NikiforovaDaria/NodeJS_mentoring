import express from 'express';
import cors from 'cors';

import  UserController from '../controllers/UserController';
import { checkJwt } from '../../../middlewares/checkJwt';
import { corsOptions } from '../../../middlewares/cors';

const router = express.Router();

router.use(cors(corsOptions));
router.get('/', checkJwt, UserController.getAllUsers);
router.get('/:id', checkJwt, UserController.getUserById);
router.post('/', checkJwt, UserController.addUser);
router.put('/:id', checkJwt, UserController.updateUser);
router.delete('/:id', checkJwt, UserController.deleteUser);

module.exports = router;