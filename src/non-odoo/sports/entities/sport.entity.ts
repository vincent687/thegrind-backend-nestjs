import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

@Entity({ name: "sport", synchronize: false })
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
