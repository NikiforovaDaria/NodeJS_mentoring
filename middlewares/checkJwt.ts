import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { privateJwtKey } from '../config/app';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	const token = <string>req.headers['x-access-token'];

	try {
		jwt.verify(token, privateJwtKey);
	} catch {
		return res.status(401).send('Unauthorized');
	}

	next();
};