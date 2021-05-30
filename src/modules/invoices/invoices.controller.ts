import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  HttpStatus,
  Inject,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { InvoiceDeleteDto, InvoiceDto } from './invoices.dto';
import { InvoiceService } from './service/invoices.service';

@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService
  ) {}

  @Post('')
  async createEmployee(@Body() invoiceDto: InvoiceDto): Promise<any> {
    return await this.invoiceService.create(invoiceDto)
  }

  @Delete('')
  async deleteEmployee(@Body() invoiceDto: InvoiceDeleteDto): Promise<any> {
    return await this.invoiceService.delete(invoiceDto.id)
  }

  @Get('')
  async getEmployee(@Body() employee): Promise<any> {
    return await this.invoiceService.get()
  }
}
