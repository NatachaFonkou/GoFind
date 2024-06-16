import { Module } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { VehiclesController } from "./vehicles.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Vehicle, VehicleSchema } from "./entities/vehicle.entity";
import { VehiclesRepository } from "./vehicles.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Vehicle.name,
        schema: VehicleSchema,
      },
    ]),
  ],
  controllers: [VehiclesController],

  providers: [
    {
      provide: "IVehicleService",
      useClass: VehiclesService,
    },

    {
      provide: "IVehicleRepository",
      useClass: VehiclesRepository,
    },
  ],
})
export class VehiclesModule {}
