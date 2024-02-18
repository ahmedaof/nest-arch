import { AddDto, EditDto } from '../posts/dtos/index.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '@shared/repositories/post.repository';
import { PageOptionsDto } from '@shared/pagination/pageOption.dto';
import { PageMetaDto } from '@shared/pagination/page-meta.dto';
import { ILike } from 'typeorm';
import { Post } from '@shared/entities/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async saveNewPost(post: AddDto): Promise<void> {
    await this.postRepository.create(post);
  }

  async getPosts(pageOptionsDto: PageOptionsDto) {
    const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take || 0;

    let search = {};
    if (pageOptionsDto.search) {
      search = [
        { name: ILike(`%${pageOptionsDto.search}%`) },
        { body: ILike(`%${pageOptionsDto.search}%`) },
      ];
    }

    const [posts, total] = await this.postRepository.findAndCount({
      select: {},
      take: pageOptionsDto.take,
      skip,
      where: search,

      order: { createdAt: 'DESC' },
    });

    const pageMetaDto = new PageMetaDto({
      itemsPerPage: posts.length,
      total,
      pageOptionsDto,
    });

    return { meta: pageMetaDto, posts };
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      select: {},
    });
    if (!post) {
      throw new NotFoundException({ message: 'Post_NOT_FOUND' });
    }
    return post;
  }

  async editPost(postToEdit: EditDto): Promise<void> {
    await this.postRepository.update({
      where: { id: postToEdit.id },
      data: {
        title: postToEdit.title,
        content: postToEdit.content,
        author: postToEdit.author,
      },
    });
  }

  async deletePost(id: string): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id },
      select: { id: true },
    });

    if (!post) {
      throw new NotFoundException({ message: 'Post_NOT_FOUND' });
    }

    await this.postRepository.delete({ id });
  }
}
