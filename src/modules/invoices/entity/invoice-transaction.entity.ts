import { ManyToOne, JoinColumn,Entity } from 'typeorm';
import { PrimalEntity } from '../../../app/base-entity/base.entity';
import { Transaction } from '../../transactions/transactions.entity';
import { Invoice } from './invoices.entity';

@Entity({ name: 'invoice_transaction' })
export class InvoiceTransaction extends PrimalEntity {
  @JoinColumn({ name: 'invoice_fk' })
  @ManyToOne((type) => Invoice, (invoice) => invoice.id)
  invoice: Invoice;

  @JoinColumn({ name: 'transaction_fk' })
  @ManyToOne((type) => Transaction, (transaction) => transaction.id)
  transaction: Transaction;
}
