import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
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
import { QuizzesModule } from './quizzes/quizzes.module';
import { Quiz } from './quizzes/quiz-entity';
import { Question } from './questions/question-entity';
import { Option } from './options/option-entity';
import { Response } from './responses/response-entity';
import { Score } from './score/score-entity';
import { GeminiModule } from './gemini/gemini.module';
import { GeminiService } from './gemini/gemini.service';
import { GeminiController } from './gemini/gemini.controller';
import { CountryapiModule } from './countryapi/countryapi.module';
import { RolesGuard } from './guards/user-guards';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonLoader,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),

    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 0, // seconds
      max: 10, // maximum number of items in cache
      isGlobal: true,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: seconds(30),
        limit: 2,
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
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
        entities: [User, Quiz, Question, Option, Response, Score],
        synchronize: configService.get('DB_SYNCHRONIZE'),
        logging: true,
      }),
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },

        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
      inject: [ConfigService],
    }),

    QuestionsModule,
    ResponsesModule,
    QuizzesModule,
    UserModule,
    OptionsModule,
    ScoreModule,
    GeminiModule,
    CountryapiModule,
  ],
  controllers: [
    AppController,
    QuestionsController,
    ScoreController,
    GeminiController,
  ],
  providers: [
    AppService,
    QuestionsService,
    ScoreService,
    GeminiService,
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
