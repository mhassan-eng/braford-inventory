import { Test, TestingModule } from '@nestjs/testing';
import { ProductVendorController } from './product-vendor.controller';

describe('ProductVendorController', () => {
  let controller: ProductVendorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVendorController],
    }).compile();

    controller = module.get<ProductVendorController>(ProductVendorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
