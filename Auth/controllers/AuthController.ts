import { AuthService } from '../services/AuthService';
import { Request, Response } from 'express';


export default class AuthController {
	public static async loginUser(req: Request, res: Response) {
		const { login, password } = req.query;
		try {
			const token = await AuthService.loginUser(login, password);
			return res.status(200).json(token);
		} catch(err) {
			res.status(401).send(err);
		}
	}
}