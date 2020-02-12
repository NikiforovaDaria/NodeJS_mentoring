import { Model, DataTypes } from 'sequelize';
import database from '../../../config/database';

import { GroupModel } from '../../Group/models/GroupModel';
import { UserModel } from '../../User/models/UserModel';

export class UserGroupModel extends Model {
    public groupId!: string;
    public userId!: string;
}

UserGroupModel.init ({
	groupId: {
		type: DataTypes.STRING,
		allowNull: false,
		references: {
			model: 'UserModel',
			key: 'id'
		}
	},
	userId: {
		type: DataTypes.STRING,
		allowNull: false,
		references: {
			model: 'GroupModel',
			key: 'id'
		}
	}
}, {
	sequelize: database,
	modelName: 'UserGroupModel',
	tableName: 'userGroup'
});

UserModel.belongsToMany(GroupModel, {through: 'UserGroupModel'});
GroupModel.belongsToMany(UserModel, {through: 'UserGroupModel'});
