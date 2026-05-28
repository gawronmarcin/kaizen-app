import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({timestamps: true})
export class Ticket{
    @Prop({required:true})
    title!:string;

    @Prop({required:true})
    author!:string;

    @Prop()
    description!: string;

    @Prop({ default: false })
    isDIY!: boolean;

    @Prop({ default: 'draft' })
    status!: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket)