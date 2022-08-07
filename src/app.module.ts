import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { TypeOrmConfigService } from './configs/database/db.config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { LectureModule } from './modules/lecture/lecture.module';
import { UserModule } from './modules/user/user.module';
import { HistoryModule } from './modules/history/history.module';
import { AdminModule } from './modules/admin/admin.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';
import { CompleteModule } from './modules/complete/complete.module';
import { BannerModule } from './modules/banner/banner.module';
import { HashtagModule } from './modules/hashtag/hashtag.module';
import { SeedModule } from './modules/seed/seed.module';
import { FileModule } from './modules/file/file.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfigService,
		}),
		AdminModule,
		AuthModule,
		CourseModule,
		HistoryModule,
		LectureModule,
		UserModule,
		WishlistModule,
		BookmarkModule,
		QuestionModule,
		AnswerModule,
		HistoryModule,
		EnrollmentModule,
		CompleteModule,
		BannerModule,
		HashtagModule,
		SeedModule,
		FileModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
