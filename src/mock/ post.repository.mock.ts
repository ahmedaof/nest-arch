// post.repository.mock.ts
import { AddDto, EditDto } from '../modules/posts/dtos/index.dto';
import { PageOptionsDto } from '@shared/pagination/pageOption.dto';
import { Post } from '@shared/entities/post.entity';

export class PostRepositoryMock {
  create(post: AddDto): Promise<void> {
    // Mock implementation
    return Promise.resolve();
  }

  findAndCount(): Promise<[Post[], number]> {
    // Mock implementation
    return Promise.resolve([[], 0]);
  }

  findOne(id: string): Promise<Post> {
    // Mock implementation
    const mockPost: Post = {
      id: 'mockId',
      title: 'Mock Title',
      content: 'Mock Content',
      author: 'Mock Author',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return Promise.resolve(mockPost);
  }

  update(post: EditDto): Promise<void> {
    // Mock implementation
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    // Mock implementation
    return Promise.resolve();
  }
}
