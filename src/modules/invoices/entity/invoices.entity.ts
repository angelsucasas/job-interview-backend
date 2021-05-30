import {Column,CreateDateColumn,Entity} from 'typeorm';
import { PrimalEntity } from '../../../app/base-entity/base.entity';

@Entity({ name: 'invoice' })
export class Invoice extends PrimalEntity {
  @Column({ name: 'concept', type: 'text', nullable: false })
  concept: string;

  @Column({ name: 'aproved_by', type: 'text', nullable: false })
  aproved_by: string;

  @Column({ name: 'sign', type: 'text', nullable: false })
  sign: string;

  @CreateDateColumn({ name: 'start_date', nullable: true })
  startDate: Date;

  @CreateDateColumn({ name: 'end_date', nullable: true })
  endDate: Date;
}
