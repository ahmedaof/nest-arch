import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { AddDto } from './add.dto';

export class EditDto extends PartialType(AddDto) {
  @IsNotEmpty({ message: 'id_IS_REQUIRED' })
  id: string;
}
