import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { OfferDocument } from "src/offers/entities/offer.entity";
import { IOffersRepository } from "src/offers/interfaces/offers.repository.interface";
import { CreateOfferCandidateDto } from "./dto/create-offer-candidate.dto";
import { UpdateOfferCandidateDto } from "./dto/update-offer-candidate.dto";
import { OfferCandidate } from "./entities/offer-candidate.entity";
import { IOfferCandidatesRepository } from "./interfaces/offer-candidates.repository.interface";
import { IOfferCandidatesService } from "./interfaces/offer-candidates.service.interface";

@Injectable()
export class OfferCandidatesService implements IOfferCandidatesService {
  constructor(
    @Inject("IOfferCandidatesRepository")
    private readonly offerCandidateRepository: IOfferCandidatesRepository,

    @Inject("IOffersRepository")
    private readonly offersRepository: IOffersRepository,
  ) {}

  async create(
    createOfferCandidateDto: CreateOfferCandidateDto,
    candidate: number,
  ): Promise<OfferCandidate> {
    const offer = await this.offersRepository.findOne(
      createOfferCandidateDto.offer as string,
      true,
    );

    if (!offer)
      throw new BadRequestException(
        "Il n'existe pas de telle offre de co-voiturage",
      );

    // verifier que le nombre de place demandé est encore possible
    const offerCandidatures = await this.offerCandidateRepository.findAll({
      offer: createOfferCandidateDto.offer,
    });

    let takenPlaces = 0;

    offerCandidatures.forEach(
      (candidature) => (takenPlaces += candidature.places),
    );
    const remainingPlaces = offer.places - takenPlaces;
    // s'il n'y a pas assez de places
    if (remainingPlaces < createOfferCandidateDto.places)
      throw new BadRequestException(`Il ne reste plus que ${remainingPlaces}`);

    // TODO: envoyer un mail au service

    return this.offerCandidateRepository.insert({
      ...createOfferCandidateDto,
      candidate,
    });
  }

  findAll(): Promise<OfferCandidate[]> {
    return this.offerCandidateRepository.findAll();
  }

  findOne(id: string): Promise<OfferCandidate> {
    return this.offerCandidateRepository.findOne(id);
  }

  async update(
    id: string,
    candidate: number,
    updateOfferCandidateDto: UpdateOfferCandidateDto,
  ): Promise<OfferCandidate> {
    const offerCandidature = await this.offerCandidateRepository.findOne(
      id,
      true,
    );

    if (!offerCandidature) throw new NotFoundException("L'offre n'exsite pas");

    const supplementaryPlaces =
      updateOfferCandidateDto.places - offerCandidature.places;
    if (updateOfferCandidateDto.places && supplementaryPlaces > 0) {
      const candidatures = await this.offerCandidateRepository.findAll({
        offer: offerCandidature.offer as string,
      });

      const takenPLaces = candidatures
        .map((candidature) => candidature.places)
        .reduce((a, b) => a + b);

      if (
        takenPLaces + supplementaryPlaces >
        (offerCandidature.offer as OfferDocument).places
      ) {
        throw new ConflictException(
          "Il ne reste pas assez de place pour cette candidature",
        );
      }
    }

    return this.offerCandidateRepository.update(id, updateOfferCandidateDto);
  }

  async remove(id: string, candidate: number): Promise<void> {
    const offerCandidature = await this.offerCandidateRepository.findOne(
      id,
      true,
    );
    if (!offerCandidature) throw new NotFoundException("L'offre n'exsite pas");

    if (offerCandidature.candidate !== candidate)
      throw new UnauthorizedException(
        "Vous n'etes pas autorisé à modifier ce candidature",
      );

    await this.offerCandidateRepository.delete(id);
  }
}
