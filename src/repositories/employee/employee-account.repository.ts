import { BaseAbstractRepository } from '../base/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeAccount } from '../../modules/employees/entity/employes-account.entity';
import { EmployeeAccountRepositoryInterface } from '../../modules/employees/interface/employees-account.repository.interface';

@Injectable()
export class EmployeeAccountRepository
  extends BaseAbstractRepository<EmployeeAccount>
  implements EmployeeAccountRepositoryInterface
{
  constructor(
    @InjectRepository(EmployeeAccount)
    private readonly employeeAccountRepository: Repository<EmployeeAccount>,
  ) {
    super(employeeAccountRepository);
  }
}
