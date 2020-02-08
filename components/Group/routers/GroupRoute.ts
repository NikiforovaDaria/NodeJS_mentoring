import express from 'express';
import  GroupController from '../controllers/GroupController';

const router = express.Router();

router.get('/', GroupController.getAllGroups);
router.get('/:id', GroupController.getGroupById);
router.post('/', GroupController.addGroup);
router.put('/:id', GroupController.updateGroup);
router.delete('/:id', GroupController.deleteGroup);

module.exports = router;