import { PartialType } from "@nestjs/swagger";
import { CreateOfferCandidateDto } from "./create-offer-candidate.dto";

export class UpdateOfferCandidateDto extends PartialType(
  CreateOfferCandidateDto,
) {}
