import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schema/message.schema';

@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private messageModel: Model<Message>) {}

  async createMessage(sender: string, room: string, content: string): Promise<Message> {
    const newMessage = new this.messageModel({ sender, room, content });
    return newMessage.save();
  }

  async getMessages(room: string): Promise<Message[]> {
    return this.messageModel.find({ room }).exec();
  }
}
