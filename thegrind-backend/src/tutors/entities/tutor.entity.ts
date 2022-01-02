import { Channel } from 'src/channels/entities/channel.entity';
import { ClassRoom } from 'src/class-rooms/entities/class-room.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { TutionLocation } from 'src/tution-locations/entities/tution-location.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'public.custom_tutor_class', synchronize: false })
export class Tutor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'timestamp' })
  custom_start_date: Date;
  @Column({ type: 'timestamp' })
  custom_end_date: Date;
  @OneToOne(() => Employee)
  @JoinColumn({
    name: 'custom_tutor_id',
  })
  employee: Employee;
  @OneToOne(() => ClassRoom)
  @JoinColumn({
    name: 'custom_class_room_id',
  })
  class_room: ClassRoom;
  @OneToOne(() => Channel)
  @JoinColumn({
    name: 'custom_course_id',
  })
  channel: Channel;
  @Column()
  custom_present_student: number;
  @OneToOne(() => TutionLocation)
  @JoinColumn({
    name: 'custom_tution_locations_id',
  })
  location: TutionLocation;
}
