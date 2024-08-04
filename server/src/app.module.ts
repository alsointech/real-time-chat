// server/src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MessageModule } from './messages/message.module';
import { ApolloDriver } from '@nestjs/apollo';
import { envs } from './config/plugins/envs.plugin';
import { MessageService } from './messages/service/message.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
    }),
    // mongodb://alsohuman:123456@localhost:27017/
    MongooseModule.forRoot(`mongodb://${envs.MONGO_DB_USERNAME}:${envs.MONGO_DB_PASSWORD}@${envs.MONGO_DB_HOST}:${envs.MONGO_DB_PORT}/`),
    MessageModule,
  ],
  // controllers: [AppController],
  // providers: [MessageService],
})
export class AppModule {}