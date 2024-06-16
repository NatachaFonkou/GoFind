import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument } from "mongoose";
import { VehicleDocument } from "../../vehicles/entities/vehicle.entity"; // Assurez-vous de modifier le chemin en fonction de votre structure de dossiers

export type OfferDocument = HydratedDocument<Offer>;

@Schema({ timestamps: true })
export class Offer {
  @Prop({ required: true, type: String })
  @ApiProperty({ type: String, required: true })
  from: string;

  @Prop({ required: true, type: String })
  @ApiProperty({ type: String, required: true })
  to: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: "Vehicle" })
  @ApiProperty({ type: String, required: true })
  vehicle: string | VehicleDocument;

  @Prop({ required: true, type: Number })
  @ApiProperty({ type: Number, required: true })
  price: number;

  @Prop({ required: true, type: Number })
  @ApiProperty({ type: Number, required: true })
  places: number;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
