import { UserService } from '../../services/userService';
import { Request, Response } from 'express';


export default class UserController {
	public static async getAllUsers(req: Request, res: Response) {
		try {
			const users = await UserService.getAllUsers();
			return res.status(200).json(users);
		} catch(err) {
			res.status(400).json({ error: err.message });
		}
	}

	public static async getUserById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const user = await UserService.getUserById(+id);
			user 
				? res.status(200).json(user)
				: res.status(404).send(`User with ${id} not found :(`);

		} catch(err) {
			res.status(404).send(`User with ${id} not found :(`);
		}
	}

	public static async addUser(req: Request, res: Response) {
		const user = req.body;
		try {
			const addedUser = await UserService.addUser(user);
			return res.status(200).json(addedUser);

		} catch(err) {
			res.status(400).send(err.details[0].message);
		}
	}

	public static async updateUser(req: Request, res: Response) {
		const { id } = req.params;
		const updatedUser = req.body;
		try {
			const user = await UserService.getUserById(+id);
			if (!user) return res.status(404).send('User not found :(');

			await UserService.updateUser(updatedUser, +id);
			return res.status(200).send('User is updated');
		} catch(err) {
			res.status(404).send('User not found :(');
		}
	}

	public static async deleteUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const deletedUser = await UserService.getUserById(+id);
			if (!deletedUser) return res.status(404).send('User not found :(');

			await UserService.deleteUser(deletedUser, +id);
			return res.status(200).send('User is deleted');
		} catch(err) {
			res.status(404).send('User not found :(');
		}
	}

	
}