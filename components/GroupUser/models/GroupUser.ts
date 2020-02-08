import { Model, DataTypes } from 'sequelize';
import database from '../../../config/database';

export class UserGroupModel extends Model {
    public group_id!: string;
    public user_id!: string;
}

UserGroupModel.init ({
	user_id: {
		type: DataTypes.STRING,
		allowNull: false,
		references: {
			model: 'UserModel',
			key: 'id'
		}
	},
	group_id: {
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
	tableName: 'UserGroup'
});
