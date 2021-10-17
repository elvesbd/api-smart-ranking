import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionsFilters } from './shared/filters/http-exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionsFilters());

  await app.listen(8080);
}
bootstrap();
