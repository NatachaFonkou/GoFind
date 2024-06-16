import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { MongoExceptionsFilter } from "./tools/filters/mongo-exceptions/mongo-exceptions.filter";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalFilters(new MongoExceptionsFilter());

  // somewhere in your initialization file
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("GoFind  ~  Co-voiturage")
    .setDescription("Documentation de l'API du module Co-voiturage de Go-Find")
    .setVersion("0.1")
    .addTag("Go Find")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document);

  await app.listen(3000);
  Logger.verbose(
    `Application running at ${await app.getUrl()}`,
    "bootstrap function",
  );
}

bootstrap();
