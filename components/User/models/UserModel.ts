import { Model, DataTypes } from 'sequelize';
import uuid = require('uuid');

import database from '../../../config/database';
import { GroupModel } from '../../Group/models/GroupModel';

export class UserModel extends Model {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
	public deletedAt!: null | Date;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

UserModel.init ({
	id: {
		allowNull: false,
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: () => uuid()
	},
	login: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW
	},
	deletedAt: {
		type: DataTypes.DATE
	}
}, {
	timestamps: true,
	paranoid: true,
	sequelize: database,
	modelName: 'UserModel',
	tableName: 'Users'
});

UserModel.belongsToMany(GroupModel, {
	through: 'UserGroup',
	as: 'groups',
	foreignKey: 'user_id'
});