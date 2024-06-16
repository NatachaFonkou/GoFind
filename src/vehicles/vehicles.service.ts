import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { Vehicle } from "./entities/vehicle.entity";
import { IVehicleRepository } from "./interfaces/vehicles.repository.interface";
import { IVehicleService } from "./interfaces/vehicles.service.interface";

@Injectable()
export class VehiclesService implements IVehicleService {
  constructor(
    @Inject("IVehicleRepository")
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  create(owner: number, createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleRepository.insert({ owner, ...createVehicleDto });
  }

  findAll(filters?: Record<string, string>): Promise<Vehicle[]> {
    return this.vehicleRepository.findAll(filters);
  }

  findOne(id: string): Promise<Vehicle> {
    return this.vehicleRepository.findOne(id);
  }

  async update(
    id: string,
    owner: number, 
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne(id);
    if (!vehicle) throw new NotFoundException("Le vehicule n'existe pas"); 
    if (vehicle.owner !== owner)
      throw new ForbiddenException(
        "Le vehicule n'appartient pas à l'utilisateur authentifié",
      );
    return await vehicle.updateOne(updateVehicleDto, {
      returnDocument: "after",
    });
  }

  async remove(id: string, owner: number): Promise<void> {
    const vehicle = await this.vehicleRepository.findOne(id);
    if (!vehicle) throw new NotFoundException("Le vehicule n'existe pas");
    if (vehicle.owner !== owner)
      throw new ForbiddenException(
        "Le vehicule n'appartient pas à l'utilisateur authentifié",
      );
    await vehicle.deleteOne();
  }
}
