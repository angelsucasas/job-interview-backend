import { BaseInterfaceRepository } from '../../../repositories/base/interface.repository';
import { InvoiceTransaction } from '../entity/invoice-transaction.entity';

export interface InvoiceTransactionRepositoryInterface
  extends BaseInterfaceRepository<InvoiceTransaction> {}
