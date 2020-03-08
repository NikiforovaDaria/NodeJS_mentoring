import { UserDAO } from '../../components/User/data-access/UserDAO';

export class AuthService {

	public static async loginUser(login: string, password: string) {
		return await UserDAO.loginUser(login, password);
	}
}