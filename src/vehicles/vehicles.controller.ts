import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Response,
} from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { Response as ExpressResponse } from "express";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { IVehicleService } from "./interfaces/vehicles.service.interface";

@ApiTags("Les véhicules")
@Controller("vehicles")
export class VehiclesController {
  constructor(
    @Inject("IVehicleService")
    private readonly vehiclesService: IVehicleService,
  ) {}

  @Post()
  @ApiHeader({ name: "user", description: "l'utilisateur courant" })
  create(
    @Body() createVehicleDto: CreateVehicleDto,
    @Response() response: ExpressResponse,
  ) {
    return this.vehiclesService.create(
      this.getUserFromLocals(response),
      createVehicleDto,
    );
  }

  @Get()
  findAll(@Query() query?: Record<string, string>) {
    return this.vehiclesService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(":id")
  @ApiHeader({ name: "user", description: "l'utilisateur courant" })
  update(
    @Param("id") id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @Response() response: ExpressResponse,
  ) {
    return this.vehiclesService.update(
      id,
      this.getUserFromLocals(response),
      updateVehicleDto,
    );
  }

  @Delete(":id")
  @ApiHeader({ name: "user", description: "l'utilisateur courant" })
  remove(@Param("id") id: string, @Response() response: ExpressResponse) {
    return this.vehiclesService.remove(id, this.getUserFromLocals(response));
  }

  private getUserFromLocals(response: ExpressResponse): number {
    if (!response.locals.user)
      throw new BadRequestException(
        "Le propriétaire n'a pas été precisé correctement",
      );
    return response.locals.user as number;
  }
}
