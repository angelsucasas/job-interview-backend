import {Column,CreateDateColumn,Entity} from 'typeorm';
import { PrimalEntity } from '../../../app/base-entity/base.entity';


@Entity({ name: 'employee' })
export class Employee extends PrimalEntity {
  @Column({ name: 'first_name', type: 'text', nullable: false })
  firstName: string;

  @Column({ name: 'second_name', type: 'text', nullable: true })
  secondName: string;

  @Column({ name: 'first_lastname', type: 'text', nullable: false })
  firstLastname: string;

  @Column({ name: 'second_lastname', type: 'text', nullable: true })
  secondLastname: string;

  @Column({ name: 'position', type: 'text', nullable: false })
  position: string;

  @Column({ name: 'deparment', type: 'text', nullable: false })
  deparment: string;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;
}
