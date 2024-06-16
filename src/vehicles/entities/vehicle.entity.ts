import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type VehicleDocument = HydratedDocument<Vehicle>;

export enum VehicleType {
  MOTO = "MOTO",
  CAR = "CAR",
  OTHER = "OTHER",
}

@Schema({ timestamps: true })
export class Vehicle {
  @ApiProperty({ type: Number, required: true })
  owner: number; // user

  @Prop({ required: true, type: Number })
  @ApiProperty({ type: Number, required: true })
  capacity: number;

  @Prop({ required: true, type: String })
  @ApiProperty({ type: String, required: true })
  label: string;

  @Prop({ required: true, enum: VehicleType })
  @ApiProperty({ enum: VehicleType, required: true })
  type: VehicleType;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
