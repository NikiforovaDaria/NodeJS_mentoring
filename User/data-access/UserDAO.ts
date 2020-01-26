import { UserModel } from '../models/UserModel';
import { User } from '../types/userTypes';

export class UserDAO {

	public static async getAllUsers(): Promise<UserModel[]> {
		return UserModel.findAll({
			where: {'isDeleted': false},
			attributes: {exclude: ['password']}
		})
			.then(users => users);
	}

	public static async getUserById(id: number): Promise<UserModel | null> {
		return UserModel.findOne({
			where: {
				id,
				'isDeleted': false 
			},
			attributes: {exclude: ['password']}
		});
	}
    
	public static async addUser(user: User): Promise<UserModel> {
		return UserModel.create({...user});
	}
    
	public static async updateUser(updatedUser: UserModel, id: number): Promise<[number, UserModel[]]> {
		return UserModel.update({ ...updatedUser }, { where: { id, 'isDeleted': false } });
	}
}



