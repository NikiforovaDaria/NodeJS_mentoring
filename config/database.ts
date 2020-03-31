import { Sequelize } from 'sequelize';

const database = new Sequelize('NodeJS_mentoring1', 'postgres', 'root', {
	host: 'localhost',
	dialect: 'postgres',

	pool: {
		max: 5,
		min: 0,
		acquire: 3000,
		idle: 10000
	}
});

export default database;