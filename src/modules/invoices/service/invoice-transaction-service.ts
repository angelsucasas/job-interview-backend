import { Inject, Injectable } from '@nestjs/common';
import { TransactionService } from 'src/modules/transactions/transactions.service';
import { InvoiceTransaction } from '../entity/invoice-transaction.entity';
import { Invoice } from '../entity/invoices.entity';
import { InvoiceDto, InvoiceTransactionDto } from '../invoices.dto';
import { InvoiceTransactionRepositoryInterface } from '../repository/invoice-transaction.entity';
import { InvoiceService } from './invoices.service';

@Injectable()
export class InvoiceTransactionService {
  constructor(
    @Inject('InvoiceTransactionRepositoryInterface')
    private readonly invoiceTransactionRepository: InvoiceTransactionRepositoryInterface,
    @Inject(TransactionService)
    private readonly transactionService: TransactionService,
    @Inject(InvoiceService)
    private readonly invoiceService: InvoiceService,
  ) {}

  public async create(invoiceTransactionDto: InvoiceTransactionDto) {
    let invoiceTransaction = new InvoiceTransaction()
    invoiceTransaction.invoice = await this.invoiceService.findOneById(invoiceTransactionDto.transaction.id) 
    invoiceTransaction.transaction = await this.transactionService.findOneById(invoiceTransactionDto.invoice.id)
    return await this.invoiceTransactionRepository.create(invoiceTransaction)
  }

  public async delete(invoiceId:string) {
    return await this.invoiceTransactionRepository.remove(invoiceId);
  }

  public async get(): Promise<InvoiceTransaction[]> {
    return await this.invoiceTransactionRepository.findAll()
  }
}
