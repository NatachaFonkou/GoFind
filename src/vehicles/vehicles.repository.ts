import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { Vehicle, VehicleDocument } from "./entities/vehicle.entity";
import { IVehicleRepository } from "./interfaces/vehicles.repository.interface";

@Injectable()
export class VehiclesRepository implements IVehicleRepository {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<Vehicle>,
  ) {}

  async insert(vehicle: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleModel.create(vehicle);
  }

  async findAll(filter?: Record<string, string>): Promise<Vehicle[]> {
    return this.vehicleModel.find(filter ? filter : {}).exec();
  }

  async findOne(id: string): Promise<VehicleDocument> {
    return this.vehicleModel.findById(id).exec();
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehicleModel.findByIdAndUpdate(id, updateVehicleDto).exec();
  }

  async delete(id: string): Promise<void> {
    await this.vehicleModel.findByIdAndDelete(id).exec();
  }
}
