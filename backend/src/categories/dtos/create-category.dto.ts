import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the category', example: 'Electronics' })
  name!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Description of the category',
    example: 'Devices and gadgets',
  })
  description?: string;
}
