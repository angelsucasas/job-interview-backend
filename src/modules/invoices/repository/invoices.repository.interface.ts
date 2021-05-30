import { BaseInterfaceRepository } from '../../../repositories/base/interface.repository';
import { Invoice } from '../entity/invoices.entity';

export interface InvoiceRepositoryInterface
  extends BaseInterfaceRepository<Invoice> {}
