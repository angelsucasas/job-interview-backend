import { Inject, Injectable,HttpStatus } from '@nestjs/common';
import { AccountDto } from './accounts.dto';
import { Account } from './accounts.entity';
import { AccountRepositoryInterface } from './accounts.repository.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Response } from 'express';

@Injectable()
export class AccountService {
  constructor(
    @Inject('AccountRepositoryInterface')
    private readonly accountRepository: AccountRepositoryInterface,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly _logger: Logger,
  ) {}

  public async create(accountDto: AccountDto, res:Response):Promise<Response> {
    this._logger.debug(`create: creating account [account=${accountDto}]`, {
      context: AccountService.name,
    });

    let account = await new Account();
    account.productNumber = accountDto.productNumber;
    account.currentAmount = accountDto.currentAmount;
    try{
      let response = await this.accountRepository.create(account);
      return res.status(HttpStatus.OK).send(response);
    }
    catch(e){
      return res.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(e.message));
    }
  }

  public async shareCreation(accountDto: AccountDto):Promise<Account>{
    let account = await new Account();
    account.productNumber = accountDto.productNumber;
    account.currentAmount = accountDto.currentAmount;   
    return await this.accountRepository.create(account);
  }

  public async delete(accountId:string,res:Response) {
    this._logger.debug(`delete: deleting account with id [accountID=${accountId}]`, {
      context: AccountService.name,
    });
    try{
      let response = await this.accountRepository.remove(accountId);
      return res.status(HttpStatus.OK).send(response);
    }
    catch(e){
      return res.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(e.message));
    }
  }

  public async get(res:Response): Promise<Response> {
    this._logger.debug(`get: getting all accounts`, {
      context: AccountService.name,
    });
    try{
      let response = await this.accountRepository.findAll();
      return res.status(HttpStatus.OK).send(response);
    }
    catch(e){
      return res.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(e.message));
    }
  }

  public async findOneById(id:number){
    this._logger.debug(`get: finding the account with id [accountID=${id}]`, {
      context: AccountService.name,
    });
    return await this.accountRepository.findOneById(id);
  }
}
