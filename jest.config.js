// import { defaults } from 'jest-config';
export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'node'],
	verbose: true,
	testMatch: ['"**/?(*.)+(spec|test).[tj]s?(x)"'],
	globals: {'ts-jest': {'tsConfigFile': 'tsconfig.json'}},
	transform: {'^.+\\.(ts)$': 'ts-jest'}
};