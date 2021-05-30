import {JoinColumn,ManyToOne,Entity} from 'typeorm';
import { PrimalEntity } from '../../../app/base-entity/base.entity';
import { Employee } from './employees.entity';
import { Account } from '../../accounts/accounts.entity';

@Entity({ name: 'employee_account' })
export class EmployeeAccount extends PrimalEntity {
  @JoinColumn({ name: 'employee_fk' })
  @ManyToOne((type) => Employee, (employee) => employee.id)
  employee: Employee;

  @JoinColumn({ name: 'account_fk' })
  @ManyToOne((type) => Account, (account) => account.id)
  account: Account;
}
