import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Service } from 'src/services/entities/service.entity';

@Entity({ name: 'doctor-details' })
export class DoctorDetailsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  diploma: string;

  @Column({
    name: 'doctor_type',
  })
  doctorType: string;

  @Column()
  schedule: string;

  @Column()
  credo: string;
  
  @ManyToMany(() => Service)
  @JoinTable()
  services: Service[];
}
