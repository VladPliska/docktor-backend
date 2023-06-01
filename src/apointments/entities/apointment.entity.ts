import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'appointments' })
export class AppointmentsEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'appointment_id' })
  appointmentId: string;

  @Column({type: 'varchar', nullable: false })
  date: string;
  
  @Column({type: 'varchar', nullable: false})
  time: string;

  @Column({ name: 'client_id' }) 
  clientId: string;

  @Column({ name: 'doctor_id' })
  doctorId: string;

  @Column({nullable: true})
  price: number; 

  @Column()
  description: string;
}
