import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feedbacks')
export class FeedbackEntity {
  @PrimaryGeneratedColumn('uuid' )
  feedbackId: string;

  // who send feedback
  @Column()
  userId: string;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({default: false})
  showInMainPage: boolean;

  @Column()
  appointmentId: string;
}