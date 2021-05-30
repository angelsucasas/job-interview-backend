import { BaseAbstractRepository } from '../base/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeSupervisor } from '../../modules/employees/entity/employee-supervisor.entity';
import { EmployeeSupervisorRepositoryInterface } from '../../modules/employees/interface/employees-supervisor.repository.interface';

@Injectable()
export class EmployeeSupervisorRepository
  extends BaseAbstractRepository<EmployeeSupervisor>
  implements EmployeeSupervisorRepositoryInterface
{
  constructor(
    @InjectRepository(EmployeeSupervisor)
    private readonly employeeSupervisorRepository: Repository<EmployeeSupervisor>,
  ) {
    super(employeeSupervisorRepository);
  }
}
