import express from 'express';
import morgan from 'morgan';

import database from './database';
import { logger, stream } from './logger';

const port = process.env.PORT || 3000;

export const app: express.Application = express();
export const privateJwtKey = 'veryPrivateKey';

process
	.on('unhandledRejection', (reason, promise) => {
		console.log('Unhandled Rejection at:', promise, 'reason:', reason);
	})
	.on('uncaughtException', (err) => console.log(`Caught exception: ${err}`));

morgan.token('params', (req: express.Request): string => {
	const propsArr = [];
	for (const prop in req.params){
		propsArr.push(prop);
	}
	return propsArr.join();
});

app.use(morgan(':params :method :url :response-time'));
app.use(morgan('combined', { stream }));
app.use(express.json());

app.use('/auth', require('../Auth/routers/AuthRoute'));
app.use('/users', require('../components/User/routers/UserRoute'));
app.use('/groups', require('../components/Group/routers/GroupRoute'));

app.listen(port, async () => {
	try {
		await database.authenticate();
		await database.sync({force: false});
		await logger.info(`Listenning on port ${port}`);
	} catch (err) {
		logger.error(`Unable to connect to ${port}. Server error! ${err.message}`);
	}
}); 