import { Module, HttpModule,forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { Account } from './accounts.entity';
import { AccountService } from './accounts.services';
import { AccountRepository } from '../../repositories/accounts/account.repository';
import { EmployeeAccountService } from '../employees/service/employee-account.service';
import { EmployeeModule } from '../employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    HttpModule.register({
      timeout: 20000,
      maxRedirects: 5,
    }),
    forwardRef (() =>EmployeeModule)
  ],
  exports:[
    AccountService
  ],
  providers: [
    {
      provide: 'AccountRepositoryInterface',
      useClass: AccountRepository,
    },
    AccountService    
  ],
  controllers: [AccountsController],
})
export class AccountModule {}
