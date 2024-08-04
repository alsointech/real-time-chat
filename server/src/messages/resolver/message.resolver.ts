// server/src/messages/messages.resolver.ts
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { MessageService } from '../service/message.service';
import { Message } from '../schema/message.schema';

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messagesService: MessageService) {}

  @Query(() => [Message])
  async messages(@Args('room') room: string) {
    return this.messagesService.getMessages(room);
  }

  @Mutation(() => Message)
  async createMessage(
    @Args('sender') sender: string,
    @Args('room') room: string,
    @Args('content') content: string,
  ) {
    const newMessage = await this.messagesService.createMessage(sender, room, content);
    pubSub.publish('messageAdded', { messageAdded: newMessage });
    return newMessage;
  }

  @Subscription(() => Message, {
    filter: (payload, variables) => payload.messageAdded.room === variables.room,
  })
  messageAdded(@Args('room') room: string) {
    return pubSub.asyncIterator('messageAdded');
  }
}
