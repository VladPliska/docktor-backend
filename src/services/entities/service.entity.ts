import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  doctorId: string;
}
