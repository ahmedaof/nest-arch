import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';
import { AddDto, EditDto } from '../posts/dtos/index.dto';
import { PageOptionsDto } from '@shared/pagination/pageOption.dto';
import { Post } from '@shared/entities/post.entity';
import { PostRepositoryMock } from 'src/mock/ post.repository.mock';
import { PostRepository } from '@shared/repositories/post.repository';

describe('PostService', () => {
  let service: PostService;
  let postRepository: PostRepositoryMock; // Use the mock instead of the real repository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: PostRepository, useClass: PostRepositoryMock },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get<PostRepositoryMock>(PostRepository); // Get the mock instance
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveNewPost', () => {
    it('should save a new post', async () => {
      const addDto: AddDto = {
        title: '',
        content: '',
        author: '',
      };
      jest.spyOn(postRepository, 'create').mockResolvedValueOnce();
      await service.saveNewPost(addDto);
      expect(postRepository.create).toHaveBeenCalledWith(addDto);
    });
  });

  describe('getPosts', () => {
    it('should get posts', async () => {
      const pageOptionsDto: PageOptionsDto = {
        page: 1,
        take: 10,
        skip: 0,
      };
      jest.spyOn(postRepository, 'findAndCount').mockResolvedValueOnce([[], 0]);
      const result = await service.getPosts(pageOptionsDto);
      expect(result).toEqual({ meta: expect.any(Object), posts: [] });
    });
  });

  describe('getPostById', () => {
    it('should get a post by ID', async () => {
      const postId = 'exampleId';
      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce({
        id: postId,
        title: '',
        content: '',
        author: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const result = await service.getPostById(postId);
      expect(result).toBeDefined();
    });

    it('should throw NotFoundException if post is not found', async () => {
      const postId = 'nonExistentId';
      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.getPostById(postId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('editPost', () => {
    it('should edit a post', async () => {
      const editDto: EditDto = {
        id: 'exampleId',
        title: '',
        content: '',
        author: '',
      };
      jest.spyOn(postRepository, 'update').mockResolvedValueOnce();
      await service.editPost(editDto);
      expect(postRepository.update).toHaveBeenCalled();
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const postId = 'exampleId';
      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce({
        id: postId,
        title: '',
        content: '',
        author: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      jest.spyOn(postRepository, 'delete').mockResolvedValueOnce();
      await service.deletePost(postId);
      expect(postRepository.delete).toHaveBeenCalledWith({ id: postId });
    });

    it('should throw NotFoundException if post is not found', async () => {
      const postId = 'nonExistentId';
      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.deletePost(postId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
