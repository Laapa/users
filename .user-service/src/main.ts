import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: process.env.USER_QUEUE || 'user_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices(); 
  await app.listen(3001); 

  console.log('✅ User Service is running with RabbitMQ');
}
bootstrap();