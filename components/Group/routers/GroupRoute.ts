import express from 'express';
import cors from 'cors';

import  GroupController from '../controllers/GroupController';
import { corsOptions } from '../../../middlewares/cors';

const router = express.Router();

router.use(cors(corsOptions));
router.get('/', GroupController.getAllGroups);
router.get('/:id', GroupController.getGroupById);
router.post('/', GroupController.addGroup);
router.put('/:id', GroupController.updateGroup);
router.post('/:groupId/users/:userIds', GroupController.addUsersToGroup);
router.delete('/:id', GroupController.deleteGroup);

module.exports = router;