import {transports, createLogger, format} from 'winston';

export const logger = createLogger({
	format: format.combine(format.timestamp(), format.json()),
	transports: [
		new transports.File({ level: 'info', filename: 'logger/info.log'}),
		new transports.File({ level: 'error', filename: 'logger/error.log'})

	],
	exceptionHandlers: [
		new transports.File({ filename: 'logger/exceptions.log' })
	],
	exitOnError: false,
});

export const stream = {
	write: (message: string) => {
		logger.error(message);
	},
};
