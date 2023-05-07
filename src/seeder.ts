import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import {
  CallType,
  CallerService,
} from './shared/modules/caller/caller.service';

let cachedServer: INestApplication;

async function bootstrapServer(): Promise<INestApplication> {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    await nestApp.init();
    cachedServer = nestApp;
  }

  return cachedServer;
}

(async () => {
  cachedServer = await bootstrapServer();
  const callerSrv = cachedServer.get(CallerService);
  const time = Date.now();
  console.log('*******');
  console.log('Starting Seed Action');
  console.log('*******');
  const resultsRestaurants = await callerSrv.seed(CallType.restaurant);
  console.log('*******');
  console.log('Seed Restaurants results', resultsRestaurants);
  console.log('*******');
  const resultsRecipes = await callerSrv.seed(CallType.recipe);
  console.log('*******');
  console.log('Seed Recipes results', resultsRecipes);
  console.log('*******');
  console.log('*******');
  console.log(`Seed Action Completed. Take ${Date.now() - time} millis`);
  console.log('*******');
  process.exit(0);
})();
