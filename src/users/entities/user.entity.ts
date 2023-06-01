import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DoctorDetailsEntity } from './doctor-details.entity';



export enum Status {
  active = 'active',
  deleted = 'deleted',
}

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid', {name: "userId"})
  userId: string;

  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @Column({ type: 'varchar', name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, default: false })
  verification: boolean;

  @Column({ nullable: true })
  verificationCode: number;

  @Column({ nullable: false })
  role: string;
  
  @Column({default: Status.active})
  status: string

  @CreateDateColumn()
  createdAt: Date;
  
  @OneToOne(() => DoctorDetailsEntity, {cascade: true, nullable: true, eager: true})
  @JoinColumn()
  doctorDetails: DoctorDetailsEntity;
}

export enum UserRole {
  patient = 'patient',
  doctor = 'doctor',
  admin = 'admin',
}

