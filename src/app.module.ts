import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QizzesModule } from './qizzes/qizzes.module';
import { QuestionsService } from './questions/questions.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsModule } from './questions/questions.module';
import { OptionsModule } from './options/options.module';
import { ResponsesModule } from './responses/responses.module';
import { ScoreService } from './score/score.service';
import { ScoreController } from './score/score.controller';
import { ScoreModule } from './score/score.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user-entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql', 
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User], 
        synchronize: configService.get('DB_SYNCHRONIZE'),
        logging: true, 
      }),
    }),
    
    UserModule, QizzesModule, QuestionsModule, OptionsModule, ResponsesModule, ScoreModule],
  controllers: [AppController, QuestionsController, ScoreController],
  providers: [AppService, QuestionsService, ScoreService],
})
export class AppModule {}
