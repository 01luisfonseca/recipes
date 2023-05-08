import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

function bootstrap() {
  NestFactory.create(AppModule).then(async app => {
    app.enableVersioning({
      type: VersioningType.URI,
    });
    console.log('PORT:', process.env.PORT || 3000);
    return app.listen(parseInt(process.env.PORT) || 3000);
  });
}
bootstrap();
