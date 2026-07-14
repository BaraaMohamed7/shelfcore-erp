import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriesService } from '../categories/categories.service';
@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.prisma.product.findUnique({
      where: {
        sku: createProductDto.sku,
      },
    });

    if (existingProduct) {
      throw new ConflictException('Product with this SKU already exists');
    }

    if (createProductDto.barcode) {
      const existingBarcode = await this.prisma.product.findUnique({
        where: {
          barcode: createProductDto.barcode,
        },
      });

      if (existingBarcode) {
        throw new ConflictException('Product with this barcode already exists');
      }
    }

    if (createProductDto.categoryId) {
      await this.categoriesService.findOne(createProductDto.categoryId);
    }

    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product || !product.isActive) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product || !product.isActive) {
      throw new NotFoundException('Product not found');
    }

    if (updateProductDto.sku) {
      const existingSkuProduct = await this.prisma.product.findUnique({
        where: { sku: updateProductDto.sku },
      });
      if (existingSkuProduct && existingSkuProduct.id !== id) {
        throw new ConflictException('Product with this SKU already exists');
      }
    }

    if (updateProductDto.barcode) {
      const existingBarcodeProduct = await this.prisma.product.findUnique({
        where: { barcode: updateProductDto.barcode },
      });
      if (existingBarcodeProduct && existingBarcodeProduct.id !== id) {
        throw new ConflictException('Product with this barcode already exists');
      }
    }

    if (updateProductDto.categoryId) {
      await this.categoriesService.findOne(updateProductDto.categoryId);
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async deactivate(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product || !product.isActive) {
      throw new NotFoundException('Product not found');
    }
    return this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
