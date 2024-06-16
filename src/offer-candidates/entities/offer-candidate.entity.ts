import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument } from "mongoose";
import { OfferDocument } from "../../offers/entities/offer.entity"; // Assurez-vous de modifier le chemin en fonction de votre structure de dossiers

export type OfferCandidateDocument = HydratedDocument<OfferCandidate>;

@Schema({ timestamps: true })
export class OfferCandidate {
  @Prop({ required: true, type: Number })
  @ApiProperty({ type: Number, required: true })
  candidate: number; // user

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: "Offer" })
  @ApiProperty({ type: String, required: true })
  offer: string | OfferDocument;

  @Prop({ required: true, type: Number })
  @ApiProperty({ type: Number, required: true })
  places: number;
}

export const OfferCandidateSchema =
  SchemaFactory.createForClass(OfferCandidate);
