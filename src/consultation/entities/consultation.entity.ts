import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'consultation' })
export class Consultation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;
}
