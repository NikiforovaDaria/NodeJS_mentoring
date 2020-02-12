import { GroupService } from '../services/GroupService';
import { Request, Response } from 'express';
import { UserService } from '../../User/services/UserService';


export default class GroupController {
	public static async getAllGroups(req: Request, res: Response) {
		try {
			const groups = await GroupService.getAllGroups();
			return res.status(200).json(groups);
		} catch(err) {
			res.status(500).json({ error: err.message });
		}
	}

	public static async getGroupById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const group = await GroupService.getGroupById(id);
			group
				? res.status(200).json(group)
				: res.status(500).send(`Group with ${id} not found :(`);
		} catch(err) {
			res.status(500).send(`Group with ${id} not found :(`);
		}
	}

	public static async addGroup(req: Request, res: Response) {
		const group = req.body;
		try {
			const addedGroup = await GroupService.addGroup(group);
			return res.status(200).json(addedGroup);

		} catch(err) {
			res.status(500).send(err.message);
		}
	}

	public static async addUsersToGroup(req: Request, res: Response) {
		const { groupId, userIds } = req.params;
		const arrOfuserIds = userIds.split(',');

		try {
			const users = await UserService.getUsersByIds(arrOfuserIds);
			const group = await GroupService.getGroupById(groupId);
			if (!users) return res.status(500).send('User not found :(');
			if (!group) return res.status(500).send('Group not found :(');
			await GroupService.addUsersToGroup(group, users);

		} catch (err) {
			console.log('dfghjkl;');
			
		}
	}

	// public static async addUsersToGroup(req: Request, res: Response) {
	// 	const { ids, id } = req.params;
		
	// 	try {
	// 		const user = await UserService.getUserById(ids);
	// 		const group = await GroupService.getGroupById(id);
	// 		if (!user) return res.status(500).send('User not found :(');
	// 		if (!group) return res.status(500).send('Group not found :(');
	// 		await UserService.addUsersToGroup(user, id);
	// 		return res.status(200).send('User is added to group');

	// 	} catch(err) {
	// 		res.status(500).send(err.message);
	// 	}
	// }

	public static async updateGroup(req: Request, res: Response) {
		const { id } = req.params;
		console.log(90909090, id);
		const updatedGroup = req.body;
		try {
			const group = await GroupService.getGroupById(id);
			if (!group) return res.status(500).send('Group not found :(');

			await GroupService.updateGroup(updatedGroup, id);
			return res.status(200).send('Group is updated');
		} catch(err) {
			res.status(500).send('Group not found :(');
		}
	}

	public static async deleteGroup(req: Request, res: Response) {
		const { id } = req.params;
		
		try {
			const deletedGroup = await GroupService.getGroupById(id);
			if (!deletedGroup) return res.status(500).send('Group not found :(');

			await GroupService.deleteGroup(id);
			return res.status(200).send('Group is deleted');
		} catch(err) {
			res.status(500).send('Group not found :(');
		}
	}
}