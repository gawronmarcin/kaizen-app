import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument } from './schemas/ticket.schema';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const createdTicket = new this.ticketModel(createTicketDto);
    return await createdTicket.save();
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketModel.find().exec()
  }

  async updateStatus(id: string, newStatus: string): Promise<Ticket | null> {
  return await this.ticketModel.findByIdAndUpdate(
    id,
    {status: newStatus},
    {new: true}
  ).exec();
  }

  async remove(id: string): Promise<Ticket | null> {
    return await this.ticketModel.findByIdAndDelete(id).exec();
  }
}
