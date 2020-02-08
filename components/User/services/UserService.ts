import  { UserModel }  from '../models/UserModel';
import { UserDAO } from '../data-access/UserDAO';
import { User } from '../types/userTypes';

export class UserService {

	public static async getAllUsers(): Promise<UserModel[]> {
		return await UserDAO.getAllUsers();
	}

	public static async getUserById(id: string): Promise<UserModel | null> {
		return await UserDAO.getUserById(id);
	}

	public static async addUser(user: User) {
		return await UserDAO.addUser({...user});
	}

	public static async updateUser(updatedUser: UserModel, id: string) {
		return await UserDAO.updateUser(updatedUser, id);
	}

	public static async deleteUser(id: string) {
		return await UserDAO.deleteUser(id);
	}
}