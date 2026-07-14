import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product 1',
  })
  name!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The description of the product',
    example: 'This is a great product',
  })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The SKU of the product',
    example: 'SKU-001',
  })
  sku!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The barcode of the product',
    example: '123456789012',
  })
  barcode?: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The category ID of the product',
    example: 1,
  })
  categoryId!: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The cost price of the product',
    example: 10.99,
  })
  costPrice!: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({
    description: 'The selling price of the product',
    example: 19.99,
  })
  sellingPrice!: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The minimum stock level of the product',
    example: 10,
  })
  minStockLevel?: number;
}
