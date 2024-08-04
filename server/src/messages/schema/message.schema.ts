
import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class messageSchema extends Document {
  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  room: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(messageSchema);


@ObjectType()
export class Message extends Document {

    // ID ?
    @Field()
    sender: string;

    @Field()
    room: string;

    @Field()
    content: string;

    @Field()
    timestamp: Date;
}
