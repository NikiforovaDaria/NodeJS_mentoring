import express from 'express';
import database from './database';
import morgan from 'morgan';

const app: express.Application = express();
const port = process.env.PORT || 3000;

morgan.token('params', (req: express.Request): string => {
	const propsArr = [];
	for (const prop in req.params){
		propsArr.push(prop);
	}
	return propsArr.join();
});

app.use(morgan(':params :method :url :response-time'));

app.use(express.json());
app.use('/users', require('../components/User/routers/UserRoute'));
app.use('/groups', require('../components/Group/routers/GroupRoute'));

app.listen(port, async () => {
	try {
		await database.authenticate();
		await database.sync({force: false});
	} catch (err) {
		console.log(`Unable to connect to ${port}`);
	}
	():void => console.log(`Listenning on port ${port}`);
}); 