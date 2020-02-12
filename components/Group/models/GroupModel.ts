import { Model, DataTypes } from 'sequelize';
import uuid = require('uuid');

import database from '../../../config/database';
import { Permission } from '../types/GroupTypes';

export class GroupModel extends Model {
    public id!: string;
    public name!: Array<string>;
    public permissions!: Array<Permission>;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

GroupModel.init ({
	id: {
		allowNull: false,
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: () => uuid()
	},
	name: {
		type: DataTypes.STRING,
	},
	permissions: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		validate: {
			isValidPermission: function(permissions: Array<Permission>) {
				const lofsOfAllowedPermissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

				permissions.forEach(function(permission) {
					if (lofsOfAllowedPermissions.indexOf(permission) === -1) {
						throw new Error(`Permission ${permission} is not allowed`);
					}
				});
			}
		}
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW
	}
}, {
	timestamps: true,
	sequelize: database,
	modelName: 'GroupModel',
	tableName: 'groups'
});
