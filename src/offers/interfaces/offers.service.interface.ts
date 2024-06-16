import { CreateOfferDto } from "../dto/create-offer.dto";
import { UpdateOfferDto } from "../dto/update-offer.dto";
import { Offer } from "../entities/offer.entity";

export interface IOffersService {
  create(vehicle: CreateOfferDto, owner: number): Promise<Offer>;
  findAll(filter?: Record<string, string>): Promise<Offer[]>;
  findOne(id: string): Promise<Offer>;
  update(
    id: string,
    owner: number,
    updateVehicleDto: UpdateOfferDto,
  ): Promise<Offer>;
  remove(id: string, owner: number): Promise<void>;
}
