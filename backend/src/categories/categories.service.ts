import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category || category.isActive === false) {
      throw new NotFoundException(`Category not found`);
    }
    return category;
  }

  public async findAll() {
    return await this.prisma.category.findMany({
      where: { isActive: true },
    });
  }

  public async createOne(data: CreateCategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { name: data.name },
    });
    if (existingCategory) {
      throw new ConflictException(
        `Category with name ${data.name} already exists`,
      );
    }
    return await this.prisma.category.create({ data });
  }

  public async updateOne(id: number, data: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category || category.isActive === false) {
      throw new NotFoundException(`Category not found`);
    }
    return await this.prisma.category.update({ where: { id }, data });
  }

  public async deactivateOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category not found`);
    }
    return await this.prisma.category.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
