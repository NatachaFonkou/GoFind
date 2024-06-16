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
import { CreateOfferCandidateDto } from "./dto/create-offer-candidate.dto";
import { UpdateOfferCandidateDto } from "./dto/update-offer-candidate.dto";
import { IOfferCandidatesService } from "./interfaces/offer-candidates.service.interface";

@ApiTags("Candidatures sur les offres")
@Controller("offer-candidates")
export class OfferCandidatesController {
  constructor(
    @Inject("IOfferCandidatesService")
    private readonly offerCandidatesService: IOfferCandidatesService,
  ) {}

  @Post()
  @ApiHeader({ name: "user", description: "l'utilisateur courant" })
  create(
    @Body() createOfferCandidateDto: CreateOfferCandidateDto,
    @Response() response: ExpressResponse,
  ) {
    return this.offerCandidatesService.create(
      createOfferCandidateDto,
      this.getUserFromLocals(response),
    );
  }

  @Get()
  findAll() {
    return this.offerCandidatesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.offerCandidatesService.findOne(id);
  }

  @Patch(":id")
  @ApiHeader({ name: "user", description: "l'utilisateur courant" })
  update(
    @Param("id") id: string,
    @Body() updateOfferCandidateDto: UpdateOfferCandidateDto,
    @Response() response: ExpressResponse,
  ) {
    return this.offerCandidatesService.update(
      id,
      this.getUserFromLocals(response),
      updateOfferCandidateDto,
    );
  }

  @Delete(":id")
  @ApiHeader({ name: "user", description: "l'utilisateur courant" })
  remove(@Param("id") id: string, @Response() response: ExpressResponse) {
    return this.offerCandidatesService.remove(
      id,
      this.getUserFromLocals(response),
    );
  }

  private getUserFromLocals(response: ExpressResponse): number {
    if (!response.locals.user)
      throw new BadRequestException(
        "Le propriétaire n'a pas été precisé correctement",
      );
    return response.locals.user as number;
  }
}
