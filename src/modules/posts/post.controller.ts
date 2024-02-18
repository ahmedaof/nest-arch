import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SuccessClass } from '@shared/classes/success.class';
import { PostService } from './post.service';
import { PageOptionsDto } from '@shared/pagination/pageOption.dto';
import { EditDto, AddDto } from './dtos/index.dto';
import { AuthGuard } from '@shared/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async addPost(@Body() newPost: AddDto): Promise<SuccessClass> {
    await this.postService.saveNewPost(newPost);
    return new SuccessClass({ message: 'Post added successfully' });
  }

  @Get('/')
  async getPosts(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<SuccessClass> {
    const posts = await this.postService.getPosts(pageOptionsDto);
    return new SuccessClass(posts);
  }

  @Get('/:id')
  async getPostById(@Query('id') id: string): Promise<SuccessClass> {
    const post = await this.postService.getPostById(id);
    return new SuccessClass(post);
  }

  @UseGuards(AuthGuard)
  @Put('/')
  async editPost(@Body() postToEdit: EditDto): Promise<SuccessClass> {
    await this.postService.editPost(postToEdit);
    return new SuccessClass({ message: 'Post edited successfully' });
  }

  @UseGuards(AuthGuard)
  @Delete('/')
  async deletePost(@Query('id') id: string): Promise<SuccessClass> {
    await this.postService.deletePost(id);
    return new SuccessClass({ message: 'Post deleted successfully' });
  }
}
