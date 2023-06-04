import { Service } from 'src/services/entities/service.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum AppointmentStatus {
  scheduled = 'scheduled',
  finished = 'finished',
}

@Entity({ name: 'appointments' })
export class AppointmentsEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'appointment_id' })
  appointmentId: string;

  @Column({ type: 'varchar', nullable: false })
  date: string;

  @Column({ type: 'varchar', nullable: false })
  time: string;

  @Column({ name: 'client_id' })
  clientId: string;

  @Column({ name: 'doctor_id' })
  doctorId: string;

  @Column({ nullable: true })
  price: number;

  @Column()
  description: string;

  @Column({ nullable: true, default: AppointmentStatus.scheduled})
  status: string;

  @ManyToMany(() => Service, { nullable: true, cascade: true, eager: true })
  @JoinTable()
  services: Service[];
}

