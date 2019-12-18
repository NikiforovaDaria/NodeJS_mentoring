import express from 'express';
import uuidv4 from 'uuid/v4';

import { usersCollection } from './usersCollection';
import validateUser from './checkValidation';

const app: express.Application = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);

router.route('/users')
	.get((req, res) => {
		res.json(usersCollection);
	})
	.post((req, res) => {
		const { login, password, age } = req.body;
		const user = {
			id: uuidv4(),
			isDeleted: false,
			login,
			password,
			age
		};

		const { error } = validateUser(user);
		if (error) return res.status(400).send(error.details[0].message);
		usersCollection.push(user);
		res.json(user);
	});

router.route('/users/:id')
	.get((req, res) => {
		const user = usersCollection.find(u => u.id === req.params.id);
		if(!user) return res.status(404).send('User not found :(');
		res.json(user);
	})
	.put((req, res) => {
		const user = usersCollection.find(u => u.id === req.params.id);
		if(!user) return res.status(404).send('User not found :(');

		const updatedUser = Object.assign({}, user, req.body);
		const { error } = validateUser(updatedUser);
		if (error) return res.status(400).send(error.details[0].message);
		const idx = usersCollection.indexOf(user);

		usersCollection.splice(idx, 1, updatedUser);
		res.json(updatedUser);
	})
	.delete((req, res) => {
		const user = usersCollection.find(u => u.id === req.params.id);

		if(!user) return res.status(404).send('User not found :(');
		user.isDeleted = true;
		res.json(user);
	});

app.listen(port, ():void => console.log(`Listenning on port ${port}`));