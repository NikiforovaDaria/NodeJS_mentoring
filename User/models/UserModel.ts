import { Model, DataTypes } from 'sequelize';
import database from '../../config/database';

export class UserModel extends Model {
    public id!: number;
    public login!: string;
    public password!: string;
    public age!: number;
	public isDeleted!: boolean;
	public deletedAt!: null | Date;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

UserModel.init ({
	id: {
		type: DataTypes.STRING,
		autoIncrement: true,
		primaryKey: true,
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
	isDeleted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
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
	sequelize: database,
	modelName: 'UserModel',
	tableName: 'user'
});