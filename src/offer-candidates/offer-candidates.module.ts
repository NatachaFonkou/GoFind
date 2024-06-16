import { Module } from "@nestjs/common";
import { OfferCandidatesService } from "./offer-candidates.service";
import { OfferCandidatesRepository } from "./offer-candidates.repository";
import { OfferCandidatesController } from "./offer-candidates.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Offer, OfferSchema } from "src/offers/entities/offer.entity";
import { Vehicle, VehicleSchema } from "src/vehicles/entities/vehicle.entity";
import {
  OfferCandidate,
  OfferCandidateSchema,
} from "./entities/offer-candidate.entity";
import { OffersRepository } from "src/offers/offers.repository";

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
  controllers: [OfferCandidatesController],
  providers: [
    {
      provide: "IOfferCandidatesService",
      useClass: OfferCandidatesService,
    },
    {
      provide: "IOfferCandidatesRepository",
      useClass: OfferCandidatesRepository,
    },

    {
      provide: "IOffersRepository",
      useClass: OffersRepository,
    },
  ],
})
export class OfferCandidatesModule {}
