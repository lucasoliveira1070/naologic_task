import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { ProductRepository } from '../../src/repositories/product-repository';
import { Product } from '../../src/database/interfaces/prd';
import { CSVRow } from '../../src/database/interfaces/csv.file';
import { CsvService } from '../../src/modules/csv/csv.service';
import { AppService } from '../../src/modules/application/app.service';
import { MockProductDocument } from '../../test/mocks/mock-product-document';

describe('AppService', () => {
  let appService: AppService;
  let csvService: CsvService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        Logger,
        {
          provide: CsvService,
          useValue: {
            processCsv: jest.fn(),
          },
        },
        {
          provide: ProductRepository,
          useValue: {
            saveMany: jest.fn(),
            findRandom: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    csvService = module.get<CsvService>(CsvService);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('execute', () => {
    it('should process and save products', async () => {
      const mockCsvData: CSVRow[] = [
        {
          ProductID: '1',
          CategoryName: 'Category1',
          PrimaryCategoryName: 'Primary1',
          SecondaryCategoryName: 'Secondary1',
        },
      ];

      const mockProducts: Product[] = [MockProductDocument];

      (csvService.processCsv as jest.Mock).mockReturnValue(mockCsvData);
      (productRepository.findRandom as jest.Mock).mockReturnValue(mockProducts);

      const saveManySpy = jest.spyOn(productRepository, 'saveMany');
      const logSpy = jest.spyOn(appService['logger'], 'log');
      const errorSpy = jest.spyOn(appService['logger'], 'error');

      await appService.execute();

      expect(saveManySpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('Products generated and saved'),
      );
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      const error = new Error('Test error');
      (csvService.processCsv as jest.Mock).mockImplementation(() => {
        throw error;
      });

      const logSpy = jest.spyOn(appService['logger'], 'log');
      const errorSpy = jest.spyOn(appService['logger'], 'error');

      await appService.execute();

      expect(errorSpy).toHaveBeenCalledWith(error);
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('Products generated and saved'),
      );
    });
  });
});
