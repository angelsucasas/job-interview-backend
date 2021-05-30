import { BaseAbstractRepository } from '../base/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../modules/employees/entity/employees.entity';
import { EmployeeRepositoryInterface } from '../../modules/employees/interface/employees.repository.interface';

@Injectable()
export class EmployeeRepository
  extends BaseAbstractRepository<Employee>
  implements EmployeeRepositoryInterface
{
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {
    super(employeeRepository);
  }
}
