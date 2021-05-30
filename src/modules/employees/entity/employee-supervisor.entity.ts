import {JoinColumn,ManyToOne,Entity} from 'typeorm';
import { PrimalEntity } from '../../../app/base-entity/base.entity';
import { Employee } from './employees.entity';

@Entity({ name: 'employee_supervisor' })
export class EmployeeSupervisor extends PrimalEntity {
  @JoinColumn({ name: 'employee_fk' })
  @ManyToOne((type) => Employee, (employee) => employee.id)
  employee: Employee;

  @JoinColumn({ name: 'supervisor_fk' })
  @ManyToOne((type) => Employee, (supervisor) => supervisor.id)
  supervisor: Employee;
}
