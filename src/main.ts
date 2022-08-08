import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger/swagger.config';
import { join } from 'path';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	swaggerConfig(app);

	// middleware
	app.enableCors();
// 		credentials: true,
// 		origin: 'https://d160ata4dswc5.cloudfront.net',
// 		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
// 	});
	app.use(helmet());
	app.use(cookieParser());
	app.use(
		morgan(
			'[:date[iso]]\t:method :url :response-time ms\t:remote-addr - :remote-user\tHTTP/:http-version :res[content-length] ":referrer" ":user-agent',
		),
	);

	// static files
	app.useStaticAssets(join(__dirname, '..', 'public'));
	app.useStaticAssets(join(__dirname, '..', 'public/images/banners'), {
		prefix: '/bannerImage',
	});
	app.useStaticAssets(join(__dirname, '..', 'public/images/courses'), {
		prefix: '/courseImage',
	});
	app.useStaticAssets(join(__dirname, '..', 'public/videos'), {
		prefix: '/video',
	});

	// view engine
	app.setViewEngine('pug');
	app.setBaseViewsDir(`${__dirname}/../views`);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
			validateCustomDecorators: true,
			disableErrorMessages: false,
		}),
	);

	await app.listen(3000);
}
bootstrap();
