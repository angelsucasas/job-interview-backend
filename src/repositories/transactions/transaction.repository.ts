import { BaseAbstractRepository } from '../base/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../modules/transactions/transactions.entity';
import { TransactionRepositoryInterface } from '../../modules/transactions/transactions.repository.interface';

@Injectable()
export class TransactionRepository
  extends BaseAbstractRepository<Transaction>
  implements TransactionRepositoryInterface
{
  constructor(
    @InjectRepository(Transaction)
    private readonly invoiceRepository: Repository<Transaction>,
  ) {
    super(invoiceRepository);
  }
}
