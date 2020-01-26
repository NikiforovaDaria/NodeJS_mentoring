import { Sequelize } from 'sequelize';

const database = new Sequelize('NodeJS_mentoring', 'postgres', 'root', {
	host: 'localhost',
	dialect: 'postgres', 
	// operatorsAlliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 3000,
		idle: 10000
	},
});

export default database;