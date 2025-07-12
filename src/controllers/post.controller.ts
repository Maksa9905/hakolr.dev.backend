import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { QueryPostsDto } from '../dto/query-posts.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(@Query() query: QueryPostsDto) {
    return this.postService.findAllPaginated(query);
  }

  @Get('stats')
  getPostsStats() {
    return this.postService.getPostsStats();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.postService.incrementViews(id);
    return this.postService.findOne(id);
  }

  @Post(':id/like')
  like(@Param('id') id: string) {
    return this.postService.incrementLikes(id);
  }

  @Delete(':id/like')
  unlike(@Param('id') id: string) {
    return this.postService.decrementLikes(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
