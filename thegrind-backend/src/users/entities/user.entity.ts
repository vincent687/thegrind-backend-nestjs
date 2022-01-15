import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Partner } from '../../partners/entities/partner.entity';

@Entity({ name: 'public.res_users', synchronize: false })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Partner)
  @JoinColumn({
    name: 'partner_id',
  })
  partner: Partner;
}
