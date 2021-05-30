import {Column,JoinColumn,ManyToOne,Entity} from 'typeorm';
import { PrimalEntity } from '../../app/base-entity/base.entity';
import { Account } from '../accounts/accounts.entity';

@Entity({ name: 'transaction' })
export class Transaction extends PrimalEntity {
  @Column({ name: 'amount', type: 'text', nullable: false })
  amount: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @JoinColumn({ name: 'origin_fk' })
  @ManyToOne((type) => Account, (originAccount) => originAccount.id)
  originAccount: Account;

  @JoinColumn({ name: 'destiny_fk' })
  @ManyToOne((type) => Account, (destinyAccount) => destinyAccount.id)
  destinyAccount: Account;
}
