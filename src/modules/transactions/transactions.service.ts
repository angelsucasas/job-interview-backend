import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { AccountService } from '../accounts/accounts.services';
import { TransactionDto } from './transactions.dto';
import { Transaction } from './transactions.entity';
import { TransactionRepositoryInterface } from './transactions.repository.interface'
import { Response } from 'express';
import { getManager } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TransactionRepositoryInterface')
    private readonly transactionRepository: TransactionRepositoryInterface,
    @Inject(AccountService)
    private readonly accountService: AccountService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly _logger: Logger,
  ) {}

  public async create(transactionDto: TransactionDto, res:Response) {
    this._logger.debug(`create: creating transaction [transaction=${transactionDto}]`, {
      context: TransactionService.name,
    });
    let transaction = new Transaction()
    transaction.amount = transactionDto.amount;
    transaction.description = transactionDto.description;
    try{
      transaction.originAccount = await this.accountService.findOneById(transactionDto.originAccount.id)
      transaction.destinyAccount = await this.accountService.findOneById(transactionDto.destinyAccount.id)
      let response = await this.transactionRepository.create(transaction)
      return res.status(HttpStatus.OK).send(response);
    }catch(e){
      return res.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(e.message));
    }
  }

  public async delete(transactionId:string) {
    this._logger.debug(`delete: deleting transaction with id [transactionID=${transactionId}]`, {
      context: TransactionService.name,
    });
    return await this.transactionRepository.remove(transactionId)
  }

  public async get(res:Response): Promise<Response> {
    this._logger.debug(`get: getting all transaction`, {
      context: TransactionService.name,
    });
    try{
      const entityManager = getManager();
      const someQuery = await entityManager.query(`
        select  tran.id ,account.product_number, tran.amount, tran.description,account.id as accountid, tran.created_at
        from "transaction" as tran
        Inner Join account on account.id = tran.origin_fk
      `);
      return res.status(HttpStatus.OK).send(someQuery);
    }
    catch(e){
      return res.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(e.message));
    }
  }

  public async findOneById(id:number): Promise<Transaction>{
    this._logger.debug(`get: finding the transaction with id [transactionID=${id}]`, {
      context: TransactionService.name,
    });
    return await this.transactionRepository.findOneById(id)
  }
}
