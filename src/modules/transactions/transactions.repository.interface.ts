import { BaseInterfaceRepository } from '../../repositories/base/interface.repository';
import { Transaction } from './transactions.entity';

export interface TransactionRepositoryInterface
  extends BaseInterfaceRepository<Transaction> {}
