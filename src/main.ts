import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  console.log('PORT:', process.env.PORT || 3000);
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
