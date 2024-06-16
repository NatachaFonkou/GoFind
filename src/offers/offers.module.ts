import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  OfferCandidate,
  OfferCandidateSchema,
} from "src/offer-candidates/entities/offer-candidate.entity";
import { Vehicle, VehicleSchema } from "src/vehicles/entities/vehicle.entity";
import { VehiclesRepository } from "src/vehicles/vehicles.repository";
import { Offer, OfferSchema } from "./entities/offer.entity";
import { OffersController } from "./offers.controller";
import { OffersRepository } from "./offers.repository";
import { OffersService } from "./offers.service";
import { OfferCandidatesRepository } from "src/offer-candidates/offer-candidates.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Offer.name,
        schema: OfferSchema,
      },
      {
        name: Vehicle.name,
        schema: VehicleSchema,
      },

      {
        name: OfferCandidate.name,
        schema: OfferCandidateSchema,
      },
    ]),
  ],
  controllers: [OffersController],
  providers: [
    {
      provide: "IOffersService",
      useClass: OffersService,
    },

    {
      provide: "IOffersRepository",
      useClass: OffersRepository,
    },

    {
      provide: "IVehiclesRepository",
      useClass: VehiclesRepository,
    },

    {
      provide: "IOfferCandidatesRepository",
      useClass: OfferCandidatesRepository,
    },
  ],
})
export class OffersModule {}
