import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
