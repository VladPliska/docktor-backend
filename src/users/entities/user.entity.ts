import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
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

  @CreateDateColumn()
  createdAt: Date;
}

export enum UserRole {
  patient = 'patient',
  doctor = 'doctor',
  admin = 'admin',
}
