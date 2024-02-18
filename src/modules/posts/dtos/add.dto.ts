import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class AddDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'title_IS_REQUIRED' })
  @MinLength(3, { message: 'title_IS_TOO_SHORT' })
  @MaxLength(50, { message: 'title_IS_TOO_LONG' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'content_IS_REQUIRED' })
  @MinLength(3, { message: 'content_IS_TOO_SHORT' })
  @MaxLength(500, { message: 'content_IS_TOO_LONG' })
  content: string;

  @ApiProperty()
  @IsOptional()
  author: string;
}
