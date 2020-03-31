import * as jwt from 'jsonwebtoken';

import { UserDAO } from '../../components/User/data-access/UserDAO';
import { privateJwtKey } from '../../config/app';
import { User } from '../../components/User/types/UserTypes';

export class AuthService {

	public static async loginUser(login: string, password: string) {
		const loggedUser = await UserDAO.loginUser(login, password);
		if(loggedUser) {
			return await this.getTokenForLoggedUser(loggedUser);
		} else {
			throw ('User not found');
		}
	}

	private static async getTokenForLoggedUser(loggedUser: User ) {
		const payload = {id: loggedUser.id, email: loggedUser.login};
		return jwt.sign( payload, privateJwtKey, {expiresIn: '1h'});
	}
}