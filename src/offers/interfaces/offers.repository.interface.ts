import { CreateOfferDto } from "../dto/create-offer.dto";
import { UpdateOfferDto } from "../dto/update-offer.dto";
import { Offer, OfferDocument } from "../entities/offer.entity";

export interface IOffersRepository {
  insert(offer: CreateOfferDto): Promise<Offer>;
  findAll(filter?: Record<string, string>): Promise<Offer[]>;
  findOne(id: string, populate?: boolean): Promise<OfferDocument>;
  update(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer>;
  delete(id: string): Promise<void>;
}
