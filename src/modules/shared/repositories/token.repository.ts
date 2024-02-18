import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '@shared/entities/token.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { TokenRepositoryInterface } from './interfaces/token.repository.interface';

@Injectable()
export class TokenRepository
  extends BaseRepository<Token>
  implements TokenRepositoryInterface
{
  constructor(@InjectRepository(Token) userRepository: Repository<Token>) {
    super(userRepository);
  }
}
