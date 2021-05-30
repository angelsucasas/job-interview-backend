import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EmployeeModule } from '../modules/employees/employees.module';
import { AccountModule } from '../modules/accounts/accounts.module';
import { InvoiceModule } from '../modules/invoices/invoices.module';
import { TransactionModule } from '../modules/transactions/transactions.module';

import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { EmployeeAccount } from 'src/modules/employees/entity/employes-account.entity';
dotenv.config();
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../config/logger.service'

@Module({
  imports: [
    EmployeeModule,
    AccountModule,
    InvoiceModule,
    TransactionModule,
    TypeOrmModule.forRoot(),
    EmployeeAccount,
    WinstonModule.forRootAsync({
      useClass: LoggerSettingsService,
    })
  ],
  controllers: [
    AppController
  ],
  providers: [AppService],
})
export class AppModule {}
