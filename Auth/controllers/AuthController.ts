import { AuthService } from '../services/AuthService';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { privateJwtKey } from '../../config/app';


export default class AuthController {
	public static async loginUser(req: Request, res: Response) {
		const { login, password } = req.query;
		try {
			const addedUser = await AuthService.loginUser(login, password);
			if (addedUser === null) {
				return res.status(401).send('Auth failed');
			} else {
				const payload = {id: addedUser.id, email: addedUser.login};
				const token = jwt.sign( payload, privateJwtKey, {expiresIn: '1h'});
				return res.status(200).json({addedUser, token});
			}			
		} catch(err) {
			res.status(500).send('User not found :(');
		}
	}
}