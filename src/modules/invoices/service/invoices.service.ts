import { Inject, Injectable } from '@nestjs/common';
import { Invoice } from '../entity/invoices.entity';
import { InvoiceDto } from '../invoices.dto';
import { InvoiceRepositoryInterface } from '../repository/invoices.repository.interface';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('InvoiceRepositoryInterface')
    private readonly invoiceRepository: InvoiceRepositoryInterface,
  ) {}

  public async create(invoiceDto: InvoiceDto) {
    let invoice = new Invoice()    
    invoice.aproved_by = invoiceDto.aprovedBy;
    invoice.concept = invoiceDto.concept;
    invoice.sign = invoiceDto.sign;
    invoice.startDate = invoiceDto.startDate;
    invoice.endDate = invoiceDto.endDate;
    return await this.invoiceRepository.create(invoiceDto)
  }

  public async delete(invoiceId:string) {
    return await this.invoiceRepository.remove(invoiceId);
  }

  public async get() {
    return await this.invoiceRepository.findAll()
  }

  public async findOneById(id:number): Promise<Invoice>{
    return await this.invoiceRepository.findOneById(id)
  }
}
