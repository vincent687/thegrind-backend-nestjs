import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'public.res_partner', synchronize: false })
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  company_id: number;
  @Column({ type: 'timestamp' })
  create_date: Date;
  @Column()
  display_name: string;
  @Column({ type: 'timestamp' })
  date: Date;
  @Column()
  title: string;
  @Column()
  parent_id: number;
  @Column()
  ref: string;
  @Column()
  lang: string;
  @Column()
  tz: string;
  @Column()
  user_id: number;
  @Column()
  vat: string;
  @Column()
  website: string;
  @Column()
  comment: string;
  @Column()
  credit_limit: number;
  @Column()
  active: boolean;
  @Column()
  employee: boolean;
  @Column()
  function: string;
  @Column()
  type: string;
  @Column()
  street: string;
  @Column()
  street2: string;
  @Column()
  zip: string;
  @Column()
  city: string;
  @Column()
  state_id: number;
  @Column()
  country_id: number;
  @Column()
  partner_latitude: number;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  mobile: string;
  @Column()
  is_company: boolean;
  @Column()
  industry_id: number;
}
