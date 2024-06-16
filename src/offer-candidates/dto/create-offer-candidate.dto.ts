import { OmitType } from "@nestjs/swagger";
import { OfferCandidate } from "../entities/offer-candidate.entity";

export class CreateOfferCandidateDto extends OmitType(OfferCandidate, [
  "candidate",
]) {}
