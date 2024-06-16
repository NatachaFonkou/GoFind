import { UpdateOfferCandidateDto } from "../dto/update-offer-candidate.dto";
import {
  OfferCandidate,
  OfferCandidateDocument,
} from "../entities/offer-candidate.entity";

export interface IOfferCandidatesRepository {
  insert(offerCandidate: OfferCandidate): Promise<OfferCandidate>;
  findAll(filter?: Partial<OfferCandidate>): Promise<OfferCandidate[]>;
  findOne(id: string, populate?: boolean): Promise<OfferCandidateDocument>;
  update(
    id: string,
    updateOfferCandidateDto: UpdateOfferCandidateDto,
  ): Promise<OfferCandidate>;
  delete(id: string): Promise<void>;
  deleteMany(filter: Partial<OfferCandidate>): Promise<void>;
}
