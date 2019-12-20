import { User } from './user.model';
import uuidv4 from 'uuid/v4';

export const usersCollection: User[] = [
	{
		id: uuidv4(),
		login: 'one',
		password: '1aA',
		age: 10,
		isDeleted: false,
	},
	{
		id: uuidv4(),
		login: 'two',
		password: '2bB',
		age: 20,
		isDeleted: false,
	},
	{
		id: uuidv4(),
		login: 'three',
		password: '3cC',
		age: 30,
		isDeleted: false,
	},
	{
		id: uuidv4(),
		login: 'four',
		password: '4eE',
		age: 40,
		isDeleted: false,
	},
	{
		id: uuidv4(),
		login: 'five',
		password: '5fF',
		age: 50,
		isDeleted: false,
	}			
];