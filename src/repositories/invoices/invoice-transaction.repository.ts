import { BaseAbstractRepository } from '../base/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceTransaction } from '../../modules/invoices/entity/invoice-transaction.entity';
import { InvoiceTransactionRepositoryInterface } from '../../modules/invoices/repository/invoice-transaction.entity';

@Injectable()
export class InvoiceTransactionRepository
  extends BaseAbstractRepository<InvoiceTransaction>
  implements InvoiceTransactionRepositoryInterface
{
  constructor(
    @InjectRepository(InvoiceTransaction)
    private readonly invoiceRepository: Repository<InvoiceTransaction>,
  ) {
    super(invoiceRepository);
  }
}
