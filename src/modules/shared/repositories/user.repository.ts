import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@shared/entities/user.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { UserRepositoryInterface } from './interfaces/user.respository.interface';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements UserRepositoryInterface
{
  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    super(userRepository);
  }
}
