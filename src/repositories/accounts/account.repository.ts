import { BaseAbstractRepository } from '../base/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../modules/accounts/accounts.entity';
import { AccountRepositoryInterface } from '../../modules/accounts/accounts.repository.interface';

@Injectable()
export class AccountRepository
  extends BaseAbstractRepository<Account>
  implements AccountRepositoryInterface
{
  constructor(
    @InjectRepository(Account)
    private readonly employeeRepository: Repository<Account>,
  ) {
    super(employeeRepository);
  }
}
