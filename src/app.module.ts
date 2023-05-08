import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvisorModule } from './advisor/advisor.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const mongoConfig = {
          uri: `${config.get<string>('DB_SERVERTYPE')}://${config.get<string>(
            'DB_USERNAME',
          )}:${config.get<string>('DB_PASSWORD')}@${config.get<string>(
            'DB_HOST',
          )}${
            config.get<string>('DB_SERVERTYPE') !== 'mongodb'
              ? ''
              : ':' + config.get<string>('DB_PORT')
          }`,
        };
        console.log('Mongo config:', mongoConfig);
        return mongoConfig;
      },
    }),
    AdvisorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
