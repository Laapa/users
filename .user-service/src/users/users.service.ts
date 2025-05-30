import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@users/user.schema';
import { CreateUserDto } from '@users/user.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = new this.userModel(dto);
    return user.save();
  }

  async getUserById(id: string): Promise<User | null> {
    if (!isValidObjectId(id)) {
      console.warn('[UserService] Invalid ObjectId:', id);
      return null;
    }
  
    return this.userModel.findById(id).exec();
  }
}