import { CreateOfferCandidateDto } from "../dto/create-offer-candidate.dto";
import { UpdateOfferCandidateDto } from "../dto/update-offer-candidate.dto";
import { OfferCandidate } from "../entities/offer-candidate.entity";

export interface IOfferCandidatesService {
  create(
    createOfferCandidateDto: CreateOfferCandidateDto,
    candidate: number,
  ): Promise<OfferCandidate>;
  findAll(): Promise<OfferCandidate[]>;
  findOne(id: string, populate?: boolean): Promise<OfferCandidate>;
  update(
    id: string,
    candidate: number,
    updateOfferCandidateDto: UpdateOfferCandidateDto,
  ): Promise<OfferCandidate>;
  remove(id: string, candidate: number): Promise<void>;
}
