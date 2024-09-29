import { Question } from 'src/questions/question-entity';
import { User } from 'src/user/user-entity';
import { Response } from 'src/responses/response-entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'options' })
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'question_id', type: 'varchar' })
  question_id: string;

  @Column({ name: 'option_text', type: 'varchar' })
  option_text: string;

  @Column({ name: 'is_correct', type: 'boolean' })
  is_correct: boolean;

  @Column({ name: 'created_by', type: 'uuid' })
  created_by: string;

  @Column({ name: 'updated_by', type: 'uuid' })
  updated_by: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.createQuiz)
  @JoinColumn({ name: 'created_by' })
  create_By: User;

  @ManyToOne(() => User, (user) => user.updatedQuiz)
  @JoinColumn({ name: 'updated_by' })
  update_By: User;

  @ManyToOne(() => Question, (question) => question.id)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @OneToMany(() => Response, (response) => response.option)
  responses: Response[];
}
