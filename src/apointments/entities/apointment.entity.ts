import { Service } from 'src/services/entities/service.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  status: string;

  @ManyToMany(() => Service, {nullable: true})
  @JoinTable()
  services: Service[];
}
