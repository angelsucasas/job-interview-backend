import { Inject, Injectable } from '@nestjs/common';
import { EmployeeSupervisorDto } from '../employees.dto';
import { EmployeeSupervisorRepositoryInterface } from '../interface/employees-supervisor.repository.interface';
import { EmployeeSupervisor } from '../entity/employee-supervisor.entity';
import { EmployeeService } from './employees.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class EmployeeSupervisorService{
  constructor(
    @Inject('EmployeeSupervisorRepositoryInterface')
    private readonly employeeSupervisorRepository: EmployeeSupervisorRepositoryInterface,
    @Inject(EmployeeService)
    private readonly employeeService: EmployeeService ,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly _logger: Logger,
  ) {}

  public async create(employeeSupervisorDto: EmployeeSupervisorDto): Promise<EmployeeSupervisor> {
    this._logger.debug(`create: creating employee-supervisor [employeeSupervisor =${employeeSupervisorDto}]`, {
      context: EmployeeSupervisorService.name,
    });
    let employeeSupervisor = await new EmployeeSupervisor();
    employeeSupervisor.employee = await this.employeeService.findOneById(employeeSupervisorDto.employee.id);
    employeeSupervisor.supervisor = await this.employeeService.findOneById(employeeSupervisorDto.supervisor.id);
    return await this.employeeSupervisorRepository.create(employeeSupervisor);
  }

  public async delete(employeeSupervisorId:string) {
    this._logger.debug(`delete: deleting employee_supervisor with id [${employeeSupervisorId}]`, {
      context: EmployeeSupervisorService.name,
    });
    return await this.employeeSupervisorRepository.remove(employeeSupervisorId);
  }

  public async get():Promise<EmployeeSupervisor[]> {
    this._logger.debug(`get: getting all employees_supervisor`, {
      context: EmployeeSupervisorService.name,
    });
    return await this.employeeSupervisorRepository.findAll();
  }  
}
