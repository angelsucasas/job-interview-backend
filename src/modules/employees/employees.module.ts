import { Module, HttpModule,forwardRef } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeeService } from './service/employees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { employeeEntities } from './entity';
import { EmployeeRepository } from '../../repositories/employee/employee.repository';
import { EmployeeSupervisorRepository } from '../../repositories/employee/employee-supervisor.repository';
import { EmployeeAccountRepository } from '../../repositories/employee/employee-account.repository';
import { EmployeeSupervisorService } from './service/employee-supervisor.service';
import { EmployeeAccountService } from './service/employee-account.service';
import { AccountModule } from '../accounts/accounts.module';
import { AccountService } from '../accounts/accounts.services';

@Module({
  imports: [
    TypeOrmModule.forFeature(employeeEntities),
    HttpModule.register({
      timeout: 20000,
      maxRedirects: 5,
    }),
    //forwardRef (() =>AccountModule)
    AccountModule
  ],
  exports:[
    EmployeeAccountService
  ],
  providers: [
    EmployeeService,
    EmployeeSupervisorService,
    EmployeeAccountService,
    {
      provide: 'EmployeeRepositoryInterface',
      useClass: EmployeeRepository,
    },
    {
      provide: 'EmployeeSupervisorRepositoryInterface',
      useClass: EmployeeSupervisorRepository,
    },
    {
      provide: 'EmployeeAccountRepositoryInterface',
      useClass: EmployeeAccountRepository,
    },
  ],
  controllers: [EmployeesController],
})
export class EmployeeModule {}
