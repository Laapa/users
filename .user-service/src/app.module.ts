import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User, UserSchema } from './users/user.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/user-service',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: process.env.USER_QUEUE || 'user_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}