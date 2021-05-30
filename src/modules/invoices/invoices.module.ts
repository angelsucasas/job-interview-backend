import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { invoiceEntities } from './entity/index';
import { InvoiceTransactionRepository } from '../../repositories/invoices/invoice-transaction.repository';
import { InvoiceRepository } from '../../repositories/invoices/invoice.repository';
import { InvoiceController } from './invoices.controller';
import { InvoiceService } from './service/invoices.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(invoiceEntities),
    HttpModule.register({
      timeout: 20000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    InvoiceService,
    {
      provide: 'InvoiceTransactionRepositoryInterface',
      useClass: InvoiceTransactionRepository,
    },
    {
      provide: 'InvoiceRepositoryInterface',
      useClass: InvoiceRepository,
    },
  ],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
