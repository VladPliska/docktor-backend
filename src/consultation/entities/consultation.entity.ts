import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


export enum ConsultationStatus {
  pending = 'pending',
  processed = 'processed'
}
@Entity({ name: 'consultation' })
export class Consultation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  description: string;

  @Column({ default: ConsultationStatus.pending})
  status: string;
}
