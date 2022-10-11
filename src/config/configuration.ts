export interface Configuration {
	port: number;
	env: string;
	mock: {
		login: string;
		password: string;
	};
	mongo: {
		uri: string;
		dbName: string;
		localUri: string;
		atlas: {
			login: string;
			password: string;
		};
		secret: string;
	};
	mailer: {
		host: string;
		port: number;
		email: string;
		password: string;
		secret: string;
		secretPassword: string;
	};
}

export const loadEnv = (): Configuration => ({
	port: Number(process.env.PORT) || 3000,
	env: process.env.NODE_ENV || 'development',
	mock: {
		login: process.env.LOGIN as string,
		password: process.env.PASSWORD as string,
	},
	mongo: {
		uri: process.env.MONGO_URI as string,
		dbName: process.env.DB_NAME as string,
		localUri: process.env.LOCAL_MONGO_URI as string,
		atlas: {
			password: process.env.ATLAS_PASSWORD as string,
			login: process.env.ATLAS_LOGIN as string,
		},
		secret: process.env.SECRET as string,
	},
	mailer: {
		host: process.env.SMTP_HOST as string,
		port: Number(process.env.SMTP_PORT),
		email: process.env.SMTP_EMAIL as string,
		password: process.env.SMTP_PASSWORD as string,
		secret: process.env.MAILER_SECRET as string,
		secretPassword: process.env.MAILER_SECRET_PASSWORD as string,
	},
});
