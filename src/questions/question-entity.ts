import { Option } from 'src/options/option-entity';
import { Quiz } from 'src/quizzes/quiz-entity';
import { User } from 'src/user/user-entity';
import { Response } from 'src/responses/response-entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'question_text', type: 'text' })
  question_text: string;

  @Column({
    name: 'question_type',
    type: 'enum',
    enum: ['multiple_choice', 'true_false'],
  })
  question_type: 'multiple_choice' | 'true_false';

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

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @OneToMany(() => Option, (option) => option.question)
  option: Option[];

  @OneToMany(() => Response, (response) => response)
  responses: Response[];
}
