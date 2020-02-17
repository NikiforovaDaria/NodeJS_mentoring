import express from 'express';
import database from './database';

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', require('../components/User/routers/UserRoute'));
app.use('/groups', require('../components/Group/routers/GroupRoute'));

app.listen(port, async () => {
	try {
		await database.authenticate();
		await database.sync({force: true});
	} catch (err) {
		console.log(`Unable to connect to ${port}`);
	}
	():void => console.log(`Listenning on port ${port}`);
}); 