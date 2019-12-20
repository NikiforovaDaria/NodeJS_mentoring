import express from 'express';
import uuidv4 from 'uuid/v4';

import { usersCollection } from './usersCollection';
import validateUser from './checkValidation';

const app: express.Application = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', router);

function getAutoSuggestUsers (loginSubstringin:string, limit: string):any {
	if (!loginSubstringin || loginSubstringin.length === 0) return usersCollection;
	loginSubstringin = loginSubstringin.toLowerCase();
	const numLimit: number = limit ? +limit : usersCollection.length;

	const filteredAndSortedUsersCollection = usersCollection.filter(user => {
		return user.login.startsWith(loginSubstringin);
	}).sort((userA, userB) => {
		return userA.login < userB.login ? -1 : 1;
	});
	const limitCollection = Math.min(
			filteredAndSortedUsersCollection.length, 
			numLimit);				
	return filteredAndSortedUsersCollection.slice(0, limitCollection);
	
}

router.route('/')
	.get(function (req, res, next) {
		if(Object.keys(req.query).length !== 0){
			const usersCollection = getAutoSuggestUsers(req.query.login, req.query.limit);
			(usersCollection && usersCollection.length) > 0
				? res.json(usersCollection)
				: res.status(404).send('No one user was found :(');
			} else {
				res.json(usersCollection);
			}
		next();
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