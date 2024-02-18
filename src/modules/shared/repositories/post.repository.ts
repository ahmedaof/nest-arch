import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Post } from '@shared/entities/post.entity';
import { PostRepositoryInterface } from './interfaces/post.respository.interface';

@Injectable()
export class PostRepository
  extends BaseRepository<Post>
  implements PostRepositoryInterface
{
  constructor(@InjectRepository(Post) postRepository: Repository<Post>) {
    super(postRepository);
  }
}
