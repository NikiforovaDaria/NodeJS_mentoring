import  { UserModel }  from '../models/UserModel';
import { UserDAO } from '../data-access/UserDAO';
import { User } from '../types/userTypes';

export class UserService {

	public static async getAllUsers(): Promise<UserModel[]> {
		try {
			return await UserDAO.getAllUsers();
		} catch (err) {
			throw Error(`Something went wong while getting all users: ${err.message}`);
		}
	}

	public static async getUserById(id: number): Promise<UserModel | null> {
		try {
			return await UserDAO.getUserById(id);
		} catch (err) {
			throw Error(`Something went wong while getting user by id №${id}: ${err.message}`);
		}
	}

	public static async addUser(user: User) {
		try {
			return await UserDAO.addUser({...user, isDeleted: false});
		} catch (err) {
			throw Error(`Something went wong while adding user: ${err.message}`);
		}
	}

	public static async updateUser(updatedUser: UserModel, id: number) {
		try {
			return await UserDAO.updateUser(updatedUser, +id);
		} catch (err) {
			throw Error(`Something went wong while updating user with id №${id}: ${err.message}`);
		}
	}

	public static async deleteUser(deletedUser: UserModel, id: number) {
		try {
			deletedUser.isDeleted = true;
			return await UserDAO.updateUser(deletedUser, +id);
		} catch (err) {
			throw Error(`Something went wong while deleteng user with id №${id}: ${err.message}`);
		}
	}
}