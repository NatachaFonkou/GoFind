import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { IOfferCandidatesRepository } from "src/offer-candidates/interfaces/offer-candidates.repository.interface";
import { VehicleDocument } from "src/vehicles/entities/vehicle.entity";
import { IVehicleRepository } from "src/vehicles/interfaces/vehicles.repository.interface";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { Offer } from "./entities/offer.entity";
import { IOffersRepository } from "./interfaces/offers.repository.interface";
import { IOffersService } from "./interfaces/offers.service.interface";

@Injectable()
export class OffersService implements IOffersService {
  constructor(
    @Inject("IOffersRepository")
    private readonly offerRepository: IOffersRepository,

    @Inject("IVehiclesRepository")
    private readonly vehiclesRepository: IVehicleRepository,

    @Inject("IOfferCandidatesRepository")
    private readonly offerCandidatesRepository: IOfferCandidatesRepository,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    // verifier si le vehicule existe
    const vehicle = await this.vehiclesRepository.findOne(
      createOfferDto.vehicle as string,
    );

    if (!vehicle)
      throw new NotFoundException("Le vehicule precisé n'existe pas");

    // verifier la capacité du vehicule
    if (vehicle.capacity < createOfferDto.places)
      throw new BadRequestException("Nombre maximal de place excédé");

    return this.offerRepository.insert(createOfferDto);
  }

  findAll(): Promise<Offer[]> {
    return this.offerRepository.findAll();
  }

  findOne(id: string): Promise<Offer> {
    return this.offerRepository.findOne(id);
  }

  async update(
    id: string,
    owner: number,
    updateOfferDto: UpdateOfferDto,
  ): Promise<Offer> {
    // verifier si c'est le vrai propriétaire
    const offer = await this.offerRepository.findOne(id, true);
    if (!offer) throw new NotFoundException("L'offre en question n'existe pas");

    if ((offer.vehicle as VehicleDocument).owner !== owner)
      throw new UnauthorizedException(
        "Action non autorisée pour cet utilisateur: Vous essayez de modifier l'offre d'un autre utilisateur",
      );

    if (
      updateOfferDto.places &&
      (offer.vehicle as VehicleDocument).capacity < offer.places
    )
      throw new BadRequestException("Nombre maximal de place excédé");

    // verifier si ça ne va pas deranger les candidatures
    if (updateOfferDto.places) {
      const candidatures = await this.offerCandidatesRepository.findAll({
        offer: offer.id,
      });
      const takenPlaces = candidatures
        .map((candidature) => candidature.places)
        .reduce((a, b) => a + b);

      if (takenPlaces > updateOfferDto.places)
        throw new ConflictException(
          "Vous ne pouvez pas modifier le nombre de places proposées, car certaines sont deja prises",
        );
    }

    return offer.updateOne(updateOfferDto, {
      returnDocument: "after",
    });
  }

  async remove(id: string, owner: number): Promise<void> {
    // verifier si c'est le vrai propriétaire
    const offer = await this.offerRepository.findOne(id, true);
    if (!offer) throw new NotFoundException("L'offre en question n'existe pas");

    if ((offer.vehicle as VehicleDocument).owner !== owner)
      throw new UnauthorizedException(
        "Action non autorisée pour cet utilisateur: Vous essayez de modifier l'offre d'un autre utilisateur",
      );

    // supprimer toutes les candidatures qui sont ratachées à l'offre
    this.offerCandidatesRepository.deleteMany({ offer: offer.id });

    offer.deleteOne();
  }
}
