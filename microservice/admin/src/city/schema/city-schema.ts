import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema({ collection: 'city', timestamps: true })
export class City {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  pincode: string;

  @Prop()
  countryCode: string;

  @Prop()
  population: number;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const CitySchema = SchemaFactory.createForClass(City);
