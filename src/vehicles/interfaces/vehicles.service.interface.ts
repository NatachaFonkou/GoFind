import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";
import { Vehicle } from "../entities/vehicle.entity";

export interface IVehicleService {
  create(owner: number, vehicle: CreateVehicleDto): Promise<Vehicle>;
  findAll(filter?: Record<string, string>): Promise<Vehicle[]>;
  findOne(id: string): Promise<Vehicle>;
  update(
    id: string,
    owner: number,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle>;
  remove(id: string, owner: number): Promise<void>;
}
