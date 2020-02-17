import { Model, DataTypes } from 'sequelize';
import database from '../../../config/database';

import { GroupModel } from '../../Group/models/GroupModel';
import { UserModel } from '../../User/models/UserModel';

export class UserGroupModel extends Model {
    public userId!: number;
    public groupId!: number;
}

UserGroupModel.init({
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: 'UserModel',
			key: 'id'
		}
	},
	groupId: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: 'GroupModel',
			key: 'id'
		}
	},
}, {
	sequelize: database,
	modelName: 'userGroup',
},
);

UserModel.belongsToMany(GroupModel, {through: 'userGroup', foreignKey: 'userId'});
GroupModel.belongsToMany(UserModel, {through: 'userGroup', foreignKey: 'groupId'});