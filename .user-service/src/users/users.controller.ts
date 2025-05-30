import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from '@users/users.service';
import { CreateUserDto } from '@users/user.dto';
import { User } from '@users/user.schema';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(data: CreateUserDto): Promise<User> {
    return this.usersService.createUser(data);
  }

  @MessagePattern({ cmd: 'getUserById' })
  async getUserById(id: string): Promise<User | null> {
    return this.usersService.getUserById(id);
  }
}