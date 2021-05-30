import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transactions.service';
import { TransactionRepository } from '../../repositories/transactions/transaction.repository';
import { AccountModule } from '../accounts/accounts.module';
import { AccountService } from '../accounts/accounts.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    HttpModule.register({
      timeout: 20000,
      maxRedirects: 5,
    }),
    AccountModule
  ],
  providers: [
    TransactionService,    
    {
      provide: 'TransactionRepositoryInterface',
      useClass: TransactionRepository,
    }
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
