import { Post } from '../entities/post.entity';

export interface PostsStatsDto {
  latestPosts: Post[];
  mostPopularPost: Post | null;
  mostLikedPost: Post | null;
}
