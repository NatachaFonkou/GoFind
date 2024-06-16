import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OfferCandidatesModule } from "./offer-candidates/offer-candidates.module";
import { OffersModule } from "./offers/offers.module";
import { UserAuthenticationMiddlewareMiddleware } from "./tools/middlewares/user-authentication-middleware/user-authentication-middleware.middleware";
import { VehiclesModule } from "./vehicles/vehicles.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      // 'mongodb://localhost:27017/<db_name>',
      "mongodb+srv://pacomekengali:6pNI6P5GEOckU64m@gofind.x8dv0y1.mongodb.net/?retryWrites=true&w=majority&appName=GoFind",
    ),

    MongooseModule.forFeature([]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    // Les modules

    VehiclesModule,
    OffersModule,
    OfferCandidatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // on securise toutes les routes sauf les GET
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthenticationMiddlewareMiddleware)
      .exclude({ path: "*", method: RequestMethod.GET });
  }
}
