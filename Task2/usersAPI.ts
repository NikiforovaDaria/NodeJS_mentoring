import express from 'express';
import uuidv4 from 'uuid/v4';

import { usersCollection } from './usersCollection';
import validateUser from './checkValidation';
import { User } from './user.model';

const app: express.Application = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', router);

function getAutoSuggestUsers (loginSubstring: string, limit: number):User[] {
	const collectionLimit: number = limit ? limit : usersCollection.length;

	if (!loginSubstring || loginSubstring.length === 0) return usersCollection.slice(0, collectionLimit);
	loginSubstring = loginSubstring.toLowerCase();
	return usersCollection
		.filter(user => user.login.toLowerCase().startsWith(loginSubstring))
		.sort((userA, userB) => userA.login < userB.login ? -1 : 1)
		.slice(0, collectionLimit);	
}

router.route('/')
	.get((req, res) => {
		const { login, limit } = req.query;

		const usersCollection = getAutoSuggestUsers(login, +limit);
		usersCollection.forEach((user: User) => {
			delete user.password;
		});
		(usersCollection && usersCollection.length) > 0 
			? res.status(200).json(usersCollection)
			: res.status(404).send('No one user was found :(');
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

router.route('/:id')
	.get((req, res) => {
		const user = usersCollection.find(u => u.id === req.params.id);
		if(!user) return res.status(404).send('User not found :(');
		delete user.password;
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
		res.send('User is deleted');
	});

app.listen(port, ():void => console.log(`Listenning on port ${port}`));