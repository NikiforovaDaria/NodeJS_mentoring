import { UserModel } from '../models/UserModel';
import { User } from '../types/userTypes';

export class UserDAO {

	public static async getAllUsers(): Promise<UserModel[]> {
		return UserModel.findAll({
			attributes: {exclude: ['password']}
		})
			.then(users => users);
	}

	public static async getUserById(id: string): Promise<UserModel | null> {
		return UserModel.findOne({
			where: {
				id,
				'deletedAt': null
			},
			attributes: {exclude: ['password']}
		});
	}

	public static async getUsersByIds(ids: string[]): Promise<UserModel[] | null> {
		return UserModel.findAll({
			where: {
				id: ids,
				'deletedAt': null 
			},
			attributes: {exclude: ['password']}
		});
	}
    
	public static async addUser(user: User): Promise<UserModel> {
		return UserModel.create({...user});
	}

	public static async updateUser(updatedUser: UserModel, id: string): Promise<[number, UserModel[]]> {
		return UserModel.update({ ...updatedUser }, { where: { id, 'deletedAt': null } });
	}

	public static async deleteUser(id: string): Promise<number> {
		return UserModel.destroy({ where: { id }});
	}
}



