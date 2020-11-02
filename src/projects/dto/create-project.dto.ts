import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  identifier: string;

  description: string;
}
