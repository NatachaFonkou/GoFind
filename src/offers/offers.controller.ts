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
  Response,
} from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { Response as ExpressResponse } from "express";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { IOffersService } from "./interfaces/offers.service.interface";

@ApiTags("Les Offres")
@Controller("offers")
export class OffersController {
  constructor(
    @Inject("IOffersService")
    private readonly offersService: IOffersService,
  ) {}

  @Post()
  @ApiHeader({ name: "user", description: "l'utilisateur courant" })
  create(
    @Body() createOfferDto: CreateOfferDto,
    @Response() response: ExpressResponse,
  ) {
    return this.offersService.create(
      createOfferDto,
      this.getUserFromLocals(response),
    );
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.offersService.findOne(id);
  }

  @Patch(":id")
  @ApiHeader({ name: "user", description: "l'utilisateur courant" })
  update(
    @Param("id") id: string,
    @Body() updateOfferDto: UpdateOfferDto,
    @Response() response: ExpressResponse,
  ) {
    return this.offersService.update(
      id,
      this.getUserFromLocals(response),
      updateOfferDto,
    );
  }

  @Delete(":id")
  @ApiHeader({ name: "user", description: "l'utilisateur courant" })
  remove(@Param("id") id: string, @Response() response: ExpressResponse) {
    return this.offersService.remove(id, this.getUserFromLocals(response));
  }

  private getUserFromLocals(response: ExpressResponse): number {
    if (!response.locals.user)
      throw new BadRequestException(
        "Le propriétaire n'a pas été precisé correctement",
      );
    return response.locals.user as number;
  }
}
