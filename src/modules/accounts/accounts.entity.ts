import {Column, Entity} from 'typeorm';
import { PrimalEntity } from '../../app/base-entity/base.entity';

@Entity({ name: 'account' })
export class Account extends PrimalEntity {
  @Column({ name: 'product_number', type: 'text', nullable: false })
  productNumber: string;

  @Column({ name: 'current_amount', type: 'integer', nullable: false })
  currentAmount: number;
}
