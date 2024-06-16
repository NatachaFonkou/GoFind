import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateOfferCandidateDto } from "./dto/create-offer-candidate.dto";
import { UpdateOfferCandidateDto } from "./dto/update-offer-candidate.dto";
import {
  OfferCandidate,
  OfferCandidateDocument,
} from "./entities/offer-candidate.entity";
import { IOfferCandidatesRepository } from "./interfaces/offer-candidates.repository.interface";

@Injectable()
export class OfferCandidatesRepository implements IOfferCandidatesRepository {
  constructor(
    @InjectModel(OfferCandidate.name)
    private readonly offerCandidateModel: Model<OfferCandidate>,
  ) {}

  async insert(
    offerCandidate: CreateOfferCandidateDto,
  ): Promise<OfferCandidate> {
    return this.offerCandidateModel.create(offerCandidate);
  }

  async findAll(filter?: Record<string, string>): Promise<OfferCandidate[]> {
    return this.offerCandidateModel.find(filter ? filter : {}).exec();
  }

  async findOne(
    id: string,
    populate?: boolean,
  ): Promise<OfferCandidateDocument> {
    const offerCanditate = this.offerCandidateModel.findById(id).exec();

    return populate
      ? (await offerCanditate).populate("offer")
      : await offerCanditate;
  }

  async update(
    id: string,
    updateOfferCandidateDto: UpdateOfferCandidateDto,
  ): Promise<OfferCandidate> {
    return this.offerCandidateModel
      .findByIdAndUpdate(id, updateOfferCandidateDto, {
        new: true,
      })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.offerCandidateModel.findByIdAndDelete(id).exec();
  }

  async deleteMany(filter: Partial<OfferCandidate>): Promise<void> {
    await this.offerCandidateModel.deleteMany(filter).exec();
  }
}
