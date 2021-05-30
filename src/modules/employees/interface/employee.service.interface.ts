import { Employee } from '../entity/employees.entity';

export interface EmployeeServiceInterface {
  create(employeeDto): Promise<Employee>;

  delete(employeeDto);

  get(employeeDto): Promise<Employee[]>;
}
