import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { PostModule } from './modules/posts/post.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [SharedModule, PostModule, AuthModule],
  controllers: [],
})
export class AppModule {}
