import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'appointments' })
export class AppointmentsEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'appointment_id' })
  appointmentId: string;

  @Column({ name: 'date' })
  date: Date;

  @Column({ name: 'client_id' })
  clientId: string;

  @Column({ name: 'doctor_id' })
  doctorId: string;

  @Column()
  price: string;

  @Column()
  description: string;
}
