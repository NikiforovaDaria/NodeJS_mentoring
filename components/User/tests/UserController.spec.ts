import request from 'supertest';
import { app } from '../../../config/app';
import { AuthService } from '../../../Auth/services/AuthService';

jest.mock('../services/UserService.ts');
jest.mock('../../../Auth/services/AuthService.ts');

describe('UserController', () => {

	test('should test1', async () => {
		const userData = {
			login: 'login',
			password: 'password',
		};
		const loginSpy = spyOn(AuthService, 'loginUser').and.returnValue({...userData, token: 'testToken'});
		const result = await request(app)
			.post('/api/user/login')
			.send(userData);
		expect(result.status).toBe(200);
		expect(loginSpy).toHaveBeenCalledWith(userData.login, userData.password);
		expect(result.body).toEqual({ token: 'testToken'});
	});
});