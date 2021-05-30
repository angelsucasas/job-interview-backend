import { BaseInterfaceRepository } from '../../repositories/base/interface.repository';
import { Account } from './accounts.entity';

export interface AccountRepositoryInterface
  extends BaseInterfaceRepository<Account> {}
