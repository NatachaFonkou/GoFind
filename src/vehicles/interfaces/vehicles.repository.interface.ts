import { UpdateVehicleDto } from "../dto/update-vehicle.dto";
import { Vehicle, VehicleDocument } from "../entities/vehicle.entity";

export interface IVehicleRepository {
  insert(vehicle: Vehicle): Promise<Vehicle>;
  findAll(filter?: Record<string, string>): Promise<Vehicle[]>;
  findOne(id: string): Promise<VehicleDocument>;
  update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle>;
  delete(id: string): Promise<void>;
}
