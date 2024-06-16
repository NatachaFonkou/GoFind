import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { Offer, OfferDocument } from "./entities/offer.entity";
import { IOffersRepository } from "./interfaces/offers.repository.interface";

@Injectable()
export class OffersRepository implements IOffersRepository {
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<Offer>,
  ) {}

  async insert(offer: CreateOfferDto): Promise<Offer> {
    return this.offerModel.create(offer);
  }

  async findAll(filter?: Record<string, string>): Promise<Offer[]> {
    return this.offerModel.find(filter ? filter : {}).exec();
  }

  async findOne(id: string, populate?: boolean): Promise<OfferDocument> {
    const offer = this.offerModel.findById(id).exec();
    return populate ? (await offer).populate("vehicles") : await offer;
  }

  async update(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    return this.offerModel
      .findByIdAndUpdate(id, updateOfferDto, {
        new: true,
      })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.offerModel.findByIdAndDelete(id).exec();
  }
}
