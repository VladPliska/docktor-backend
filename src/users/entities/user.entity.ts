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

  @Column({ type: 'varchar', name: 'phone_number' })
  phoneNumber: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @Column()
  avatar: string;

  @Column()
  verification: boolean;

  @Column()
  verificationCode: number;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;
}

export enum UserRole {
  patient = 'patient',
  doctor = 'doctor',
  admin = 'admin',
}
