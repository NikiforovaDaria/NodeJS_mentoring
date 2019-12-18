import * as Joi from '@hapi/joi';
import { User } from './user.model';

export default function validateUser (user: User) {
	const schema = Joi.object({
		id: Joi.string().required(),
        
		login: Joi.string()
			.min(3)
			.max(30)
			.required(),

		password: Joi.string()
			.alphanum()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
			.required(),

		age: Joi.number()
			.integer()
			.min(4)
			.max(130)
			.required(),

		isDeleted: Joi.boolean().required()
	});
	return schema.validate(user);
} 