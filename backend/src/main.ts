import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { BadRequestExceptionFilter } from "./filters/BadRequestExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Campfire")
    .setDescription("The campfire API description")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true, skipMissingProperties: true }));
  app.useGlobalFilters(new BadRequestExceptionFilter());
  await app.listen(3000);
}
bootstrap();
