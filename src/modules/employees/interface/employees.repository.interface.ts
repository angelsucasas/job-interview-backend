import { BaseInterfaceRepository } from '../../../repositories/base/interface.repository';
import { Employee } from '../entity/employees.entity';

export interface EmployeeRepositoryInterface extends BaseInterfaceRepository<Employee> {}
