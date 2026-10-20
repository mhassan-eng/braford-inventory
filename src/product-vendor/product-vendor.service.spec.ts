import { Test, TestingModule } from '@nestjs/testing';
import { ProductVendorService } from './product-vendor.service';

describe('ProductVendorService', () => {
  let service: ProductVendorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductVendorService],
    }).compile();

    service = module.get<ProductVendorService>(ProductVendorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
