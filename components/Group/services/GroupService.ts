import { UserModel } from '../../User/models/UserModel';
import { GroupModel }  from '../models/GroupModel';
import { GroupDAO } from '../data-access/GroupDAO';
import { Group } from '../types/GroupTypes';
import { UserGroupDAO } from '../../UserGroup/data-access/UserGroupDAO';


export class GroupService {

	public static async getAllGroups(): Promise<GroupModel[]> {
		return await GroupDAO.getAllGroups();
	}

	public static async getGroupById(id: string): Promise<GroupModel | null> {
		return await GroupDAO.getGroupById(id);
	}

	public static async addGroup(group: Group) {
		return await GroupDAO.addGroup({...group});
	}

	public static async addUsersToGroup(group: GroupModel, users: UserModel[]): Promise<any> {
		return await UserGroupDAO.addUsersToGroup({ group, users });
	}

	public static async updateGroup(updatedGroup: GroupModel, id: string) {
		return await GroupDAO.updateGroup(updatedGroup, id);
	}

	public static async deleteGroup(id: string) {
		return await GroupDAO.deleteGroup(id);
	}
}