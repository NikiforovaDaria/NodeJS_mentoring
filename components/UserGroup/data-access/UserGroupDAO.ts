import { Transaction } from 'sequelize/types';

import { UserGroupModel } from '../models/UserGroupModel';
import { GroupModel } from '../../Group/models/GroupModel';
import { UserModel } from '../../User/models/UserModel';
import database from '../../../config/database';


export class UserGroupDAO {
	public static addUsersToGroup({ group, users }: { group: GroupModel; users: UserModel[]; }): Promise<void[]> {
		return database.transaction((t: Transaction) => {
			return Promise.all(users.map((user: UserModel) => {
				UserGroupModel.create(
					{ userId: user.id, groupId: group.id},
					{transaction: t}
				);
			}));
		});
	}
}