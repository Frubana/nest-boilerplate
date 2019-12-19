import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassValidatorPipe } from './commons/class-validator.pipe';

export const prefix = 'microservice-prefix';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ClassValidatorPipe());
  await app.listen(3000);
}
bootstrap();
