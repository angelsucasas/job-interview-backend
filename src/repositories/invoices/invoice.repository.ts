import { BaseAbstractRepository } from '../base/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../modules/invoices/entity/invoices.entity';
import { InvoiceRepositoryInterface } from '../../modules/invoices/repository/invoices.repository.interface';

@Injectable()
export class InvoiceRepository
  extends BaseAbstractRepository<Invoice>
  implements InvoiceRepositoryInterface
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {
    super(invoiceRepository);
  }
}
