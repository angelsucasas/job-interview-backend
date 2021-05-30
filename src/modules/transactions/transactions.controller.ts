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
import { TransactionDto, TransactionsDeleteDto } from './transactions.dto';
import { TransactionService } from './transactions.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService
  ) {}

  @Post('')
  async createTransaction(
    @Body() transactionDto: TransactionDto,
    @Res() res: any
  ): Promise<any> {
    return await this.transactionService.create(transactionDto,res)
  }

  @Delete('')
  async deleteTransaction(@Body() transactionDto: TransactionsDeleteDto): Promise<any> {
    return await this.transactionService.delete(transactionDto.id)
  }

  @Get('')
  async getTransaction(
    @Res() res: any
  ): Promise<any> {
    return await this.transactionService.get(res)
  }
}
