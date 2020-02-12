import { GroupModel } from '../models/GroupModel';
import { Group } from '../types/GroupTypes';

export class GroupDAO {

	public static async getAllGroups(): Promise<GroupModel[]> {
		return GroupModel.findAll({
			attributes: {exclude: ['password']}
		})
			.then(groups => groups);
	}

	public static async getGroupById(id: string): Promise<GroupModel | null> {
		return GroupModel.findOne({
			where: { id },
			attributes: {exclude: ['password']}
		});
	}
    
	public static async addGroup(group: Group): Promise<GroupModel> {
		return GroupModel.create({...group});
	}
    
	public static async updateGroup(updatedGroup: GroupModel, id: string): Promise<[number, GroupModel[]]> {
		return GroupModel.update({ ...updatedGroup }, { where: { id } });
	}

	public static async deleteGroup(id: string): Promise<number> {
		return GroupModel.destroy({ where: { id }});
	}
}



